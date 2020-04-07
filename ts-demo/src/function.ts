// 函数，一等公民（满满的自豪感）。

// 函数声明 （function declaration)
function sum(x: number, y: number): number {
  return x + y;
}

// 函数表达式（function expression）
const sum3 = function(x: number, y: number): number {
  return x + y;
}

/*
  从函数表达式的结构分析，= 右边（→_→）大家都懂的，但是👈左边我们发现有点空，是不是
  得有个类型定义下呢？那又该如何定义？
*/
const sum4: (x: number, y: number) => number = function(x: number, y: number): number {
  return x + y;
}

function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let buildNameFun: (fname: string, ...rest: string[]) => string = buildName;

let employeeName = buildNameFun("Joseph", "Samuel", "Lucas", "MacKinzie");

// 招式三：接口定义（interfaces）
interface GenericIdentityFn {
  <T>(arg: T): T;
}

function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: GenericIdentityFn = identity;



// this和箭头函数
let deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  createCardPicker: function() {
    return () => {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);
      return {suit: this.suits[pickedSuit], card: pickedCard % 13};
    }
  }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

console.log("card: " + pickedCard.card + " of " + pickedCard.suit);

// 函数类型接口
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // okay


type Alias = { num: number }
interface Interface {
    num: number;
}
declare function aliased(arg: Alias): Alias;
declare function interfaced(arg: Interface): Interface;
