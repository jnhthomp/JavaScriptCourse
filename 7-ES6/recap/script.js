/*jshint esversion: 6 */
/******************************************
 *      103. What's New in ES6/ES2015     *
 ******************************************/
/*ES6/ES2015
  Well supported in all modern browsers
  No support in older browsers
  Can use MOST features in production with trnaspiling and polyfilling
    (Converting to ES5)
    Brought a ton of updates and new features
      Variable declarations with let and const
      Blocks and IIFEs
      Strings
      Arrow functions
      Destructuring
      Arrays
      The Spread Operator
      Rest and Default Parameters
      Maps
      Classes and Subclasses
      Promises
      Native modules
*/

/**********************************************************
 *      104. Variable Declarations With let and const     *
 **********************************************************/
/* let and const*/

// // ES5
// var name5 = 'Jane Smith';
// var age5 = 23;
// name5 = 'Jane Miller';
// console.log(name5);
//
//
// // ES5
// // If a variable is declared with const it cannot be changed/resassigned later
// const name6 = 'Jane Smith';
// let age6 = 23;
// // name6 = 'Jane Miller'; // This will not work because name6 is const
// console.log(name6);


// One of the biggest differences is that let and const are only available in the same block
//  This means that variables are more private and less accessible outside of their scope
// ES5 (Driver license function)
// function driversLicense5(passedTest) {
//   if (passedTest) {
//     var firstName = 'John';
//     var yearOfBirth = '1990';
//   }
//   console.log(firstName + ', born in ' + yearOfBirth + ', is now officially allowed to drive a car.');
// }
//
// driversLicense5(true);
// // THE ABOVE WILL WORK IN ES5
//
//
// // ES6 (Driver License function)
// function driversLicense6(passedTest) {
//   if (passedTest) {
//     let firstName = 'John';
//     const yearOfBirth = '1990';
//   }
//
//
//   console.log(firstName + ', born in ' + yearOfBirth + ', is now officially allowed to drive a car.'); // firstName and yearOfBirth were called outside of this block so this will not work
//
// }
//
// driversLicense6(true);
// THE ABOVE WILL NOT WORK IN ES6
// USE THE BELOW VERSION FOR VARIABLES TO BE IN THE CORRECT SCOPE

// ES6 (Drivers License function CORRECT VERSION)
// function driversLicense6_2(passedTest) {
//   let firstName;
//   const yearOfBirth = 1990;
//
//   if (passedTest) {
//     firstName = 'John';
//     // yearOfBirth = 1990; Since constant can't be changed it must be assigned when it is declared
//   }
//
//
//   console.log(firstName + ', born in ' + yearOfBirth + ', is now officially allowed to drive a car.'); // firstName and yearOfBirth were called outside of this block so this will not work
//
// }
//
// driversLicense6_2(true);
//
// // In ES5 the following will assign a value of undefined to name
// // In ES6 it will throw an error
// // This could be useful because it can help to prevent errors
// /*
//   function example() {
//     console.log(name);
//     var name = 'John';
//   }
// */
//
//
// // Because i is used in 2 different scopes it keeps two different values, one for each scope
// let i = 23;
//
// for (let i = 0; i < 5; i++) {
//   console.log(i);
// }
// console.log(i);
//
// // Doing this with var overwrites n when it is called
// //  it doesn't hold it's value of 23 outside of the scope of the for loop
// var n = 23;
// for (var n = 0; n < 5; n++) {
//   console.log(n);
// }
// console.log(n);



/**********************************
 *      105. Blocks and IIFEs     *
 **********************************/

// // ES5 IIFFE
// (function() {
//   var c = 3;
// })();
// // console.log(c);
//
// //ES6
// // To create a block use 2 curly braces {}
// {
//   const a = 1;
//   let b = 2;
//   var c = 3;
// }
// // console.log(a + b);
// // console.log(c);
//
// /* Notice that var c is available outside of the block whereas the const and let values are not available. The ES5 versions shows what you would have to do to get a the same variable privacy*/



/***************************************
 *      106. Strings in ES6/ES2015     *
 ***************************************/

// let firstName = 'John';
// let lastName = 'Smith';
// const yearOfBirth = 1990;
//
// function calcAge(year) {
//   return 2020 - year;
// }
//
// // Putting all of the above in a string
// // ES5
// console.log('This is ' + firstName + ' ' + lastName + '. He was born in ' + yearOfBirth + '. Today he is ' + calcAge(yearOfBirth) + ' years old.');
//
// // ES6
// // Has template literals uses backticks instead of single quotes
// // Allows you to write all of the text and put the variables into the text
// // You can put variables inside of a ${} and it will be read as a variable
// // Functions can also be used inside
// console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}. Today he is ${calcAge(yearOfBirth)} years old.`);
//
// // New string methods
// const n = `${firstName} ${lastName}`;
// // Test if a string starts, ends, or includes something
// // Case sensitive
// console.log(n.startsWith('J'));
// console.log(n.endsWith('th'));
// console.log(n.includes('oh'));
// console.log(`${firstName} `.repeat(5));



/*****************************************
 *      107. Arrow Functions: Basics     *
 *****************************************/

// const years = [1990, 1965, 1982, 1937];
//
// // ES5
// var ages5 = years.map(function(el) {
//   return 2020 - el;
// });
// console.log(ages5);
//
// // ES6
// // Allow arrow functions
// // contains arguement (el), arrow operator (=>) and actions (2016 - el)
// // format is arguement, arrow, and return statement
// // el => 2020 - el
// let ages6 = years.map(el => 2020 - el);
// console.log(ages6);
//
// // if there is more than 1 arguements
// ages6 = years.map((el, index) => `Age element ${index + 1}: ${2016 - el}.`);
// console.log(ages6);
//
// // if there is more than 1 line
// ages6 = years.map((el, index) => {
//   const now = new Date().getFullYear();
//   const age = now - el;
//   return `Age element ${index + 1}: ${age}.`;
// });
// console.log(ages6);



/*********************************************************
 *      108. Arrow Functions: Lexical 'this' Keyword     *
 *********************************************************/
// Arrow functions share the this keyword. They do not have their own this keyword they share the this keyword of the function they are written in

// ES5
// In ES5 the this keyword is pointing at the browser window because it is not a method it is a function call since it is in the event handler. Assigning self = this before the event function allows us to use self.position instead of this and access that obect
// var box5 = {
//   color: 'green',
//   position: 1,
//   clickMe: function() {
//     var self = this;
//     document.querySelector('.green').addEventListener('click', function() {
//       var str = 'This is box number' + self.position + ' and it is ' + self.color;
//       alert(str);
//     });
//   }
// };
//
// box5.clickMe();


// ES6
// Since the arrow function shares the lexical this of it's surroundings you cna use it in a callback function and it will be able to use this.attribute

// const box6 = {
//   color: 'green',
//   position: 1,
//   clickMe: function() {
//     document.querySelector('.green').addEventListener('click', () => {
//       var str = `This is box number ${this.position} and it is ${this.color}`;
//       alert(str);
//     });
//   }
// };
//
// box6.clickMe();


// BELOW WON"T WORK
// This is because the arrow function in click me elevates makes it point to the window again
// const box6 = {
//   color: 'green',
//   position: 1,
//   clickMe: () => {
//     document.querySelector('.green').addEventListener('click', () => {
//       var str = `This is box number ${this.position} and it is ${this.color}`;
//       alert(str);
//     });
//   }
// };
//
// box6.clickMe();

// function Person(name) {
//   this.name = name;
// }
//
// // ES5
// // Anonymous functions cause the this keyword to point to the global object (window) instead of the current object
// Person.prototype.myFriends5 = function(friends) {
//   var arr = friends.map(function(el) {
//     return this.name + ' is friends with ' + el;
//   }.bind(this)); // This binds the this variable of the object, which we still have access to, to the anonymous function so it can access the objects this variable
//
//   console.log(arr);
// };
//
// var friends = ['Bob', 'Jane', 'Mark'];
//
// new Person('John').myFriends5(friends);
//
// // ES6
// Person.prototype.myFriends6 = function(friends) {
//   var arr = friends.map(el => `${this.name} is friends with ${el}`);
//   console.log(arr);
// };
//
// new Person('Mike').myFriends6(friends);


/*******************************
 *      109. Destructuring     *
 *******************************/
// Destructuring gives us a convenient way to extract data from a data structure such as an object or an array

// Array filled with data and we want to store each item in it's own variable

// ES5
// var john = ['John', 26];
// var name = john[0];
// var age = john[1];
// If there were a bunch of items this would become very tedious

// ES6
// With destructuring we can destructure a data structure
// const [name, year] = ['john', 26];
// console.log(name);
// console.log(year);
//
// // This also works with objects
//
// const obj = {
//   firstName: 'John',
//   lastName: 'Smith'
// };
//
// const {
//   firstName,
//   lastName
// } = obj;
//
// console.log(firstName);
// console.log(lastName);
//
// function calcAgeRetirement(year) {
//   const age = new Date().getFullYear() - year;
//   return [age, 65 - age];
// }
//
// const [age, retirement] = calcAgeRetirement(1994);
// console.log(age);
// console.log(retirement);


/****************************************
 *      110. Arrays in ES6 / ES2015     *
 ****************************************/
// Select colored boxes
// const boxes = document.querySelectorAll('.box');
// This returns a node list so we have to turn it into an array

// ES5
// var boxesArr5 = Array.prototype.slice.call(boxes);
// boxesArr5.forEach(function(cur) {
//   cur.style.backgroundColor = "dodgerblue";
// });

// ES6
// Transforms the node list to an array
// const boxesArr6 = Array.from(boxes);
// Array.from(boxes).forEach(cur => cur.style.backgroundColor = "dodgerblue");

// Loops
// When we want to loop over an array we use forEach or map methods
// Problem is we cannot break or continue from these
// Instead we have to use a for loop using index or something

// Change text in the boxes
// ES5
// for (var i = 0; i < boxesArr5.length; i++) {
//   if (boxesArr5[i].className === 'box blue') {
//     continue; // skips current iteration of loop
//     //break; // Break stops it completely and does not do another iteration
//   }
//
//   boxesArr5[i].textContent = 'I changed to blue';
// }

// ES6
// Has a new loop
// Combines forEach and for loop called forof
// for (const cur of boxesArr6) {
//   if (cur.className.includes('blue')) {
//     continue;
//   }
//   cur.textContent = 'I changed to blue';
// }
//
// // ES5
// var ages = [12, 17, 8, 21, 14, 11];
// var full = ages.map(function(cur) {
//   return cur >= 18;
// });
// console.log(full);
//
// console.log(full.indexOf(true));
// console.log(ages[full.indexOf(true)]);
//
// // ES6
// // findIndex can pass a callback function into it and returns the index of the array where the callback function returns true
// // find does the same but returns the value
// console.log(ages.findIndex(cur => cur >= 18));
// console.log(ages.find(cur => cur >= 18));



/*************************************
 *      111. The Spread Operator     *
 *************************************/

// // Spread operator is used to expand elements of an array
//
// // function that adds 4 ages
// function addFourAges(a, b, c, d) {
//   return a + b + c + d;
// }
//
// var sum1 = addFourAges(18, 30, 12, 21);
// console.log(sum1);
//
// // What if these were in an array instead of 4 seperate variables?
// var ages = [18, 30, 12, 21];
// // apply method
// //  receives an array and calls a function that apply is used on using elements of array
// // null is used because we don't need to specify this keyword
// sum2 = addFourAges.apply(null, ages);
// console.log(sum2);
//
//
// // ES6
// // spread operator (...) automatically applies each of the array values as an arguement in the function
// const sum3 = addFourAges(...ages);
// console.log(sum3);
//
// const familySmith = ['John', 'Jane', 'Mark'];
// const familyMiller = ['Mary', 'Bob', 'Ann'];
//
// const bigFamily = [...familySmith, 'Lilly', ...familyMiller];
// console.log(bigFamily);
//
// // Can also be used on nodelist
// const h = document.querySelector('h1');
// const boxes = document.querySelectorAll('.box');
// const all = [h, ...boxes];
//
// Array.from(all).forEach(cur => cur.style.color = 'white');



/*********************************
 *      112. Rest Parameters     *
 *********************************/

// Allow us to pass an arbitrary number of arguements into a function and use them in that function

// USE THE SAME NOTATION AS SPREAD OPERATOR (...) BUT DOE THE OPPOSITE
// Spread operator takes an array and transforms it into single values
// Rest parameters takess single values and transforms it into an array when calling a function with multiple parameters

// Create a function that receives an arbitrary number of years and prints if each person is of full age or // NOTE:

// // ES5
// function isFullAge5() {
//   // This looks similar to an array but is not an array
//   // console.log(arguments);
//   // We have to first transform it into an array like a nodelist
//   var argsArr = Array.prototype.slice.call(arguments);
//   argsArr.forEach(function(cur) {
//     console.log((2020 - cur) >= 18);
//   });
// }
// // console.log('first');
// // isFullAge5(2000, 2003, 1965);
// // console.log('second');
// // isFullAge5(1990, 2003, 1965, 2016, 2987);
//
// // ES6
// function isFullAge6(...years) {
//   // compared to the ES5 way the Rest parameter transforms all of the arguments into an array automatically and assigns the array a variable
//   // console.log(years);
//   years.forEach(cur => console.log((2020 - cur) >= 18));
//
//
// }
//
// console.log('first');
// isFullAge6(2000, 2003, 1965);
// console.log('second');
// isFullAge6(1990, 2003, 1965, 2016, 1987);

// ES5
// function isFullAge5(limit) {
// This looks similar to an array but is not an array
// console.log(arguments);
// We have to first transform it into an array like a nodelist
// Using slice.call(arguements, 1) slices from the 1 position in the array (second item) which means it will exclude the first arguement from the argsArr.
// Then we can get that arguement individually
//   var argsArr = Array.prototype.slice.call(arguments, 1);
//   // console.log(argsArr);
//   argsArr.forEach(function(cur) {
//     console.log((2020 - cur) >= limit);
//   });
// }
// console.log('first');
// isFullAge5(18, 2000, 2003, 1965);
// console.log('second');
// isFullAge5(1990, 2003, 1965, 2016, 2987);

// ES6
// Here we don't have to slice the first argument. We just declare it in the function and it is handled automatically
// function isFullAge6(limit, ...years) {
//   // compared to the ES5 way the Rest parameter transforms all of the arguments into an array automatically and assigns the array a variable
//   // console.log(years);
//   years.forEach(cur => console.log((2020 - cur) >= limit));
//
//
// }
//
// console.log('first');
// isFullAge6(18, 2000, 2003, 1965);
// console.log('second');
// isFullAge6(18, 1990, 2003, 1965, 2016, 1987);



/*************************************
 *      113. Default Parameters      *
 *************************************/














































// function generateTitleBlock(lessonNum, title) {
//   const symbol = '*';
//   const mRow = `\ ${symbol}      ${lessonNum}. ${title}      ${symbol}`;
//   const length = mRow.length;
//   const tRow = `/${symbol.repeat(length - 1)}`;
//   const bRow = `\ ${symbol.repeat(length -1)}/`;
//   // window.prompt('Copy text below for title!', tRow + '\n' + mRow + '\n' + bRow);
//   const final = `${tRow}\n${mRow}\n${bRow}`;
//   console.log(final);
// }
//
//
// generateTitleBlock(113, 'Default Parameters');