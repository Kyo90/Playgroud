class Parent {
  constructor(name) {
    this.name = name;
  }

  static sayHello() {
    console.log('hello');
  }

  sayName() {
    console.log('my name is ' + this.name);
    return this.name
  }
}

class Child extends Parent {
  constructor(name, age) {
    super(name);
    this.age = age;
  }

  sayAge() {
    console.log('my age is ' + this.age)
    return this.age;
  }
}
let parent = new Parent('parent')

let child = new Child('Child',18);

console.log('parent',parent)
Parent.sayHello();
parent.sayName();
child.sayName();
child.sayAge();

//  1、构造器原型链
Child.__proto__ === Parent // true
Parent.__proto__ === Function.prototype
Function.prototype.__proto__ === Object.prototype

// 2、实例原型链
child.__proto__ === Child.prototype;
Child.prototype.__proto__ === Parent.prototype
