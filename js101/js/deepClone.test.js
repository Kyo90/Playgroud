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
  empty: null,
  set: new Set().add("a").add("b"),
  map: new Map().set("age", 18).set("city", "sh"),
  age: 18,
  bool: new Boolean(true),
  date: new Date(),
};
target.target = target;

const mapTag = "[object Map]";
const setTag = "[object Set]";
const arrayTag = "[object Array]";
const objectTag = "[object Object]";
const argsTag = "[object Arguments]";

const boolTag = "[object Boolean]";
const dateTag = "[object Date]";
const numberTag = "[object Number]";
const stringTag = "[object String]";
const symbolTag = "[object Symbol]";
const errorTag = "[object Error]";
const regexTag = "[object RegExp]";
const funcTag = "[object Function]";

function getType(obj) {
  return Object.prototype.toString.call(obj);
}

function isObject(obj) {
  const type = typeof obj;
  return obj !== null && (type === "object" || type === "function");
}

function getInit(targ) {
  const Ctor = targ.constructor;
  return new Ctor();
}

function forEach(array, iteratee) {
  let index = -1;
  const length = array.length;
  while (index < length) {
    index += 1;
    iteratee(array[index], index);
  }
  return array;
}

const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];


function cloneSymbol(target) {
  return Object(Symbol.propotype.valueOf.call(target))
}

function cloneOtherType(target, type) {
  const Ctor = target.constructor;
  switch (type) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
      return new Ctor(target);
    default:
      return null;
  }
}

function clone(targ, map = new WeakMap()) {
  if (!isObject(targ)) {
    return targ;
  }
  const type = getType(targ);
  let cloneTarget;
  if (deepTag.includes(type)) {
    cloneTarget = getInit(targ, type);
  } else {
    return cloneOtherType(targ, type);
  }

  if(map.get(targ)) {
    return map.get(targ)
  }
  map.set(targ, cloneTarget)
  if (type === setTag) {
    targ.forEach((value) => {
      cloneTarget.add(clone(value));
    });
    return cloneTarget;
  }

  if (type === mapTag) {
    targ.forEach((value, key) => {
      cloneTarget.set(key, clone(value));
    });
    return cloneTarget;
  }

  const keys = type === arrayTag ? undefined : Object.keys(targ);
  forEach(keys || target, (value, key) => {
    if (keys) {
      key = value;
    }
    cloneTarget[key] = clone(target[key], map);
  });
  return cloneTarget;
}

let c1 = clone(target);
console.log(c1);

console.log(getType(1));
