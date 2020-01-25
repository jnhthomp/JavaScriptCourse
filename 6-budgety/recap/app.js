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
var budgetController = (function() {

  //  Create expense object
  //  This will collect all the information to process an expense
  var Expense = function(id, description, value) {
    //  Set values passed as variables in the object
    this.id = id;
    this.description = description;
    this.value = value;
  };

  //  Create income object
  //  This will collect all the information to process an income
  var Income = function(id, description, value) {
    //  Set values passed as variables in the object
    this.id = id;
    this.description = description;
    this.value = value;
  };


  //  Where all the objects are stored and can be found
  var data = {
    //  Stores all created objects as an expense or an income
    allItems: {
      exp: [],
      inc: []
    },
    //  Holds total values of expenses and incomes
    totals: {
      exp: 0,
      inc: 0
    }
  };

  // Publicly accessable functions.
  return {
    // Creates a new expense or income object (See create expense object above)
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
      //  Uses values passed into addItem and generated ID
      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }

      //  Adds newly created item to array of expense or income objects
      data.allItems[type].push(newItem);

      //  Return the created object so it is available to Global App controller
      return newItem;
    },
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
    expensesContainer: '.expenses__list'

  };

  // Receive input; Use object so you can receive +/-, name, and value
  return {
    getinput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, //will be inc/exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },

    addListItem: function(obj, type) {
      var html, newHtml, element;
      //  1. Create html strings w/ placeholder text
      if (type === 'inc') {
        // Adds html block to income list
        element = DOMstrings.incomeContainer;
        // Placeholder html
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === 'exp') {
        // Adds html block to expenses list
        element = DOMstrings.expensesContainer;
        // Placeholder html
        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      //  2. Replace placeholder text with data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);
      //  3. Insert HTML into DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
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
//      Calculate new budget information
//      Update UI with new budget information
//    Public Variables and functions
//      init: activate event listeners to receive user input
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
  };

  // Collects data from fields. Processes with BudgetController/UIController
  var ctrlAddItem = function() {
    var input;
    var newItem;
    //1. Get the field input data
    input = UICtrl.getinput();

    //2. Add item to the budget controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);

    //3. Add the item to the UI
    UIController.addListItem(newItem, input.type);

    //4. Clear the fields
    UICtrl.clearFields();
    //5. Calculate the budget

    //6. Display the budget on the UI

  };

  return {
    // Initialize the page (runs at load)
    init: function() {
      console.log('Application has started.');
      //  Start event listeners so things can happen
      setupEventListeners();
    }
  };

})(budgetController, UIController);

// Run initialization
controller.init();