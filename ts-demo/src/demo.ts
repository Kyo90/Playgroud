class Person {
  constructor(private _name:string) {}

  get name() {
    return this._name
  }
}

const p = new Person('liu');
console.log(p.name)


class Demo {
  private static instance: Demo;
  private constructor(public name: string) {}

  static getInstance() {
    if(!this.instance) {
      this.instance = new Demo('momo');
    }
    return this.instance
  }
}

const demo1 = Demo.getInstance();
const demo2 = Demo.getInstance();

console.log(demo1.name)
