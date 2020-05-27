let scroes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let scroes1 = [1, 2, 3, 3];
let position = [3, 1];

function rankN(scroeArr, posArr) {
  let arr = new Array(11).fill(0);
  for(let i = 0; i < scroeArr.length; i++) {
    arr[scroeArr[i]]++;
  }
  for(let i = 1; i < scroes.length+1; i++) {
    arr[i] = arr[i] + arr[i-1];
  }
  console.log(arr);
  for(let i = 0; i < posArr.length; i++) {
    const score = scroeArr[posArr[i]-1];
    const sum = arr[score];
    console.log(sum / scroeArr.length * 100)
  }
}

rankN(scroes1, position)
