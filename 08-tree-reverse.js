
import { TreeNode, createTreeNode } from './tree-binary.js';
import { log } from './helpers.js';

function reverse(node) {
  if(node === null) return;

  let left = node.left;
  let right = node.right;

  reverse(left);
  reverse(right);

  node.left = right;
  node.right = left;
}


log('tree');
let head = createTreeNode(3);
console.log(head);

log('reversed tree');
reverse(head);
log(head);