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
// How to set 1 or more preset parameters

// ES5
// function SmithPerson(firstName, yearOfBirth, lastName, nationality) {
//   lastName === undefined ? lastName = 'Smith' : lastName = lastName;
//   nationality === undefined ? nationality = 'American' : nationality = nationality;
//   this.firstName = firstName;
//   this.lastName = lastName;
//   this.yearOfBirth = yearOfBirth;
//   this.nationality = nationality;
// }
//
// var john = new SmithPerson('John', 1990);
//
// var emily = new SmithPerson('Emly', 1983, 'Diaz', 'Spanish');

// ES6
// function SmithPerson(firstName, yearOfBirth, lastName = 'Smith', nationality = 'American'){
//   this.firstName = firstName;
//   this.lastName = lastName;
//   this.yearOfBirth = yearOfBirth;
//   this.nationality = nationality;
// }
//
// var john= new SmithPerson('John', 1990);
// var emily = new SmithPerson('Emily', 1990, 'Diaz', 'Spanish');



/****************************************
 *      114. Maps (Data Structure)      *
 ****************************************/
/* It is common in js to use objects as hashmaps
    This is attaching string keys to arbitrary values
    With objects you are limited to strings but with map you can use any kind of primitive value*/

// Set, get, size, has, delete, and clear are the main map functions
// Set - set a value uses 2 arguements and key and a value x.set(key, value)
// get - get a value from a map uses 1 arguement the key x.get(key)
// size - returns the size of the map (how many keys are there?)
// has - uses 1 argument key. Checks to see if the key exists in the map x.has(key);
// delete - 1 argument the key that you want to delete. Deletes key and value x.delete(key)
// clear - clears the entire map of keys and values x.clear()

// const question = new Map();
//
// question.set('question', 'What is the official name of the latest major JavaScript verion?');
// question.set(1, 'ES5');
// question.set(2, 'ES6');
// question.set(3, 'ES2015');
// question.set(4, 'ES7');
// question.set('correct', 3);
// question.set(true, 'Correct answer :D');
// question.set(false, 'Wrong, try again');
//
// console.log(question.get('question'));
// console.log(question.size);
// //
// // if(question.has(4)){
// //   // question.delete(4)
// //   console.log('Answer 4 is here');
// // }
// // question.clear();
//
// // Maps also have access to array functions like forEach() and forof
// // question.forEach((value, key) => console.log(`This is ${key}, and it's set to ${value}`));
//
// for(let [key, value] of question.entries()){
//   if(typeof(key) === 'number'){
//     console.log(`Answer ${key}: ${value}`);
//   }
// }
//
// const ans = parseInt(prompt(`Write the correct answer`));
//
// console.log(question.get(ans === question.get('correct')));
//
// // better because you can use anything as a key
// // Better because they are iterable
// // Better becauase it is easy to get the size
// // Can easily add and remove data from a map



/****************************************
 *      115. Classes (Inheritance)      *
 ****************************************/

//  // ES5
//  var Person5 = function(name, yearOfBirth, job) {
//    this.name = name;
//    this.yearOfBirth = yearOfBirth;
//    this.job = job;
//  };
//
// Person5.prototype.calculateAge = function() {
//   var age = new Date().getFullYear - this.yearOfBirth;
//   console.log(age);
// };
//
// var john5 = new Person5('John', 1990, 'Teacher');
//
//
//
// // ES6
// // In ES6 we can create a class and include the constructor and prototype functions directly inside. (constructor and calculateAge)
// // We can also include static functions but they are not as useful
//
// class Person6 {
//   constructor(name, yearOfBirth, job){
//     this.name = name;
//     this.yearOfBirth = yearOfBirth;
//     this.job = job;
//   }
//   calculateAge(){
//     var age = new Date().getFullYear - this.yearOfBirth;
//     console.log(age);
//   }
//
//   static greeting(){
//     console.log('Hey there!');
//   }
// }
//
// const john6 = new Person6('John', 1990, 'Teacher');
//
// Person6.greeting();



/******************************************
 *      116. Classes with Subclasses      *
 ******************************************/
/*
 If there are 2 classees one specific and one less specific such as Person and Athlete. An athelete is a person but a person doesn't have to be an athlete
*/

// ES5
// var Person5 = function(name, yearOfBirth, job){
//   this.name = name;
//   this.yearOfBirth = yearOfBirth;
//   this.job =  job;
// };
//
// Person5.prototype.calculateAge = function () {
//   var age = new Date().getFullYear() - this.yearOfBirth;
//   console.log(age);
// };
//
// var Athlete5 = function(name, yearOfBirth, job, olympicGames, medals){
//   // you have to pass this so it assigns the person properties to the new Athlete object
//   Person5.call(this, name, yearOfBirth, job);
//   this.olympicGames = olympicGames;
//   this.medals = medals;
// };
//
//
// Athlete5.prototype = Object.create(Person5.prototype);
// Athlete5.prototype.wonMedal = function () {
//   this.medals++;
//   console.log(this.medals);
// };
//
// var johnAthlete5 = new Athlete5('John', 1990, 'swimmer', 3, 10);

// ES6
// class Person6{
//   constructor(name, yearOfBirth, job){
//     this.name = name;
//     this.yearOfBirth = yearOfBirth;
//     this.job = job;
//   }
//   calculateAge(){
//     var age = new Date().getFullYear() - this.yearOfBirth;
//     console.log(age);
//   }
// }
//
// // When creating the subclass you have to say extends and specify the super class. This will assign it as the super class
// class Athlete6 extends Person6{
//   constructor(name, yearOfBirth, job, olympicGames, medals){
//     // The super keyword passes the arguements into the superclass specified above
//     super(name, yearOfBirth, job);
//     this.olympicGames = olympicGames;
//     this.medals = medals;
//   }
//
//   wonMedal(){
//     this.medals++;
//     console.log(this.medals);
//   }
// }
//
// const johnAthlete6 = new Athlete6('John', 1990, 'Swimmer', 3, 10);



/*************************************
 *      117. Coding Challenge 8      *
 *************************************/
/*
There are two town elements:
    1. Parks (3)
        Both
          name
          buildYear
        only Parks
          treeCount
          parkArea
    2. Streets (4)
        Both
          name
          buildYear
        only Streets
          length
          size classification
  Generate a report containing:
  1. Tree density of each park in the town
      formula: number of trees/park area
  2. Average age of each town's park
      formula: sum of all ages/number of parks
  3. the name of the park that has more than 1000 trees
  4. Total and average length of the town's streets
  5. Size classification of all streets:
      tiny/small/normal/big/huge. If size is unknown, the default is normal

  All the report data should be printed to the console

  HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring etc.
*/

/******************************
 *      117. My Solution      *
 ******************************/

// /*Create Classes*/
// // Create a superclass (townAsset) for name and buildYear
// class TownAsset {
//   constructor(name, buildYear) {
//     this.name = name;
//     this.buildYear = buildYear;
//   }
// }
// // Create a class for parks
// class Park extends TownAsset {
//   constructor(name, buildYear, treeCount, parkArea) {
//     super(name, buildYear);
//     this.treeCount = treeCount;
//     this.parkArea = parkArea;
//   }
//
// }
// // Create a class for streets
// class Street extends TownAsset {
//   constructor(name, buildYear, streetLength, streetSize = 'Normal') {
//     super(name, buildYear);
//     this.streetLength = streetLength;
//     this.streetSize = streetSize;
//   }
// }
// // Create objects
// // Create Park (3) objects
// function createParks() {
//   const park0 = new Park('Park0', 2001, 100, 1000);
//   const park1 = new Park('Park1', 2002, 4000, 2000);
//   const park2 = new Park('Park2', 2003, 9000, 3000);
//   const parksMap = new Map();
//   parksMap.set('park0', park0);
//   parksMap.set('park1', park1);
//   parksMap.set('park2', park2);
//   return parksMap;
// }
// const parksMap = createParks();
// // Create Street (4) objects
// function createStreets() {
//   const street0 = new Street('Street0', 2001, 100);
//   const street1 = new Street('Street1', 2002, 200);
//   const street2 = new Street('Street2', 2003, 300, 'Normal');
//   const street3 = new Street('Street3', 2004, 400);
//
//   const streetsMap = new Map();
//   streetsMap.set('Street0', street0);
//   streetsMap.set('Street1', street1);
//   streetsMap.set('Street2', street2);
//   streetsMap.set('Street3', street3);
//   return streetsMap;
// }
// const streetsMap = createStreets();
//
//
// //  1.  Tree density of each park in the town
// //        formula: number of trees/park area
//
// // Loop through parksMap
// // On each key/value calculate the tree density for that items
// function treeDensity(map) {
//   for (let [key, value] of map.entries()) {
//     const density = value.treeCount / value.parkArea;
//     const str = `${value.name} has a tree density of ${density} per sq ft`;
//     console.log(str);
//   }
// }
// treeDensity(parksMap);
//
//
// //  2.  Average age of each town's park
// //        formula: sum of all ages/number of parks
// function calcAvgAge(map) {
//   let total = 0;
//   for (let [key, value] of map.entries()) {
//     let age = new Date().getFullYear() - value.buildYear;
//     total += age;
//   }
//   const avg = total / map.size;
//   const str = `Average park age is ${avg}`;
//   console.log(str);
// }
// calcAvgAge(parksMap);
//
// //  3.  The name of the park that has more than 1000 trees
// function thousandTrees(map) {
//   for (let [key, value] of map.entries()) {
//     if (value.treeCount > 1000) {
//       const str = `${value.name} has more than 1000 trees w/ ${value.treeCount} trees!`;
//       console.log(str);
//     }
//   }
// }
// thousandTrees(parksMap);
//
// // 4. Total and average length of the town's streets
// function calcStreets(map) {
//   let total = 0;
//   for (let [key, value] of map.entries()) {
//     total += value.streetLength;
//   }
//   const avg = total / map.size;
//   const str = `The total street length is ${total}, for an average of ${avg}`;
//   console.log(str);
// }
// calcStreets(streetsMap);
//
//
// //  5.  Size classification of all streets:
// //        tiny/small/normal/big/huge. If size is unknown, the default is normal
// function sizeClass(map) {
//   for (let [key, value] of map.entries()) {
//     const str = `${value.name} has a size of ${value.streetSize}`;
//     console.log(str);
//   }
// }
// sizeClass(streetsMap);


/***********************************
 *      117. Teacher Solution      *
 ***********************************/

// Create super class w/ name and build year
class Element {
  constructor(name, buildYear) {
    this.name = name;
    this.buildYear = buildYear;
  }
}
// Create subclass for parks
class Park extends Element {
  constructor(name, buildYear, area, numTrees) {
    super(name, buildYear);
    this.area = area; //km2
    this.numTrees = numTrees;
  }

  treeDensity() {
    const density = this.numTrees / this.area;
    console.log(`${this.name} has a tree density of ${density} trees per square km`);
  }
}

// Create subclass for streets
class Street extends Element {
  constructor(name, buildYear, length, size = 3) {
    super(name, buildYear);
    this.length = length;
    this.size = size;
  }

  classifyStreet() {
    const classification = new Map();
    classification.set(1, 'tiny');
    classification.set(2, 'small');
    classification.set(3, 'normal');
    classification.set(4, 'big');
    classification.set(5, 'huge');
    console.log(`${this.name}, built in ${this.buildYear}, is a ${classification.get(this.size)} street`);
  }
}

const allParks = [new Park('Green Park', 1987, 0.2, 215),
  new Park('National Park', 1894, 2.9, 3541),
  new Park('Oak Park', 1953, 0.4, 949)
];

const allStreets = [new Street('Ocean Avenue', 1999, 1.1, 4),
  new Street('Evergreen Street', 2008, 2.7, 2),
  new Street('4th Street', 2015, 0.8),
  new Street('Sunset Boulevard', 1982, 2.5, 5)
];

function reportParks(p) {
  console.log(`---------------Parks Report---------------`);

  // Density
  p.forEach(el => el.treeDensity());

  // Average Age
  const ages = p.map(el => new Date().getFullYear() - el.buildYear);
  const [totalAge, avgAge] = calc(ages);
  console.log(`Our ${p.length} parks have an average of ${avgAge} years`);
  // Which Park has more than 1000 trees
  const i = p.map(el => el.numTrees).findIndex(el => el >= 1000);
  console.log(`${p[i].name} has more than 1000 trees`);

}

function reportStreets(s) {
  console.log(`---------------Streets Report---------------`);

  // Total and average length of the town's streets
  const [totalLength, avgLength] = calc(s.map(el => el.length));
  console.log(`Our ${s.length} streets have a total length of ${totalLength} km, with an average of ${avgLength} km.`);

  // Classify sizes
  s.forEach(el => el.classifyStreet());
}

function calc(arr) {
  const sum = arr.reduce((prev, cur, index) => prev + cur, 0);

  return [sum, sum / arr.length];
}

reportParks(allParks);
console.log('\n');
reportStreets(allStreets);













function generateTitleBlock(lessonNum, title) {
  const symbol = '*';
  const mRow = `\ ${symbol}      ${lessonNum}. ${title}      ${symbol}`;
  const length = mRow.length;
  const tRow = `/${symbol.repeat(length - 1)}`;
  const bRow = `\ ${symbol.repeat(length -1)}/`;
  // window.prompt('Copy text below for title!', tRow + '\n' + mRow + '\n' + bRow);
  const final = `${tRow}\n${mRow}\n${bRow}`;
  console.log(final);
}