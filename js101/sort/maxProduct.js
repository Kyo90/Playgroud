var maxProduct = function(nums) {
  if(!Array.isArray(nums)) return nums;
  
  // 错解思路：忽略了负负为正的情况
  // const dp = [];
  // dp[0] = nums[0];
  // for(let i = 1; i < nums.length; i++) {
  //   dp[i] = Math.max(dp[i-1] * nums[i], nums[i])
  //   result = Math.max(result, dp[i]);
  // }
  // console.log(result)
  // return result
  let max = nums[0];
  let iMin = nums[0];
  let iMax = nums[0];
  for(let i = 1; i < nums.length; i++) {
    if(nums[i]  < 0) {
      [iMin, iMax] = [iMax, iMin]
    }
    iMin = Math.min(iMin * nums[i], nums[i]);
    iMax = Math.max(iMax * nums[i], nums[i]);
    max = Math.max(iMax, max)
  }
  console.log(max)
 };

 maxProduct([-2, 3, -4])
