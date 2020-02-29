// Global app controller


/* Imports */
import Tools from './tools'; // Tools to help me troubleshoot
import Search from './models/Search'; //  Handles search results retrieval

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
  const query = 'pizza'; // TODO: read data from user from search view module

  //  2. If there is a query then create a new search object and add it to state
  if (query) {
    state.search = new Search(query);

    //  3. Prepare UI for results

    //  4. Search for recipes
    await state.search.getResults();

    //  5. Render results on UI
    console.log(state.search.result);
  }
};



//  Event listener for user search. Listens for a click on the search button and runs controlSearch()
//  TODO: set up event listener to search user input on "ENTER" keypress too
document.querySelector('.search').addEventListener('submit', (e) => {
  e.preventDefault();
  controlSearch();
});



























//  Show time on reload
function showTime() {
  const tools = new Tools();
  const time = tools.logTime();
  console.log(`Reloaded -- ${time}`);
}
showTime();