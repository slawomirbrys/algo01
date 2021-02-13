import util from 'util';

function getValue() {
  return Math.round(Math.random() * 100);
}

function shouldDo(p) {
  return Math.random() <= p;
}

function log(object) {
  //console.log(JSON.stringify(object, null, 2));
  console.log(util.inspect(object, true, 100, true));
}

export { getValue, shouldDo, log }