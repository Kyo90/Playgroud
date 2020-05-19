function Parent(name) {
  this.name = name;
}

Parent.sayHello = function(){
  console.log('hello')
}

Parent.prototype.sayName = function(){
  console.log('my name is ' + this.name);
  return this.name
}

function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}

Child.prototype.sayAge = function() {
  console.log('my age is ' + this.age)
  return this.age;
}

function _inherits(Child, Parent) {
  Child.prototype = Object.create(Parent.prototype);
  Child.prototype.constructor = Child;
  Child.__proto__ = Parent;
}

_inherits(Child, Parent)
