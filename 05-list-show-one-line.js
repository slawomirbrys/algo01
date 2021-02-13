import { Node, returnArray } from './list.js';

const createNode = () => {
  let node = new Node(Math.round(Math.random() * 100), null);
  return node;
}

let head = createNode();
let previous = head;
for(let i=0; i<10; i++) {
  let current = createNode();
  previous.next = current;
  previous = current;
}

let array = returnArray(head);
console.log(array);