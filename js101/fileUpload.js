function handleFile() {
  const input = document.createElement("input");
  input.type = "file";
  input.multiple = true;
  input.accept = ".pdf";
  try {
    input.addEventListener("change", (e) => {
      const { files } = e.target;
      if (files && files[0]) {
        const file = files[0];
        this.setState({ src: file });
      }
    });
    input.click();
  } catch (err) {
    message.error(`上传失败: ${err}`);
  }
}

function submitUpload() {
  var chunkSize = 2 * 1024 * 1024; //分片大小 2M
  var file = document.getElementById("f1").files[0];
  var chunks = [], //保存分片数据
    token = +new Date(), //时间戳
    name = file.name,
    chunkCount = 0,
    sendChunkCount = 0;

  //拆分文件 像操作字符串一样
  if (file.size > chunkSize) {
    //拆分文件
    var start = 0,
      end = 0;
    while (true) {
      end += chunkSize;
      var blob = file.slice(start, end);
      start += chunkSize;

      if (!blob.size) {
        //截取的数据为空 则结束
        //拆分结束
        break;
      }

      chunks.push(blob); //保存分段数据
    }
  } else {
    chunks.push(file.slice(0));
  }

  chunkCount = chunks.length; //分片的个数

  //没有做并发限制，较大文件导致并发过多，tcp 链接被占光 ，需要做下并发控制，比如只有4个在请求在发送

  for (var i = 0; i < chunkCount; i++) {
    var fd = new FormData(); //构造FormData对象
    fd.append("token", token);
    fd.append("f1", chunks[i]);
    fd.append("index", i);
    xhrSend(fd, function () {
      sendChunkCount += 1;
      if (sendChunkCount === chunkCount) {
        //上传完成，发送合并请求
        console.log("上传完成，发送合并请求");
        var formD = new FormData();
        formD.append("type", "merge");
        formD.append("token", token);
        formD.append("chunkCount", chunkCount);
        formD.append("filename", name);
        xhrSend(formD);
      }
    });
  }
}

function xhrSend(fd, cb) {
  var xhr = new XMLHttpRequest(); //创建对象
  xhr.open("POST", "http://localhost:8100/", true);
  xhr.onreadystatechange = function () {
    console.log("state change", xhr.readyState);
    if (xhr.readyState == 4) {
      console.log(xhr.responseText);
      cb && cb();
    }
  };
  xhr.send(fd); //发送
}

//绑定提交事件
document.getElementById("btn-submit").addEventListener("click", submitUpload);
