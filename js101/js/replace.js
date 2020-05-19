var s1 = "get-element-by-id";

function convertName(s) {
  return s.replace(/-\w/g, function (x) {
    return x.slice(1).toUpperCase();
  });
}
const newName = convertName(s1);
console.log(newName);

function findMax() {
  let str = "abcabcabcbbccccc";
  let num = 0;
  let char = "";

  // 使其按照一定的次序排列
  str = str.split("").sort().join("");
  // "aaabbbbbcccccccc"

  // 定义正则表达式
  let re = /(\w)\1+/g;
  str.replace(re, ($0, $1) => {
    if (num < $0.length) {
      num = $0.length;
      char = $1;
    }
  });
  console.log(`字符最多的是${char}，出现了${num}次`);
}

function isContain(a, b) {
  for (let i in b) {
    if (a[0] === b[i]) {
      let tmp = true;
      for (let j in a) {
        if (a[j] !== b[~~i + ~~j]) {
          tmp = false;
        }
      }
      if (tmp) {
        return i;
      }
    }
  }
  return -1;
}

let a1='34', b1='1234567'; // 返回 2
let a2='35', b2='1234567'; // 返回 -1
let a3='355', b3='12354355'; // 返回 5
isContain(a,b);


function parseToMoney(num) {
  num = parseFloat(num.toFixed(3));
  let [integer, decimal] = String.prototype.split.call(num, '.');
  integer = integer.replace(/\d(?=(\d{3})+$)/g, '$&,');
  return integer + '.' + (decimal ? decimal : '');
}
parseToMoney(1234.56); // return '1,234.56'
parseToMoney(123456789); // return '123,456,789'
parseToMoney(1087654.321); // return '1,087,654.321'


