function quickSort(arr, left, right) {
  //print(arr)          //这个left和right代表分区后“新数组”的区间下标，因为这里没有新开数组，所以需要left/right来确认新数组的位置
  if (left < right) {
      let pos = left - 1                      //pos即“被置换的位置”，第一趟为-1
      for(let i = left; i <= right; i++) {    //循环遍历数组，置换元素
          let pivot = arr[right]              //选取数组最后一位作为基准数，
          if(arr[i] <= pivot) {               //若小于等于基准数，pos++，并置换元素, 这里使用小于等于而不是小于, 其实是为了避免因为重复数据而进入死循环
              pos++;
              //交换两个元素的位置
              [arr[pos], arr[i]] = [arr[i], arr[pos]];
          }
      }
      //一趟排序完成后，pos位置即基准数的位置，以pos的位置分割数组
      console.log(pos)
      quickSort(arr, left, pos - 1)        
      quickSort(arr, pos + 1, right)
  }
  return arr;
}
function print(arr = []) {
  console.log(arr.join(','))
}

function print1(arr = [], start, end) {
  if(start < end) {
    const a = arr.slice(start, end);
    console.log(a.join(',')) 
  }
}
var arr = [2, 5, 3, 1, 10, 4]
var start = 0;
var end = arr.length - 1;
//quickSort(arr, start, end)

var arr1 = [1,1,1,1,1,1];
var arr2 = [3,44,38,5,47,15,36,26,27,2,46,4,19,50,48]
// quickSort(arr2, start, end)


function quickSort1(arr, left, right) {
  if(left < right) {
    print1(arr, left, right+1);
    let pos = left - 1;
    const povit = arr[right];
    for(let i = left; i <= right; i++) {
      if(arr[i] <= povit) {
        ++pos;
        [arr[pos], arr[i]] = [arr[i], arr[pos]]
      }
    }
    quickSort1(arr, left, pos-1);
    quickSort1(arr, pos+1, right)
  }
  // console.log(arr)
  return arr;
}


function mergeSort(arr) {
  if(Array.isArray(arr) && arr.length <= 1) return arr;
  const mid = arr.length / 2 | 0;
  const leftArr = arr.slice(0, mid);
  const rightArr = arr.slice(mid, arr.length);
  console.log(leftArr, rightArr);
  return merge(mergeSort(leftArr), mergeSort(rightArr))
}


function merge(left, right) {
  console.log(left, right);
  const result = [];
  while(left.length  && right.length) {
    if(left[0] <= right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }
  if(left.length > 0) {
    result.concat(left)
  } else if(right.length > 0) {
    result.concat(right)
  }
}

mergeSort(arr2)
