const arr = [2,5,3,1, 10, 4];

function bubbleSort(arr) {
  if(!Array.isArray(arr)) {
    return arr
  }
  for(let i = 0; i < arr.length; i++) {
    let flag = true
    for(j=0; j < i; j++) {
      if(arr[i] < arr[j]) {
        flag= false;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    if(flag) break;
  }
  console.log(arr);
  return arr;
}

bubbleSort(arr)
