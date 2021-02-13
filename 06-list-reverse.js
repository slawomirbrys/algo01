
import { Node, returnArray } from './list.js';

const createNode = () => {
  let node = new Node(Math.round(Math.random() * 100), null);
  return node;
}

const reverse = (head) => {
  if(head === null) return null;
  
  let previous = null;
  let current = head;
  let next = current.next;
  while(current !== null) {
    current.next = previous;
    
    head = current;
    previous = current;
    current = next;
    next = current !== null ? current.next : null;
  }

  return head;
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
head = reverse(head);
array = returnArray(head);
console.log(array);