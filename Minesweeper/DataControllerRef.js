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

  //  Create the new object to track information for each button
  //  Adds to an array to be stored and accessed
  var createGameObjects = function() {
    //  first item created will have a column and row values of 0
    var col = 0;
    var row = 0;
    //  Loop through the list of IDs
    game.allIDs.forEach(function(cur) {
      //  for every id create a new object
      //  pass the current id, column and row values into it.
      newItem = new GridButton(cur, col, row);
      //  add the created object to an array holding all objects
      game.objects.push(newItem);
      //  increase the column count
      col++;
      //  When column value gets bigger than the length of columns
      if (col >= game.plainIDs.col.length) {
        //  Reset column to 0 and repeat the above with row increased
        col = 0;
        row++;
      }
      //  Doing it this way as compared to extracting column and row from ID means it may be easier to change ID values in the future.
    });
  };

  //  Sets an initial flag value of false on a given object
  var setFlag = function(id) {
    // Set state of flag in game.objects w/ matching ID
    // Keep game.flagIDs up to date
    var obj = findObj(id); // Finds object with matching ID
    obj.flag = false; //  Creates and sets the objects flag value to false
  };

  //  Find an object with a given ID in game.objects array
  var findObj = function(checkid) {
    var found; // How the object will be accessed
    //  Loop through the game.objects array
    game.objects.forEach(function(cur) {
      // Check if the current object in array matches the ID being looked for
      if (cur.id === checkid) { //  If it does match
        found = cur; // Save the matched object to found variable
      }
    });

    //  Return the matched object
    return found;
  };

  // Generate array of random IDs from game.allIDs to be bomb locations
  var genBombLocations = function() {
    //  Go through idArray and select 10% random items
    //  Increase this percentage for denser bomb layout
    var i = 1; // Counter for while loop
    var idsArray = game.allIDs; // main id array
    var tempBombArray = []; // this will be the IDs of bomb locations are added
    while (i <= (idsArray.length * 0.1)) { // Do this for 10% of total IDs
      // Generate a random number to use as an index of the array
      var randomIndex = Math.floor(Math.random() * Math.floor(idsArray.length - 1));
      // Save the id at the generated index
      var bombID = idsArray[randomIndex];
      // Check that the id is not in the array already before adding
      if (tempBombArray.indexOf(bombID) == -1) {
        // If not then add it and increase counter
        tempBombArray.push(bombID);
        i++;
      }
      //  If it is in temp array don't increase counter or add so it is redone
    }
    //  After generating all needed bomb IDs and adding to tempArray
    //  Save array to game.bombIDs;
    game.bombIDs = tempBombArray;
    //  Set the number of available flags equal to number of bombs placed
    game.flagCount = tempBombArray.length;
    // console.log(game.bombIDs); ANSWER KEY!
  };

  //  Updates each object with whether or not it is a bomb
  var updateObjectsBombs = function() {
    //  Cycle through each object in game.objects
    game.objects.forEach(function(cur) {
      //  See if the ID of the current object is in bombIDs
      //  Create a new attribute for the object called isBomb
      //    If it is in bombIDs then assign 'true' to that object
      if (game.bombIDs.indexOf(cur.id) == -1) {
        cur.isBomb = false;
      } else { //  If not a bomb assign 'false' to that object
        cur.isBomb = true;
      }
    });

  };

  //  Returns an array of objects that are touching a given object
  var calcTouch = function(obj) {
    // column and row number to be used to gen ID
    var c, r;

    // IDs of possible touching buttons
    var topLeft, topMiddle, topRight,
      middleLeft, /*this*/ middleRight,
      bottomLeft, bottomMiddle, bottomRight;


    var checkArray = [];
    // Will only store valid IDs
    var touchArray = [];

    // Get column and row of given button
    var col = obj.column;
    var row = obj.row;

    // Calc columns and rows for the 8 buttons that would be touching
    /*1,1 2,1 3,1
      1,2 2,2 3,2
      1,3 2,3 3,3
    */
    // TODO: Make this a loop instead of 8 individual actions
    //  Try foreach row{foreach column} and increase column by 1 then row after column = +1
    var touchLoop = function(col, row) {
      var ccount = -1;
      var rcount = -1;
      while (rcount <= 1) {
        while (ccount <= 1) {
          c = col + ccount;
          r = row + rcount;
          touching = MainController.genID(c, r);
          checkArray.push(touching);
          c++;
          r++;
          if (c == 1) {
            c = -1;
          }
        }
      }
    };

    touchLoop(col, row);


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
    //  Initialize all needed info, arrays, and objects for data controller
    dataInit: function(columnsArray, rowsArray, idArray) {
      //  Set the value for arrays
      //  columns/rowsArray is used for some looping actions
      game.plainIDs.col = columnsArray;
      game.plainIDs.row = rowsArray;
      //  Full list of ll IDs
      game.allIDs = idArray;

      //  Create an object for each game button
      //  Holds important information relative to that object
      createGameObjects();

      // Loop to set inital flag values on all created objects
      // Will be set to false since none have been clicked yet
      game.allIDs.forEach(function(cur) {
        setFlag(cur);
      });

      //  Generates a list of random IDs to be bombs
      //  Sets flags available to be equal to number of bombs
      genBombLocations();

      //  Update objects with whether or not they are a bomb
      updateObjectsBombs();

      //  Update objects with array of other touching object IDs
      //  Loop through each object in object array
      game.objects.forEach(function(cur) {
        //  Run calcTouch on the current object
        //  Assign the returned array to the current objects touchArray
        cur.touchArray = calcTouch(cur);
      });

      game.objects.forEach(function(cur) {
        cur.touchBombs = calcTouchBombs(cur);
        cur.countBombs = cur.touchBombs.length;
      });
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