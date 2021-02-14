
import { triggerAsyncId } from 'async_hooks';
import { log } from './helpers.js';

function canConstruct(word, dict, memo = {}) {
  if(word in memo) return memo[word];
  if(word === null) return true;
  if(word === '') return true;

  let result = false;
  for (let d of dict) {
    if (word.indexOf(d) === 0) {
      let newWord = word.slice(d.length);
      let partResult = canConstruct(newWord, dict, memo);
      if (partResult === true) {
        result = true;
        break;
      }
    }
  }

  memo[word] = result;
  return result;
}


log(canConstruct('skateboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'boar']));
log(canConstruct('skateboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'board']));
log(canConstruct('skateboard', ['d', 'rd', 'ate', 't', 'ska', 'sk', 'boar']));
log(canConstruct('skateboard', ['d', 'rd', 'ate', 't', 'ska', 'sk', 'boar']));
log(canConstruct('', ['e', 'rd', 'ate', 't', 'ska', 'sk', 'boar']));
log(canConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd']));
log(canConstruct('aaaaaaaaaaaaaaaaaaaaaaaab', ['a', 'a', 'aa', 'aaa', 'aaaa', 'aaaaa']));
