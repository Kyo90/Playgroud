function Promise(excutor) {
  this.callbacks = []; // Promise resolve时的回调函数集

  // 传递给Promise处理函数的resolve
  // 这里直接往实例上挂个data
  // 然后把onResolvedCallback数组里的函数依次执行一遍就可以
  function resolve(value) {
    // 注意promise的then函数需要异步执行
    setTimeout(() => {
      this.data = value;
      this.callbacks.forEach((callback) => callback(value));
    });
  }

  // 执行用户传入的函数
  excutor(resolve.bind(this));
}

// 看不懂啊
Promise.prototype.then = function (onResolved) {
  // 一定要返回一个新的promise
  // promise2
  return new Promise((resolve) => {
    this.callbacks.push(() => {
      var result = onResolved(this.data);
      if (result instanceof Promise) {
        // resolve的权力被交给了user promise
        result.then(resolve);
      } else {
        resolve(result);
      }
    });
  });
};

var excutor = (resolve) => {
  setTimeout(() => {
    resolve(1);
  }, 500);
};

var promise1 = new Promise(excutor);

promise1.then((res) => {
  console.log(res);
  // user promise
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, 500);
  });
}).then(console.log);
