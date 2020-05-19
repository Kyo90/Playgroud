const obj = {
  name:'Alex'
}

function foo() {
  console.log(this.name)
}

var name = "apple"

Function.prototype.myCall = function (obj, ...args) {
  const fn = Symbol('fn')
  obj = obj || window
  obj[fn] = this;
  const result = obj[fn](...args);
  delete obj[fn];
  return result
}

foo.myCall()
