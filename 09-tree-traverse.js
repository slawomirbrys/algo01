import { TreeNode, createTreeNode } from './tree-binary.js';
import { log } from './helpers.js';

function traverse(node) {
  if(node === null) return;

  console.log(node.value);
  traverse(node.left);
  traverse(node.right);
}

let head = createTreeNode(3);
log('tree');
log(head);

log('traverse');
traverse(head);

