// 红灯三秒亮一次，绿灯一秒亮一次，黄灯2秒亮一次；如何让三个灯不断交替重复亮灯？（用Promse实现）三个亮灯函数已经存在：
function red() {
  console.log('red');
}
function green() {
  console.log('green');
}
function yellow() {
  console.log('yellow');
}

const light = function(timmer, cb) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      cb();
      resolve();
    }, timmer);
  });
};

// 为什么加 Return 后就可以实现
// Promise.resolve()
//   .then(() => {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         console.log(1);
//         red();
//         resolve();
//       }, 3000);
//     });
//   })
//   .then(() => {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         console.log(2);
//         green();
//         resolve();
//       }, 1000);
//     });
//   })
//   .then(() => {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         console.log(3);
//         yellow();
//         resolve();
//       }, 2000);
//     });
//   });

const step = function() {
  Promise.resolve()
    .then(function() {
      return light(3000, red);
    })
    .then(function() {
      return light(2000, green);
    })
    .then(function() {
      return light(1000, yellow);
    })
    .then(function() {
      step();
    });
};

//step();

const timeout = ms =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

const ajax1 = () =>
  timeout(2000).then(() => {
    console.log('1');
    return 1;
  });

const ajax2 = () =>
  timeout(1000).then(() => {
    console.log('2');
    return 2;
  });

const ajax3 = () =>
  timeout(2000).then(() => {
    console.log('3');
    return 3;
  });

const mergePromise = ajaxArray => {
  // 在这里实现你的代码
  const data = [];
  return ajaxArray.reduce((f, g) => {
    return f.then(g).then(res => {
      data.push(res);
      return data;
    });
  }, Promise.resolve());
};

// mergePromise([ajax1, ajax2, ajax3]).then(data => {
//   console.log('done');
//   console.log(data); // data 为 [1, 2, 3]
// });

(() => {
  // 计数器
  var count = 0;
  // 全局锁
  var lock = [];
  var l = urls.length;

  const urls = [
    'https://www.kkkk1000.com/images/getImgData/getImgDatadata.jpg',
    'https://www.kkkk1000.com/images/getImgData/gray.gif',
    'https://www.kkkk1000.com/images/getImgData/Particle.gif',
    'https://www.kkkk1000.com/images/getImgData/arithmetic.png',
    'https://www.kkkk1000.com/images/getImgData/arithmetic2.gif',
    'https://www.kkkk1000.com/images/getImgData/getImgDataError.jpg',
    'https://www.kkkk1000.com/images/getImgData/arithmetic.gif',
    'https://www.kkkk1000.com/images/wxQrCode2.png'
  ];
  function loadImg(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = function() {
        console.log('一张图片加载完成');
        resolve();
      };
      img.onerror = reject;
      img.src = url;
    });
  }

  async function bao() {
    if (count >= 3) {
      //超过限制利用await和promise进行阻塞;
      let _resolve;
      await new Promise(resolve => {
        _resolve = resolve;
        // resolve不执行,将其推入lock数组;
        lock.push(_resolve);
      });
    }
    if (urls.length > 0) {
      count++;
      await loadImg(urls.shift());
      count--;
      lock.length && lock.shift()();
    }
  }

  for (let i = 0; i < l; i++) {
    bao();
  }
})();
