//  Axios is used to handle fetch requests since fetch is not reliable on older browsers
//  When importing a dependency from node_modules we don't have to specify the path, just use the same package name as what is listed in package.json
import axios from 'axios';
//  Export defines what this js file will send to other js files that import it
export default class Search {
  //  1.  Accept a query
  //  Save it as a parameter of an object so we can return an object
  constructor(query) {
    this.query = query;
  }

  //  2. Retrieve the results from the API
  async getResults() {
    //  Use try/catch for error handling
    try { // Do this stuff
      // axios is used because it is compatible with old browsers
      // axios also automatically converts to json
      const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
      //  3. Isolate the list of recipes that were returned by the APIs and save it to this object to be accessed by index.js
      //  Save the recipes from the above returned object to results property of this object (currently in index.js state.Search) so state.Search will have access to the now created state.Search.result
      this.result = res.data.recipes;
      //console.log(this.result);
    } catch (error) { // Do this stuff if the above stuff fails
      alert(error);
    }
  }
}