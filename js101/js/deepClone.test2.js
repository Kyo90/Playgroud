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


const target = {
  filed1: 1,
  filed2: undefined,
  filed3: {
    child: "child",
  },
  field4: [2, 4, 8],
  f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: {} } } } } } } } } } } },
};
target.target = target;

function copyPlus(target, map=new WeakMap()) {
  if(typeof target === 'object') {
    const isArray = Array.isArray(target);
    let cloneTarget = isArray ? [] : {};
    
    if(map.get(target)) {
      return target
    }
    map.set(target, cloneTarget);

    const keys = isArray ? undefined: Object.keys(target);
    forEach(keys || target, (value, key) => {
      if(keys) {
        key = value
      }
      cloneTarget[key] = copyPlus(target[key], map);
    }) 
    return cloneTarget
  } else {
    return target
  }
}

console.time();
let c1 = copyPlus(target);
console.timeEnd();
