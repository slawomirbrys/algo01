
import { log } from './helpers.js';

function merge_sort(array) {
  if (array == null) return array;
  if (array.length <= 1) return array;

  let p = Math.round(array.length / 2) - 1;
  let lArray = merge_sort(array.slice(0, p + 1));
  let rArray = merge_sort(array.slice(p + 1, array.length));
  let result = merge(lArray, rArray);
  return result;
}

function merge(lArray, rArray){
  let result = [];
  while (lArray.length > 0 && rArray.length > 0) {
    if (lArray[0] < rArray[0]) {
      result.push(lArray.shift());
    }
    else {
      result.push(rArray.shift());
    }
  }

  while(lArray.length > 0) {
    result.push(lArray.shift());
  }

  while(rArray.length > 0) {
    result.push(rArray.shift());
  }

  return result;
}

log(merge_sort(null));
log(merge_sort([]));
log(merge_sort([0]));
log(merge_sort([8, 4, 9, 2, 7, 3, 1]));
log(merge_sort([23, 42, 324, 328, 49, 9, 3484, 324, 23, 402, 40, 32, 40, 932, 9, 420, 934, 32]));
