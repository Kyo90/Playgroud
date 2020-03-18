setTimeout(function() {
  console.log(4);
}, 0);

//new Promise在实例化的过程中所执行的代码都是同步进行的，而then中注册的回调才是异步执行的。
new Promise(function(resolve) {
  console.log(1);
  for (var i = 0; i < 10000; i++) {
    i == 9999 && resolve();
  }
  console.log(2);
}).then(function() {
  console.log(5);
});
console.log(3);

/* 

异步任务的执行

*/
