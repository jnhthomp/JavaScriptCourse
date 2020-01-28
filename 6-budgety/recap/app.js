/******************************
 *      BUDGET CONTROLLER     *
 ******************************/
//    Performs budget calculations
//    Private variables and functions
//      Expense: Creates Expense objects
//        Stores ID, description, and numerical value of each expense entry
//      Income: Creates Income objects
//        Stores ID, description, and numerical value of each income entry
//      data: Object holding allItems and totals
//        allItems: Stores array of Expense + Income objects (seperately)
//    Publicly accessible variables and functions
//      addItem: Create a new Expense or Income object
//        receives type, input, and value from global controller
//        generate an id based on last id in same type allItems array
//        Uses type to create either a new Expense or Income object
//        Add that new object to end of same type allItems array
//        Return new object to global controller
//    Testing variables and functions
//      testing: ensure data object is storing objects and totals correctly
var budgetController = (function() {

  /****************************
   *      Expense Object      *
   ****************************/
  //  Create expense object
  //  This will collect all the information to process an expense
  var Expense = function(id, description, value) {
    //  Set values passed as variables in the object
    //  Used to sort in array
    this.id = id;
    //  Description of exp
    this.description = description;
    //  Value of exp
    this.value = value;
    //  Percentage this expense is of the total income
    this.percentage = -1;
  };

  //  Prototype for Expense so all new created objects will have access
  //  Calculates what percentage a specific expense is of total income value
  Expense.prototype.calcPercentage = function(totalIncome) {
    // Check to make sure that there has been income added
    if (totalIncome > 0) {
      // divide this objects value by totalIncome that wass passed
      // multiplies by 100 and rounds to nearest full number for percentage
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else { // If income hasn't been added yet keep percentage at -1
      this.percentage = -1;
    }
  };

  //  Prototype for Expense so all new created objects will have access
  //  Returns the current percentage so it is accessible
  Expense.prototype.getPercentage = function() {
    // Return percentage for this object
    return this.percentage;
  };



  /**************************
   *      Income Object     *
   **************************/
  //  Create income object
  //  This will collect all the information to process an income
  var Income = function(id, description, value) {
    //  Set values passed as variables in the object
    //  Used to sort in the array
    this.id = id;
    //  Desciption of income
    this.description = description;
    //  Value of Income
    this.value = value;
  };

  // Calculates total of all objects in inc/exp array
  var calculateTotal = function(type) {
    // Initial sum is 0
    var sum = 0;
    // Loop through array
    data.allItems[type].forEach(function(cur) {
      // For the current item's value to a running total
      sum += cur.value;
    });

    // Submit the totals to where we store all budget data
    data.totals[type] = sum;

  };



  /******************
   *      DATA      *
   ******************/
  // All budget data stored here
  // Includes Expense and Income objects and total of values for each
  // Also includes budget value and overall percentage value
  var data = {
    // All Income and Expense objects stored in Arrays
    allItems: {
      // Expense array
      exp: [],
      // Income array
      inc: []
    },
    //  Holds total values of expenses and incomes
    totals: {
      // Total for all Expense values in data.allItems[exp]
      exp: 0,
      // Total for all Income values in data.allItems[inc]
      inc: 0
    },

    // Stores value of totals[inc] - totals[exp]
    budget: 0,
    // stores value of calculated percentage totals[exp]/totals[inc] * 100
    percentage: -1

  };

  // Reusable function to loop through a list
  // callback allows you to perform a function on each item in the list
  var nodeListsForEach = function(list, callback) { // Receives list + function
    // Loop through each item in list
    for (var i = 0; i < list.length; i++) {
      // Perform function on each item in list
      callback(list[i], i);
    }
  };



  /**********************************
   *      PUBLICLY ACCESSIBLE     *
   **********************************/
  return {

    /********************
     *    Add Item      *
     *********************/
    // Creates a new Expense or Income object (See create expense object above)
    addItem: function(type, des, val) {
      var newItem;
      //  Create new ID
      //    Looks at the very last item in the all items array
      //    Adds 1 to the last items ID to create the new ID
      //    Incomes and expenses are stored seperately (Can share ID numbers)
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        // If the array is Empty set ID to zero
        ID = 0;
      }
      //  Create new item based on 'inc' or 'exp' type
      if (type === 'exp') {
        //  Uses values passed into addItem and generated ID
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
        //  Uses values passed into addItem and generated ID
        newItem = new Income(ID, des, val);
      }
      //  Adds newly created item to array of expense or income objects
      data.allItems[type].push(newItem);
      //  Return the created object so it is available to Global App controller
      return newItem;
    },

    /************************
     *      Delete Item     *
     ************************/
    // Deletes an existing Expense or Income object from data.allItems
    deleteItem: function(type, id) { // Receives whether exp or inc and ID#
      var ids, index;
      // Goes through data.allItems based on type
      ids = data.allItems[type].map(function(current) {
        // Returns each id to new array ids
        return current.id;
      });
      // Goes through ids array that was just made
      // gives us index of id we are looking for in that array
      index = ids.indexOf(id);
      // Ensures there is a valid index number
      if (index !== -1) {
        // deletes the item at index of id passed
        data.allItems[type].splice(index, 1); // 1 here means deletes 1 item
      }

    },

    /***************************
     *      Calculate Budget   *
     ***************************/
    // Refreshes and updates budget calculations
    calculateBudget: function() {
      // Calculate total income and expenses
      // Updates data.totals[type] based on exp or inc
      calculateTotal('exp'); // private
      calculateTotal('inc'); // private
      // Calculate and set total budget: Income - Expenses
      data.budget = data.totals.inc - data.totals.exp;
      // Calculate percentage of income spent
      //  make sure there are income values
      if (data.totals.inc > 0) {
        // Percentage calculate exp/inc * 100 (rounded)
        // This only updates the total percentage, not individual
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else { // If there is no income added yet
        // Makes sure percentage is reset to -1 if all income is deleted
        data.percentage = -1;
      }
    },

    /**********************************
     *      Calculate Percentages     *
     **********************************/
    // Performs individual percentage calculations
    calculatePercentages: function() {
      // Loops through all objects in data.allItems[exp] array
      data.allItems.exp.forEach(function(cur) {
        // Uses prototype of Expense object to calculate percentage of current
        cur.calcPercentage(data.totals.inc);
      });
    },

    /****************************
     *      Get Percentages     *
     ****************************/
    // Returns percentages so they are publicly accessible
    getPercentages: function() {
      // Creates an array of all percentages from data.allItems[exp]
      // Runs function on each item
      var allPerc = data.allItems.exp.map(function(cur) {
        // Adds the percentage of the current item to allPerc Array
        return cur.getPercentage();
      });
      // Returns array generated above; Contains list of percentages
      return allPerc;
    },

    /*********************
     *      Get Budget   *
     *********************/
    // Returns budget information so it is publicly accessible
    getBudget: function() {
      return {
        budget: data.budget, // Return budget (totals.inc - totls.exp)
        totalInc: data.totals.inc, // Return total income value
        totalExp: data.totals.exp, // Return total expense value
        percentage: data.percentage // Return overall exp/inc percentage
      };
    },

    /********************
     *      Testing     *
     ********************/
    // Test in console that allItems populates correct arrays and totals works
    testing: function() {
      console.log(data);
    }
  };

})();



/************************
 *      UI controller   *
 ************************/
//  UI CONTROLLER
//    Controlls UI changes and receives input
//    Private variables and functions
//      DOMstrings: object to store commonly used css classes
//    Public variables and functions
//      getinput: returns type, description, and value from user
//      addListItem: receives obj and type from global controller
//        Creates html strings w/ user data and injects into html
//      clearFields: Clears user entry and resets cursor to description
//      getDOMstrings: Allows DOMstrings to be used by global controller
var UIController = (function() {
  /************************
   *      DOM STRINGS     *
   ************************/
  // Store class names here so they can be used later and easily changed
  // If redesigned with different class names they only need changed once
  var DOMstrings = {
    // User input boxes
    inputType: '.add__type', // Dropdown - Whether user enter inc or exp (+/-)
    inputDescription: '.add__description', // Description of inc/exp
    inputValue: '.add__value', // Value of inc/exp
    inputBtn: '.add__btn', // Submit user input

    // Display individual inc/exp items
    container: '.container', // Both inc and exp UI lists are stored here
    incomeContainer: '.income__list', // UI list of all incomes
    expensesContainer: '.expenses__list', // UI list of all expenses

    // Display calculated total budget information
    budgetLabel: '.budget__value', // Displays  total income - total expenses
    incomeLabel: '.budget__income--value', // Shows total value of income
    expensesLabel: '.budget__expenses--value', // Shows total value of expenses
    // Percentage the total expenses make up of total income
    percentageLabel: '.budget__expenses--percentage',

    // Show individual expense percentages
    expensesPercLabel: '.item__percentage',

    // Display date on page
    dateLabel: '.budget__title--month'
  };

  /**************************
   *      Format Number     *
   **************************/
  // Format value numbers for Incomes and Expenses (total + individual)
  // Passed a number to format and the type (+/-)
  // + or - before number 1000 -> + 100
  // exactly 2 decimal points 1000 -> 1000.00
  // comma seperating thousands 1000 -> 1,000
  // 1000 -> + 1,000.00
  var formatNumber = function(num, type) {
    var numSplit, int, dec;

    // Ensures number is positive
    num = Math.abs(num);
    // Adds/Removes to set number to 2 decimal places
    num = num.toFixed(2);
    // Creates array[numbers before decimal, numbers after decimal]
    numSplit = num.split('.');

    // Assigns number before decimal to int variable
    int = numSplit[0];
    // To add commas for thousands
    if (int.length > 3) { // Applies to all numbers w/ 4+ numbers before decimal
      // Returns portion of string from begging of string to 3 from the end
      // Adds comma
      // Selects portion of string from 3 from the end to the end
      // Overwrites previously assigned int w/ int string that includes commas
      int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
    }
    // Assigns number after decimal to dec variable
    dec = numSplit[1];
    // If the passed type is exp use (-) sign
    // If the passed type is inc use (+) sign
    // Return sign, space, int(w/ commas), period, and decimal number as string
    return (type === 'exp' ? sign = '-' : sign = '+') + ' ' + int + '.' + dec;
  };

  // Reusable function to loop through a list and perform function on each item
  var nodeListsForEach = function(list, callback) {
    // Loop through list, perform passed function on each item
    for (var i = 0; i < list.length; i++) {
      //function being performed on each item
      callback(list[i], i);
    }
  };



  /******************************
   *      PUBLICLY ACCESSIBLE   *
   ******************************/
  return {

    /**********************
     *      Get Input     *
     **********************/
    // Receive input; Use object so you can receive +/-, name, and value
    getinput: function() {
      return {
        // Returns type selected by user (inc or exp)
        type: document.querySelector(DOMstrings.inputType).value,
        // Returns description entered by user
        description: document.querySelector(DOMstrings.inputDescription).value,
        // Returns dollar amount entered by user
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      };
    },

    /**************************
     *      Add List Item     *
     **************************/
    // Adds user entered expense or income item to the UI
    addListItem: function(obj, type) {
      var html, newHtml, element;
      //  1. Create html strings w/ placeholder text (selecting inc or exp)
      if (type === 'inc') { // This is for Income items
        // Selects which container to add UI item to
        element = DOMstrings.incomeContainer;
        // Placeholder html  will be formatted in step 2
        html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === 'exp') { // This is for Expense items
        // Selects which container to add UI item to
        element = DOMstrings.expensesContainer;
        // Placeholder html will be formatted in step 2
        html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      //  2. Replace placeholder text with data
      //    Replace %id%  html/css id with the id# generated for object
      newHtml = html.replace('%id%', obj.id);
      //    Replace placeholder description with submitted description
      newHtml = newHtml.replace('%description%', obj.description);
      //    Replace placeholder value with submitted value
      newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

      //  3. Insert HTML into DOM
      //    Adds to element selected earlier
      //    Inserts generated HTML as last item in element container
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    /******************************
     *      Delete List Item      *
     ******************************/
    // Deletes an item from the UI
    // Gets passed full class name ex: income-0
    deleteListItem: function(selectorID) { // Passes ID# to delete
      // Finds list item with specified id
      var el = document.getElementById(selectorID);
      // Removes list item with specified ID
      // Moves up one level and delets a child. Cannot directly delete an item
      el.parentNode.removeChild(el);
    },

    /**************************
     *      Clear Fields      *
     **************************/
    // Clear user input from fields
    clearFields: function() {
      var fields, fieldsArr;
      // Creates a list of fields that need cleared (2items)
      // contains 2 items seperated by comma: input description and input value
      fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

      // Transforms list of fields into an array of fields
      // Tricks JS into thinking it is working with array and generates array
      fieldsArr = Array.prototype.slice.call(fields);

      // Goes through array of fields and sets each one to blank
      //  Loops and for each item in the array sets it to a blank value
      fieldsArr.forEach(function(current, index, array) {
        current.value = '';

      });
      // Return cursor to first item in fields array (inputDescription)
      fieldsArr[0].focus();
    },

    /****************************
     *      Display Budget      *
     ****************************/
    displayBudget: function(obj) {
      //If data.budget > 0 then type will be inc if 0 or less type is exp
      obj.budget > 0 ? type = 'inc' : type = 'exp';
      // Select total budget display item in UI
      // Format data.budget value and assign value to budget label
      document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
      // Select total income display item in UI
      // Format data.totals.inc value and assign value to total income label
      document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
      // Select total expenses display item in UI
      // Format data.totals.exp value and assign value to total expense label
      document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');

      // Only shows percentage if it is greater than 0
      // Prevents showing erros in UI when income hasn't been added yet
      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
      } else { // if totals.inc is 0 then dashes are displayed instead of error
        document.querySelector(DOMstrings.percentageLabel).textContent = '--';
      }
    },

    /********************************
     *      Display Percentages     *
     ********************************/

    displayPercentages: function(percentages) {
      // Makes a list of all expense percentage labels in UI
      var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

      // Run a loop on fields list
      // Performs callback function on each item in the list
      //  Callback receives the current list item and items index in the list
      nodeListsForEach(fields, function(current, index) {
        // Uses array of all percentages in budgetController.data
        // If the value at the current index is > add a % sign
        if (percentages[index] > 0) {
          current.textContent = percentages[index] + '%';
        } else {
          // If the current value is 0 or -1 display -- on label
          current.textContent = '--';
        }
      });
    },

    /**************************
     *      Display Month     *
     **************************/
    // Displays current month and year in UI
    displayMonth: function() {
      var now, year, month, months;
      // Built into js receives current date and assigns now variable
      now = new Date();

      // List of all months
      months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      // Get the month of the current date assign to month
      // Will be a number 1 less than normal ex (January != 1) (January = 0)
      month = now.getMonth();
      // Get the year of the current date assign to year
      year = now.getFullYear();

      // Create string with the month array, space, and year
      // Fill dateLabel in UI with string
      document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
    },

    /**************************
     *      Changed Type      *
     **************************/
    // Change colors on input boxes depending if inc or exp is selected (+/-)
    // the !important in .red-focus and .red css will overwrite normal settings
    // Page loads with + shown and default Inc color scheme
    // On change it will toggle and be given lower priority than new class
    changedType: function() {
      // Create a list of user input fields (type, description, value)
      var fields = document.querySelectorAll(
        DOMstrings.inputType + ',' +
        DOMstrings.inputDescription + ',' +
        DOMstrings.inputValue);

      // Loop throug fields list
      nodeListsForEach(fields, function(cur) {
        // toggle .red-focus CSS class for each item in list
        cur.classList.toggle('red-focus');
      });

      // Toggle .red CSS class for submit button
      document.querySelector(DOMstrings.inputBtn).classList.toggle('red');

    },

    // Allow DOMStrings to be public
    getDOMstrings: function() {
      return DOMstrings;
    }
  };
})();



/**********************************
 *      GLOBAL APP CONTROLLER     *
 **********************************/
//    Allows interaction between budgetController and UIController
//    Private variables and functions
//     setupEventListeners: make submit button clickable. Enter also submits
//     ctrlAddItem: Collects data from user fields
//      Processes received data through budget controller
//      Processes received data through UIController
//      Clears fields for user
//    Public Variables and functions
//      init: set initial load values and activate functions
//        start event listeners to collect user input
var controller = (function(budgetCtrl, UICtrl) {
  // Makes button clickable and submit w/ "enter"
  var setupEventListeners = function() {
    //  Access DOMstrings to set event listeners on
    var DOM = UICtrl.getDOMstrings();

    //  Set event listener on button runs ctrlAddItem below
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    //  Listen for "Enter" key. When pressed run ctrlAddItem below
    document.addEventListener('keypress', function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });

    // Set event listener on Income/Expenses list delete buttons
    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

    // Set event listener on type selector
    // Will change colors of user input boxes
    document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
  };

  // Processes budget information and changes UI
  var updateBudget = function() {

    //1. Calculate the budget
    budgetCtrl.calculateBudget();

    //2. Return the budget
    var budget = budgetCtrl.getBudget();

    //3. Display the budget on the UI
    UICtrl.displayBudget(budget);
  };

  // Processes percentage changes. Updates changes to budgetController and UI
  var updatePercentages = function() {
    // 1. Calculate Percentages
    budgetCtrl.calculatePercentages();
    // 2. Read percentages from budgetController
    var percentages = budgetCtrl.getPercentages();
    // 3. Update UI with new percentages
    UICtrl.displayPercentages(percentages);
  };

  // Collects data from fields. Processes with BudgetController/UIController
  var ctrlAddItem = function() {
    var input;
    var newItem;

    //1. Get the field input data
    input = UICtrl.getinput();

    // Make sure that description and value are not empty or invalid
    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      //2. Add item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);
      //3. Add the item to the UI
      UIController.addListItem(newItem, input.type);
      //4. Clear the fields
      UICtrl.clearFields();
      //5. Calculate and update budget
      updateBudget();
      //6. Calculate and update percentages
      updatePercentages();
    }
  };

  // Delete an item from budgetController and UIController
  var ctrlDeleteItem = function(event) {
    var itemID, splitID, type, ID;

    // Find ID of delete button that was clicked
    itemID = (event.target.parentNode.parentNode.parentNode.parentNode.id);

    // When it receives an ID process so it can be identified
    if (itemID) {
      // Makes an array of strings before and after specified character (-)
      splitID = itemID.split('-');
      // The first item in array made above ex: [income, 0] (income)
      type = splitID[0];
      // The second item in array made above ex: [income, 0] (0)
      // Converts result to an int instead of string
      ID = parseInt(splitID[1]);

      // 1. Delete the item from the data structure
      budgetCtrl.deleteItem(type, ID);
      // 2. Delete the item from the UI
      UICtrl.deleteListItem(itemID);
      // 3. Update and show the new budget
      updateBudget();
      // 4. Calculate and update percentages
      updatePercentages();
    }
  };

  return {
    // Initialize the page (runs at load)
    init: function() {
      // Show this function ran in console
      console.log('Application has started.');
      // Tell UI controller to display proper month
      UICtrl.displayMonth();
      // Set initial budget values in UI
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });


      //  Start event listeners so things can happen
      setupEventListeners();

    }
  };

})(budgetController, UIController);

// Run initialization
controller.init();



/******************************************************************************/
/****************************************
 *      TODO List and Improvements      *
 ****************************************/
// TODO: (controller.ctrlAddItem();) Set a message if blank or invalid values are submitted by user

// TODO: Include percentage of for individual incomes budgetController.Incomes

// TODO: (budgetController.calculateBudget(); budgetController.calculatePercentages(); Expense.prototype.calcPercentage) Create a percentageCalculator(exp, inc); since we write out the math multiple times

// TODO: (UIController.formatNumber();) Give error message if user enters number to more than 2 decimal places

// TODO: (UIController.formatNumber();) Don't allow user to enter multiple decimals

// TODO: (UIController.formatNumber();) Update to use String.prototype.substring(); instead of String.prototype.subst();

//TODO: (UIController.formatNumber();) Update so this works to multiple places instead of just to thousands
// while length before comma > 3 add a comma appropriately, loop

// TODO: (BudgetController.nodeListsForEach(); UIController.nodeListsForEach(); UIController.displayPercentages) See if having both of these are necessary and reduce to just one if possible

// TODO: Allow user to submit list to a function in console to automatically process all items in the list as if they had hit submit button ex: listMode(list); list = test1, value, test2, value, test3, value

// TODO: Add light mode/dark mode toggle switch

/*****************************************************************************/
/******************************
 *      COMPLETED TODO'S      *
 ******************************/

/*
Changed to dark mode
Add css so type colors are different in drop down
Add css so user entered text changes colors to match type


 */