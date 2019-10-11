/******************************************
 *      60. Everything is an Object:      *
 *   Inheritance and the Prototype Chain  *
 ******************************************/

/* Everythingis an object!
  In JS there are two types of values:
    Primatives
      Numbers
      Strings
      Booleans
      Undefined
      Null
    Objects
      Arrays
      Functions
      Objects
      Dates
      Wrappers

  Object Oriented Programming
    Makes heavy use of objects, properties, and methods
    All three interact with each other to create
    Used to store data, structure applications into modules & keeping code clean
  Constructors
    Allows us to make a blueprint of an object based
    That blueprint can be used over and over again
      Creates new instances of different objects w/ the same properties
  Inheritance
    When one object is based on another object
    When an object gets access to another objects vars and methods
  Prototype
    JS is a prototype based language
    Inheritance works with prototypes
    All JS objects have a prototype property
      makes inheritance possible

  How does inheritance work?
  think of constructor Person and object john
    Person
      Prototype: calculatedAge()
    john
      name: john,
      birthYear: 1990,
      job: teacher;
      Prototype
  The prototype property of person allows other objects access
    to methods variables within that property
  All objects have prototypes
    All are prototypes of the Object constructor
      Object
        Prototype
          hasOwnProperty()
          isProtoTypeOf()
          constructor()
          toString()
          .
          .
          .
          valueOf()
      All objects inherits these functions and can call them
  objects move to up the prototype chain from most specific to least specific
    to look for called functions
    if it can't find the function it will move up the chain
    john -> Person -> Object -> null

  Prototype Summary
    Every JS object has a prototype property
      This makes inheritance possible
    The prototype property of an object is where
      we put methods and properties that we want other objects to inherit;
    The Constructor's prototype property is NOT:
      The prototype of the Constructor itself
      It's the prototype of all instances that are created through it.
    When a certain method or property is called:
      The search starts in the objects itself. If not found:
        The search moves to the objects prototype, repeat.
*/

/********************************************************
 *      61. Creating Objects: Function Constructors     *
 ********************************************************/
//  Creating objects using function constructor

// var john = {
//   name: 'John',
//   yearOfBirth: 1990,
//   job: 'teacher'
// };

// var Person = function(name, yearOfBirth, job) {
//   this.name = name;
//   this.yearOfBirth = yearOfBirth;
//   this.job = job;
// };
//
// Person.prototype.calculateAge = function() {
//   console.log(2019 - this.yearOfBirth);
// };
//
// Person.prototype.lastName = 'Smith';
//
// // new creates an EMPTY object (IMPROTANT)
// var john = new Person('john', 1990, 'teacher');
// var jane = new Person('Jane', 1969, 'designer');
// var mark = new Person('Mark', 1948, 'retired');
//
// john.calculateAge();
// jane.calculateAge();
// mark.calculateAge();
//
// console.log(john.lastName, jane.lastName, mark.lastName);

/***********************************************
 *      63. Creating Objects: Objects.create   *
 ***********************************************/

// Object.create

// var personProto = {
//   calculateAge: function() {
//     console.log(2019 - this.yearofBirth);
//   }
// };
//
// var john = Object.create(personProto);
// john.name = 'john';
// john.yearOfBirth = 1990;
// john.job = 'teacher';
//
// var jane = Object.create(personProto, {
//   name: {
//     value: 'Jane'
//   },
//   year: {
//     value: 1969
//   },
//   job: {
//     value: 'designer'
//   }
// });

/****************************************
 *      64. Primitives vs. Objects      *
 ****************************************/
//Primatives vs Objects
/*
 Variables containing primitives store that data inside of the variable itself
 Variables associated with an object do not contain that object
  They only contain a reference to the point in memory where that object is stored
*/

// //  Primitives
// var a = 23;
// var b = 23;
// a = 46;
//
// console.log(a, b);
//
// //  Objects
// var obj1 = {
//   name: 'John',
//   age: 26
// };
//
// var obj2 = obj1;
// obj1.age = 30;
//
// console.log(obj1.age, obj2.age);
//
// // Functions
// var age = 27;
// var obj = {
//   name: 'Jonas',
//   city: 'Lisbon'
// };
//
// function change(a, b) {
//   a = 30;
//   b.city = 'San Francisco';
// }
//
// change(age, obj);
//
// console.log(age, obj.city);

/******************************************
 *      65. First Class Functions:        *
 *    Passing Functions As Arguements     *
 ******************************************/
/*
   A function is an instance of the Object type
   A function behaves like any other object
   We can store functions in a varible
   We can pass a function as an arguement to another function
   We can return a function from a function

   Because of this we have first class functions
*/

// //  Functions accepting other functions as arguements
//
// var years = [1990, 1965, 1937, 2005, 1998];
//
// function arrayCalc(arr, fn) {
//   var arrRes = [];
//   for (var i = 0; i < arr.length; i++) {
//     arrRes.push(fn(arr[i]));
//   }
//   return arrRes;
// }
//
// function calculateAge(el) {
//   return 2019 - el;
// }
//
// function isFullAge(el) {
//   return el >= 18;
// }
//
// function maxHeartRate(el) {
//   if (el >= 18 && el <= 81) {
//     return 206.9 - (0.67 * el);
//   } else {
//     return -1;
//   }
// }
//
// var ages = arrayCalc(years, calculateAge);
// var fullAges = arrayCalc(ages, isFullAge);
// var rates = arrayCalc(ages, maxHeartRate);
//
// console.log(ages);
// console.log(fullAges);
// console.log(rates);



/****************************************
 *      66. First Class Funtions:       *
 *    Functions Returning Functions     *
 ****************************************/
//
// //  Creating function that creates different interview questions
// //    depending on job
//
// function interviewQuestion(job) {
//   if (job === 'designer') {
//     return function(name) {
//       console.log(name + ', can you please explain what UX design is?');
//     };
//   } else if (job === 'teacher') {
//     return function(name) {
//       console.log('What subject do you teach, ' + name + '?');
//     };
//   } else {
//     return function(name) {
//       console.log('Hello ' + name + ' what do you do?');
//     };
//   }
// }
//
// var teacherQuestion = interviewQuestion('teacher');
// teacherQuestion('John');
//
// var designerQuestion = interviewQuestion('designer');
// designerQuestion('John');
// designerQuestion('Mark');
// designerQuestion('Jane');
// interviewQuestion('teacher')('Mark');



/*****************************************************************
 *      57. Immediately Invoked Function Expressions (IIFE)      *
 *****************************************************************/
/*
  Immediately Invoked Function Expressions aka IIFE
    Are useful because you care able to make variable private
    Can only be used once
    Used for Data privacy not for reusable code
*/

//
// function game() {
//   var score = Math.random() * 10;
//   console.log(score >= 5);
// }
// game();

// (function() {
//   var score = Math.random() * 10;
//   console.log(score >= 5);
// })();
//
// //console.log(score);
//
// (function(goodLuck) {
//   var score = Math.random() * 10;
//   console.log(score >= 5 - goodLuck);
// })(5);

/**************************
 *      68. Closures      *
 **************************/
//  Closures are:
//    An inner function always has access to the variables and parameters of its  out function, even after the outer functino has returned
// function retirement(retirementAge) {
//   var a = ' years left until retirement.';
//   return function(yearOfBirth) {
//     var age = 2019 - yearOfBirth;
//     console.log((retirementAge - age) + a);
//   };
// }
//
// var retirementUS = retirement(66);
// var retirementGermany = retirement(65);
// var retirementIceland = retirement(67);
//
// retirementUS(1994);
// retirementGermany(1994);
// retirementIceland(1994);

//retirement(66)(1994);

// CHALLENGE
//  Rewrite interview questions using closures

//function interviewQuestion(job) {
//   if (job === 'designer') {
//     return function(name) {
//       console.log(name + ', can you please explain what UX design is?');
//     };
//   } else if (job === 'teacher') {
//     return function(name) {
//       console.log('What subject do you teach, ' + name + '?');
//     };
//   } else {
//     return function(name) {
//       console.log('Hello ' + name + ' what do you do?');
//     };
//   }
// }

// function interviewQuestion(job) {
//   return function(name) {
//     if (job === 'designer') {
//       console.log(name + ', can you please explain what UX design is?');
//     } else if (job === 'teacher') {
//       console.log('What subject do you teach, ' + name + '?');
//     } else {
//       console.log('Hello ' + name + ' what do you do?');
//     }
//   };
// }
//
// var designerQuestion = interviewQuestion('designer');
// var teacherQuestion = interviewQuestion('teacher');
// var otherQuestoin = interviewQuestion('Loser');
//
// designerQuestion('John');
// teacherQuestion('John');
// otherQuestoin('John');
//
// // Alternative way of calling
// interviewQuestion('designer')('John');
// interviewQuestion('teacher')('John');
// interviewQuestion('loser')('John');



/**************************************
 *      69. Bind, Call, and Apply     *
 **************************************/

// var john = {
//   name: 'John',
//   age: 26,
//   job: 'teacher',
//   presentation: function(style, timeOfDay) {
//     if (style === 'formal') {
//       console.log('Good ' + timeOfDay +
//         ' Ladies and gentlemen! I\'m ' + this.name +
//         ' I\'m ' + this.job +
//         ' and I\'m ' + this.age + ' years old');
//     } else if (style === 'friendly') {
//       console.log('Hey! What\'s up? I\'m ' + this.name +
//         ', I\'m a ' + this.job +
//         ' and I\'m ' + this.age +
//         ' years old. Have a nice ' + timeOfDay + '.');
//     }
//   }
// };
//
// var emily = {
//   name: 'Emily',
//   age: 35,
//   job: 'designer'
// };
//
// john.presentation('formal', 'morning');
//
// //  With .call we can borrow functions from other objects.
// //  The first arguement specifies what this. should be
// //  Here we have this. set to emily
// //    so variables within presentation() will refer to emily's values
// //    here emily will have access to john.presentation()
// //      using arguements 'friendly', and 'afternoon'
// john.presentation.call(emily, 'friendly', 'afternoon');
//
// //  He said this wouldn't work but it did?
// //    We will be discussing more in another example later
// john.presentation.apply(emily, ['friendly', 'afternoon']);
//
// //  This applies a "template" for john
// //  We could also apply this template to emily
// //    because the first arguement is this.
// //    Here we only specified one of the arguements for presentation()
// //    We had to specify the second one later when we use johnFriendly()
// var johnFriendly = john.presentation.bind(john, 'friendly');
// johnFriendly('morning');
// johnFriendly('night');
//
// var emilyFormal = john.presentation.bind(emily, 'formal');
// emilyFormal('afternoon');

// var years = [1990, 1965, 1937, 2005, 1998];
//
// function arrayCalc(arr, fn) {
//   var arrRes = [];
//   for (var i = 0; i < arr.length; i++) {
//     arrRes.push(fn(arr[i]));
//   }
//   return arrRes;
// }
//
// function calculateAge(el) {
//   return 2019 - el;
// }
//
// function isFullAge(limit, el) {
//   return el >= limit;
// }
//
// var ages = arrayCalc(years, calculateAge);
// var fullJapan = arrayCalc(ages, isFullAge.bind(this, 20));
//
// console.log(ages);
// console.log(fullJapan);



/***********************************
 *      70. Coding Challenge 7     *
 ***********************************/
/*
  We are building a quiz game in the console

  1.  Build a function constructor called Question
      to describe a question
      A question should include:
        a)  a question itself
        b)  the answers from which the player can choose the correct on
              choose adequate data structure
        c)  Correct answer (Hint: Use Number);

  2.  Create a couple of questions using the constructor

  3.  Store them all inside an array

  4.  Select one random question and log it on the console
        with possible answers
        each question should have a number
        (Hint: Write a method for the Question objects for this task)

  5.  Use 'prompt' function to ask the user for the correct answer.
      User should input the number of the correct answer

  6.  Check if the answer is correct
      Print if answer is correct or not
      (Hint: Write another method for this)

  7.  Suppose this code would be a plugin for other programmers to use
      Make sure that all your code is private and doesn't interfere
      with other programmers code
*/






/*
   SELF CHALLENGE
   Create a program that automatically generates titles from a variable

   Step 1. Print from a given string (number and name of lesson)
     add a space character
     asterisk *
     3 tab spaces /      /
     (Number. title of lesson)
     3 tab spaces /      /
     asterisk *
     ' *     ##. title of current lesson     *'

   Step 2. Generate top row
     Read length of string generated from step 1
     Create a for loop that repeats for each character
       if i === 0
         print /
       until i === string.length
         print *

   Step 3. Generate bottom row
     Basically reverse of step 2 BUT:
       if i === 0
         print space character ' '
       while i !== 0 && i <= string.length
         print *
       if i === string.length
         print /
*/

// function generateTitleBlock(lessonTitle) {
//   var mRow = ' *      ' + lessonTitle + '     *';
//   var length = mRow.length;
//   var tRow = '/' + '*'.repeat(length - 1);
//   var bRow = ' ' + '*'.repeat(length - 1) + '/';
//   window.prompt('Copy text below for title!', tRow + '\n' + mRow + '\n' + bRow);
// }
//
//
// generateTitleBlock('70. Coding Challenge 7');