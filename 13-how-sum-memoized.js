
import { log } from './helpers.js';

/**
 * Given array of numbers of N, return first possible
 * array of numbers that gives sum of given SUM.
 * 
 */

function howSum(sum, array, memo = {}) {
  if(sum in memo) return memo[sum];
  if(sum === 0) return [];
  if(sum <= 0) return null;
  if(array === null) return null;

  let result;
  for(let i=0; i<array.length; i++) {
    result = howSum(sum - array[i], array, memo);
    result = result !== null ? [...result, array[i]] : null;
    memo[sum] = result;
    if(result !== null)
      return result;
  }

  return null;
}


log(() => howSum(0, null));
log(() => howSum(0, []));
log(() => howSum(0, [1,2,3]));
log(() => howSum(7, null));
log(() => howSum(7, []));
log(() => howSum(7, [1]));
log(() => howSum(7, [7]));
log(() => howSum(7, [3, 4, 5]));
log(() => howSum(7, [5, 3, 4, 7, 9]));
log(() => howSum(7, [4, 10]));
log(() => howSum(300, [7, 14]));
