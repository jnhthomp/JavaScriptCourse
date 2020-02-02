/**************************************
 *      Type Test Data Controller     *
 **************************************/
// Controller to handle calculations and stores background data
// Store list of words to be used
// Randomizes the order of the words
//
// Calculats WPM
var TypeTestData = (function() {
  /**********************
   *      Word List     *
   **********************/
  // List of words to be typed
  // Cannot exceed 10,000
  var wordList = ['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at'];

  /********************************
   *      Randomize Word List     *
   ********************************/
  // Randomize the word list on load/reset button
  // Uses fisher/yates method https://bost.ocks.org/mike/shuffle/
  var randomizeWordList = function(wordList) {
    // Sets current index to the end of the array
    var currentIndex = wordList.length,
      temporaryValue, randomIndex;
    // Keep doig this until current index has worked backwards through the array
    while (0 !== currentIndex) {
      // Gets a random number smaller than the current idex
      randomIndex = Math.floor(Math.random() * currentIndex);
      // subtract 1 from the current index
      currentIndex -= 1;
      // this variable is given the word that is at the end of the worlist
      temporaryValue = wordList[currentIndex];
      // Sets the value of the index we have been using to the value of another random word in the array
      wordList[currentIndex] = wordList[randomIndex];
      // The word that was at the end swaps places with the previously selected word
      wordList[randomIndex] = temporaryValue;
    }
    // After working backwards through every word in the array return the array
    return wordList;
  };

  /************************
   *      Score Test      *
   ************************/
  // Should be a good way to calculate WPM found here: https://www.speedtypingonline.com/typing-equations
  var scoreTest = function(allTypedEntries, uncorrectedErrors, time) {
    // Time may need divided by 60 since we are using seconds for our timer
    wpm = ((allTypedEntries / 5) - uncorrectedErrors) / time;
  };

  /******************************
   *      Public Functions      *
   ******************************/
  return {
    // Initiate and setup a new word list
    createWordList: function() {
      return randomizeWordList(wordList);
    },

    // Run calculations to find wpm
    calcWPM: function(allTypedEntries, uncorrectedErrors, time) {
      return scoreTest(allTypedEntries, uncorrectedErrors, time);
    },

    // Store any methods used for testing functions in the TypeTestData controller
    testing: {
      randomizeWordList: function() {
        console.log(randomizeWordList(wordList));
      }
    }
  };
})();



/**************************
 *      UI Controller     *
 **************************/
// Makes changes and updates to the UI
var UIController = (function() {
  // store domElements to use elsewhere
  var domStrings = {
    // Where words to type are displayed
    wordList: 'word__box__1',
    // Where user types for test (ID)
    typingArea: 'typing__box',
    // Reset button
    resetButton: 'reset__button',
    // timer
    timer: 'timer'
  };

  // Formats the array of words to be displayed in UI
  var formatWordList = function(wordList) {
    // Creates a strign from the array
    wordList = wordList.toString(wordList);
    // Do this as long as the string contains commas
    while (wordList.includes(',', 0)) {
      // Take out commas and add spaces 'word1,word2,word3'->'word1 word2 word3'
      wordList = wordList.replace(',', ' ');
    }
    // Return the formatted word list
    return wordList;
  };

  // Set how long the timer should run for
  var startTime = 10;
  // Set seconds to the starting time
  var seconds = startTime;
  // create a timer variable
  var timer2;

  function countdownTimer() {
    if (seconds <= startTime) {
      document.getElementById(domStrings.timer).innerHTML = seconds;
    }
    if (seconds > 0) {
      seconds--;
    } else {
      clearInterval(timer2);
      timer2 = false;
      alert('You type x WPM');
    }
  }

  var showSeconds = function() {
    console.log('set seconds to 10');
    seconds = 10;
    document.getElementById(domStrings.timer).innerHTML = seconds;
  };

  return {
    updateWordList: function(wordList) {
      console.log(wordList);
      // since wordList is current a list with commas and no spaces we have to format to replace the commas with spaces
      wordList = formatWordList(wordList);
      console.log(wordList);
      document.getElementById(domStrings.wordList).textContent = wordList;
    },
    // returns list of domstrings
    getDomStrings: function() {
      console.log('domStrings are: ' + domStrings.wordList + ' and ' + domStrings.resetButton);
      return domStrings;
    },

    timerStart: function() {
      countdownTimer();
    },

    timerStart2: function() {
      console.log(timer2);
      if (!timer2) {
        timer2 = window.setInterval(function() {
          UIController.timerStart();
        }, 1000);
      }
    },

    resetTimer: function() {
      showSeconds();
    }
  };
})();

var Controller = (function() {

})();




/****************************
 *      Main Controller     *
 ****************************/
// Handles interactions between TypeTestData and UIController
var mainController = (function(TypeTestData, UIController) {
  // Creates a new wordList in TypeTestData
  // Passes this word list to UIController to update UI
  var setTestWords = function() {
    // Generate the randomized word list
    wordList = TypeTestData.createWordList();
    // console.log('mainController.setTestWords()' + wordList);

    // Update wordlist in UI
    UIController.updateWordList(wordList);


  };

  // Setup buttons to be clicked
  var setupEventListeners = function() {
    // store domStrings so we can use them
    var domStrings = UIController.getDomStrings();
    // console.log(domStrings);
    // Access domStrings to set event listeners on
    document.getElementById(domStrings.resetButton).addEventListener("click", function() {
      mainController.init();
    });


    document.getElementById(domStrings.typingArea).onkeydown = function() {
      UIController.timerStart2(timer);
    };
  };

  var resetTimer = function() {
    UIController.resetTimer();
  };

  return {
    init: function() {
      setTestWords();
      //UIController.timerStart();
      setupEventListeners();
      resetTimer();
    }
  };
})(TypeTestData, UIController);

mainController.init();