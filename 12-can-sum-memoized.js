
import { log } from './helpers.js';

/**
 * Given array of numbers of N, return true/false
 * if can have numbers from arrays that sums to the 
 * given one SUM.
 * 
 */

function canSum(sum, array, memo = {}) {
  if(sum in memo) return memo[sum];
  if(sum === 0) return true;
  if(sum <= 0) return false;
  if(array === null) return false;

  let result = false;
  for(let i=0; i<array.length; i++) {
    result = canSum(sum - array[i], array, memo);
    if(result === true)
      return true;
  }

  memo[sum] = result;
  return false;
}


log(() => canSum(0, null));
log(() => canSum(7, null));
log(() => canSum(7, []));
log(() => canSum(7, [1]));
log(() => canSum(7, [7]));
log(() => canSum(7, [3, 4, 5]));
log(() => canSum(7, [5, 3, 4, 7, 9]));
log(() => canSum(7, [4, 10]));
log(() => canSum(300, [7, 14]));
