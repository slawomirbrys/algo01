
import { TrieNode } from './trie.js';
import { assert } from './assert.js';

let node = new TrieNode();
assert(node.endOfWord === false, `End of word should be false, but it was '${node.endOfWord}'`);
assert(node.children !== null, `Node children should be set up`);
assert(node.children.size === 0, `Node children should be size of 0`);

let c1Node = node.addChar('a');
assert(node.children.size === 1, `Head node should have 1 children`);
assert(node.children.get('a') !== null, `Head node should have a children node with 'a' letter`);
assert(node.children.get('a') === c1Node, `Head node should have a children node with 'a' letter that is equal to newly returned node`)
assert(c1Node.endOfWord === false, `End of word should be false`);

