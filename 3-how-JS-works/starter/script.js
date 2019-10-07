/******************************************
 *      36. How Our Code Ies Executed     *
 *      JavaScript Parsers and Engines    *
 ******************************************/
/*
  How is JavaScript Code Executed?

  JavaScript is always run in some kind of environment
    Usually a browser
      (Chrome, Firefox, Safari, etc)
    Other hosts such as Node.js webserver
    Some applications can also process code input
    This course will focus on browser

  What is happening behind the scenes?
  The host has a JavaScript engine that will execute the code
  A JavaScript host is a program that can execute JavaScript code
  Engines
    Google V8
    Reno
    Spidermonkey
    JavaScript Core

    Parsed by parser
      Reads code line by line to check syntax
      Parser knows JavaScript rules and how it must be written
      Will throw an error if there are mistakes

    If everything is correct the parser will produce a data structure
    This is called an Abstract Syntax Tree
      This is translated into machine code
      This can be directly processed by a processor
      After this the code runs
*/

/************************************************************
 *      37. Execution Contexts and the Execution Stack      *
 ************************************************************/

/*
  Execution Context
  Environment that JavaScript runs in
  Imagine it like box or container
    Stores variables and pieces of code is evaluated and executed
  Default execution context is the Global context
    Code that is not inside any function
    Associated with the global object
    In the brower that's the window object
      so a variable such as lastName would be the same as window.lastName

  Example of Execution Context

  // name is not in any function so it is in the Global Execution Context
  var name = 'John';

  // This function declaration is still in the global (as is second and third)
  function first(){
    var a ='Hello!';
    second();
    var x = a + name;
  }

  function second(){
    var b = 'Hi!';
    third();
    var z = b + name;
  }

  function third(){
    var c = 'Hey!';
    var z = c + name;
  }

  first();

  After first(); gets called the rest of the code is in the first(); execution context
  then a variable will be stored in the first() execution context

  Then the second() function is called this creates a new execution context (second();)
  variable b will then be stored in second(); execution context

  Then the third(); function is called and creates a new execution context (third();)
  variable c will then be stored in third(); execution context
  After this function is complete it gets removed from the stack of execution context

  Then it will go back to the second function since it is the next execution context
  After the second(); function is finished it will be removed from the stack of execution context

  After the first(); function is finished we return to the global execution context
*/

/**********************************************
 *      38. Execution Context in Detail:      *
 * Creation and Execution Phases and Hoisting *
 **********************************************/

/*
  How is an execution context object created?
  Execution Context Object has 3 properties
    Variable Object(VO)
      Contains function objeects
      inner variable declarations
      function declarations
    Scope Chain
      current variable object
      variable object of all it's parents
    "This" variable

  When a function is called a new execution context is put on top of the execution stack
  This happens in two phases
  Creation phase
    A) Creation of the Variable Object(VO)
    B) Creation of the Scope Chain
    C) Determine value of the "This" variable
  Execution phase
    The code of the function that generated the current exectuion context is ran
    ran line by line
    All variables are defined
    If it's a global context it is global code that is executed

  Creation of variable object
    The argument object is created
      Contains all the arguements passed into the function
      Code is scanned for funtion declarations
        For each function a property is created in the Variable Object
          This points to the function
          This means all functions are stored in the variable object
            before code starts executing
      Code is scanned for variable declarations
        for each variable a property is created in the Variable object
          set to undefined
      The last two points are called hoisting
        This means they are actually available before execution starts
        Difference between functions and variables is
          functions are already defined before execution starts
          variables are set to undefined

*/









/**************************************
 *      39. Hoisting in Practice      *
 **************************************/
// Because of hoisting we can call a function before it is declared
//  This is because during the declaration phase the function is identified
//  This happens before the execution phase
//  This means that javascript already knows about the function before it is called
//    even though it is called first
//  THIS ONLY WORKS FOR FUNCTION DECLARATIONS
//  NOT FUNCTION EXPRESSIONS

//Functions
// calculateAge(1990);
//
// function calculateAge(year) {
//   console.log(2019 - year);
// }
//
//
// // This will cause an error and not work.
// // This is while function Declarations are hoisted and recognized by the
// //   interpreter before anything is run expressions are not
// //    This can be useful because you will have access to variables that are
// //      given values while the code is running
// // retirement(1990);
// // var retirement = function(year) {
// //   console.log(65 - (2016 - year));
// // };
//
// var retirement = function(year) {
//   console.log(65 - (2019 - year));
// };
//
// //  Variables
// //  When scanning for variable declarations
// //    JavaScript will identify variables but it will not assign values to them
// //      They will be automatically be given a value of undefined
// //      You will get a different error if the variable was declared and
// //        identified during hoisting and called before assigned a value than
// //        if you called without declaring at all. This is because it is the
// //        difference between a value of undefined and non-existent
// console.log(age);
// var age = 23;
// console.log(age);
//
//
// //  printing age inside and outside the function will show two different values
// //  This is because when called outside the function it is looking at the global
// //    execution context where it was assigned a value of 23 (above)
// //  When called inside the function it is looking at the foo execution context
// //  In essense they are two completely different variables w/ the same name
// //  Attempting to print age within foo before it is defined will result in undefined
// //    Again this is because JS recognizes that the variables exists, it just hasn't
// //    been assigned a value yet.
// function foo() {
//   console.log(age);
//   var age = 65;
//   console.log(age);
// }
// foo();
// console.log(age);



/********************************************
 *      40. Scoping and the Scope Chain     *
 ********************************************/
// What Does Scoping Mean?
//  Scoping answers: Where can we access a certain variable or function
//  Each function creates a scope:
//    That is the space/environment in which the variables it defines are available
//  Some other languages also have scopes created by if/for/while blocks
//    NOT IN JS
//  Only way to create a new scope is to write a new function
//  JS has Lexical Scoping
//    a function that is written within another function gets access
//      to the scope of the outer function (parent function)

// First scoping example
//
//  GLOBAL SCOPE
//    Has access to variable a and first() function
//
//  first() SCOPE
//    Has access to var b and second() function
//    Also has access to parent so it has access to var a too
//
//  second() SCOPE
//    has access to var c
//    Also has access to parent so it has access to var a and var b too
//
//  This only works in one direction
//    the global scope does not have access to var b
//    the first() scope does not have access to var c

// var a = 'Hello!';
// first();
//
// function first() {
//   var b = 'Hi!';
//   second();
//
//   function second() {
//     var c = 'Hey!';
//     console.log(a + b + c);
//   }
// }




// Example to show the differece between execution stack and scope chain
//  Because var b, c, d are not within the scope of third(); they will not be
//    useable by third();
// var a = 'Hello!';
// first();
//
// function first() {
//   var b = 'Hi!';
//   second();
//
//   function second() {
//     var c = 'Hey!';
//     third();
//   }
// }
//
// function third() {
//   var d = 'John';
//   console.log(a + b + c + d);
// }




/************************************
 *      41. The 'this' Keyword      *
 ************************************/

// this variable is a variable that all execution contexts get
// stored in execution context object
// Regular Function Call:
//   the this keyword points at the global object
//   (the window object, in the browser)
// Method Call:
//   the this variable points to the object calling the method
// The this keyword is not assigned a value until
//   the function where it is defined is actually called



/************************************************
 *      42. The 'This Keyword in Practice'      *
 ************************************************/
// console.log(this);

//  Because this is in the global object it still points to window
//    even though it is in a function

/*console.log(this);

calculateAge(1994);

function calculateAge(year) {
  console.log(2019 - year);
  console.log(this);
}*/

var john = {
  name: 'John',
  yearOfBirth: 1990,
  calculateAge: function() {
    console.log(this);
    console.log(2019 - this.yearOfBirth);

    //   function innerFunction() {
    //     console.log(this);
    //   }
    //   innerFunction();
  }
};

john.calculateAge();

var mike = {
  name: 'Mike',
  yearOfBirth: 1984
};


mike.calculateAge = john.calculateAge;
mike.calculateAge();