const fn = (n) => {
  let res = [];
  res[0] = 1;
  res[1] = 1;
  for(let i = 2; i < n; i++) {
    res[i] = res[i-1] + res[i-2];
  }
  console.log(res[n-1]);
  return res[n-1]
}

fn(7)
