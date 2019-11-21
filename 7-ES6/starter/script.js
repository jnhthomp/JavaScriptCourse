/*jshint esversion: 6 */


/******************************************
 *      103. What's New in ES6/ES2015     *
 ******************************************/
/*ES6/ES2015
    Well supported in all modern browsers
    No support in older browsers
    Can use most features in production with transpiling + polyfilling
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
/* let and const


*/

//ES5 version
// var name5 = 'Jane Smith';
// var age5 = 23;
// name5 = 'Jane Miller';
// console.log(name5);


//ES6 version
//  Let is used for variables that will change
//  const is for values that won't be changed
//    Name cannot be changed here because it was declared as a constant
//  let and const are both block scoped
//    es5 var was function scoped

// const name6 = 'Jane Smith';
// let age6 = 23;
// name6 = 'Jane Miller';
// console.log(name6);


//ES5
// Function scoped
// Because var is used firstName and yearOfBirth are avalable anywhere inside the function
// function driversLicense5(passedTest) {
//   if (passedTest) {
//     console.log(firstName);
//     var firstName = 'John';
//     var yearOfBirth = 1990;
//
//   }
//   console.log(firstName + ' born in ' + yearOfBirth + ' is now officially allowed to drive a car');
// }
// driversLicense5(true);
//
// //ES6
// // Block scoped
// //  let and const are block scoped so they are only available inside the same code block
// //  being inside the same function isn't good enough
// function driversLicense(passedTest) {
//   // console.log(firstName); Trying to call a variable before assignment in ES6 will result in error instead of undefined like ES5
//   let firstName;
//   // Const cannot be assigned a value later
//   const yearOfBirth = 1990;
//   if (passedTest) {
//     firstName = 'John';
//
//   }
//   console.log(firstName + ' born in ' + yearOfBirth + ' is now officially allowed to drive a car');
// }
// driversLicense(true);
//
//
//
// // Because of block scope changing i in the for loop will not change the i in the global scope
// //  They happen to have the same name but they are totally seperate variables
// let i = 23;
// for (let i = 0; i < 5; i++) {
//   console.log(i);
// }
// console.log(i);



/**********************************
 *      105. Blocks and IIFEs     *
//  **********************************/
// // You can create a block with just curly braces
// //   This will help insure data privacy
// {
//   const a = 1;
//   let b = 1;
//   var c = 3;
// }
// //console.log(a + b); // This is not accessible because it is outside the block
// console.log(c); // This would work because it doesn't matter if a variable is outside of the block if they are in the same scope
// //ES5 Block
// (function() {
//   var c = 3;
// })();
// //console.log(c);

/***************************************
 *      106. Strings in ES6/ES2015     *
 ***************************************/

// let first = 'John';
// let last = 'Smith';
// const yearOfBirth = 1990;
//
// function calcAge(year) {
//   return 2019 - year;
// }
//
// //ES 5
// console.log('This is ' + first + ' ' + last + '. He was born in ' + yearOfBirth + '. Today, he is ' + calcAge(yearOfBirth) + ' years old.');
//
// //ES6
// // Now we don't have to start and stop single quotes and include plus signs
// // To use a variable or function start with a back tick ``
// // Then use a ${variableOrFunction} inside
// console.log(`This is ${first} ${last}. He was born in ${yearOfBirth}. Today he is ${calcAge(yearOfBirth)} years old.`);
//
// // ES6 New string methods
// const n = `${first} ${last}`;
// console.log(n.startsWith('J')); // Does the string startWith('') arguement (checks capitalization)
// console.log(n.endsWith('h')); // Does the string end with arguement
// console.log(n.includes(' ')); // is the arguement found anywhere in the string?
// console.log(first.repeat(5)); // Repeats the string as much as arguement specifies
// // to include a space with .repeat you must include template literal
// console.log(`${first} `.repeat(5));



/*****************************************
 *      107. Arrow Functions: Basics     *
 *****************************************/
//
// const years = [1990, 1965, 1982, 1937];
//
// //ES5
// var ages5 = years.map(function(el) {
//   return 2019 - el;
// });
// console.log(ages5);
//
// //ES6
// // Arrow operator basically means:
// //   perform action after the arrow and return the result
// let ages6 = years.map(el => 2019 - el);
// console.log(ages6);
//
// // If there is more than 1 arguement parenthesis are needed
// ages6 = years.map((el, index) => `Age element ${index + 1}: ${2019 - el}.`);
// console.log(ages6);
//
// // If there is more than one line we have to use curly braces and return is not implicit so it needs specified
// ages6 = years.map((el, index) => {
//   const now = new Date().getFullYear();
//   const age = now - el;
//   return `Age element ${index + 1}: ${age}.`;
// });
// console.log(ages6);



/*********************************************************
 *      108. Arrow Functions: Lexical 'this' Keyword     *
 *********************************************************/

//  Arrow functions share the surrounding this. keyword
//  Arrow functions do not get their own this. keyword
//  They use the this. keyword of the function they are written in
//    This is called a lexical this

// ES5
// var box5 = {
//   color: 'green',
//   position: 1,
//   clickMe: function() {
//     var self = this;
//     document.querySelector('.green').addEventListener('click', function() {
//       var str = 'This is box number ' + self.position + ' and it is ' + self.color;
//       alert(str);
//     });
//   }
// };
//
// //box5.clickMe();
//
//
// //ES6
// const box6 = {
//   color: 'green',
//   position: 1,
//   clickMe: function() {
//     document.querySelector('.green').addEventListener('click', () => {
//       var str = 'This is box number ' + this.position + ' and it is ' + this.color;
//       alert(str);
//     });
//   }
// };

//box6.clickMe();

//ES6
// This will not work because using an arrow function in clickMe then has the this keyword pointing to window
// const box66 = {
//   color: 'green',
//   position: 1,
//   clickMe: () => {
//     document.querySelector('.green').addEventListener('click', () => {
//       var str = 'This is box number ' + this.position + ' and it is ' + this.color;
//       alert(str);
//     });
//   }
// };
//
// box66.clickMe();

// function Person(name) {
//   this.name = name;
// }
// //ES5
// Person.prototype.myFriends5 = function(friends) {
//   var arr = friends.map(function(el) {
//     return this.name + ' is friends with ' + el;
//   }.bind(this)); // pass this keyword into the function
//   console.log(arr);
// };
//
// var friends = ['bob', 'jane', 'mark'];
//
// new Person('John').myFriends5(friends);
//
// //ES6
// Person.prototype.myFriends6 = function(friends) {
//   let arr = friends.map((el) => `${this.name} is friends with ${el}`);
//   console.log(arr);
// };
//
//
// var friends = ['Bob', 'Jane', 'Mark'];
// new Person('Mike').myFriends6(friends);



/*******************************
 *      109. Destructuring     *
 *******************************/
// Convenient way to extract data from a data structure like an object or array

// We have an array filled with data
//  We want to store each element in that arrray to a variable

//ES5
// var john5 = ['John', 26];
//
// var name5 = john5[0];
// var age5 = john5[1];
//
// // This would be impractical if there were a lot of items in the array
//
// //ES6
// // the first set of brackets sets variables the second set assigns values
// const [name6, age6] = ['John', 26];
// console.log(name6, age6);
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
// console.log(firstName);
// console.log(lastName);
//
// const {
//   firstName: a,
//   lastName: b
// } = obj;
// console.log(a);
// console.log(b);



// function calcAgeRetirement(year) {
//   const age = new Date().getFullYear() - year;
//   return [age, 65 - age];
// }
//
// const [age2, retirement] = calcAgeRetirement(1990);
//
// console.log(age2);
// console.log(retirement);



/****************************************
 *      110. Arrays in ES6 / ES2015     *
 ****************************************/

// const boxes = document.querySelectorAll('.box');
//
// //ES5
// boxesArr5 = Array.prototype.slice.call(boxes);
//
// boxesArr5.forEach(function(cur) {
//   cur.style.backgroundColor = 'dodgerblue';
// });
//
// //ES6
// const boxesArr6 = Array.from(boxes);
// boxesArr6.forEach(cur => cur.style.backgroundColor = 'dodgerblue');
//
// //ES5
// // for (var i = 0; i < boxesArr5.length; i++) {
// //   if (boxesArr5[i].className === 'box blue') {
// //     continue;
// //   }
// //
// //   boxesArr5[i].textContent = 'I changed to blue';
// // }
// //
//
// //ES6 forof
//
// for (const cur of boxesArr6) {
//   if (cur.className.includes('blue')) {
//     continue;
//   }
//   cur.textContent = 'I changed to blue';
// }
//
//
// //ES5
// var ages = [12, 17, 8, 21, 14, 11];
//
// var full = ages.map(function(cur) {
//   return cur >= 18;
// });
//
// console.log(full);
//
// console.log(full.indexOf(true));
// console.log(ages[full.indexOf(true)]);
//
// //ES6
// console.log(ages.findIndex(cur => cur >= 18));
// console.log(ages.find(cur => cur >= 18));



/*************************************
 *      111. The Spread Operator     *
 *************************************/

// Convenient way to expand elements of an array
// In place of arguements and function calls

// function addFourAges(a, b, c, d) {
//   return a + b + c + d;
// }
//
// var sum1 = addFourAges(18, 30, 12, 21);
// console.log(sum1);
//
// // If the four variables were in an array how would we pass them into the above function?
//
// //ES5
// var ages = [18, 30, 12, 21];
// var sum2 = addFourAges.apply(null, ages);
// console.log(sum2);
//
// //ES6
// const sum3 = addFourAges(...ages);
// console.log(sum3);
//
//
// const familySmith = ['John', 'Jane', 'Mark'];
// const familyMiller = ['Mary', 'Bob', 'Ann'];
// const bigFamily = [...familySmith, 'Lily', ...familyMiller];
// console.log(bigFamily);
//
// const h = document.querySelector('h1');
// const boxes = document.querySelectorAll('.box');
// const all = [h, ...boxes];
// Array.from(all).forEach(cur => cur.style.color = 'purple');



/*********************************
 *      112. Rest Parameters     *
 *********************************/
// Look similar to spread operators but act differently
// Spread operator takes an array and inserts their values into a single function
// Rest operator takes a single value and puts it into an array for a function that expects multiple values

// Function gets an arbitrary number of years and checks if they are full age
// // ES5
// function isFullAge5() {
//   //console.log(arguments);
//   var argsArr = Array.prototype.slice.call(arguments);
//
//   argsArr.forEach(function(cur) {
//     console.log((2016 - cur) >= 18);
//   });
// }
//
// //isFullAge5(1990, 1999, 1965, 2016, 1987);
//
// // ES6
// // The function will transform the arguments into an array that can be used by the function
// function isFullAge6(...years) {
//   years.forEach(cur => console.log((2016 - cur) >= 18));
// }
// isFullAge6(1990, 1999, 1965, 2016, 1987);

// What if you wanted to include the fullAge as one of the arguments?
// ES5
// function isFullAge5(limit) {
//   //console.log(arguments);
//   var argsArr = Array.prototype.slice.call(arguments, 1);
//   //console.log(argsArr);
//   argsArr.forEach(function(cur) {
//     console.log((2016 - cur) >= limit);
//   });
// }
//
// //isFullAge5(16, 1990, 1999, 1965, 2016, 1987);
//
// // ES6
// // The function will transform the arguments into an array that can be used by the function
// function isFullAge6(limit, ...years) {
//   years.forEach(cur => console.log((2016 - cur) >= limit));
// }
// isFullAge6(16, 1990, 1999, 1965, 2016, 1987);











// function generateTitleBlock(lessonTitle) {
//   var mRow = ' *      ' + lessonTitle + '     *';
//   var length = mRow.length;
//   var tRow = '/' + '*'.repeat(length - 1);
//   var bRow = ' ' + '*'.repeat(length - 1) + '/';
//   window.prompt('Copy text below for title!', tRow + '\n' + mRow + '\n' + bRow);
// }
//
//
// generateTitleBlock('112. Rest Parameters');