function pair(x,y) {
  return m => m(x, y)
}

function head(z) {
  return z((p, q) => p)
}

function tail(z) {
  return z((p, q) => q)
}


// function first(x, y) {
//   return x;
// } 

// function second(x, y) {
//   return y
// }

// function head(z){
//  return z(first)
// }

// function tail(z) {
//   return z(second)
// }


// const x = head(m => m(1, 2))
// const y = tail(m => m(1, 2))
// console.log(x, y)

function make_interval(x, y) {
  return pair(x,y)
}

function lower_bound(x) {
  return head(x)
}

function upper_bound(x) {
  return tail(x)
}

function add_interval(x, y) {
  return make_interval(lower_bound(x) + lower_bound(y),
  upper_bound(x) + upper_bound(y));
}
 

const interval = add_interval(pair(1,5), pair(2, 10));
console.log(interval)
const x = head(interval)
const y = tail(interval)
console.log(x, y)
