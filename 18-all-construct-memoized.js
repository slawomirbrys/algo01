
import { log } from './helpers.js';

function allConstruct(word, dict, memo = {}) {
  if(word in memo) return memo[word];
  if(word === null) return ;
  if(word === '') return 1;

  let result = 0;
  for (let d of dict) {
    if (word.indexOf(d) === 0) {
      let newWord = word.slice(d.length);
      result += allConstruct(newWord, dict, memo);
    }
  }

  memo[word] = result;
  return result;
}


log(allConstruct('skateboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'boar']));
log(allConstruct('skateboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'board']));
log(allConstruct('skateboard', ['d', 'rd', 'ate', 't', 'ska', 'sk', 'boar']));
log(allConstruct('skateboard', ['d', 'rd', 'ate', 't', 'ska', 'sk', 'boar']));
log(allConstruct('', ['e', 'rd', 'ate', 't', 'ska', 'sk', 'boar']));
log(allConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd']));
log(allConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd', 'ef']));
log(allConstruct('aaaaaab', ['ab', 'a', 'aa', 'aaa', 'aaaa', 'aaaaa']));
