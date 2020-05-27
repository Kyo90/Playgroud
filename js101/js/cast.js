const user = {
  name: 'john',
  money: 1000,
  
  toString() {
    return `User {name: ${this.name}, money: ${this.money}}`;
  },

  valueOf() {
    return {};
  },

  [Symbol.toPrimitive](hint) {
    console.log('hint：%s', hint);
    return {};
    //return hint == "string" ? `User {name: "${this.name}"}` : this.money;

  }

}

alert(user); //输出hint为string后，抛出TypeError，因为toPrimitive返回的不是简单类型
console.log(user);
console.log(+user);
console.log(user+500);
console.log(Object.prototype.toString.call(user));


console.log([] == 0)  // true
// [] 数组转换成基本类型的过程，先调用valueOf() 方法，但数组的valueOf()方法返回的是其本身非简单类型
// [].valueOf() = []
// [].toString() = ""
// Number("") = 0

