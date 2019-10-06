/***************************************
 *     8. Variables and Data Types      *
 ****************************************/

/*
 Output text to console
console.log('Hello World!!!');
*/


//  Create a variable
//    Don't have to declare variable type as in Java or Python
//    Camel case is JavaScript convention although underscores would work too
//      (first_name) or (firstName)
// var firstName = 'John'; // Single quotes '' or double quotes "" will work
//
// console.log(firstName);
//
// var lastName = 'Smith';
//
// //  For numbers you don't need quotes
// var age = 28;
//
// /*
//   This is a boolean and if we wanted to have a value of the word true
//     We would have had to put it in quotes 'true'
//     You can identify booleans from strings in the console by their color
// */
//
// var fullAge = true;
//
// /*
//   Variables should be given true and meaningful names
//     We should always avoid giving variables vague or uninformative names
// */
//
// console.log(fullAge);
//
// //  Here a variable value was declared without a value given
// //    Output will be undefined
// var job;
// console.log(job);
//
// //  Assigning a value to an undefined variable
// var job = 'Teacher';
// console.log(job);

/*
  In JavaScript there are 5 Primative (Non-object) Data Types
    JavaScript has dynamic typing
      Data types are automatically assigned to variables
      This is different from Java or Python where data types have to be declared
      We do not have to manually define the datatype of a variables
      Although convenient this can cause some erros and bugs

    Number
      Floating point numbers, for decimals and integers
      Also has decimals even if they aren't shown
        Different from Java where there are integers and doubles

    String
      Sequence of characters, used for text

    Boolean
      Logical data type that can only be true or false

    Undefined
      Data type of a variable that does not have a value yet
      Automatically assigned to a variable when it is created

    Null
      Also means 'non-existent'
*/

/*
  Rules when naming variables:

    Variables cannot start with numbers or symbols
      The only exception is when is the dollar sign ($) and underscore (_)
      ex: var 3years = 3;
        This would not work because you can't start with a number
      You also cannot put symbols in the middle of a variable name
        ex: var john/mark = 'John';
          you cannot have symbols in the middle of a variable

    You cannot use reserved JavaScript keywords cannot be used
      ex: var function = 23;
          var delete = 23;
          var if = 23;
        These are all reserved keywords and are not available as variable names
*/


/**************************************************
 *     9. Variable Mutation and Type Coercion      *
 ***************************************************/

// var firstName = 'John';
// var age = 28;
//
// //  TYPE COERCION //
// /*
//   JavaScript has a feature called Type Coercion
//     This means it will automatically convert data types as needed
//     Below you can run both firstName and age together
//       even though they are different data types
// */
//
// console.log(firstName + ' ' + age);
//
// // You can declare multiple variables on one line without assigning a value
// // The declared (undefined) variables above can be assigned a value later
// var job, isMarried;
//
// job = 'teacher';
// isMarried = false;
//
// console.log(firstName + ' is a ' + age + ' year old ' + job + '. Is he married? '
//  + isMarried);
//
// //  VARIABLE MUTATION //
//
// // Even though age was a number before
// //    You can reassign the variable and have it automaticallly change data types
// age = 'Twenty eight';
// job = 'driver';
//
// //  alert will result in a popup window
// //    This way you can see information without having to open console
// //    console should be used for things that don't need to be seen
// //      ex: debugging
//
// alert(firstName + ' is a ' + age + ' year old ' + job + '. Is he married? '
//   + isMarried);
//
// // prompt can be used to get data from the user
// // assign it to a variable in order to save their input
// var lastName = prompt('What is his last name?');
// console.log(firstName + ' ' + lastName);

/************************************
 *     10. JaveScript Operators      *
 *************************************/

// Operators are like funtions and can manipulate data or Variables
// var now, yearJohn, yearMark;
// var now = 2019;
// ageJohn = 28;
// ageMark = 33;
//
// // MATH OPERATORS
// yearJohn = now - 28;
// yearMark = now - 33;
// console.log(yearJohn);
//
// console.log(now + 2);
// console.log(now * 2);
// console.log(now / 10);
//
// // LOGICAL OPERATORS
// // Create a boolean
// var johnOlder = ageJohn < ageMark;
// console.log(johnOlder);
//
// // typeof OPERATOR
// //  Can be used to find what datatype is stored in a variable or given
// console.log(typeof johnOlder);
// console.log(typeof ageJohn);
// console.log(typeof 'Mark is oldre than John');
//
// var x;
// console.log(typeof x);

/**********************************
 *     11. Operator Precedence     *
 ***********************************/

// var now, yearJohn, fullAge;
// now = 2018;
// yearJohn  = 1989;
// fullAge = 18;
//
// // How does js know whether to subtract or compare yearJohn w/ fullAge first?
// var isFullAge = now - yearJohn >= fullAge; //true
// console.log(isFullAge);
//
// /*
//   ORDER OF OPERATIONS
//   https://www.sitepoint.com/javascript-operators-conditionals-functions/
// */
//
// var ageJohn = now - yearJohn;
// var ageMark = 35;
// // Grouping: By putting the addition in () it makes it execute before
// //  even though normally / would be first
// var average = (ageJohn + ageMark) / 2;
// console.log(average);
//
// //Multiple assignments
// var x, y;
// // You can assign the same value to multiple variables at once
// x = y = (3 + 5) * 4 - 6; // 8 * 4 - 6 // 32 - 6 // 26
// console.log(x, y);
//
//
// //  MORE OPERATORS
// //  The below two examples mean the same thing
// //    similar syntax as java
// x *= 2; // Same as x = x * 2;
// console.log(x);
// x  += 10; // Same as x = x + 10;
// console.log(x);
// x++; // Same as x = x + 1;
// console.log(x);
// x--; // Same as x = x - 1;
// console.log(x);

/*************************************
 *     12-13. CODING CHALLENGE 1      *
 **************************************/

/*
  Mark and John are trying to compare their BMI (Body Mass Index)
  Calculated with formula: (mass in kg) (height in meter)
    BMI = mass / height^2 or mass / (height * height)

  1.  Store Mark's and John's mass and height in variables
  2.  Calculate both of their BMI's
  3.  Create a boolean variable about whether Mark has a higher BMI than John
  4.  Print a string to the console containing the variable from step 3.
        (ex: "Is Marks's BMI higher than John's? true")

  MY SOLUTION FIRST; TEACHER SOLUTION BELOW THAT
*/

// MY SOLUTION

// var markMass, markHeight, markBMI, johnMass, johnHeight, johnBMI;
//
// markMass = 200;
// markHeight = 10;
// johnMass = 30;
// johnHeight = 8;
//
// markBMI = markMass / (markHeight * markHeight);
// johnBMI = johnMass / (johnHeight * johnHeight);
//
// var markHigherBMI = markBMI > johnBMI;
// console.log("Is Mark's BMI higher than John's BMI? " + markHigherBMI);


// TEACHER SOLUTION

// var massMark = 78; //kg
// var heightMark = 1.69; // meters
//
// var massJohn = 92; //kg
// var heightJohn = 1.95; // meters
//
// var bmiMark = massMark / (heightMark * heightMark);
// var bmiJohn = massJohn / (heightJohn * heightJohn);
//
// var markHigherBMI = bmiMark > bmiJohn;
//
// console.log(bmiMark, bmiJohn);
// //  Notice escape character used to keep ' from ending the string
// console.log('Is Mark\'s BMI higher than John\'s ' + markHigherBMI);

/************************************
 *     14. If / Else Statements      *
 *************************************/

// var firstName = 'John';
// var civilStatus = 'single';
//
// /*  To Start If Statement:
//       start with if
//       inside parenthesis put a logical boolean statement
//         If statement inside is true; function will execute
//       You don't have to have an else statement
//       If there is an else statement AND the statement after if was false
//           The function inside the else brackets will execute
// */
//
// var isMarried = true;
// if (isMarried){ // Use 3 = signs for now; will discuss 2 later
//   console.log(firstName + ' is married!');
// } else {
//   console.log(firstName + ' will hopefully marry soon');
// }
//
//
//
// var massMark = 78; //kg
// var heightMark = 1.69; // meters
//
// var massJohn = 112; //kg
// var heightJohn = 1.95; // meters
//
// var bmiMark = massMark / (heightMark * heightMark);
// var bmiJohn = massJohn / (heightJohn * heightJohn);
//
// // With if/else statements we can substitute the method from the challenge
// // with the method below
// // var markHigherBMI = bmiMark > bmiJohn;
// //
// // console.log(bmiMark, bmiJohn);
// // //  Notice escape character used to keep ' from ending the string
// // console.log('Is Mark\'s BMI higher than John\'s ' + markHigherBMI);
//  if (bmiMark > bmiJohn){
//    console.log('Mark\'s BMI is higher than John\'s');
//  } else {
//    console.log('Mark\'s BMI is not higher than John\'s')
//  }

/****************************
 *     15. Boolean Logic     *
 *****************************/

// var firstName = 'John';
// var age = 26;
//
//
// /*
//   AND, OR & NOT
//     AND (&&)
//       Only true if all arguements are true
//     OR (||)
//       Only one statement has to be true to be true
//     NOT (!)
//       Inverts true/false value
// */
// if(age < 13){
//   console.log(firstName + ' is a boy');
// } else if(age >= 13 && age < 20){ // age between 13 & 20
//   console.log(firstName + ' is a teenager');
// } else if(age >= 20 && age < 30){
//   console.log(firstName + ' is a young man');
// }
// else {
//   console.log(firstName + ' is a man');
// }

/********************************************************
 *     16. The Ternary Operator and Switch statements    *
 *********************************************************/

// // Ternary Operator allows you to write an if/else statement in one line
// var firstName = 'John';
// var age = 18;
//
// //  Start with condition;
// //    then a ? followed by the action that should happen if true
// //    Next a : followed by the action that should happen if false
// age >= 18 ? console.log(firstName + ' drinks beer.')
// : console.log(firstName + ' drinks juice.');
//
// var drink  = age >= 18 ? 'beer' : 'juice';
// console.log(firstName + ' drinks ' + drink);
//
// // This is how the above would look as an if/else statement
// // if(age >= 18){
// //   var drink = 'beer';
// // } else {
// //   var drink = 'juice';
// // }
//
// // Switch Statement
// var job = 'instructor';
//
// //  Start with switch
// //    in () put the condition you want to test
// //    inside {} create cases to happen based on value of condition from above
// //      follow the case with a : followed by what should happen if that is true
// //      use a break to stop evaluating other cases after finding a true case
// switch(job){
//   case 'teacher':
//   case 'instructor':
//     console.log(firstName + ' teaches kids how to code.');
//     break;
//   case 'driver':
//     console.log(firstName + ' drives an uber.');
//     break;
//   case 'designer':
//     console.log(firstName + ' designs beautiful websites.');
//     break;
//   default:
//     console.log(firstName + ' does something else');
// }
//
// // Change the following to be a switch statement
//
// // if(age < 13){
// //   console.log(firstName + ' is a boy');
// // } else if(age >= 13 && age < 20){ // age between 13 & 20
// //   console.log(firstName + ' is a teenager');
// // } else if(age >= 20 && age < 30){
// //   console.log(firstName + ' is a young man');
// // }
// // else {
// //   console.log(firstName + ' is a man');
// // }
//
// // Solution:
//
// var age = 32;
//
// switch(true){
//   case age <= 12:
//     console.log(firstName + ' is a boy.');
//     break;
//   case age >= 13 && age <= 19:
//     console.log(firstName + ' is a teenager.');
//     break;
//   case age >= 20 && age <= 29:
//     console.log(firstName + ' is a young man.');
//     break;
//   default:
//     console.log(firstName + ' is a man.');
// }

/**************************************************************
 *     17. Truthy and Falsy Values and Equality Operators      *
 ***************************************************************/

//
// //  Falsy values are:
// //    Undefined
// //    Null
// //    0
// //    '' (empty string)
// //    NaN (not a number)
// //  These 5 values will evaluate to false in a true/false condition
//
// //  Truthy values are any values that are not Falsy
//
// // If a variable is declared but not assigned it will be undefined and falsy
// var height;
// height = 0; // will also happen if variable is 0, an empty string, or null
//
// if(height || height === 0){
//   console.log('Variable is defined');
// } else{
//   console.log('Variable has not been defined');
// }
//
// // Strict equality (===) vs NonStrict equality (==)
// //  With ==
// //    Will only check if the values are the same, does not care about data type
// //  With ===
// //    Data type and value both have to match exactly
// height = 23;
// if (height == '23'){
//   console.log('The == operator does type coercion!');
// }

/*************************************
 *     18-19. Coding Challenge 2      *
 **************************************/

// /*******************************************************************************
//   John and Mike both play basketball on different teams.
//   In the latest 3 games:
//     Johns team scored:
//       89
//       120
//       103
//     Mikes team scored:
//       116
//       94
//       123
//   1.  Calculate the averageg score for each team
//
//   2.  Decide which team wins in the average (highest average score)
//         Print the winner to the console
//         Include average score in the output
//
//   3.  Change the scores to show different winners
//         Don't forget there might be a draw
//
//   4.  EXTRA: Mary Also plays basketball
//         Mary's team scored:
//           97
//           134
//           105
//       Like before log the average winnder to the console
//       You will need && operator to make deecision
//       If you can't solve watch solution
//
//   5.  Change the scores to generate different winners
//         Keep in mind there might be a draw
// *******************************************************************************/
//
// //  MY SOLUTION
// var johnG1, johnG2, johnG3, johnAvg,
//     mikeG1, mikeG2, mikeG3, mikeAvg,
//     maryG1, mayG2, maryG3, maryAvg;
//
// johnG1 = 50;
// johnG2 = 50;
// johnG3 = 50;
// johnAvg = (johnG1 + johnG2 + johnG3) / 3;
// console.log('John\'s team\'s average score is: ' + johnAvg); // Check John Avg
//
// mikeG1 = 50;
// mikeG2 = 50;
// mikeG3 = 50;
// mikeAvg = (mikeG1 + mikeG2 + mikeG3) / 3;
// console.log('Mike\'s team\'s average score is: ' + mikeAvg); // Check Mike Avg
//
// maryG1 = 50;
// maryG2 = 50;
// maryG3 = 50;
// maryAvg = (maryG1 + maryG2 + maryG3) / 3;
// console.log('Mary\'s team\'s average score is: ' + maryAvg);
//
// switch(true){
//   // If John wins against both Mike and Mary
//   case johnAvg > mikeAvg && johnAvg > maryAvg:
//      console.log('John\'s team has the highest average with ' + johnAvg + ' points!');
//      break;
//   // If John ties for first w/ either Mike or Mary
//   case johnAvg === mikeAvg && johnAvg > maryAvg:
//      console.log('John\'s team tied with Mike\'s team for first with ' + johnAvg + ' points!');
//      break;
//   case johnAvg === maryAvg && johnAvg > mikeAvg:
//     console.log('John\'s team tied with Mary\'s team for first with ' + johnAvg + ' points!');
//     break;
//
//   // If Mike wins against both John and Mary
//   case mikeAvg > johnAvg && mikeAvg > maryAvg:
//     console.log('Mike\'s team had the highest average with ' + mikeAvg + ' points!');
//     break;
//   // If Mike ties for first w/ either John or Mary
//   //    Tie with John handled in John section
//   case mikeAvg == maryAvg && mikeAvg > johnAvg:
//     console.log('Mike\'s team tied with Mary\'s team for first with ' + mikeAvg + ' points!');
//     break;
//
//   // If Mary wins against both John and Mike
//   case maryAvg > johnAvg && maryAvg > mikeAvg:
//     console.log('Mary\'s team had the highest average with ' + maryAvg + ' points!');
//     break;
//   // If Mary ties for first w/ either John or Mike
//   //    Tie with John handled in John section
//   //    Tie with Mike handled in Mike section
//
//   // If ALL teams tie
//   case johnAvg === mikeAvg && johnAvg === maryAvg:
//     console.log('John, Mike, and Mary\'s teams all tied with ' + johnAvg + ' points!!!');
// }

// TEACHER SOLUTION FULL

// var scoreJohn = (89 + 120 + 103) / 3;
// var scoreMike = (119 + 94 + 123) / 3;
// var scoreMary = (97 + 134 + 105) / 3;
// console.log(scoreJohn, scoreMike, scoreMary);
//
// if(scoreJohn > scoreMike && scoreJohn > scoreMary){
//   console.log('John wins with ' + scoreJohn + ' points');
// } else if(scoreMike > scoreJohn && scoreMike > scoreMary){
//   console.log('Mike wins with ' + scoreMike + ' points');
// } else if(scoreMary > scoreJohn && scoreMary > scoreMike){
//   console.log('Mary wins with ' + scoreMary + ' points');
// } else{
//   console.log('There is a draw');
// }

// TWO TEAM SOLUTION
//DONE BEFORE ADDING MARY
// if(scoreJohn > scoreMike){
//   console.log('John\'s team wins with ' + scoreJohn + ' points');
// } else if (scoreMike > scoreJohn){
//   console.log('Mike\'s team wins with ' + scoreMike + ' points');
// } else{
//   console.log('There is a draw with ' + scoreMike + ' points');
// }


/************************
 *     20. Functions     *
 *************************/

// //  Hold lines of code that we can run repeatedly
// //  Receives input and provides an output
// //  First declare the function and add a name
// //    ex: function name
// //  Then add () for any variables or arguements that need passed
// //    ex: function name(variable)
// //  Add {} and enter what you want to happen inside
// //  Use return to specify what the function should "spit out"
// //    Functions don't have to return anything
// function calculateAge(birthYear) {
//   return 2019 - birthYear;
// }
//
// var ageJohn = calculateAge(1990);
// var ageMike = calculateAge(1948);
// var ageJane = calculateAge(1969);
// console.log(ageJohn, ageMike, ageJane);
//
// function yearsUntilRetirement(year, firstName) {
//   var age = calculateAge(year);
//   var retirement = 65 - age;
//
//   if (retirement > 0) {
//     console.log(firstName + ' retires in ' + retirement + ' years.');
//   } else {
//     console.log(firstName + ' is already retired');
//   }
// }
//
// yearsUntilRetirement(1990, 'John');
// yearsUntilRetirement(1948, 'Mike');
// yearsUntilRetirement(1969, 'Jane');


/***************************************************
 *     21. Function Statements and Expressions     *
 ***************************************************/
//  Function Declaration
//    Can later be passed to var
//  function whatDoYouDo(job, firstName){}

// Function Experession
//    Function is saved as a variable
//    When there is a return no break is needed
var whatDoYouDo = function(job, firstName) {
  switch (job) {
    case 'teacher':
      return firstName + ' teaches kids how to code.';
    case 'driver':
      return firstName + ' drives an uber.';
    case 'designer':
      return firstName + ' designs beautiful websites';
    default:
      return firstName + ' does something else';
  }
};

console.log(whatDoYouDo('teacher', 'John'));
console.log(whatDoYouDo('designer', 'Jane'));
console.log(whatDoYouDo('retired', 'Mark'));

//  Expressions
//    return something

//  Statement
//    Doesn't return anything






//   Placeholder to keep extra lines from being deleted when I save
//    Keeps work at top of screen