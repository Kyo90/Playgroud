let a:string = "test"

// 函数类型接口
interface encrypt {
  (key:string, value:string):string
}

var md5 = function(key:string, value:string):string {
  return ''
}  


// 可索引的接口
/*
  定义数组的方式
  var arr:number[] = [222,333]
  var arr1:Array<string> = ['aaa','bbb']
 */

interface myArr {
  [index:number]:string
}
let arr:myArr = ['aaa','bbbb']


// 类类型的接口，对类的约束 和 抽象有点相似
interface Animal {
  name:string,
  eat(str:string):void,
}

class Dog implements Animal {
  name:string;
  constructor(name:string) {
    this.name = name;
  }

  eat() {
    console.log(this.name + '吃粮食')
  }
  
}

// 接口的继承和实现
interface Person extends Animal {
  work():void;
}

class Programmer {
  name:string;

  constructor(name:string) {
    this.name = name
  }

  coding(code:string) {
    console.log(this.name + code)
  }
}


class Web extends Programmer implements Person {

  constructor(name:string) {
    super(name)
  }

  eat() {
    console.log(this.name + '喜欢吃火锅')
  }
  work() {
    console.log(this.name + '的工作是工程师')
  }
}

// 范型接口
interface configFn {
  <T> (value:T):T
}

// function getData<T>(value:T):T {
//   return value
// }

const getData:configFn = function<T>(value:T):T {
  return value
}

getData<string>('123')

interface MyInterface {
  id: number;
  name: string;
  properties: string[];
}

const myObj: MyInterface = {
  id:1,
  name:'foo',
  properties: ['a', 'b', 'c']
}

function getValue(value: keyof MyInterface) {
  return myObj[value]
}




interface DBI<T> {
  add(info:T):boolean,
  update(info:T, id:number):boolean,
  delete(id:number):boolean,
  get(id:number): any[]
}

class MySqlDB<T> implements DBI<T> {
  add(info: T): boolean {
    console.log(info);
    return true;
  }
  update(info: T, id: number): boolean {
    throw new Error("Method not implemented.")
  }
  delete(id: number): boolean {
    throw new Error("Method not implemented.")
  }
  get(id: number): any[] {
    throw new Error("Method not implemented.")
  }

}

class User {
  username: string | undefined;
  password: string | undefined;

  constructor(username: string, passowd:string) {
    this.username = username;
    this.password = passowd;
  }
}


const user1 = new User('zhangsan', '12345678')

const mysqlDB = new MySqlDB<User>();
mysqlDB.add(user1)


/**
 * Adds a property of a certain name and maps it to each property's key.
 * For example,
 *
 *   ```
 *   type ActionPayloadTable = {
 *     "Hello": { foo: true },
 *     "World": { bar: true },
 *   }
 *  
 *   type Foo = TagWithKey<"greeting", ActionPayloadTable>; 
 *   ```
 *
 * is more or less equivalent to
 *
 *   ```
 *   type Foo = {
 *     "Hello": { greeting: "Hello", foo: true },
 *     "World": { greeting: "World", bar: true },
 *   }
 *   ```
 */
type TagWithKey<TagName extends string, T> = {
  [K in keyof T]: { [_ in TagName]: K } & T[K]
};

type Unionize<T> = T[keyof T];

type ActionPayloadTable = {
  "Example": { example: true },
  "Another": { another: true },
}

type ActionTable = TagWithKey<"type", ActionPayloadTable>;

type ExampleAction = ActionTable["Example"];
type AnotherAction = ActionTable["Another"];

type MyActions = Unionize<ActionTable>

declare class Example<Table> {
  doSomething<ActionName extends keyof Table>(key: ActionName): Table[ActionName];
}

const items = new Example<ActionTable>();

const result1 = items.doSomething("Example");

console.log(result1.example);
