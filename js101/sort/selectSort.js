function selectSort(arr){
  if(!arr || arr.length === 1){
    return arr;
  }
  const len = arr.length;
  for(let i=0; i<len; i++){
    let minIndex = i;
    for(let j=i; j<len; j++){
      //找出最小元素的下标
      if(arr[j] < arr[minIndex]){
        minIndex = j;
      }
    }
    //交换两个元素的位置
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    console.log(i, arr.join(','))
  }
  
  return arr;
}
