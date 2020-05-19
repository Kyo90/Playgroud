function binarySearch(arr, target) {
  if(!Array.isArray(arr) || arr.length === 0) {
    return -1;
  }
  let left = 0; right = arr.length - 1;
  while(left <= right) {
    let mid = left + (right - left) / 2 | 0;
    if(arr[mid] === target) {
      return mid;
    } else if(arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1
}

const nums = [-1,0,3,5,9,12], target = 9;

const find = binarySearch(nums, 2)
console.log(find);
