let arr = [1,23,3,5,7,17,9,21,20, 12,2,8];

function between(a,b) {
  return function(v) {
    return v >= a && v <= b;
  }
}

console.log(arr.filter(between(20,30)))
