const animals = ["🐷", ["🐶", "🐂"], ["🐎", ["🐑", ["🐲"]], "🐛"]];

function flat(arr) {
  return arr.reduce((prev, current) => {
    return prev.concat(Array.isArray(current)? flat(current): current)
  }, [])
}


function flat1(arr) {
  while(arr.some(Array.isArray)) {
    arr = [].concat(...arr);
  }
  console.log(arr)
}


function flat2(arr) {
  let str = JSON.stringify(arr);
  str = str.replace(/(\[|\])/g,'');
  str = '[' + str  + ']';
  const ary = JSON.parse(str);
  console.log(ary);
  return ary;
}

const newArray = flat2(animals);
console.log(newArray);

let a = [1, 2, 3, 4, [1, 2, 3, [1, 2, 3, [1, 2, 3]]], 5, "string", { name: "弹铁蛋同学" }];
