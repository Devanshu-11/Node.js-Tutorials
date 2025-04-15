const calc=require('./Text/test-module-1');
const { add, multiply } = require("./Text/test-module-2");

// creating the instance
const calculator=new calc();
console.log(calculator.add(2, 5));

console.log(add(3,5));
console.log(multiply(2, 5));

// caching and here Top level code will be running only one time due to caching as in this, it loads only one time, then executes the code and cache the result in memory
require("./Text/test-module-3")();
require("./Text/test-module-3")();
require("./Text/test-module-3")();