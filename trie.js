
class TrieNode {
  children = new Map();
  endOfWord = false;

  /**
   * Creates a new Trie node.
   * @param {boolean} endOfWord Property if node should be marked end of word 
   */
  constructor(endOfWord = false) {
    this.endOfWord = endOfWord;
  }

  /**
   * Adds child node with char
   * @param {char} char Property definies char for child node
   * @param {boolean} Child Property definies if child node should be the end of word
   * @returns {TrieNode} Returns child node
   */
  addChar(char, endOfWord) {
    let childNode = new TrieNode(endOfWord)
    this.children.set(char, childNode);
    return childNode;
  }
}

export { TrieNode }