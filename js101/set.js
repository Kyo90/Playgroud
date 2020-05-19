let set = new Set(["hdcms","houdunren"]);
console.log(set.values())

let a = new Set([1,2,3,4,5]);
let b = new Set([4,5,2,9])

// 并集
console.log(new Set([...a,...b]))

//差集
console.log(
  new Set(
    [...a].filter(item => !b.has(item))
  )
)

// 交集
console.log(
  new Set(
    [...a].filter(item => b.has(item))
  )
)


var set1 = new Set();  
set1.add("a").add("b").add("d").add("c");  
var map1 = new Map();  
map1.set("a",1).set("b",2).set(999,3);  
// for (let v of set1) {  
//     console.log(v);  
// }  
// console.log("--------------------");  
// for(let [k,v] of map1) {  
//     console.log(k,v);  
// }

let user1 = {
  name:'李四',
  key: Symbol()
}

let pl = {
  key: Symbol(),
  name:'summer',
  goods: [1,2,3,4],
  products: set1,
  office: map1
}

function copy(obj) {
  let res = obj instanceof Array ? []: {}
  for(const [k,v] of Object.entries(obj)) {
    res[k] = typeof v === 'object' ? copy(v) : v;
  }
  return res;
}

let blue = copy(pl)
let red = Object.assign({}, pl)
