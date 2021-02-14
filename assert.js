
/**
 * Assert callback and throws error if not 'true'
 * @param {*} fn 
 * @param {*} message 
 */
function assert(fn, message) {
  var result = false;

  if(typeof(fn) === 'boolean') {
    result = fn;
  }
  else if(typeof(fn) === 'function') {
    let funResult = fn();
    if(funResult === true)
      result = true;
  }

  !result ? console.error('[Assertion failed] ', message) : null;
}

export { assert };