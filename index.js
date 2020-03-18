let counter = 0;
const getData = () => {
  console.log("Fetching Data...", counter++)
}

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

const debounceGetData = debounce(getData, 300)
