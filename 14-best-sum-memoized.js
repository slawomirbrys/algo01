
import { log } from './helpers.js';

/**
 * Given array of numbers of N, return shortes
 * array of numbers that gives sum of given SUM.
 */

function bestSum(sum, array, memo = {}) {
  if(sum in memo) return memo[sum];
  if(sum === 0) return [];
  if(sum <= 0) return null;
  if(array === null) return null;

  let result = null;
  let bestResult = null;
  for(let i=0; i<array.length; i++) {
    result = bestSum(sum - array[i], array, memo);
    result = result !== null ? [...result, array[i]] : null;
    if(result !== null)
      if(bestResult === null) {
        bestResult = result;
      }
      else if(result.length < bestResult.length) {
        bestResult = result;
      }
  }

  memo[sum] = bestResult;
  return bestResult;
}


log(() => bestSum(0, null));
log(() => bestSum(0, []));
log(() => bestSum(0, [1,2,3]));
log(() => bestSum(7, null));
log(() => bestSum(7, []));
log(() => bestSum(7, [1]));
log(() => bestSum(7, [7]));
log(() => bestSum(7, [1, 3, 4, 5]));
log(() => bestSum(7, [5, 3, 4, 7, 9]));
log(() => bestSum(7, [4, 10]));
log(() => bestSum(100, [1, 2, 5, 25]));
log(() => bestSum(300, [7, 14]));
