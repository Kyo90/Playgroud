function enumNumber() {
  let x, y, z;
  for (x = 0; x <= 25; x++) {
    y = 100 - 4 * x;
    if (y % 7 === 0 && y > 0) {
      y = y / 7;
      z = 100 - x - y;
      if (z % 3 === 0 && 3 * x + 5 * y + z / 3 === 100) {
        console.log(x, y, z)
      }
    }
  }
}


/**
 * Created by sky0014 on 14-8-11.
 */

var V = [1, 5, 10, 25, 50];
function rec_money_change(a, n) {
    if (a == 0)
        return 1;
    if (a < 0 || n == 0)
        return 0;
    return rec_money_change(a, n - 1) + rec_money_change(a - V[n - 1], n);
}



function dp_money_change(a,n) {
  var L = Array.from({length:a+1},(_,i) => {
    if(i === 0) {
      return Array.from({length:n+1},(_,i) => {
        if(i===0) return 0;
        return V[i-1];
      }); 
    }
    return Array.from({length:n+1}, () => i);
  });
  
 
  const getOpt = (i, j) => {
    if(i === 0) return 1;
    if(j === 0) return 0;
    if(i < 0) return 0;
    return L[i][j]
  }

  for(let i = 1; i <= a; i++) {
    for(let j = 1; j <= n; j++) {
      L[i][j] = getOpt(i,j-1)+ getOpt(i-V[j-1], j)
    }
  }
  console.log(L)
  return L[a][n];
}

//console.time("ticker");
// console.log(dp_money_change(10, 5));
//console.timeEnd("ticker");


var arr = [1,2,4,1,7,8,3];
function rec_opt(arr, i) {
  if(i === 0) {
    return arr[0];
  } else if (i === 1) {
    return Math.max(arr[0], arr[1])
  } else {
    const A = rec_opt(arr, i-2) + arr[i];
    const B = rec_opt(arr, i-1)
    return Math.max(A, B)
  }
}

function dp_opt(arr) {
  const result = Array.from(arr.length, () => 0);
  result[0] = arr[0];
  result[1] = Math.max(arr[1], arr[0]);
  for(let i = 2; i<arr.length; i++) {
    const A = result[i-2] + arr[i];
    const B = result[i-1];
    result[i] = Math.max(A, B)
  }
  return result[result.length-1]
}



function dp_subset(arr, val) {
  const subset = Array.from({length: arr.length},(_, index) => {
    if(index === 0) {
      return Array.from({length:val+1}, (__, j) => {
        if(arr[0] === j) {
          return true
        }
        return false; 
      })
    } else {
      return Array.from({length: val+1}, (__, j) => {
        if(j === 0) return true;
        return false
      })
    }
  })
  for(let i = 1; i < arr.length; i++) {
    for(let s = 1; s <= val; s++) {
      if(arr[i] > s) {
        subset[i][s] = subset[i-1][s];
      } else {
        const A = subset[i-1][s-arr[i]];
        const B = subset[i-1][s];
        subset[i][s] = A || B
      }
    }
  }
  console.log(subset[arr.length-1][val])
}
const V1=[3,34,4,12,5,2]
dp_subset(V1,9)




