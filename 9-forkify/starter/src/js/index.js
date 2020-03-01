// Global app controller


/* Imports */
import * as tools from './tools'; // Tools to help me troubleshoot
import Search from './models/Search'; //  Handles search results retrieval
import * as searchView from './views/searchView';
import {
  elements
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

    //  4. Search for recipes
    await state.search.getResults();

    //  5. Render results on UI
    searchView.renderResults(state.search.result);
  }
};



//  Event listener for user search. Listens for a click on the search button and runs controlSearch()
//  Also handles enter since this is in a form
elements.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  controlSearch();
});



























console.log(tools.logTime());