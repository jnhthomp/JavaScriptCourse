//  BUDGET CONTROLLER
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
/******************************
 *      BUDGET CONTROLLER     *
 ******************************/
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
   *      PUBLICALLY ACCESSABLE     *
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

  //Store class names here so they can be used later and easily changed
  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container',
    expensesPercLabel: '.item__percentage',
    dateLabel: '.budget__title--month'
  };

  var formatNumber = function(num, type) {
    var numSplit, int, dec;
    // + or - before number + 100 / -100
    // exactly 2 decimal points 100.00
    // comma seperating thousands 1,000
    // 1000 -> + 1,000.00

    num = Math.abs(num);
    num = num.toFixed(2);

    numSplit = num.split('.');
    int = numSplit[0];


    if (int.length > 3) {
      int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
    }
    dec = numSplit[1];

    return (type === 'exp' ? sign = '-' : sign = '+') + ' ' + int + '.' + dec;
  };

  var nodeListsForEach = function(list, callback) {
    for (var i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };

  // Receive input; Use object so you can receive +/-, name, and value
  return {
    getinput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, //will be inc/exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      };
    },

    addListItem: function(obj, type) {
      var html, newHtml, element;
      //  1. Create html strings w/ placeholder text
      if (type === 'inc') {
        // Adds html block to income list
        element = DOMstrings.incomeContainer;
        // Placeholder html
        html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === 'exp') {
        // Adds html block to expenses list
        element = DOMstrings.expensesContainer;
        // Placeholder html
        html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      //  2. Replace placeholder text with data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));
      //  3. Insert HTML into DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    deleteListItem: function(selectorID) {
      var el = document.getElementById(selectorID);
      el.parentNode.removeChild(el);
    },

    // Clear user input from fields
    clearFields: function() {
      var fields, fieldsArr;
      // Creates a list of fields that need cleared
      fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

      // Transforms list of fields into an array of fields
      fieldsArr = Array.prototype.slice.call(fields);

      // Goes through array of fields and sets each one to blank
      fieldsArr.forEach(function(current, index, array) {
        current.value = '';

      });

      // Return cursor to first item in fields array (inputDescription)
      fieldsArr[0].focus();
    },

    displayBudget: function(obj) {

      obj.budget > 0 ? type = 'inc' : type = 'exp';
      document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
      document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
      document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');

      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = '--';
      }
    },

    displayPercentages: function(percentages) {
      var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

      nodeListsForEach(fields, function(current, index) {
        if (percentages[index] > 0) {
          current.textContent = percentages[index] + '%';
        } else {
          current.textContent = '--';
        }
      });
    },

    displayMonth: function() {
      var now, year, month, months;
      now = new Date();

      months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      month = now.getMonth();
      year = now.getFullYear();
      document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;

    },

    changedType: function() {
      var fields = document.querySelectorAll(
        DOMstrings.inputType + ',' +
        DOMstrings.inputDescription + ',' +
        DOMstrings.inputValue);

      nodeListsForEach(fields, function(cur) {
        cur.classList.toggle('red-focus');
      });

      document.querySelector(DOMstrings.inputBtn).classList.toggle('red');

    },

    // Make DOMstrings accessible to global controller
    getDOMstrings: function() {
      return DOMstrings;
    }

  };

})();


//  GLOBAL APP CONTROLLER
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

    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

    document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);

  };

  var updateBudget = function() {
    //1. Calculate the budget
    budgetCtrl.calculateBudget();

    //2. Return the budget
    var budget = budgetCtrl.getBudget();

    //3. Display the budget on the UI
    UICtrl.displayBudget(budget);
  };

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

  var ctrlDeleteItem = function(event) {
    var itemID, splitID, type, ID;

    itemID = (event.target.parentNode.parentNode.parentNode.parentNode.id);

    if (itemID) {
      splitID = itemID.split('-');
      type = splitID[0];
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

// TODO: (controller.ctrlAddItem();) Set a message if blank or invalid values are submitted by user

// TODO: Include percentage of for individual incomes budgetController.Incomes

// TODO: (budgetController.calculateBudget(); budgetController.calculatePercentages(); Expense.prototype.calcPercentage) Create a percentageCalculator(exp, inc); since we write out the math multiple times