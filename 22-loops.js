
import { log } from './helpers.js';
let maxSize = 4e3 * 4e3;

function initializeArray(size) {
  let array = new Array(size * size);
  return array;
}

function initializeArray2(size) {
  let arrays = [];
  let numArrays = 1;
  let finalSize = size * size;
  if (finalSize > maxSize) {
    numArrays = Math.floor(finalSize / maxSize) + 1;
  }
  for (let i = 0; i < numArrays; i++) {
    arrays[i] = new Array(Math.min(finalSize, maxSize));
  }
  return arrays;
}

function loop1(array, size) {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let index = (i * size) + j;
      array[index] = 1;
    }
  }
  return `Loop by i with size of ${size}`;
}

function loop2(array, size) {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let index = (j * size) + i;
      array[index] = 1;
    }
  }
  return `Loop by j with size of ${size}`;
}

function loop1prim(arrays, size) {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let index = (i * size) + j;
      let arrayIndex = Math.floor(index / maxSize);
      index = index % maxSize;
      arrays[arrayIndex][index] = 1;
    }
  }
  return `Loop by i with multiple arrays size of ${size}`;
}

function loop2prim(arrays, size) {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let index = (j * size) + i;
      let arrayIndex = Math.floor(index / maxSize);
      index = index % maxSize;
      arrays[arrayIndex][index] = 1;
    }
  }
  return `Loop by j with multiple arrays size of ${size}`;
}


for (let size = 1000; size <= 10000; size += 1000) {
  let array = log(() => initializeArray(size));
  let array2 = log(() => initializeArray2(size));
  log(() => loop1(array, size));
  log(() => loop1(array, size));
  log(() => loop1(array, size));
  log(() => loop2(array, size));
  log(() => loop2(array, size));
  log(() => loop2(array, size));
  log(() => loop1prim(array2, size));
  log(() => loop1prim(array2, size));
  log(() => loop1prim(array2, size));
  log(() => loop2prim(array2, size));
  log(() => loop2prim(array2, size));
  log(() => loop2prim(array2, size));
}
