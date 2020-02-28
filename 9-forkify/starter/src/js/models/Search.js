//  Axios is used to handle fetch requests since fetch is not reliable on older browsers
//  When importing a dependency from node_modules we don't have to specify the path, just use the same package name as what is listed in package.json
import axios from 'axios';
//  Export defines what this js file will send to other js files that import it
export default class Search {
  constructor(query) {
    this.query = query;
  }
  async getResults() {
    try {
      const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
      this.result = res.data.recipes;
      //console.log(this.result);
    } catch (error) {
      alert(error);
    }
  }
}