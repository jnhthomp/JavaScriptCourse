// Global app controller


/* Imports */
import Tools from './tools';
import Search from './models/Search';

/*  Global state of the app
|*    -Search object
|*    -Current recipe object
|*    -Shopping list object
|*    -Liked Recipes
|*/
const state = {};




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