const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class Promise {
  constructor(executor) {
    // 参数校验
    if (typeof executor !== "function") {
      throw new TypeError("Promise resolver ${executor} is not a function");
    }
    this.initValue();
    this.initBind();
    try {
      executor(this.resolve, this.reject);
    }catch(e) {
      this.reject(e)
    }
    
  }

  //初始化值
  initValue() {
    this.value = null; // 终值
    this.reason = null; // 拒因
    this.state = PENDING; // 状态
    this.onFulfilledCallbacks = []; // 成功回调
    this.onRejectedCallbacks = []; // 失败回调
  }

  // 绑定 this
  initBind() {
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
  }

  resolve(value) {
    // 成功后的一系列操作（状态的改变， 成功的回调执行）
    if (this.state === PENDING) {
      this.state = FULFILLED;
      this.value = value;
      this.onFulfilledCallbacks.forEach(fn =>{ fn(this.value)})
    }
  }

  reject(reason) {
    if (this.state === PENDING) {
      this.state = REJECTED;
      this.reason = reason;
      this.onRejectedCallbacks.forEach(fn =>{fn(this.reason)} )
    }
  }

  then(onFulfilled, onRejected) {
    // 参数校验
    if (typeof onFulfilled !== "function") {
      onFulfilled = function(value) {
        return value;
      };
    }

    if (typeof onRejected !== "function") {
      onRejected = function(reason) {
        throw reason;
      };
    }

    // 实现链式调用，且改变了后面的then的值，必须通过新的实例
    const promise2 = new Promise((resolve, reject) => {
      if (this.state === FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value)
            Promise.resolvePromise(promise2, x, resolve, reject)
          } catch(reason) {
            reject(reason)
          }
        })
      }
  
      if (this.state === REJECTED) {
        setTimeout(() => {
          try {
            const x =  onRejected(this.reason)
            Promise.resolvePromise(promise2, x, resolve, reject)
          } catch(reason) {
            reject(reason)
          }
        })
      }
  
      if(this.state === PENDING) {
        this.onFulfilledCallbacks.push((value) => {
          setTimeout(() => {
            try {
              const x = onFulfilled(value)
              Promise.resolvePromise(promise2, x, resolve, reject)
            } catch(reason) {
              reject(reason)
            }
          })
        })
        this.onRejectedCallbacks.push(reason => {
          setTimeout(() => {
            try {
              const x =  onRejected(reason)
              Promise.resolvePromise(promise2, x, resolve, reject)
            } catch(reason) {
              reject(reason)
            }
          })
        })
      }
    })
    return promise2
  }
}

Promise.resolvePromise = function(promise2, x, resolve, reject) {
  if(x === promise2) {
    reject(new TypeError('Chaining cycle detected for promise'))
  }

  let called = false
  if(x instanceof Promise) {
    x.then(
      value => {
        Promise.resolvePromise(promise2, value, resolve, reject)
      },
      reason => {
        reject(reason)
      }
    )

  } else if(x !==null && (typeof x === 'object' || typeof x==='function')) {

    try {
      if(typeof x.then === 'function') {
        x.then(
          value => {
            if(called) return;
            called = true;
            Promise.resolvePromise(promise2, value, resolve, reject)
          },
          reason => {
            if(called) return;
            called = true;
            reject(reason)
          }
        )
      } else {
        if(called) return;
        called = true;
        resolve(x)
      }
    } catch(e) {
      if(called) return;
      called = true;
      reject(e)
    }
  } else {
    resolve(x)
  }
}

// console.log(1)
// new Promise((resolve, reject) => {
//   //throw new Error('haha, wo cuo le');
//   setTimeout(() => {
//     console.log(2);
//     resolve(1);
//   })
// }).then(
// value => {
//   console.log(4)
//   console.log('value',value);
// },
// reason => {
//   console.log('reason',reason)
// });
// console.log(3)


new Promise((resolve, reject) => {
  resolve(1); 
}).then(
  value => {  
    return new Promise(resolve => {
      resolve(new Promise(resolve => {
        resolve(333)
      }))
    })
  },
  reason => {
    console.log('reason',reason)
  }
).then(
  value => {
    console.log('value',value);
  },
  reason => {
    console.log('reason',reason)
  }
)


/* 
// 循环调用报错
let p1 = new Promise(resolve => {
  resolve(1)
})

let p2 = p1.then(() => {
  return p2
})
*/
