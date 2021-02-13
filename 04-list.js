
class Node {
  value = null;
  next = null;

  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

const createNode = () => {
  let node = new Node(Math.round(Math.random() * 100), null);
  return node;
}

const showList = (head) => {
  if(head === null) return;
  console.log(head.value);
  showList(head.next);
}

let head = createNode();
let previous = head;
for(let i=0; i<10; i++) {
  let current = createNode();
  previous.next = current;
  previous = current;
}

showList(head);