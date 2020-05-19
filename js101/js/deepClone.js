
let empty = null;
let str = "test";
let arr1 = [1, 2, 3];
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

function copy(obj) {
  let res = obj instanceof Array ? [] : {};
  for (const [k, v] of Object.entries(obj)) {
    res[k] = typeof v === "object" ? copy(v) : v;
  }
  return res;
}

/* 
  解决循环引用问题，我们可以额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系，
  当需要拷贝当前对象时，先去存储空间中找，有没有拷贝过这个对象，如果有的话直接返回，如果没有的话继续拷贝，
  这样就巧妙化解的循环引用的问题。
*/

function copyPlus(target, map=new WeakMap()) {
  if(typeof target === 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {};
    if(map.get(target)) {
      return target
    }
    map.set(target, cloneTarget);
    for(const k in target) {
      cloneTarget[k] = copyPlus(target[k], map);
    }
    return cloneTarget
  } else {
    return target
  }
}

console.time();
let c1 = copyPlus(target);
console.timeEnd();

