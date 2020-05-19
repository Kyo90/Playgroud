// 如何判断一个方法是直接调用，还是使用new 调用

const Foo = (function() {
  let idIndex = 0;
  return function() {
    if(this instanceof Foo) {
      this.id = idIndex++;
    } else {
      return {id: idIndex++}
    }
  }
})()
const foo1 = new Foo();
console.log(foo1.id)
const foo2 = new Foo();
console.log(foo2.id)
const foo3 = Foo();
console.log(foo3.id)


Function.prototype.myBind = function(context, ...args1) {
  if (this === Function.prototype) {
    throw new TypeError('Error')
  }
  let _this = this
  return function F(...args2) {
    if(this instanceof F) {
      return new _this(...args1, ...args2)
    }
    return _this.apply(context, args1.concat(args2))
  }
  
}
