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
    wordList: '#word__box__1',
    // Reset button
    resetButton: 'reset__button'
  };

  var formatWordList = function(wordList) {
    wordList = wordList.toString(wordList);
    while (wordList.includes(',', 0)) {
      wordList = wordList.replace(',', ' ');
    }
    return wordList;
  };

  return {
    updateWordList: function(wordList) {
      console.log(wordList);
      wordList = formatWordList(wordList);
      console.log(wordList);
      document.querySelector(domStrings.wordList).textContent = wordList;
    },
    // returns list of domstrings
    getDomStrings: function() {
      console.log('domStrings are:' + domStrings);
      return domStrings;
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
    console.log('mainController.setTestWords()' + wordList);

    // Send list to UI controller
    UIController.updateWordList(wordList);


  };

  // Setup buttons to be clicked
  var setupEventListeners = function() {
    // store domStrings so we can use them
    var domStrings = UIController.getDomStrings();
    console.log(domStrings);
    // Access domStrings to set event listeners on
    document.getElementById(domStrings.resetButton).addEventListener("click", function() {
      mainController.init();
    });




  };

  return {
    init: function() {
      setTestWords();
      setupEventListeners();
    }
  };
})(TypeTestData, UIController);

mainController.init();