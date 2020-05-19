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
