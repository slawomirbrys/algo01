
const fib = (n) => {
  let arr = new Array(8);
  arr.fill(0);
  let result = 0;
  
  arr[0] = 1;
  arr[1] = 1;

  for(let i=2; i<n; i++) {
    arr[i] = arr[i-2] + arr[i-1];
  }

  return arr[n-1];
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

