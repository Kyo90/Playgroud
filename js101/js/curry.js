// sum(1,2,3,4..n)转化为 sum(1)(2)(3)(4)…(n)
function curry(fn) {
  var c = (...arg) => 
  fn.length === arg.length ? fn(...arg) : (...arg1) => c(...arg, ...arg1);
  return c;


//   var c = (...arg) => (fn.length === arg.length) ?
//           fn (...arg) : (...arg1) => c(...arg, ...arg1)
// return c
}

function sum(a,b,c) {

  console.log(a + b + c) 
}

const add = curry(sum)(1)(2)(3);

