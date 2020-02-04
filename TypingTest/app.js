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
  // Cannot exceed 10,000 characters - number of words (for spaces)
  var wordList = ['test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test'];
  var totals = {
    allTypedEntries: 0,
    uncorrectedErrors: 0
  };
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
  var scoreTest = function(allTypedEntries, uncorrectedErrors) {
    // Time may need divided by 60 since we are using seconds for our timer
    wpm = ((allTypedEntries / 5) - uncorrectedErrors) / 1;
    return wpm;
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
    calcWPM: function() {
      return scoreTest(totals.allTypedEntries, totals.uncorrectedErrors);
    },

    calcWordScore: function(typedWord, testWord) {
      var uncorrectedErrors = 0;
      var i = 0;
      //console.log('Word to test: ' + testWord);
      //console.log('Length of word: ' + testWord[0].length);
      if (testWord[0]) {
        while (i < testWord[0].length) {
          curTyped = typedWord.charAt(i);
          curTest = testWord[0][i];
          console.log('Typed: ' + curTyped + ' Test: ' + curTest);
          if (curTyped !== curTest) {
            uncorrectedErrors++;
          }
          i++;
        }
      }
      return {
        wordLength: testWord[0].length + 1, // +1 for space
        wordErrors: uncorrectedErrors
      };
    },

    updateTotals: function(wordScore) {
      totals.allTypedEntries += wordScore.wordLength;
      totals.uncorrectedErrors += wordScore.wordErrors;
      console.log('Current typed entries: ' + totals.allTypedEntries + ' Current error count: ' + totals.uncorrectedErrors);
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
  // Receives an array of words
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
  var startTime = 60;
  // Set seconds to the starting time
  var seconds = startTime;
  // create a timer variable
  var timer2;

  // Run countdown timer
  function countdownTimer() {
    // Show the amount of seconds if seconds <= startTime
    //  This should be always and I want it to show always anyway so I may take this out of the if statement
    if (seconds <= startTime) {
      document.getElementById(domStrings.timer).innerHTML = seconds;
    }
    // Decrement the number of seconds by 1 until seconds reach 0
    if (seconds > 0) {
      seconds--;
    } else { // Once seconds reaches 0
      // Stop the interval function called timer2
      clearInterval(timer2);
      // Set timer2 to false so it can be restarted
      timer2 = false;
      // Things to do after timer stops
      // Display a pop up telling user what WPM was
      wpm = TypeTestData.calcWPM();
      console.log('You type ' + wpm + ' WPM');
    }
  }

  // This is used to reset the timer in the UI and for countdownTimer();
  var showSeconds = function() {
    //console.log('set seconds to 10');
    // reset seconds to the startTime
    seconds = startTime;
    // Update the timer displayed in the UI
    document.getElementById(domStrings.timer).innerHTML = seconds;
  };

  /********************
   *      Public      *
   ********************/
  return {
    // Update the wordList to show in the UI
    updateWordList: function(wordList) {
      // The wordlist before editing
      // console.log(wordList);
      // since wordList is currently a list with commas and no spaces we have to format to replace the commas with spaces
      // Formats the wordList that was passed and overwrites it with the formatted version
      wordList = formatWordList(wordList);
      // Show the formatted version
      //   console.log(wordList);
      // Update the UI with the newly formatted wordList
      document.getElementById(domStrings.wordList).textContent = wordList;
      return wordList;
    },
    // returns list of domstrings
    getDomStrings: function() {
      // Test that domStringsare being retrieved correctly
      //console.log('domStrings are: ' + domStrings.wordList + ' and ' + domStrings.resetButton);
      // Return the domStrings to other controllers
      return domStrings;
    },

    // Run the countdownTimer
    timerStart: function() {
      countdownTimer();
    },

    clearUserInput: function() {
      document.getElementById(domStrings.typingArea).value = '';
    },

    // Repeatedly triggers the countdown timer every second
    timerStart2: function() {
      // Display current value of timer2
      //   Should be false so that the below if statement can begin
      //   console.log(timer2);
      if (!timer2) {
        // timer2 will be a function that is activated every 1000ms (1s)
        //   The function it will activate is timerstart(); (countdownTimer();)
        timer2 = window.setInterval(function() {
          UIController.timerStart();
        }, 1000);
      }
    },

    // Runs showSeconds to reset the timer for the functionality and UI
    resetTimer: function() {
      showSeconds();
    }
  };
})();






/****************************
 *      Main Controller     *
 ****************************/
// Handles interactions between TypeTestData and UIController
var mainController = (function(TypeTestData, UIController) {
  var words = {
    ogWordList: '',
    formattedWordList: ''
  };
  // Creates a new wordList in TypeTestData
  // Passes this word list to UIController to update UI
  var setTestWords = function() {
    // Generate the randomized word list
    wordList = TypeTestData.createWordList();
    words.ogWordList = wordList;
    console.log(words.ogWordList);
    // console.log('mainController.setTestWords()' + wordList);

    // Update wordlist in UI
    words.formattedWordList = UIController.updateWordList(wordList);
    console.log(words.formattedWordList);
  };

  // Setup buttons to be clicked
  var setupEventListeners = function() {
    // store domStrings so we can use them
    var domStrings = UIController.getDomStrings();
    // console.log(domStrings);
    // Access domStrings to set event listeners on
    document.getElementById(domStrings.resetButton).addEventListener("click", function() {
      // Run the init function to reset the UI
      // If I add anything that init would reset later I should create a seperate function
      mainController.init();
    });

    // Event listener for the typing area
    // Will start a timer when they begin typing anything
    // When 'space' is pressed it will check that the word that was entered is correct
    document.getElementById(domStrings.typingArea).addEventListener('keypress', function(event) {
      console.log(event.keyCode);
      // If spacebar is pressed check the entered word against the test word
      if (event.keyCode === 32) {
        // Get word typed by user (doesn't include the space)
        var typedWord = document.getElementById(domStrings.typingArea).value;
        console.log(typedWord[0]);
        if (typedWord[0] === ' ') {
          typedWord = typedWord.substr(1);
        }
        // Get word user was supposed to type
        var testWord = wordList.slice(0, 1);
        // Get score variables for the word
        wordScore = TypeTestData.calcWordScore(typedWord, testWord);

        // Add score variables total
        TypeTestData.updateTotals(wordScore);
        // Remove first entry from the wordlist in UI
        words.ogWordList.shift();
        words.formattedWordList = UIController.updateWordList(words.ogWordList);
        console.log(words.formattedWordList.length);

        // Clear user input
        UIController.clearUserInput();


      }

      // If any key is pressed start the timer
      // Timer will continue as normal with additional keypresses
      UIController.timerStart2(timer);
    });
  };

  // Reset the timer
  var resetTimer = function() {
    UIController.resetTimer();
  };

  /********************
   *      Public      *
   ********************/
  return {
    // Set up page and functions
    init: function() {
      // Generate wordList
      setTestWords();
      // Setup event listeners
      //  reset button, typing area etc.
      setupEventListeners();
      // Set timer back to starting number
      resetTimer();
    }
  };
})(TypeTestData, UIController);

// Initialize page functionality
mainController.init();