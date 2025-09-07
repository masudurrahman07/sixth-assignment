1) What is the difference between var, let, and const? 
Ans. Here's the difference between var, let and const. For Var , it's an old way to declare variables and has function scope.This means a variable which was declared with var is accessible anywhere inside the function it was declared in, or globally if declared outside any function. it also can be redeclared. And for Let, it's a modern way and block-scoped. so it means a variable declared with let is only accessible inside the block. and also it cannot be redeclared. And as for Const, it's block-scoped, cannot be updated or redeclared. And should be used for values that shouldn’t change.


2) What is the difference between map(), forEach(), and filter()?
Ans. The difference between them is , forEach() will Loop over an array and it will run a function for each item. And it does not return a new array. It's like saying  "Do this for every item.". And for map() , Its purpose is  to create a new array by transforming each element of an existing array. The new array will have the same length as the original array. and it returns a new array with the results. Lastly filter(), what it does is it loops over an array and returns a new array with only the items that pass a condition.This new array might be shorter than the original.


3) What are arrow functions in ES6?
Ans. Arrow functions are a shorter way to write functions in JavaScript.it was introduced in ES6 (ECMAScript 2015).it uses => instead of the function keyword. It has many benefits such as, using it will make one's code shorter and cleaner. And it's easy to read. And there will be fewer bugs in code.

4) How does destructuring assignment work in ES6?
Ans. Destructuring assignment is a very useful feature in ES6. it lets us unpack values from arrays or objects into separate variables. We can think of it like pulling specific items out of a box and giving them their own labels.

5) Explain template literals in ES6. How are they different from string concatenation?
Ans. Template literals are a modern way to create strings in JavaScript.it lets us create strings easily using backticks ` instead of quotes. We can embed variables or expressions directly using ${…}. Since using + for Concatenation can quickly make the code look messy and hard to read. But Template literals makes the code much cleaner and easier to understand.