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
    plainIDs: {
      col: [], // Store number of columns as an array
      row: [] // Store number of rows as an aray
    },
    // Place button IDs here after they have been activated
    //  This will save some time when calculating whether or not a button should activate
    clickedIDs: [],
    // Keep a list of buttons that are assigned a bomb
    bombIDs: [],
    // List of buttons that cannot be activated because they are flagged
    flagIDs: [],


    objects: []
  };

  // Object for each grid button in the game
  // Will hold important information regarding it and the buttons around it
  // These functions will run when it is generated
  // This means all fields should have a value at game start.
  var GridButton = function(id, column, row) {
    this.id = id;
    this.column = column;
    this.row = row;
    // this.touching = touching;
    // this.touchingBombs = touchingBombs;
    // this.flag = flag;
    // this.bombCount = bomb;
  };

  // Create the new object and add it to an array
  var createGameObjects = function() {
    var col = 0;
    var row = 0;
    game.allIDs.forEach(function(cur) {
      newItem = new GridButton(cur, col, row);
      game.objects.push(newItem);
      col++;
      if (col >= game.plainIDs.col.length) {
        col = 0;
        row++;
      }
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
        i++;
      } else {
        //console.log('Duplicate found tossing');
      }
    }
    // Save array to game.bombIDs;
    game.bombIDs = tempBombArray;
    game.flagCount = tempBombArray.length;
    // console.log(game.bombIDs); ANSWER KEY!
  };

  var updateObjectsBombs = function() {
    // Cycle through each object in game.objects
    game.objects.forEach(function(cur) {
      // See if the ID of the current object is in bombIDs
      // Create a new attribute for the object called isBomb
      //  If it is in bombIDs then assign 'true' to that object
      if (game.bombIDs.indexOf(cur.id) == -1) {
        cur.isBomb = false;
      } //  If not a bomb assign 'false' to that object
      else {
        cur.isBomb = true;
      }
    });

  };

  var setFlag = function(id, bool) {
    // Set state of flag in game.objects w/ matching ID
    // Keep game.flagIDs up to date
    var obj = findObj(id);
    // console.log(obj);
    if (bool == true) {
      obj.flag = true;
      //console.log(obj);
    } else {
      obj.flag = false;
      //console.log(obj);
    }
  };

  // Find the object in game.objects with a matching ID
  var findObj = function(checkid) {
    var found;
    game.objects.forEach(function(cur) {
      if (cur.id === checkid) {
        found = cur;
      }
    });

    return found;
  };

  var calcTouch = function(obj) {
    var tlc, tlr, /**/ tmc, tmr, /**/ trc, trr,
      mlc, mlr, /**This button**/ mrc, mrr,
      blc, blr, /**/ bmc, bmr, /**/ brc, brr,
      topLeft, topMiddle, topRight,
      middleLeft, /*this*/ middleRight,
      bottomLeft, bottomMiddle, bottomRight;

    var checkArray = [];
    var touchArray = [];

    // Get column and row of given button
    var col = obj.column;
    var row = obj.row;

    // Calc columns and rows for the 8 buttons that would be touching
    /*1,1 2,1 3,1
      1,2 2,2 3,2
      1,3 2,3 3,3
    */
    // Find top left
    tlc = (col - 1);
    tlr = (row - 1);
    topLeft = 'c' + tlc + 'r' + tlr;
    checkArray.push(topLeft);

    // Find top middle
    tmc = (col);
    tmr = (row - 1);
    topMiddle = 'c' + tmc + 'r' + tmr;
    checkArray.push(topMiddle);

    // Find top right
    trc = (col + 1);
    trr = (row - 1);
    topRight = 'c' + trc + 'r' + trr;
    checkArray.push(topRight);

    // Find middle left
    mlc = (col - 1);
    mlr = (row);
    middleLeft = 'c' + mlc + 'r' + mlr;
    checkArray.push(middleLeft);

    // Find middle right
    mrc = (col + 1);
    mrr = (row);
    middleRight = 'c' + mrc + 'r' + mrr;
    checkArray.push(middleRight);

    // Find bottom left
    blc = (col - 1);
    blr = (row + 1);
    bottomLeft = 'c' + blc + 'r' + blr;
    checkArray.push(bottomLeft);

    // Find bottom middle
    bmc = (col);
    bmr = (row + 1);
    bottomMiddle = 'c' + bmc + 'r' + bmr;
    checkArray.push(bottomMiddle);

    // Find bottom right
    brc = (col + 1);
    brr = (row + 1);
    bottomRight = 'c' + brc + 'r' + brr;
    checkArray.push(bottomRight);


    // See if that ID is listed in all IDs to double check that it is valid
    checkArray.forEach(function(cur) {
      // Find if ID is in game.allIDs
      if (game.allIDs.indexOf(cur) !== -1) {
        touchArray.push(cur);
      }
    });
    // If not valid do nothing and move on to the next
    // If it is valid add it to an array inside the current object called touching
    //console.log(touchArray);
    return touchArray;
  };

  // Look through game.objects
  // For each object look at the array of touching buttons cur.touchArray
  var calcTouchBombs = function(obj) {
    var bombsTouching = [];
    var touch = obj.touchArray;
    touch.forEach(function(cur) {
      var test = game.bombIDs.indexOf(cur);
      if (test !== -1) {
        bombsTouching.push(cur);
      }
    });
    return bombsTouching;
  };
  // For each ID in the array compare it to game.bombIDs
  //    If it is in game.bombIDs push to array touchingBombs
  //    If it is not in game.bombIDs do nothing
  // set cur.touchingBombs to the touchingBombs array just made
  // get length of touchingBombs and set value to cur.bombCount

  /*  Public Functions  */
  return {
    dataInit: function(columnsArray, rowsArray, idArray) {
      game.plainIDs.col = columnsArray;
      game.plainIDs.row = rowsArray;
      game.allIDs = idArray;

      createGameObjects();

      game.allIDs.forEach(function(cur) {
        setFlag(cur, false);
      });

      genBombLocations();

      updateObjectsBombs();

      game.objects.forEach(function(cur) {
        cur.touchArray = calcTouch(cur);
      });

      game.objects.forEach(function(cur) {
        cur.touchBombs = calcTouchBombs(cur);
        cur.countBombs = cur.touchBombs.length;
      });
    },
    /*  setGame */
    //  Set properties of the game object
    setGame: {

      calcTouchBombs: function() {


      }
    },
    /*  getGame  */
    //  Retrieve values stored in the game object
    getGame: {
      // Retrieve the allIds array
      getAllIDs: function() {
        return game.allIDs;
      },
      getID: function(index) {
        return game.allIDs[index];
      },
      // Retreive column/row arrays
      // Can be used to help figure out where on the board a button is and what surrounds it
      getPlainIDs: {
        getPlainCol: function() {
          return game.plainIDs.col;
        },
        getPlainRow: function() {
          return game.plainIDs.row;
        }
      },
      //clicked IDs, bombIDs, flagIDs, objects
      getClickedIDs: function() {
        return game.clickedIDs;
      },

      // Comment this out before completing or someone can pull the answers before even attempting
      getBombIDs: function() {
        return game.bombIDs;
      },

      getFlagIDs: function() {
        return game.flagIDs;
      },

      getFlagCount: function() {
        return game.flagCount;
      },

      // Comment this out before completing or someone can pull the answers before attempting
      getObjects: function() {
        return game.objects;
      }
    },

    rightClick: function(index) {
      var obj = game.objects[index]; //  ONLY DO EVERYTHING HERE IF OBJ.FLAG == false
      //  ID whether or not isBomb is true or false
      //    if isBomb is true
      //      display picture of a bomb
      //      disable event listeners for clicks (GAME OVER screen? alert?)
      //    if isBomb is false
      //      see value of obj.touchBombs
      //      display value on button

      if (obj.flag == false) {
        if (obj.isBomb == true) {
          // return that this is a bomb
          return true;
        } else {
          return obj.countBombs;
        }
      }
    },

    testing: {

      findObj: function(checkID) {
        var found = findObj(checkID);
        console.log(found);
      },


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
    gameButtonHTML: "fieldButton", //HTML class for buttons on the field
    gameButtonCSS: ".fieldButton"
  };

  /*  Column/Row to ID  */
  //  Takes a number of columns and rows and creates an array of IDs
  //  IDs name all possible cells of grid with given number of columns and rows
  var colrowToID = function(columns, rows) { // Size of grid
    //  Create an array of all column numbers to use
    var columnsArray = createColRowArray(columns);
    //  Create an array of all row numbers to use
    var rowsArray = createColRowArray(rows);
    //  Use arrays to generate IDs
    var combosIDArray = createIDArray(columnsArray, rowsArray);

    //  Returns an object containing the idArray, columnArray, and rowArray
    return {
      //  All IDs generated
      idArray: combosIDArray,
      //  All column numbers
      columnsArray: columnsArray,
      //  All row numbers
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

  /*  Create ID Array */
  //  Takes an array of columns and row numbers
  //  Creates IDs based on combinations of these numbers
  var createIDArray = function(columnsArray, rowsArray) {
    // Empty array to add combinations we find to
    var combosIDArray = [];
    // Go through first item in rowsArray
    rowsArray.forEach(function(r) {
      //  Go through first item in columnsArray
      columnsArray.forEach(function(c) {
        //  Combine to create ID
        id = 'c' + c + 'r' + r;
        //  Add to end of array being built
        combosIDArray.push(id);
        //  Repeat for all column numbers
      });
      //  After doing all columns go to the next row number and repeat
    });
    return combosIDArray;
  };

  //  Creates a css grid string based on the size of the grid
  //  Will repeat (1fr * columns) as many times as there are rows
  //  Then adds this string to
  var createCSSGrid = function(columns, rows, idArray) {

    var gridAreaString = createCSSIDString(columns, rows, idArray);

    var gridSizeStrings = createCSSSizeString(columns, rows);
    // Returns object with 3 strings we generated
    return {
      gridAreaString: gridAreaString, // String CSS for positioning
      gridColumnString: gridSizeStrings.gridColumnString, //  CSS column size
      gridRowString: gridSizeStrings.gridRowString // String CSS for row size
    };
  };

  //  Creates CSS positioning grid of each ID
  //  Takes column number of IDs and puts them in a strings
  //  Does this for the number of rows
  //  Puts all of the strings into one big string
  var createCSSIDString = function(columns, rows, idArray) {
    var r, tempArray, string, gridAreaString;

    r = 1; // Set counter to loop through rows
    tempArray = idArray; // Save a copy of the array
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
    return gridAreaString;
  };

  var createCSSSizeString = function(columns, rows) {
    //  Standard size a button should take up
    var fr = '1fr ';
    //  Repeat the column size over the number of columns
    var gridColumnString = fr.repeat(columns);
    //  Repeat the row size over the number of rows
    var gridRowString = fr.repeat(rows);

    //  Return 2 generated strings
    return {
      gridColumnString: gridColumnString,
      gridRowString: gridRowString
    };
  };


  //  Set grid CSS options for gameContainer
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
    //  Create HTML buttons
    //  Insert unique ID into each button created
    var className, element, html, newhtml;
    className = domStrings.gameButtonHTML; // General styling shared by all
    element = domStrings.gameContainer; // Container to insert HTML into
    html = '<button class="%className%" id="%id%" style="grid-area: %id%"></button>'; // HTML for button

    //  Loop through the full ID array
    //  generate HTML for each id in the array
    idArray.forEach(function(cur) {
      //  Set the classname
      newhtml = html.replace('%className%', className);

      //  Replace %id% in the string with the current ID in the array
      //  Sets the id for css and also assigns to grid area.
      newhtml = newhtml.replace('%id%', cur);
      //  Add the generated HTML string to the dom
      //   Adds at the end of the selected DOM container
      document.querySelector(element).insertAdjacentHTML('beforeend', newhtml);
    });
  };

  /*  Public Functions  */
  return {
    /*  Generate Grid  */
    //  Generates a game grid of buttons given a number of columns and rows
    genGrid: function(columns, rows) {

      //  1. Create an array of IDs to use to generate HTML
      //  The ID for the DOM element that the game will take place in
      var field = domStrings.gameContainerID;

      //  colrowToID receives an Integer Number for columns and rows
      //  Returns and object containing idArray, columnsArray, and rowsArray
      //    idArray - array of IDs for all cell and row combinations
      //    columnsArray - array with a list of column numbers (starting at 0)
      //    rowsArray - array with a list of row numbers (starting at 0)
      //  Isolate arrays so they can be used individually
      var allArrays = colrowToID(columns, rows);
      var idArray = allArrays.idArray; // Isolate idArray from object
      var columnsArray = allArrays.columnsArray; // Isolate columnsArray
      var rowsArray = allArrays.rowsArray; // Isolate rowsArray

      //  Creates formatting for CSS grid
      //  Receives object with 3 strings
      //    gridAreas.gridAreaString - CSS formatting for positioning
      //    gridAreas.gridColumnString - CSS formatting for column size
      //    gridAreas.gridRowString - CSS formatting for row size
      var gridAreas = createCSSGrid(columns, rows, idArray);

      //  Sets CSS styles for gameContainer
      genGameContainer(gridAreas, field);

      // Generate HTML with IDs
      genHTMLButtons(idArray);

      // Return the ID array that was used
      return allArrays;
    },

    getDomStrings: function() {
      return domStrings;
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
  //  This will only let certain actions happen when it is false
  //  On page load this will start as false
  //  When a bomb is clicked it becomes true
  var gameOver;

  /*  Generate Gameboard  */
  //  Assembles the gameboard
  //  Generates all game background data
  var genGame = function() {

    //  1.  Set board size
    // TODO: fetch these from the UI
    /*  On page load have a full screen modal
        Allow selection of colum/rows + bombCount*/
    var columns = 10;
    columns = Math.floor(columns); // just to ensure this is an int
    var rows = 10;
    rows = Math.floor(rows); // just to ensure this is an int

    //  2.  Generate HTML (and CSS) based on board size
    //  Receives an object containing 3 arrays
    //    allArrays.idArray - list of all IDs
    //    allArrays.columnsArray - list of all column names
    //    allArrays.rowsArray - list of all row names
    var allArrays = UIController.genGrid(columns, rows);

    //  3. Initialize DataController
    //    Sets arrays: game.plainIDs.col/row game.allIDs
    //    Generates game objects
    //    Set initial flag value to false
    //    Generate bomb locations
    //    Update objects with bomb status
    //    Update objects with array of touching IDs
    //    Update objects with array of touching IDs that are bombs
    DataController.dataInit(allArrays.columnsArray, allArrays.rowsArray, allArrays.idArray);
  };

  var eventListeners = function() {
    var domStrings = UIController.getDomStrings();
    var field = document.getElementById(domStrings.gameContainerID);
    var buttons = [].slice.call(field.querySelectorAll(domStrings.gameButtonCSS), 0);

    field.addEventListener('click', function(e) {
      if (!gameOver) {
        var flagCount = DataController.getGame.getFlagCount();
        var index = buttons.indexOf(e.target);
        if (index !== -1) {
          /*DO STUFF ON LEFT CLICK*/
          //  ID the clicked object
          //    use the index found here
          console.log('left click: ' + index);
          //    match the index of DataController.game.allIDs
          var id = DataController.getGame.getID(index);
          console.log(id);
          e.target.style.backgroundImage = "url('Photos/flag.png')";
          e.target.style.backgroundRepeat = "no-repeat";
          e.target.style.backgroundPosition = "center";
          //    return the matched ID
          //    loop through DataController.game.objects
          //      find the one with the matching ID
          //      if the flag status is false
          //        set it to true
          //      if the flag status is true
          //        make sure that there are still flags to spare
          //        set it to false


        }
      }
    });

    field.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      if (!gameOver) {
        var received;
        var index = buttons.indexOf(e.target);
        if (index !== -1) {
          /*DO STUFF ON RIGHT CLICK*/
          //  ID the clicked object
          //    use the index found here
          console.log('right click: ' + index);
          //    match the index of DataController.game.allIDs
          var id = DataController.getGame.getID(index);
          console.log(id);
          e.target.style.background = "#2c2c2c";
          received = DataController.rightClick(index);
          if (received === true) {
            // Show picture of bomb on button
            e.target.style.backgroundImage = "url('Photos/bomb.png')";
            e.target.style.backgroundRepeat = "no-repeat";
            e.target.style.backgroundPosition = "center";
            console.log(gameOver);
            gameOver = true;
            console.log(received);
            console.log(gameOver);
            // Disable clicks
          } else {
            // update the button value to show received #
            e.target.innerHTML = received;
          }


        }
      }
    });
  };

  /*  Public Functions  */
  return {
    /*  Initialization  */
    //  Runs on page load to prepare game board and set event listeners
    init: function() {
      gameOver = false; // Game only runs when false

      genGame();
      eventListeners();
    }
  };
}(DataController, UIController));

// Initialize the page
MainController.init();



/*CLEAN UP DATA INIT*/