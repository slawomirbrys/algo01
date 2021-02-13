import util from 'util';

function getValue() {
  return Math.round(Math.random() * 100);
}

function shouldDo(p) {
  return Math.random() <= p;
}

function log(object) {
  if(typeof(object) === 'function') {
    let start = new Date();
    let result = object();
    let end = new Date();
    console.log(`[${end-start}ms] `, util.inspect(result, true, 100, true));
    return;
  }

  //console.log(JSON.stringify(object, null, 2));
  console.log(util.inspect(object, true, 100, true));
}


export { getValue, shouldDo, log }