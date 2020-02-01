/******************************
 *      Budget Controller     *
 ******************************/
// Controller to handle calculations and stores background data
// Store list of words to be used
// Randomizes the order of the words
//
// Calculats WPM
var TypeTestData = (function() {

  var wordList = ['the',
    'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at'
  ];

  var randomizeWordList = function(wordList) {
    // Uses fisher/yates method https://bost.ocks.org/mike/shuffle/
    var currentIndex = wordList.length,
      temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = wordList[currentIndex];
      wordList[currentIndex] = wordList[randomIndex];
      wordList[randomIndex] = temporaryValue;
    }

    return wordList;
  };



  var scoreTest = function(allTypedEntries, uncorrectedErrors, time) {
    wpm = ((allTypedEntries / 5) - uncorrectedErrors) / time;
  };

  return {
    createWordList: function() {
      return randomizeWordList(wordList);
    },

    calcWPM: function(allTypedEntries, uncorrectedErrors, time) {
      return scoreTest();
    },

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

  var formatWordList = function(wordList) {
    wordList = wordList.toString(wordList);
    while (wordList.includes(',', 0)) {
      wordList = wordList.replace(',', ' ');
    }
    return wordList;
  };

  var startTime = 10;
  var seconds = startTime;
  var timer;

  function countdownTimer() {
    if (seconds <= startTime) {
      document.getElementById(domStrings.timer).innerHTML = seconds;
    }
    if (seconds > 0) {
      seconds--;
    } else {
      clearInterval(timer);
      alert('You type x WPM');
    }
  }



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
      if (!timer) {
        timer = window.setInterval(function() {
          UIController.timerStart();
        }, 1000);
      }
    },

    resetTimer: function() {
      console.log('set seconds to 10');
      seconds = 10;
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
      UIController.timerStart2();
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