function insertSort(arr) {
  let a = [...arr];
  for(let i = 0; i < a.length; i++) {
    let temp = a[i];
    let j = i -1;
    while(j >= 0 && a[j] > temp) {
      a[j+1] = a[j];
      j--;
    }
    a[j+1] = temp
  }
  return a;
}


function binaryInsertSort(arr) {
  if(!Array.isArray(arr)) {
    return arr;
  }
  for(let i = 0; i < arr.length; i++) {
    let temp = arr[i];
    let left = 0, right = i - 1;
    while(left <= right) {
      let middle = parseInt((left + right) / 2);
      if (temp < arr[middle]) {
        right = middle - 1;
      } else {
        left = middle + 1;
      }
    }
    for (var j = i - 1; j >= left; j--) {
      arr[j + 1] = arr[j];
    }
    arr[left] = temp;
  }
  console.log(arr);
}

const arr = [16,23,13,9,14]
const longArr = [3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
// const a  = insertSort(arr);
binaryInsertSort(longArr);

