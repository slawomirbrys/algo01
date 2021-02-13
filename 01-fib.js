
const fib = (n) => {
  if(n === 0) return 0;
  if(n === 1) return 1;
  if(n === 2) return 1;
  
  let result = fib(n-1) + fib(n-2);

  return result;
}


console.log(fib(0));
console.log(fib(1));
console.log(fib(2));
console.log(fib(3));
console.log(fib(4));
console.log(fib(5));
console.log(fib(6));
console.log(fib(7));
console.log(fib(8));
console.log(fib(10));
console.log(fib(20));
console.log(fib(30));
console.log(fib(40));

