const isValid = (str) => {
  if(!str || str.length < 1) return true;
  let n = str.length;
  const stack = [];
  let i;
  for(i = 0;  i < str.length; i++) {
    let s = str[i];
    console.log('s:',s)
    if(s === '(') {
      stack.push(s)
    } else if(s === ')') {
      const prev = stack.shift();
      console.log('prev:',prev)
      if(prev !=='(') {
        break
      }
    }
  }
  console.log(i)
  if(i === n && stack.length === 0) {
    return true
  }
  return false
}

console.log(isValid('(())'))
