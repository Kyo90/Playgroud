const arr = [1, 2, 3, 8, 4, 1, 2, 5, 12, 6, 1, 4];

const cart = [
  { name: "iphone", price: 12000 },
  { name: "imac", price: 25000 },
  { name: "ipad", price: 3000 },
];

// 数组求最大值
function getMaxValue(arr = []) {
  return arr.reduce((pre, cur) => {
    return pre > cur ? pre : cur;
  });
}
console.log(getMaxValue(arr));

// 数组去重
function filterSameValue(arr = []) {
  return arr.reduce((res, cur) => {
    if (!res.includes(cur)) {
      res.push(cur);
    }
    return res;
  }, []);
}
console.log(filterSameValue(arr));

// 统计出现的频率
function arrayCount(arr = [], item) {
  return arr.reduce((total, cur) => {
    if (cur === item) {
      total += 1;
    }
    return total;
  }, 0);
}
console.log(arrayCount(arr, 1));
