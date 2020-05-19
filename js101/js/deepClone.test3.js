// 可继续遍历的数据类型
const mapTag = "[object Map]";
const setTag = "[object Set]";
const arrayTag = "[object Array]";
const objectTag = "[object Object]";
const argsTag = "[object Arguments]";

// 不可继续遍历的数据类型
const boolTag = "[object Boolean]";
const dateTag = "[object Date]";
const numberTag = "[object Number]";
const stringTag = "[object String]";
const symbolTag = "[object Symbol]";
const errorTag = "[object Error]";
const regexTag = "[object RegExp]";
const funcTag = "[object Function]";

const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];

function isObject(target) {
  const type = typeof target;
  return target !== null && (type === "object" || type === "function");
}

function getType(target) {
  return Object.prototype.toString.call(target);
}

function getInit(target) {
  const Ctor = target.constructor;
  return new Ctor();
}

function forEach(array, iteratee) {
  let index = -1;
  const length = array.length;

  while (++index < length) {
    iteratee(array[index], index);
  }
  return array;
}

function cloneOtherType(target, type) {
  const Ctor = target.constructor;
  switch (type) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
      return new Ctor(target)
    case regexTag:
      return cloneReg(target)
    case symbolTag:
      return cloneSymbol(target)    
    default:
      return null;
  }
}

function cloneSymbol(target) {
  console.log(Symbol.prototype.valueOf.call(target));
  return Object(Symbol.prototype.valueOf.call(target))
}

function cloneReg(target) {
  const reFlags = /\w*$/;
  const result = new target.constructor(target.source, reFlags.exec(target));
  result.lastIndex = target.lastIndex;
  return result;
}

function clone(target, map = new WeakMap()) {
  // 克隆原始类型
  if (!isObject(target)) {
    return target;
  }

  // 初始化
  const type = getType(target);
  let cloneTarget;
  if (deepTag.includes(type)) {
    cloneTarget = getInit(target, type);
  } else {
    return cloneOtherType(target, type)
  }

  // 防止循环引用
  if (map.get(target)) {
    return target;
  }
  map.set(target, cloneTarget);

  // 克隆 set
  if (type === setTag) {
    target.forEach((value) => {
      cloneTarget.add(clone(value));
    });
    return cloneTarget;
  }

  // 克隆 map
  if (type === mapTag) {
    target.forEach((value, key) => {
      cloneTarget.set(key, clone(value));
    });
    return cloneTarget;
  }

  // 克隆对象和数组
  const keys = type === arrayTag ? undefined : Reflect.ownKeys(target);
  forEach(keys || target, (value, key) => {
    if (keys) {
      key = value;
    }
    cloneTarget[key] = clone(target[key], map);
  });
  return cloneTarget;
}

let set1 = new Set();
set1.add("a").add("b").add("d").add("c");
let map1 = new Map();
map1.set("a", 1).set("b", 2).set(999, 3);


const target = {
  filed1: 1,
  filed2: undefined,
  filed3: {
    child: "child",
  },
  field4: [2, 4, 8],
  [Symbol()]: 12345678,
  symbol: Symbol('123'),
  empty: null,
  set: new Set().add("a").add("b"),
  map: new Map().set("age", 18).set("city", "sh"),
  age: 18,
  bool: new Boolean(true),
  date: new Date(),
};
target.target = target;


// const target = {
//   filed1: 1,
//   filed2: undefined,
//   filed3: {
//     child: "child",
//   },
//   field4: [2, 4, 8],
//   empty: null,
//   set1,
//   map1,
//   age: 18,
//   bool: new Boolean(true),
//   date: new Date()
// };
// target.target = target;

let a = Symbol(12345)

let c1 = cloneSymbol(a);
console.log(c1);
