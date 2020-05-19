let name = {
  firstname:"kyo",
  lastname:"Liu"
}

let printName = function(hometown, state, country){
  console.log(`${this.firstname} ${this.lastname}, ${hometown}, ${state}, ${country}`);
}

let printMyName = printName.bind(name,'PuDong','Shanghai')
printMyName('China')

// return a function
Function.prototype.myBind = function(...args) {
  let obj = this, 
    params = args.slice(1)
  return function(...args2) {
    obj.apply(args[0], [...params, ...args2])
  }
}

Function.prototype.myBind1 = function (context,...args1) {
  if (this === Function.prototype) {
    throw new TypeError('Error')
  }
  const _this = this
  return function F(...args2) {
    // 判断是否用于构造函数
    if (this instanceof F) {
      return new _this(...args1, ...args2)
    }
    return _this.apply(context, args1.concat(args2))
  }
}

let printMyName2 = printName.myBind(name,'PuDong', 'Shanghai')
printMyName2('China')

function Animal(name, color) {
  this.name = name;
  this.color = color;
}

Animal.prototype.say = function() {
  return `I'm a ${this.color} ${this.name}`;
}

const Cat = Animal.myBind1(null, 'cat');
const cat = new Cat('white');

console.log(cat.say());
