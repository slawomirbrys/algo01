
export class Node {
  value = null;
  next = null;

  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

export const returnArray = (head) => {
  if(head === null) return [];
  let result = returnArray(head.next);
  return [...result, head.value];
}