// Global app controller


/* Imports */
import * as Tools from './tools'; // Tools to help me troubleshoot
import Search from './models/Search'; //  Handles search results retrieval
import Recipe from './models/Recipe'; // Handles recipe results retrieval
import * as searchView from './views/searchView'; // Update UI-search funcitons
import * as recipeView from './views/recipeView';
import {
  elements, // DOM strings
  renderLoader, // Create loading icon
  clearLoader, // Delete loading icon
} from './views/base'; // Holds DOM strings

/*  Global state of the app
|*    -Search object
|*    -Current recipe object
|*    -Shopping list object
|*    -Liked Recipes
|*    -Time? (for last reload)
|*/
const state = {};



//  Retrieves search results from user -> forwards query to the API -> receives results from API -> Updates UI with results
const controlSearch = async () => {
  //  1. Get query from view
  const query = searchView.getInput();

  console.log(query);

  //  2. If there is a query then create a new search object and add it to state
  if (query) {
    state.search = new Search(query);

    //  3. Prepare UI for results
    searchView.clearResults(); // Clear any previously generated results
    searchView.clearInput(); // Clear the query from search field
    renderLoader(elements.searchRes); // Delete loading icon

    try {
      //  4. Search for recipes
      await state.search.getResults();

      //  5. Render results on UI
      clearLoader(); // Delete loading icon
      searchView.renderResults(state.search.result);
    } catch (err) {
      alert('Something went wrong with the search...');
      clearLoader();
    }

  }
};



//  Event listener for user search. Listens for a click on the search button and runs controlSearch()
//  Also handles enter since this is in a form
elements.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  controlSearch();
});



//  Event listener to change pages in recipe search results area
//  Listens for a click anywhere in
elements.searchResPages.addEventListener('click', (e) => {
  //  gets the html of a clicked thing if it has a class of .btn-inline
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    //  Sets the page number that the button will lead to
    //  dataset.goto is a value saved in html in data-goto. It is calculated by the current page +/- 1 depending on prevous or next
    //   Must use parseInt or it will be saved as a string
    const goToPage = parseInt(btn.dataset.goto, 10);

    // Clear prevous results before displaying the next results
    searchView.clearResults();

    // Generate next set of search results and btns if needed
    searchView.renderResults(state.search.result, goToPage);
  }
});




/*
 *  Recipe Controller
 */
const controlRecipe = async () => {
  // Get ID from URL
  const id = window.location.hash.replace('#', '');
  console.log(id);
  if (id) {
    // Prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    // Highlight selected search item
    if (state.search) {
      searchView.highlightSelected(id);
    }

    // Create new recipe object
    state.recipe = new Recipe(id);


    try {
      // Get Recipe data and parse ingredients
      await state.recipe.getRecipe();
      console.log(state.recipe);
      state.recipe.parseIngredients();

      // Calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      // Render recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe);

    } catch (err) {
      alert('Error processing recipe');
    }

  }
};

// Two different events for the same function
//  Store the events to add an event listener to and then do so in a forEach loop
['hashchange', 'load'].forEach((event) => {
  window.addEventListener(event, controlRecipe);
});

// Handling recipe button clicks
elements.recipe.addEventListener('click', (e) => {
  if (e.target.matches('.btn-decrease, .btn-decrease *')) {
    // Decrease button is clicked
    if (state.recipe.servings > 1) {
      state.recipe.updateServings('dec');
      recipeView.updateServingsIngredients(state.recipe);
    }
  } else if (e.target.matches('.btn-increase, .btn-increase *')) {
    // Increase button is clicked
    state.recipe.updateServings('inc');
    recipeView.updateServingsIngredients(state.recipe);
  }
  console.log(state.recipe);
});
















console.log(Tools.logTime());