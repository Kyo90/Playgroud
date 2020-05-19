function longestCommonPrefix(arr) {
  if (arr === null || arr.length === 0) return "";
  if( arr.length === 1) return arr[0] 
  let commonPrefix = arr[0];
  for(let i = 1; i < arr.length; i++) {
    let current = arr[i];
    let j = 0;
    while( j < current.length) {
      if(commonPrefix[j] === current[j]) {
        j++
      } else {
        break
      }
    }
    commonPrefix = commonPrefix.slice(0, j);
    console.log(commonPrefix);
  }
  return commonPrefix;
  //console.log(commonPrefix)
}

var longestCommonPrefix1 = function(strs) {
  if (strs === null || strs.length === 0) return "";
  if(strs.length === 1) return strs[0]
  let min = 0, max = 0
  for(let i = 1; i < strs.length; i++) {
      if(strs[min] > strs[i]) min = i
      if(strs[max] < strs[i]) max = i
  }
  console.log(min, max);
  for(let j = 0; j < strs[min].length; j++) {
      if(strs[min].charAt(j) !== strs[max].charAt(j)) {
          return strs[min].substring(0, j)
      }
  }
  return strs[min]
};



const strs = ['flowers', 'flow', 'flight'];
const res = longestCommonPrefix1(strs);
console.log(res)
