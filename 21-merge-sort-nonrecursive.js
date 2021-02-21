
import { log } from './helpers.js';

function merge_sort(array) {
  if (array == null) return array;
  if (array.length <= 1) return array;

  let j = 1;
  let len = array.length;
  let result = array;
  while (j <= len) {
    let i = 0;
    let l = 0;
    let r = 0;
    while (l < len - j) {
      l = i * j;
      r = i * j + j;

      if (array[l] > array[r]) {
        let temp = array[l];
        array[l] = array[r];
        array[r] = temp;
      }


      j = j * 2;
      if (j > len) break;
    }
  }

  return result;
}

log(merge_sort(null));
log(merge_sort([]));
log(merge_sort([0]));
log(merge_sort([8, 4, 9, 2, 7, 3, 1, 9]));
log(merge_sort([8, 4, 9, 2, 7, 3, 1]));
log(merge_sort([23, 42, 324, 328, 49, 9, 3484, 324, 23, 402, 40, 32, 40, 932, 9, 420, 934, 32]));
