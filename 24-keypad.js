
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
/**
 * Build trie based on dictionary
 * @returns {TrieNode} Root of trie
 */
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



/**
 * Function that returns possible array of words
 * that starts from index for particular node from trie.
 * 
 * First recursive execution starts from unchanged word,
 * index = 0, and node that is a root of trie.
 * 
 * @param {string} word Word to be analyzed 
 * @param {*} index Index from which analysis should start
 * @param {*} node Current node from trie 
 */
function returnWords(word, index, node) {
  let words = [];

  // If we got a word in a trie, add it to the return array,
  // but keep trying to find other words, that's why current
  // node is reseted to the root.
  if(node.endOfWord === true) {
    words.push(word);
    node = trie;
  }

  // Let's get possible chars that we can get from the digit
  // from the current index of the possible phone-word.
  // If that char is different than 1-9 then we just return
  // what we have and start over.
  let possibleChars = charMap.get(word[index]);
  if(possibleChars === null || possibleChars === undefined) {
    return words;
  }

  // Let's replace char from designated index on the 
  // given phone-word, and check if any words could be
  // constructed.
  // From first recurence the phone-word will have all digits,
  // but next executions will replace following digits with
  // possible chars, i.e.:
  //   1st execution -> 43556
  //   2nd execution -> h3556
  //   3rd execution -> he556
  //   4th execution -> hel56
  //   5th execution -> hell6
  //   6th execution -> hello (word returned)
  for(let i=0; i<possibleChars.length; i++) {

    // Replace char based on index with the possible one, and
    // construct word char by char as described above.
    let tmp = word.split('');
    tmp[index] = possibleChars[i];
    let newWord = tmp.join('');

    // For given node from trie check children nodes if
    // contain given char, if yes, then child node is 
    // returned and recursively try to find words with
    // next char. All results add to array and return.
    let childNode = node.children.get(possibleChars[i]);
    if (childNode !== undefined) {
      newWord = returnWords(newWord, index + 1, childNode);
      newWord.forEach(w => words.push(w));
    }
  }

  // Return all words that has been found, if not, then
  // empty array is returned.
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
log(() => main('4355'));
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
