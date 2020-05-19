// es6
class Person {
  constructor(name) {
    this.name = name;
  }

  static say() {
    return "hell0";
  }

  get name() {
    return "kevin";
  }

  set name(newName) {
    console.log("new Name 为" + newName);
  }

  sayHello() {
    return "hello, I am" + this.name;
  }
}

const kevin = new Person("kevin");
kevin.sayHello();

/*
 ES5 函数类
*/

// constructor
function Person_ES5(name) {
  this.name = name;
}

// static method
Person_ES5.say = function () {
  return "hello";
};

// instace method
Person_ES5.prototype.sayHello = function () {
  return "hello, I am" + this.name;
};

const kevin1 = new Person_ES5("kevin");
kevin1.sayHello();
