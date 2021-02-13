
import { TreeNode } from './tree-binary.js';
import { getValue } from './helpers.js';

let maxHeight = 5;

const createTreeNode = (height) => {
  if(height < 0) return null;

  let node = new TreeNode();
  node.value = getValue();
  node.height = height;
  node.left = createTreeNode(height - 1);
  node.right = createTreeNode(height - 1);

  return node;
}

// console.log(shouldDo(0.75));
let head = createTreeNode(maxHeight);
console.log(head);
