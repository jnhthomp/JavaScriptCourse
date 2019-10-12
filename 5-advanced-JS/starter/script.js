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
// // new creates an EMPTY object (IMPORTANT)
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

  8.  After you display the result:
        display next random question so game never ends

  9.  Let user type exit to end programmers

  10. Track users score

  11. Display score in console
*/

// MY SOLUTION
// var score = 0;
// var Question = function(desc, answers, correctAnswer) {
//   this.desc = desc;
//   this.answers = answers;
//   this.correctAnswer = correctAnswer;
// };
//
// var question1 = new Question('This is a test, answer 0', ['answer 0', 'answer 1', 'answer 2'], 0);
// var question2 = new Question('This is a test, answer 1', ['answer 0', 'answer 1', 'answer 2'], 1);
// var question3 = new Question('This is a test, answer 2', ['answer 0', 'answer 1', 'answer 2'], 2);
//
// var questionPool = [question1, question2, question3];
//
// var checkAnswer = function(userAnswer, correctAnswer) {
//   if (userAnswer == correctAnswer) {
//     return 'Correct!';
//   } else {
//     return userAnswer;
//   }
// };
//
// var pickRandom = function(questionPool) {
//   var questionNumber = Math.floor(Math.random() * questionPool.length);
//   var pickedQuestion = questionPool[questionNumber];
//   console.log(questionNumber + '. ' + pickedQuestion.desc);
//   for (i = 0; i < pickedQuestion.answers.length; i++) {
//     console.log(pickedQuestion.answers[i]);
//   }
//   var userAnswer = prompt('Enter a number as an answer');
//
//   if (checkAnswer(userAnswer, pickedQuestion.correctAnswer) == 'Correct!') {
//     console.log('Correct');
//     score++;
//     console.log('Current score: ' + score);
//     console.log(' ');
//     return pickRandom(questionPool);
//   } else if (checkAnswer(userAnswer, pickedQuestion.correctAnswer) == 'exit') {
//     console.log('Final Score is: ' + score);
//     return;
//   } else {
//     console.log('Incorrect.');
//     console.log('Current score: ' + score);
//     console.log(' ');
//   }
//   return pickRandom(questionPool);
// };
//
// pickRandom(questionPool);
//////////////////////////////////////////////////////////////////////////////

// TEACHER SOLUTION (basic solution)
// (function() {
//
//   function Question(question, answers, correct) {
//     this.question = question;
//     this.answers = answers;
//     this.correct = correct;
//   }
//
//   Question.prototype.displayQuestion = function() {
//     console.log(this.question);
//
//     for (var i = 0; i < this.answers.length; i++) {
//       console.log(i + ': ' + this.answers[i]);
//     }
//   };
//
//   Question.prototype.checkAnswer = function(ans) {
//     if (ans === this.correct) {
//       console.log('Correct answer!');
//     } else {
//       console.log('Wrong answer, try again.');
//     }
//   };
//
//   var q1 = new Question('Is JavaScript the coolest programming language in the world?', ['yes', 'no'], 0);
//   var q2 = new Question('What is the name of this course\'s teacher?', ['John', 'Michael', 'Jonas'], 2);
//   var q3 = new Question('What best describes coding?', ['boring', 'hard', 'fun', 'tedious'], 2);
//
//   var questions = [q1, q2, q3];
//
//   var n = Math.floor(Math.random() * questions.length);
//
//   questions[n].displayQuestion();
//
//   var answer = parseInt(prompt('Please select the correct answer.'));
//
//   questions[n].checkAnswer(answer);
//
// })();

//TEACHER SOLUTION (expert solution)
(function() {

  function Question(question, answers, correct) {
    this.question = question;
    this.answers = answers;
    this.correct = correct;
  }

  Question.prototype.displayQuestion = function() {
    console.log(this.question);

    for (var i = 0; i < this.answers.length; i++) {
      console.log(i + ': ' + this.answers[i]);
    }
  };

  Question.prototype.checkAnswer = function(ans, callback) {
    var sc;
    if (ans === this.correct) {
      console.log('Correct answer!');
      sc = callback(true);
    } else {
      console.log('Wrong answer, try again.');
      sc = callback(false);
    }
    this.displayScore(sc);
  };

  Question.prototype.displayScore = function(score) {
    console.log('Your current score is: ' + score);
    console.log('---------------------------------------');
  };

  var q1 = new Question('Is JavaScript the coolest programming language in the world?', ['yes', 'no'], 0);
  var q2 = new Question('What is the name of this course\'s teacher?', ['John', 'Michael', 'Jonas'], 2);
  var q3 = new Question('What best describes coding?', ['boring', 'hard', 'fun', 'tedious'], 2);
  var questions = [q1, q2, q3];

  function score() {
    var sc = 0;
    return function(correct) {
      if (correct) {
        sc++;
      }
      return sc;
    };
  }

  var keepScore = score();

  function nextQuestion() {


    var n = Math.floor(Math.random() * questions.length);

    questions[n].displayQuestion();

    var answer = prompt('Please select the correct answer.');

    if (answer !== 'exit') {
      questions[n].checkAnswer(parseInt(answer), keepScore);
      nextQuestion();
    }
  }

  nextQuestion();

})();



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