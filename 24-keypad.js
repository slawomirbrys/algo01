
import { log } from './helpers.js';
import { TrieNode } from './trie.js';

/**
 * You have given keypad.
 * For given phone number return possible phone-words.
 * Example:
 *   Input: '1-123-43556'
 *   Output: ['1-123-hello']
 * 
 * +-----+-----+-----+
 * |  1  |  2  |  3  |
 * |     | ABC | DEF |
 * +-----+-----+-----+
 * |  4  |  5  |  6  |
 * | GHI | JKL | MNO |
 * +-----+-----+-----+
 * |  7  |  8  |  9  |
 * | PQRS| TUV | WXYZ|
 * +-----+-----+-----+
 * |  *  |  0  |  #  |
 * |     |     |     |
 * +-----+-----+-----+
 */

let charMap = new Map();
charMap.set('2', ['a', 'b', 'c']);
charMap.set('3', ['d', 'e', 'f']);
charMap.set('4', ['g', 'h', 'i']);
charMap.set('5', ['j', 'k', 'l']);
charMap.set('6', ['m', 'n', 'o']);
charMap.set('7', ['p', 'q', 'r', 's']);
charMap.set('8', ['t', 'u', 'v']);
charMap.set('9', ['w', 'x', 'y', 'z']);

let dictionary = ['hello', 'hi', 'world', 'worm', 'work'];
function buildTrie() {
  let root = new TrieNode(false);
  
  dictionary.forEach(word => {
    let currentNode = root;

    for(let i=0; i<word.length; i++) {
      let chr = word[i];
      if(currentNode.children.has(chr) === true) {
        currentNode = currentNode.children.get(chr);
      }
      else {
        currentNode = currentNode.addChar(chr, i === word.length - 1);
      }
    }
  })

  return root;
}

let trie = buildTrie();
log(trie);


function returnWords(word, index, node) {
  let words = [];

  if(node.endOfWord === true) {
    words.push(word);
    node = trie;
  }

  if(index > word.length) 
    return words;

  let possibleChars = charMap.get(word[index]);
  if(possibleChars === null || possibleChars === undefined) {
    return words;
  }

  // For current letter based on index, check possible words in trie nodes
  for(let i=0; i<possibleChars.length; i++) {
    let tmp = word.split('');
    tmp[index] = possibleChars[i];
    let newWord = tmp.join('');
    let childNode = node.children.get(possibleChars[i]);
    if (childNode !== undefined) {
      newWord = returnWords(newWord, index + 1, childNode);
      newWord.forEach(w => words.push(w));
    }
  }
  return words;
}

/**
 * Function takes phone number and returns possible phone-words numbers
 * @param {string} phoneNumber 
 * @returns {Array} Array of phone-words numbers.
 */
function main(phoneNumber) {
  if(phoneNumber === null)
    return [];
  
  let results = [];
  for(let i=0; i<phoneNumber.length - 1; i++) {
    let words = returnWords(phoneNumber.slice(i), 0, trie);
    words.forEach(word => results.push(phoneNumber.slice(0, i) + word));
  }

  return results;
}




log(() => main(null));
log(() => main(''));
log(() => main('abc'));
log(() => main('0000'));
log(() => main('13566'));
log(() => main('43556')); // hello
log(() => main('443556')); // hi, hello
log(() => main('96753')); // work, world
log(() => main('9676')); // worm
log(() => main('96762')); // worm
log(() => main('4355696753')); // hello, hellowork, hwlloworld, world
log(() => main('435561967539')); // hello, work, world
log(() => main('435569676')); // hello, helloworm, worm
log(() => main('1-234-96753')); // work, world
log(() => main('1-234-96753')); // work, world
log(() => main('1-244-96753')); // hi, work, world
