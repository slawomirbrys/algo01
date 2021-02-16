
import { log } from './helpers.js';

function insert_sort(array) {
  if (array == null) return array;
  if (array.length <= 1) return array;

  for (let i = 1; i <= array.length - 1; i++) {
    let j = i;
    while (array[j] < array[j - 1]) {
      let temp = array[j - 1];
      array[j - 1] = array[j];
      array[j] = temp;
      if (j >= 2) {
        j--;
      }
      else {
        break;
      }
    }
  }

  return array;
}

log(insert_sort(null));
log(insert_sort([]));
log(insert_sort([0]));
log(insert_sort([8, 4, 9, 2, 3, 7, 1]));
log(insert_sort([23, 42, 324, 328, 49, 9, 3484, 324, 23, 402, 40, 32, 40, 932, 9, 420, 934, 32]));
