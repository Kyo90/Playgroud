const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname,'public')));
app.get('/test',(req, res) => {
  const result = 'fn()'
  res.send(result)
})
app.get('/better',(req, res) => {
  // 接受客户端传递过来的函数名称
  // const fnName = req.query.callback;
  // 将函数名称对应的函数调用代码返回给客户端
  // const data = JSON.stringify({name:"张三"});
  // const result = fnName +'('+ data + ')'
  // res.send(result)
  res.jsonp({name:"张三"})
})

app.listen(3001, () => {
  console.log('Listening on prot 3001')
})



