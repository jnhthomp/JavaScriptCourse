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

    allIDs: [], // Will hold all IDs on the gameboard after they are created
    planeIDs: {
      col: [], // Store number of columns as an array
      row: [] // Store number of rows as an aray
    },
    // Place button IDs here after they have been activated
    //  This will save some time when calculating whether or not a button should activate
    clickedIDs: [],
    // Keep a list of buttons that are assigned a bomb
    bombIDs: [],
    // List of buttons that cannot be activated because they are flagged
    flagIDs: []
  };

  // Object for each grid button in the game
  // Will hold important information regarding it and the buttons around it
  // These functions will run when it is generated
  // This means all fields should have a value at game start.
  var GridButton = function(id, column, row) {
    this.id = id;
    this.column = column;
    this.row = row;
    this.touching = touching;
    this.touchingBombs = touchingBombs;
    this.flag = flag;
    this.bomb = bomb;
  };

  // Prototype for GridButton so all instances have access to their own copy
  // Will calculate the ID's of other buttons that it is touching
  // Stores the result into this.touching
  GridButton.protype.findTouching = function() {
    var tlc, tlr, /**/ tmc, tmr, /**/ trc, trr,
      mlc, mlr, /**This button**/ mrc, mrr,
      blc, blr, /**/ bmc, bmr, /**/ brc, brr;
    // Find top left
    tlc = (this.column - 1);
    tlr = (this.row - 1);
    findTouchingCalc(tlc, tlr);
    // Find top middle
    tmc = (this.column);
    tmr = (this.row - 1);
    findTouchingCalc(tmc, tmr);
    // Find top right
    trc = (this.column + 1);
    trr = (this.row - 1);
    findTouchingCalc(trc, trr);
    // Find middle left
    mlc = (this.column - 1);
    mlr = (this.row);
    findTouchingCalc(mlc, mlr);
    // Find middle right
    mrc = (this.column + 1);
    mrr = (this.row);
    findTouchingCalc(mrc, mrr);
    // Find bottom left
    blc = (this.column - 1);
    blr = (this.row + 1);
    findTouchingCalc(blc, blr);
    // Find bottom middle
    bmc = (this.column);
    bmr = (this.row + 1);
    findTouchingCalc(bmc, bmr);
    // Find bottom right
    brc = (this.colum + 1);
    brr = (this.row + 1);
    findTouchingCalc(brc, brr);
    /*1,1 2,1 3,1
      1,2 2,2 3,2
      1,3 2,3 3,3
    */
    var findTouchingCalc = function(checkColumn, checkRow) {
      var c, r, id;
      if (checkColumn < 0 || checkColumn > game.planeIDs.col.length - 1) {
        c = -1;
      } else {
        c = checkColumn;
      }
      if (checkRow < 0 || checkRow > game.planeIDs.row.length - 1) {
        r = -1;
      } else {
        r = checkRow;
      }
      id = 'c' + c + 'r' + r;
      this.touching.push(id);
    };
  };
  var createGameObjects = function(idArray, column, row) {
    game.allIDs.forEach(function(cur) {
      newItem = new GridButton(cur, column, row);
    });
  };

  // Generate bomb locations
  var genBombLocations = function() {
    // Go through idArray and select 10 random items
    var i = 1;
    var idsArray = game.allIDs;
    var tempBombArray = [];
    while (i <= (idsArray.length * 0.1)) {
      // Generate a random number to use as an index of the array
      //   0 - Array.length - 1
      var randomIndex = Math.floor(Math.random() * Math.floor(idsArray.length - 1));

      // Save the id at the generated index
      var bombID = idsArray[randomIndex];
      // Check that the id is not in the array already before adding
      if (tempBombArray.indexOf(bombID) == -1) {
        // If not then add it and increase counter
        tempBombArray.push(bombID);
        console.log(tempBombArray);
        i++;
      } else {
        //console.log('Duplicate found tossing');
      }
    }
    // Save array to game.bombIDs;
    game.bombIDs = tempBombArray;
    console.log(game.bombIDs);
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
      },
      // Retreive column/row arrays
      // Can be used to help figure out where on the board a button is and what surrounds it
      getPlaneIDs: function() {
        return game.planeIDs;
      },
    },

    testing: {
      genBombLocations: function() {
        genBombLocations();
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
    gameContainer: ".gameContainer", //CSS class holds all game buttons
    gameContainerHTML: "gameContainer", // HTML class holds all game buttons
    gameContainerID: 'field', //HTML ID for gameboard
    gameButtonHTML: "fieldButton" //HTML class for buttons on the field
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

    // Returns an object containing the idArray used
    // Also returns columns and rows array generated
    return {
      idArray: combosIDArray, // Return array of all possible IDs that was generated
      columnsArray: columnsArray,
      rowsArray: rowsArray
    };
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

  // Creates a css grid string based on the size of the grid
  // Will repeate 1fr * columns as many times as there are rows
  // Then adds this string to
  var createCSSGrid = function(columns, rows, idArray) {
    var r, tempArray, string, gridAreaString;
    r = 1; // Set counter to loop through rows
    tempArray = idArray; // Save a copy of the array (may not be necessary)
    gridAreaString = ''; // Create an empty string to push our css string into
    while (r <= rows) { //Do this stuff once for every row
      // string becomes the first (column) number of items from the idArray
      string = tempArray.slice(0, columns);
      string = string.toString(); // Convert the array to a string
      string = '"' + string + '"'; // Format it so it creates a line in CSSgrid
      gridAreaString = gridAreaString.concat(string); // Add it to the end of the larger strign
      tempArray = tempArray.slice(columns); // remove the ids we just used
      r++; // Create the next row
    }

    // Standard size a button should take up
    var fr = '1fr ';
    // Repeat the column size over the number of columns
    var gridColumnString = fr.repeat(columns);
    // Repeat the row size over the number of rows
    var gridRowString = fr.repeat(rows);
    // Returns an object with the 3 strings we generated
    return {
      gridAreaString: gridAreaString, // String CSS for positioning
      gridColumnString: gridColumnString, // String CSS for column size
      gridRowString: gridRowString // String CSS for row size
    };
  };

  // Create DOM Element for gamefield
  // Insert appropriate CSS into created dom element
  var genGameContainer = function(gridAreas, field) {
    // Set display: grid on gameContainer
    document.getElementById(field).style.display = 'grid';
    // Set the grid-template (list of IDs shaped as grid)
    document.getElementById(field).style.gridTemplateAreas = gridAreas.gridAreaString;
    // Set the columns sizes
    document.getElementById(field).style.gridTemplateColumns = gridAreas.gridColumnString;
    // Set the row sizes
    document.getElementById(field).style.gridTemplateRows = gridAreas.gridRowString;
  };


  /*  Generate HTML Buttons*/
  //  Generates the clickable buttons on the game field
  var genHTMLButtons = function(idArray) {
    // Create HTML buttons with a given column and row size
    // Set up variables needed to create id and insert into dom
    var className, element, html, newhtml;
    className = domStrings.gameButtonHTML; // General styling shared by all
    element = domStrings.gameContainer; // Container to insert HTML into
    html = '<button class="%className%" id="%id%" style="grid-area: %id%"></button>'; // HTML for button

    // Create a new string but replace %id% with the ID to be used
    // Loop through the full array and generate HTML for each id in the array
    idArray.forEach(function(cur) {
      // Set the classname
      newhtml = html.replace('%className%', className);
      // Replace %id% in the string with the current ID in the array
      // Sets the id for css and also assigns to grid area.
      newhtml = newhtml.replace('%id%', cur);
      // Add the generated HTML string to the dom
      //  Adds at the end of the previously selected DOM container
      document.querySelector(element).insertAdjacentHTML('beforeend', newhtml);
    });
  };

  /*  Public Functions  */
  return {
    /*  Generate Grid  */
    //  Generates a game grid of buttons given a number of columns and rows
    genGrid: function(columns, rows) {
      // Create an array of IDs to use to generate HTML
      // The ID for the DOM element that the game will take place in
      var field = domStrings.gameContainerID;
      // Returns an object containing 3 arrays
      var allArrays = colrowToID(columns, rows);
      var idArray = allArrays.idArray; // Isolate idArray from object
      var columnsArray = allArrays.columnsArray; // Isolate columnsArray
      var rowsArray = allArrays.rowsArray; // Isolate rowsArray

      // Creaete an array of all possible IDs based on desired colums/rows
      var gridAreas = createCSSGrid(columns, rows, idArray);
      // Create the gameContainer to hold buttons
      genGameContainer(gridAreas, field);

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
      }
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
    var columns = 10; // Will later be fetched from UI
    var rows = 10;

    //  2.  Generate HTML (and CSS) based on board size
    var allIDs = UIController.genGrid(columns, rows);

    //  3.  Pass list of ID's to DataController
    //        Data controller will create bomb locations after first button     clicked
    DataController.setGame.setAllIDs(allIDs);
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