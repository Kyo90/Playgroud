// 检测l的原型链（__proto__）上是否有r.prototype，若有返回true，否则false
function myInstanceof (l, r) {
  var R = r.prototype
  while (l.__proto__) {
    if (l.__proto__ === R) return true
  }
  return false
}


function instanceofFunc(obj, cons) {
  // 错误判断 构造函数必须是一个function 其他的均报错
  if (typeof cons !== 'function') throw new Error('instance error')
  if (!obj || (typeof obj !== 'object' && typeof obj !== 'function')) return false
  // 获取到原型对象
  let proto = cons.prototype
  // 如果obj的原型对象不是null
  while (obj.__proto__) {
    if (obj.__proto__ === proto) return true
    obj = obj.__proto__
  }
  return false
}

console.log(instanceofFunc(() => {}, Function)) // true


