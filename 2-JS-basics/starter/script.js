/* jshint expr: true */
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
// //  Function Declaration
// //    Can later be passed to var
// //  function whatDoYouDo(job, firstName){}
//
// // Function Experession
// //    Function is saved as a variable
// //    When there is a return no break is needed
// var whatDoYouDo = function(job, firstName) {
//   switch (job) {
//     case 'teacher':
//       return firstName + ' teaches kids how to code.';
//     case 'driver':
//       return firstName + ' drives an uber.';
//     case 'designer':
//       return firstName + ' designs beautiful websites';
//     default:
//       return firstName + ' does something else';
//   }
// };
//
// console.log(whatDoYouDo('teacher', 'John'));
// console.log(whatDoYouDo('designer', 'Jane'));
// console.log(whatDoYouDo('retired', 'Mark'));
//
// //  Expressions
// //    return something
//
// //  Statement
// //    Doesn't return anything



/***********************
 *     22. Arrays      *
 ***********************/

// // INITIALIZE A NEW ARRAY
// //  Array can store multiple values in one variable
// //    Using brakcets is one way make an array
// //    Not as common method:
// //      use function "new Array"
// //      var arrayName = new Array(item1, item2, item3);
// //    1st eliment (item in the array) is #0 and so on
// var names = ['John', 'Mark', 'Jane'];
// var years = new Array(1990, 1969, 1948);
//
// console.log(names[0]); // Use the # of the position to get a specific item (0=1)
// console.log(names); // Don't specify a position to get all items
// console.log(names.length); // Use nameOfArray.length to return how many items
//
//
// // MUTATE ARRAY DATA
// //  You can assign a new value to a position in an array that array has a value
// //    name the array and specify the position you want to change in brackets
// //      REMEMBER: Position numbers start at 0
// //    Then assign it a new value like any other variable
// //  You can assign a variable to a position that doesn't exist yet by
// //    If you are adding an item to a position that is multiple spaces away
// //    from the end of the current array
// //    (ex arrayName.length = 3, defining array[5])
// //      There will be empty (undefined) spaces for arrayName[3 && 4]
// names[1] = 'Ben';
// names[5] = 'Mary';
// console.log(names);
//
// names[names.length] = 'test'; // will append value to the end of the array
// console.log(names);
//
// // Different Data Types
// //  Can get creative and hold different data types to hold different types of
// //  info about the same thing
// var john = ['John', 'Smith', 1990, 'teacher', false];
//
// //  Array Functions
// //    .push(x)
// //      adds element to the end of an array similar to method above
// //      Similar to arrayName[arrayName.length] = x; mentioned above
// //    .unshift(x)
// //      adds element to the beginning of an array
// //    .pop()
// //      removes the last item of the array
// //    .shift()
// //      removes the first item of the array
// //    .indexof(x)
// //      shows the position (starting at 0) of the specified value
// //      returns -1 if the value isn't present
// john.push('blue');
// john.unshift('Mr.');
//
// console.log(john);
//
// john.pop();
// john.pop();
// console.log(john);
//
// john.shift();
// console.log(john);
//
// console.log(john.indexOf(1990));
//
// // .indexOf(x) can be useful for things such as this
// var isDesigner = john.indexOf('designer') === -1 ? 'John is NOT a designer' : 'John IS a designer';
// console.log(isDesigner);
//
//
//
// //   Placeholder to keep extra lines from being deleted when I save
// //    Keeps work at top of screen



/*****************************************
 *      23-24. Coding Challenge # 3      *
 *****************************************/

/*
  John and family went on vacation to 3 restaurants
  Their bills were:
    124
    48
    268
  To tip a fair amount John created a tip calculator (as a function)
  He likes to tip:
    20% when bill < $50
    15% when $50 < bill < $200
    10% when bill > $200
    (20% < $50 < 15% < $200 < %10)
  John would like 2 arrays:
  1.  Containing all 3 tips
        1 for each bill
  2.  Containing all three final paid amounts (bill + tip)

  Note: to calculate 20% of a value
          multiply it with 20/100 = .2
*/

// // MY SOLUTION
//
// // Set value for each bill
// var bill1 = 124;
// var bill2 = 48;
// var bill3 = 268;
//
// // Create empty arrays
// var tipAmounts = [];
// var billTotals = [];
//
// // Main function to calculate value of the tip
// // Also adds tip to bill
// function calculateTip(bill) {
//   var tip; // Initializes var tip (not needed outside the function)
//   switch (true) {
//     // If bill is less than 50
//     case bill < 50:
//       tip = bill * 0.2; // Calculates tip
//       tipAmounts.push(tip); // Adds tip to bill amount
//       break;
//     case 50 <= bill && bill < 200:
//       tip = bill * 0.15;
//       tipAmounts.push(tip);
//       break;
//     case bill >= 200:
//       tip = bill * 0.1;
//       tipAmounts.push(tip);
//       break;
//     // Something would have to go very wrong to get here... but just in case...
//     default:
//       tip = 0;
//       tipAmounts.push(tip);
//   }
//   // Add tip to bill to get total bill
//   // Also push it to the end of the array
//   billTotals.push(bill + tip);
//   //console.log(tip); //Show tip after calculating (used while testing)
// }
//
// // Calculate tip and total for each bill
// calculateTip(bill1);
// calculateTip(bill2);
// calculateTip(bill3);
//
// // Output both arrays after they have been constructed
// console.log(tipAmounts);
// console.log(billTotals);

// // TEACHER SOLUTION
//
// function tipCalculator(bill) {
//   var percentage;
//   if (bill < 50) {
//     percentage = 0.2;
//   } else if (bill >= 50 && bill < 200) {
//     percentage = 0.15;
//   } else {
//     percentage = 0.1;
//   }
//   return percentage * bill;
// }
//
// var bills = [124, 48, 268];
// var tips = [tipCalculator(bills[0]),
//   tipCalculator(bills[1]),
//   tipCalculator(bills[2])
// ];
// var finalValues = [bills[0] + tips[0],
//   bills[1] + tips[1],
//   bills[2] + tips[2]
// ];
//
//
// console.log(tips, finalValues);



/****************************************
 *      25. Objects and Properties      *
 ****************************************/

// // Objects can be used to group several variables that are in no particular order
// //  Make an object with {} simlar to arrays ([])
// var john = {
//   firstName: 'John',
//   lastName: 'Smith',
//   birthYear: 1990,
//   family: ['Jane', 'Mark', 'Bob', 'Emily'],
//   job: 'teacher',
//   isMarried: false
// };
//
// // Several ways to access specific properties within an object
// console.log(john.firstName);
// var x = 'birthYear';
// console.log(john[x]);
//
// // Assign a value to a property in an object
// john.job = 'designer';
// john['isMarried'] = true;
// console.log(john);
//
// // Alternative way to create a new object
// var jane = new Object();
// jane.firstName = 'Jane';
// jane.birthYear = 1969;
// jane['lastName'] = 'smith';
// console.log(jane);



/************************************
 *      26. Objects and Methods     *
 ************************************/

// var john = {
//   firstName: 'John',
//   lastName: 'Smith',
//   birthYear: 1992,
//   family: ['Jane', 'Mark', 'Bob', 'Emily'],
//   job: 'teacher',
//   isMarried: false,
//   //Adding a function in an object
//   calcAge: function() {
//     this.age = 2018 - this.birthYear; // using this.birthyear we can use the value already in the object instead of having to pass it later
//   }
// };
//
// (john.calcAge());
// console.log(john);



/**************************************
 *      27-28. Coding Challenge 4     *
 **************************************/

/*******************************************************************************
  Let's remember the first coding challenge
  Mark and John compared their BMI's
  Let's now implement the same functionality w/ objects and methods

  1.  For each of them:
        Create an object with properties for:
          fullName
          mass
          height

  2.  Add a method to each object to calculate the BMI
      Save the BMI to the object and also return it from the method

  3.  Log to the console:
        Who has highest BMI
          Their fullName
          Their BMI
        Don't forget they might have the same BMI

  Remember: BMI = mass / height^2 || mass / (height * height)
            (mass in kg) (height in m)
*******************************************************************************/

// // MY SOLUTION
// var john = {
//   fullName: 'John Smith',
//   mass: 300,
//   height: 1.5,
//   calcBMI: function() {
//     this.bmi = this.mass / (this.height * this.height);
//     return this.bmi;
//   }
// };
//
// var mark = {
//   fullName: 'Mark Sanchez',
//   mass: 200,
//   height: 1.5,
//   calcBMI: function() {
//     this.bmi = this.mass / (this.height * this.height);
//     return this.bmi;
//   }
// };
//
// if (john.calcBMI() > mark.calcBMI()) {
//   console.log(john.fullName + ' has a higher BMI of ' + john.bmi);
// } else if (mark.calcBMI() > john.calcBMI()) {
//   console.log(mark.fullName + ' has a higher BMI of ' + mark.bmi);
// } else {
//   console.log(john.fullName + ' and ' + mark.fullName + 'had the same BMI of ' + john.bmi);
// }


// // TEACHER SOLUTION
// var john = {
//   fullName: 'John Smith',
//   mass: 92,
//   height: 1.95,
//   calcBMI: function() {
//     this.bmi = this.mass / (this.height * this.height);
//     return this.bmi;
//   }
// };
//
// var mark = {
//   fullName: 'Mark Miller',
//   mass: 78,
//   height: 1.69,
//   calcBMI: function() {
//     this.bmi = this.mass / (this.height * this.height);
//     return this.bmi;
//   }
// };
//
// if (john.calcBMI() > mark.calcBMI()) {
//   console.log(john.fullName + ' has a higher BMI of ' + john.bmi);
// } else if (mark.calcBMI() > john.calcBMI()) {
//   console.log(mark.fullName + ' has a higher BMI of ' + mark.bmi);
// } else {
//   console.log('They have the same BMI of ' + john.bmi);
// }



/************************************
 *      29. Loops and Iteration     *
 ************************************/

// //  Loops
// //  Helpful for automating repetative tasks
// //  To print 1-10 to the console you can WRITE:
// //    console.log(1); 10 times for 1-10
// //  Or you can use a loop
// //
// //  1. There is an initial value of a counter
// //  2. A condition that is evaluated before each loop iteration
// //  3. A couner update after each iteration
// //  LOOKS LIKE: for(1; 2; 3){}
// for (var i = 0; i < 10; i++) {
//   console.log(i);
// }
//
// //  For above:
// //  1.  On the first loop value for i is set to 0
// //  2.  If i is less than 10:
// //        execute inside {}
// //        continue to step 3
// //      If i is not less than 10:
// //        skip to step 5
// //  3.  i is incremented by 1
// //  4.  Go back to step 2
// //  5.  Exit the loop
//
//
// // Practical example of a for loop
// // var john = ['John', 'Smith', 1990, 'designer', false, 'blue'];
// // for (var i = 0; i < john.length; i++) {
// //   console.log(john[i]);
// // }
//
// // While Loops
// //  Only contains condition
// //  counter must be updated at the end of or within a loop
// // var i = 0;
// // while (i < john.length) {
// //   console.log(john[i]);
// //   i++;
// // }
//
// // Continue Statements
// //  If you wanted to only display items that are strings
// //  a continue can help
// var john = ['John', 'Smith', 1990, 'designer', false, 'blue'];
// for (var i = 0; i < john.length; i++) {
//   if (typeof john[i] !== 'string') {
//     continue;
//   }
//   console.log(john[i]);
// }
//
// // Break Statements
// //  If you wanted to stop the loop early if it encounters something that is not a string
// //  A break statement can be used to end the loop when it is encountered
// for (var i = 0; i < john.length; i++) {
//   if (typeof john[i] !== 'string') {
//     break;
//   }
//   console.log(john[i]);
// }
//
// // CHALLENGE
// // How would you loop through the john array backwards?]
// // Looping backwards:
// for (var i = john.length - 1; i >= 0; i--) {
//   console.log(john[i]);
// }



/********************************
 *      30-32. Challenge 5      *
 ********************************/
/*
  Remember the tip calculator challenge?
  Let's create a more advanced version using what we have learned

  John and his family went to 5 different restaurants
  The bills were:
    $124
    $48
    $268
    $180
    $42
  John tips:
    20% when bill < $50
    15% when $50 <= bill < $200
    10% when $200 <= bill
    (20% < $50 <= 15% < $200 <= 10%)

  Implement a tip calculator using objects and loops:
    1.  Create an object with an array for the bill values
    2.  Add a method to calculate the tip
    3.  This method should include a loop to iterate over all the paid bills
          Should also do tip calculations
    4.  as an output create:
          a) a new array containing all tips
          b) an array containing final paid amounts (bill + tip)
        HINT: Start with two empty arrays [] as properties
              then fill them up in the loop

    EXTRA AFTER FINISHING:
      Mark's family also went on a holiday going to 4 different restaurants
      The bills were:
        $77
        $375
        $110
        $45
      Mark tips:
        20% when bill < $100
        10% when $100 <= bill < $300
        25% when$ 300 <= bill
        (20% < $100 <= 10% < $300 <= 25%)

      5.  Implement the same functionality as before
            Use Mark's tipping rules
      6.  Create a function (not a method) to:
            calculate the average of a given array of tips
          HINT: Loop over the array and store the current sum
                After you have the sum of the array:
                  Divide it by the number of elements in it
      7. Calculatethe average tip for each family
      8. Log to the console which family paid the highest tips on average
*/

// MY SOLUTION
// Set up variables for John's Bills
var johnBill1, johnBill2, johnBill3, johnBill4, johnBill5;
johnBill1 = 124;
johnBill2 = 48;
johnBill3 = 268;
johnBill4 = 180;
johnBill5 = 42;

//  Object to store johnBillArray, johnTipArray, and johnTotalArray
//    Also calculates how much tip should be based on price and adds to bill
var johnTipCalc = {
  johnBillArray: [johnBill1, johnBill2, johnBill3, johnBill4, johnBill5],
  johnTipArray: [],
  johnTotalArray: [],
  getTipPercent: function() {
    for (var i = 0; i < this.johnBillArray.length; i++) {
      switch (true) {
        case this.johnBillArray[i] < 50:
          this.tip = 0.2;
          break;
        case this.johnBillArray[i] >= 50 && this.johnBillArray[i] < 200:
          this.tip = 0.15;
          break;
        default:
          this.tip = 0.1;
      }
      this.johnTipArray.push(this.tip * this.johnBillArray[i]);
      this.johnTotalArray.push(this.johnTipArray[i] + this.johnBillArray[i]);
    }
    console.log(this.johnTipArray, this.johnTotalArray);
  }
};

//  Run johnTipCalc.getTipPercent()
//    Populates johnTipCalc.johnTipArray and johnTipCalc.johnTotalArray
johnTipCalc.getTipPercent();

//  Setup variables for Mark's bills
var markBill1, markBill2, markBill3, markBill4;
markBill1 = 77;
markBill2 = 375;
markBill3 = 110;
markBill4 = 45;

//  Object to store markBillArray, markTipArray, and markTotalArray
//    Also calculates how much tip should be based on price and adds to bill
var markTipCalc = {
  markBillArray: [markBill1, markBill2, markBill3, markBill4],
  markTipArray: [],
  markTotalArray: [],
  getTipPercent: function() {
    for (var i = 0; i < this.markBillArray.length; i++) {
      switch (true) {
        case this.markBillArray[i] < 100:
          this.tip = 0.2;
          break;
        case this.markBillArray[i] >= 100 && this.markBillArray[i] < 300:
          this.tip = 0.1;
          break;
        default:
          this.tip = 0.25;
      }
      this.markTipArray.push(this.tip * this.markBillArray[i]);
      this.markTotalArray.push(this.markTipArray[i] + this.markBillArray[i]);
    }
    console.log(this.markTipArray, this.markTotalArray);
  }
};

//  Runs markTipCalc.getTipPercent()
//    Populates markTipCalc.markTipArray and markTipCalc.markTotalArray
markTipCalc.getTipPercent();

// Goes through given array and returns the average of all numbers
function tipAverageCalc(tipArray) {
  var sum = 0;
  for (var i = 0; i < tipArray.length; i++) {
    sum += tipArray[i];
  }
  var tipAverage = sum / tipArray.length;
  return tipAverage;
}

console.log(tipAverageCalc(johnTipCalc.johnTipArray)); // Average John's tips
console.log(tipAverageCalc(markTipCalc.markTipArray)); // Average Mark's tips

switch (true) {
  case tipAverageCalc(johnTipCalc.johnTipArray) > tipAverageCalc(markTipCalc.markTipArray):
    console.log('John had higher average tips at $' + tipAverageCalc(johnTipCalc.johnTipArray));
    break;
  case tipAverageCalc(johnTipCalc.johnTipArray) < tipAverageCalc(markTipCalc.markTipArray):
    console.log('Mark had higher average tips at $' + tipAverageCalc(markTipCalc.markTipArray));
    break;
  default:
    console.log('John and Mark paid the same amount in tips');
}

// // TEACHER SOLUTION
// var john = {
//   fullName: 'John Smith',
//   bills: [124, 48, 268, 180, 42],
//   calcTips: function() {
//     this.tips = [];
//     this.finalValues = [];
//
//     for (var i = 0; i < this.bills.length; i++) {
//       // Determine percentage based on tipping rules
//       var percentage;
//       var bill = this.bills[i];
//       if (bill < 50) {
//         percentage = 0.2;
//       } else if (bill >= 50 && bill < 200) {
//         percentage = 0.15;
//       } else {
//         percentage = 0.1;
//       }
//       // Add results to corresponding arrays
//       this.tips[i] = bill * percentage;
//       this.finalValues[i] = bill + (bill * percentage);
//     }
//   }
// };
//
// var mark = {
//   fullName: 'Mark Miller',
//   bills: [77, 375, 110, 110],
//   calcTips: function() {
//     this.tips = [];
//     this.finalValues = [];
//
//     for (var i = 0; i < this.bills.length; i++) {
//       // Determine percentage based on tipping rules
//       var percentage;
//       var bill = this.bills[i];
//       if (bill < 100) {
//         percentage = 0.2;
//       } else if (bill >= 100 && bill < 300) {
//         percentage = 0.1;
//       } else {
//         percentage = 0.25;
//       }
//       // Add results to corresponding arrays
//       this.tips[i] = bill * percentage;
//       this.finalValues[i] = bill + (bill * percentage);
//     }
//   }
// };
//
// function calcAverage(tips) {
//   var sum = 0;
//   for (var i = 0; i < tips.length; i++) {
//     sum += tips[i];
//   }
//   return sum / tips.length;
// }
//
// // Do the calculations
// john.calcTips();
// mark.calcTips();
//
// john.average = calcAverage(john.tips);
// mark.average = calcAverage(mark.tips);
// console.log(john, mark);
//
// if (john.average > mark.average) {
//   console.log(john.fullName + '\'s family pays higher tips, with an average of $' + john.average);
// } else if (mark.average > john.average) {
//   console.log(mark.fullName + '\'s family pays higher tips, with an average of $' + mark.average);
// } else {
//   console.log(john.fullName + ' and ' + mark.fullName + ' paid the same amount of tips, with an average of $' + john.average);
// }

/**************************************************************
 *      33. JavaScript Versions: ES5, ES6/ES2015 and ES6+     *
 **************************************************************/
/*
 A (very) Short History of JavaScript

 1996: Changed from LiveScript to JavaScript to attract Java Developers
       Java has almost nothing to do with Java

 1997: ES1 (ECMAScript1) became the first version of the JavaSctipt language standard:
         ECMAScript: The language standard
         JavaScript: The language in practice

 2009: ES5(ESCAScript 5) was released with lots of new features
         Took a long time for browsers to implement

 2015: ES6/ES2015(ECMAScript 2015) was released
       This was the biggest update to the language ever!
       Changed to an annual release cycle

 2016/2017/2018/2019: Release of ES2016/ES2017/ES2018/ES2019


 ES5
   Supported by all browsers
   Ready to be used today

 ES6(ES2015)/ES7(ES2016)/ES8(ES2017)
   Well supported in all modern browsers
   No support in older browsers
   Can use most features in production with transpiling and polyfilling
     (converting to ES5)

 ES9(ES2018)/ES10(ES2019)
   Future versions, together called ESNext
   Some features supported in modern browers
   Can already use some features in production with transpiling and polyfilling

 *For more compatability information visit: http://kangax.github.io.compat-table

 This course will use ES5 in the first part of the course
 The second part of the course will use ES6+
 ES5
   JavaScript fundamentals
   How the language works
   DOM manipulation project
   Advanced language features
   Huge real project
 ES6
   ES6/ES2015 introduction
   Asunchronous JavaScript
   AJAX and API calls
   Modern dev setups (Webpack and Babel)
   Huge real project

 Why bother with ES5?
   You will have to understand ES5 now and in the future
   Many tutorials and example codes are still written in ES5
   Sometimes you will have to work on older code bases
   It is better and easier to learn fundamentals of ES5 and then update to ES6+
*/





/****************BOTTOM OF PAGE - PLACEHOLDER - BOTTOM OF PAGE****************/