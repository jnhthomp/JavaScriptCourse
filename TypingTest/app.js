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

  return {
    createWordList: function() {
      return randomizeWordList(wordList);
    },
    testing: {
      randomizeWordList: function() {
        console.log(randomizeWordList(wordList));
      }
    }
  };
})();

// Makes changes and updates to the UI
var UIController = (function() {
  // store domElements to use elsewhere
  var domStrings = {
    // Where words to type are displayed
    wordList: '#word__box__1'
  };

  var formatWordList = function(wordList) {
    wordList = wordList.toString(wordList);
    wordList = wordList.replace(',', ' ');
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
    getdomStrings: function() {
      return domStrings;
    }
  };
})();

var Controller = (function() {

})();


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
  return {
    init: function() {
      setTestWords();
    }
  };
})(TypeTestData, UIController);

mainController.init();