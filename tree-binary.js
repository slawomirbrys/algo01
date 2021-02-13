import { getValue } from './helpers.js';

class TreeNode {
  value = null;
  height = null;
  left = null;
  right = null;

  constructor(value, height, left, right) {
    this.value = value;
    this.height = height;
    this.left = left;
    this.right = right;
  }
}


/**
 * Creates a binary tree of given height
 * @param {number} height 
 * @returns {TreeNode} Head of tree
 */
function createTreeNode(height) {
  if(height <= 0) return null;

  let node = new TreeNode();
  node.value = getValue();
  node.height = height;
  node.left = createTreeNode(height - 1);
  node.right = createTreeNode(height - 1);

  return node;
}

export { TreeNode, createTreeNode }