/*jshint esversion: 6 */
/*jshint esversion: 8*/

/********************************************************
 *      120. An Example of Asynchronous JavaScript      *
 ********************************************************/
//  // Typically js runs in sequence
// const second = () => {
//   console.log('Second');
// };
//
// const first = () => {
//   console.log('Hey there');
//   second();
//   console.log('The end');
// };
//
// first(); // output: Hey there => Second => The end

// // We can use setTimout to run events asynchronous (with specified timing)
// const second = () => {
//   // setTimeout takes 2 arguements
//   // The first is the callback function or the function that should run
//   // The second is the amount of time to wait between running that function
//   setTimeout(() => {
//     console.log('Async Hey there');
//   }, 2000);
// };
//
// const first = () => {
//   console.log('Hey there');
//   second();
//   console.log('The end');
// };
//
// first();



/************************************************************************
 *      121. Understanding Asynchronous JavaScript: The Event Loop      *
 ************************************************************************/
/*
  All code that we have written has been Synchronous code
    Synchronous - Processes run one after the other, line by line.
    Asynchronous - Process can be run out of order/or at the same time

  The event loop is part of what handles events
  When a web API function like setTimout is called it is actually held in the web api until it is activated
  When it is activted it goes to the message queue
  The event loop looks at the execution stack and when it is empty it pushes the first item from the message queue into the execution stack
  The function from the web API (setTimout) is executed in the stack as normal

*/



/**********************************************************************
 *      122. The Old Way: Asynchronous JavaScript with Callbacks      *
 **********************************************************************/
// This is the more traditional way of dealing with asynchronous code
// This can get out of hand and difficult to handle very quickly (callback hell)

// function getRecipe() {
//   setTimeout(() => {
//     const recipeID = [523, 883, 432, 974];
//     console.log(recipeID);
//
//     setTimeout((id) => {
//       const recipe = {
//         title: 'Fresh tomato pasta',
//         publisher: 'Jonas'
//       };
//       console.log(`${id}: ${recipe.title}`);
//       setTimeout(publisher => {
//         const recipe2 = {
//           title: 'Italian Pizza',
//           publisher: 'Jonas'
//         };
//         console.log(recipe);
//       }, 1500, recipe.publisher);
//     }, 1000, recipeID[2]);
//   }, 1500);
// }
//
// getRecipe();



/*************************************************
 *      123. From Callback Hell to Promises      *
 *************************************************/
//  This is an ES6 feature built specifically to deal with asynchronous js
//  A promise is:
//    an object
//    keeps track of whether a certain event has happened or not
//    determines what happens after the event has happened

//  A promise has different states
//    Pending - before the event has happened
//    Settled/Resolved - after the event has happened
//      Fulfilled - Promise is sucessful
//      Rejected - There was an error with a promise
//    Callback functions can be used when a promise is both fulfilled and rejected

//  Recreation of the last lesson
//  Receives resolve and reject because they are used to determine what should happen depending on if the event was sucessful or not
//  If sucessful call resolve function
//  If unscuessful call the reject function
// const getIDs = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve([523, 883, 432, 974]); // What to return if the promise is sucessful
//   }, 1500);
// });
//
// const getRecipe = (recID) => {
//   return new Promise((resolve, reject) => {
//     setTimeout((ID) => {
//       const recipe = {
//         title: 'Fresh Tomato Pasta',
//         publisher: 'Jonas'
//       };
//       resolve(`${ID}: ${recipe.title}`);
//     }, 1500, recID);
//
//   });
// };
//
// const getRelated = (publisher) => {
//   return new Promise((resolve, reject) => {
//     setTimeout((pub) => {
//       const recipe = {
//         title: 'Italian Pizza',
//         publisher: 'Jonas'
//       };
//       resolve(`${pub}: ${recipe.title}`);
//     }, 1500, publisher);
//   });
// };

//  .then is used to handle sucessful promises
//    It can accept an arguement of whatever is returned by resolve
//    Can also receive a callback function
//    IDs will be the result of the sucessful promise
//    In this case it will be the array [523, 883, 432, 974]
//  .catch is used to handle unsucessful promises.
//    Can accept an argument of whatever is return by reject
//  You can chain promises by returning a promise and adding another .then after

// getIDs
//   .then(IDs => {
//     console.log(IDs);
//     return getRecipe(IDs[2]);
//   })
//   .then((recipe) => {
//     console.log(recipe);
//     return getRelated('Jonas Schedtmann');
//   })
//   .then((recipe) => {
//     console.log(recipe);
//   })
//   .catch(error => {
//     console.log('Error!');
//   });



/***********************************************
 *      124. From Promises to Async/Await      *
 ***********************************************/
// // From above
// const getIDs = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve([523, 883, 432, 974]); // What to return if the promise is sucessful
//   }, 1500);
// });
//
// const getRecipe = (recID) => {
//   return new Promise((resolve, reject) => {
//     setTimeout((ID) => {
//       const recipe = {
//         title: 'Fresh Tomato Pasta',
//         publisher: 'Jonas'
//       };
//       resolve(`${ID}: ${recipe.title}`);
//     }, 1500, recID);
//
//   });
// };
//
// const getRelated = (publisher) => {
//   return new Promise((resolve, reject) => {
//     setTimeout((pub) => {
//       const recipe = {
//         title: 'Italian Pizza',
//         publisher: 'Jonas'
//       };
//       resolve(`${pub}: ${recipe.title}`);
//     }, 1500, publisher);
//   });
// };
//
// // Designed to help consume promises, not to produce them
// // Usually we will be consuming promises from an API
// async function getRecipesAW() {
//   const IDs = await getIDs;
//   console.log(IDs);
//   const recipe = await getRecipe(IDs[2]);
//   console.log(recipe);
//   const related = await getRelated('Jonas Schmedtmann');
//   console.log(related);
//
//   return recipe;
// }
//
// // The below won't work. This is because it runs synchronously
// //  By the time console.log(result) runs getRecipesAW hasn't finished running yet and therefore has nothing to return
// // const result = getRecipesAW();
// // console.log(result);
//
// // By using a then we can create another promise that will automatically be resolved and return whatever we pass into it(result) and execute the callback function
// getRecipesAW().then((result) => {
//   console.log(`${result} is the best ever!`);
// });



/********************************
 *      125. AJAX and APIs      *
 ********************************/
//  What is AJAX?
//  Asynchronous JavaScript And XML
//  Allows us to asynchronously communicate with remote servers
//  ex
//    JS app is running in the browser
//    We want to get data from server without reloading page
//    With AJAX we can do a HTTP request to/from the server

//  What is an API?
//  Application Programming Interface
//  Software that can be used by other software to allow other applications to talk to each other
//  API allows communication between JS and server
//  Receives requests and responses from JS and Server and passes it between the two in a way they can both understand



/************************************************************
 *      126. Making AJAX Calls with Fetch and Promises      *
 ************************************************************/
// we can use fetch to get access to APIs
// This links to a json file from metaweather containing data
// Use cors-anywhere to get data. idk why.
fetch('https://api.darksky.net/forecast/8d6e83ed91024d4f932f6017e9b919fc/37.8267,-122.4233')
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });






























































const tools = (function() {
  return {
    titleBlock: function(lessonNum, title) {
      const mRow = `\ *      ${lessonNum}. ${title}      *`;
      const tRow = `/${'*'.repeat(mRow.length - 1)}`;
      const bRow = `\ ${'*'.repeat(mRow.length -1)}/`;
      console.log(`${tRow}\n${mRow}\n${bRow}`);
    }
  };
}());