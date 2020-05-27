/**
 * @param {string} s
 * @return {boolean}
 */

function palindrome(s, i, j) {
  for (; i < j && s[i] === s[j]; i++, j--);
  return i >= j;
}

var validPalindrome = function (s) {
 let i = 0, j = s.length - 1;
  while (i < j) {
    if (s[i] === s[j]) {
      i++;
      j--;
    } else {
      let flag1 = true,
        flag2 = true;
      for (let low = i + 1, high = j; low < high; low++, high--) {
        if (s[low] !== s[high]) {
          flag1 = false;
          break;
        }
      }
      for (let low = i, high = j - 1; low < high; low++, high--) {
        if (s[low] !== s[high]) {
          flag1 = false;
          break;
        }
      }
      return flag1 || flag2;
    }
  }
  return true;
};

var validPalindrome1 = function (s) {
  let i = 0, j = s.length - 1;
  for ( ; i < j && s[i] == s[j]; i++, j--);
  return palindrome(s, i+1, j) || palindrome(s,i, j-1)   
};
var s1 = "aguokepatgbnvfqmgmlcupuufxoohdfpgjdmysgvhmvffcnqxjjxqncffvmhvgsymdjgpfdhooxfuupuculmgmqfvnbgtapekouga"
var s =                     "upuufxoohdfpgjdmysgvhmvffcnqxjjxqncffvmhvgsymdjgpfdhooxfuupucu"
const res = validPalindrome1('abca');
console.log(res);
