
import { log } from './helpers.js';

function countConstruct(word, dict, memo = {}) {
  if(word in memo) return memo[word];
  if(word === null) return 0;
  if(word === '') return 1;

  let result = 0;
  for (let d of dict) {
    if (word.indexOf(d) === 0) {
      let newWord = word.slice(d.length);
      result += countConstruct(newWord, dict, memo);
    }
  }

  memo[word] = result;
  return result;
}


log(countConstruct('skateboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'boar']));
log(countConstruct('skateboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'board']));
log(countConstruct('skateboard', ['d', 'rd', 'ate', 't', 'ska', 'sk', 'boar']));
log(countConstruct('skateboard', ['d', 'rd', 'ate', 't', 'ska', 'sk', 'boar']));
log(countConstruct('', ['e', 'rd', 'ate', 't', 'ska', 'sk', 'boar']));
log(countConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd']));
log(countConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd', 'ef']));
log(countConstruct('aaaaaaaaaaaaaaaaaaaaaaaab', ['ab', 'a', 'aa', 'aaa', 'aaaa', 'aaaaa']));
