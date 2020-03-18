//节流（throttle）: 不管事件触发频率多高，单位事件内只执行一次；

let counter = 0;
const loggerFunc = () => {
  console.count("Throttled Function:", counter++);
}


//第一次会执行，最后一次不会执行
function throttle(fn, limit) {
  let flag = true;
  return function(...args) {
    // console.log(flag)
    if(flag) {
      fn.apply(this, args);
      flag = false;
      setTimeout(() => {
        flag = true;
      }, limit)
    }    
  }
}

//第一次和最后一次都会执行；
function throttle1(event, time) {
  let pre = 0;
  let timer = null;
  return function (...args) {
    if (Date.now() - pre > time) {
      clearTimeout(timer);
      timer = null;
      pre = Date.now();
      event.apply(this, args);
    } else if (!timer) {
      timer = setTimeout(() => {
        event.apply(this, args);
      }, time);
    }
  }
}

const betterLoggerFunction = throttle(loggerFunc, 1000);
