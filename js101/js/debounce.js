let counter = 0;
const getData = () => {
  console.log("Fetching Data...", counter++)
}

const debounceGetData = debounce(getData, 300)

//触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间
function debounce(event, time, flag) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    if (flag && !timer) {
      event.apply(this, args);
    }
    timer = setTimeout(() => {
      event.apply(this, args);
    }, time);
  };
}
