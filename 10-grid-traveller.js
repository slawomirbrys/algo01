
import { log } from './helpers.js';

/**
 * In the matrix of m*n, how many ways the traveler can go
 * from top-left corner to right-bottom
 */

function numOfWays(m, n, memo = {}) {
  let key = `${m},${n}`;
  if(key in memo) return memo[key];
  if (m == 0 || n == 0) return 0;
  if (m == 1 || n == 1) return 1;

  let sumOfWays = numOfWays(m-1, n, memo) + numOfWays(m, n-1, memo);
  memo[key] = sumOfWays;
  return sumOfWays;
}


log(numOfWays(0,0));
log(numOfWays(0,1));
log(numOfWays(1,0));
log(numOfWays(1,1));
log(numOfWays(1,2));
log(numOfWays(2,1));
log(numOfWays(2,2));
log(numOfWays(2,3));
log(numOfWays(3,2));
log(numOfWays(3,3));
log(numOfWays(3,4));
log(numOfWays(4,4));
log(numOfWays(4,5));
log(numOfWays(5,5));
log(numOfWays(18,18));