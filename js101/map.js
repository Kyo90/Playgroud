// forEach实现(reduce类似)
Array.prototype.myMap = function (fn, thisValue) {
  var result = []
  this.forEach((v, i, arr) => {
    result.push(fn.call(thisValue, v, i, arr))
  })
  return result
}
var arr0 = [1, 2, 3]
console.log(arr0.myMap(v => v + 1))
