/******************************************************************************
 *        | \_/ || || \| || __|/ _|| | | || __|| __|| o \| __|| o \           *
 *        | \_/ || || \\ || _| \_ \| V V || _| | _| |  _/| _| |   /           *
 *        |_| |_||_||_|\_||___||__/ \_n_/ |___||___||_|  |___||_|\\           *
 ******************************************************************************/
/******************************************************************************
 *  Create a game of minesweeper and include a field with selectable styles.  *
 *    Generate HTML and CSS to match any grid size (Up to a point)            *
 *    Use CSS grid to position everything                                     *
 *    Get start using SASS                                                    *
 ******************************************************************************/




/****************************
 *      DataController      *
 ****************************/
// Controls all the background data of the game and page
var DataController = (function() {
  /*  Game Object */
  //    Holds game info such as all of the ids, the numbers and rows that exist, which buttons have been clicked, the locations of bombs and where flags have been placed.
  var game = {
    allIDs: [],
    planeIDs: {
      col: [],
      row: []
    },
    clickedIDs: [],
    bombIDs: [],
    flagIDs: []
  };

  /*  Public Functions  */
  return {
    /*  setGame */
    //  Set properties of the game object
    setGame: {
      // Save the array of IDs to the game object
      setAllIDs: function(allIDs) {
        game.allIDs = allIDs;
      }
    },
    /*  getGame  */
    //  Retrieve values stored in the game object
    getGame: {
      // Retrieve the allIds array
      getAllIDs: function() {
        return game.allIDs;
      }
    }
  };
}());





/**************************
 *      UI Controller     *
 **************************/
// Controls UI setup and changes
var UIController = (function() {

  /*  DOM Strings */
  //  Holds DOM strings from HTML so we can manipulate them later
  var domStrings = {
    gameContainer: ".gameContainer",
    gameButtonHTML: "fieldButton"
  };

  /*  Generate HTML Buttons*/
  //  Generates the clickable buttons on the game field
  var genHTMLButtons = function(idArray) {
    // Create HTML buttons with a given column and row size
    // Set up variables needed to create id and insert into dom
    var className, element, html, newhtml;
    className = domStrings.gameButtonHTML; // General styling shared by all
    element = domStrings.gameContainer; // Container to insert HTML into
    html = '<button class"%className%" id="%id%"></button>'; // HTML for button

    // Create a new string but replace %id% with the classname to be used
    newhtml = html.replace('%className%', className);

    // Loop through the full array and generate HTML for each id in the array
    idArray.forEach(function(cur) {

      // Replace %id% in the string with the current ID in the array
      newhtml = newhtml.replace('%id%', cur);

      // Add the generated HTML string to the dom
      //  Adds at the end of the previously selected DOM container
      document.querySelector(element).insertAdjacentHTML('beforeend', newhtml);
    });
  };

  /*  Create Column/Row Array*/
  //  Takes a length and creates an array with 0 based numbers of equal length
  var createColRowArray = function(columns) {
    var i = 0; // Counter for while loop
    var columnsArray = []; // Empty array to fill
    while (i < columns) { // Not equal to because labels start at 0
      columnsArray.push(i); // Add current value of i to the end of the array
      i++; // Increment i
    }
    return columnsArray; // Return the created array
  };

  /*  Column/Row to ID  */
  // Takes a number of columns and rows and creates an array of IDs
  //  IDs name all possible cells of grid with given number of columns and rows
  var colrowToID = function(columns, rows) { // Size of grid
    // Create an array of all column numbers to use
    columnsArray = createColRowArray(columns);
    // Create an array of all row numbers to use
    rowsArray = createColRowArray(rows);
    // Empty array to add combinations we find to
    combosIDArray = [];

    // Go through first item in columnsArray
    //  Go through first item in rowsArray
    //    Combine to create ID and add to end of array
    //  Go to second item in rows array
    //    same as above
    //  Repeat all the way through rows array
    // Go through second item in columns array etc...
    columnsArray.forEach(function(c) {
      rowsArray.forEach(function(r) {
        id = 'c' + c + 'r' + r;
        combosIDArray.push(id);
      });
    });

    // UPDATE THIS TO RETURN AN OBJECT THAT RETURNS ROWS AND COLUMNS ARRAY TOO
    return combosIDArray; // Return array of all possible IDs that was generated
  };

  /*  Public Functions  */
  return {
    /*  Generate Grid  */
    //  Generates a game grid of buttons given a number of columns and rows
    genGrid: function(columns, rows) {
      // Create an array of IDs to use to generate HTML
      idArray = colrowToID(columns, rows);
      // Generate HTML with IDs
      genHTMLButtons(idArray);
      // Return the ID array that was used
      return idArray;
    },

    /*  Testing */
    //  Used while making to make sure features were working as I added them
    testing: {
      /*  Run a test to make sure HTML buttons will generate*/
      genHTMLButtons: function() {
        columns = 1;
        rows = 1;
        test = genHTMLButtons(columns, rows);
        console.log(test);
      },

      /*  Create Column/Row Array */
      // Create an array from 0 with a given length
      createColArray: function() {
        var colRowArray = createColRowArray(5);
        console.log(colRowArray);
      },

      /*  Column/Row to ID  */
      //    Give grid dimensions and receive IDs for each cell in the grid
      colrowToID: function() {
        var idArray = colrowToID(2, 2);
        console.log(idArray);
      },
    }
  };
})();





/****************************
 *      Main Controller     *
 ****************************/
// Handles interactions between DataController and UIController
var MainController = (function(DataController, UIController) {
  /*  Generate Gameboard  */
  //  Drives functions in DataController and UIController to prepare gameField
  var genGame = function() {

    //  1.  Set board size
    var columns = 2; // Will later be fetched from UI
    var rows = 2;

    //  2.  Generate HTML based on board size
    var allIDs = UIController.genGrid(2, 2);

    //  3.  Pass list of ID's to DataController
    //        Data controller will create bomb locations after first button     clicked
    DataController.setGame.setAllIDs(allIDs);
    console.log(DataController.getGame.getAllIDs());

    //  4.  Generate css to organize html buttons based on board size



  };

  /*  Public Functions  */
  return {
    /*  Initialization  */
    //  Runs on page load to prepare game board and set event listeners
    init: function() {
      genGame();
    }
  };
}(DataController, UIController));

// Initialize the page
MainController.init();


/*
Populate the game field with buttons
  Know what html to generate
    HTML must include class="fieldButton" and id="c%0-R%0"
      where %0 changes based on location in grid
  Know what CSS to generate
    Add attributes to gameContainer
      grid-template-columns: even spacing between all buttons
        generate the appropriate number of columns based on size
        Use a loop for this
      grid-template-rows: even spacing between all columns
        generate the appropriate number of columns based onn size
        Use a loop for this
      grid-row-gap: add a little room for buttons to breath
      grid-template-areas: Generate CSS to lay out buttons by id name
        ex: "c0r0 c1r0 c2r0 c3r0"
            "c0r1 c1r1 c2r1 c3r1"
            "c0r2 c1r2 c2r2 c3r2"
*/



/*
  To generate HTML
    Know column and row size (set manually for now 2x2)
    Generate array of IDs
    Pass to genHTMLButtons(idArray);
      idArray.forEach(function(){

    }());
*/