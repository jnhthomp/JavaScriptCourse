import axios from 'axios';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const res = await axios(`https://forkify-api.herokuapp.com/api/get?&rId=${this.id}`);
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.image = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;
      this.ingredient = res.data.recipe.ingredients;
    } catch (error) {
      console.log(error);
      alert('Something went wrong :(');
    }
  }

  calcTime() {
    // Assume we need 15 minutes for each 3 ingredients
    const numIng = this.ingredient.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }

  parseIngredients() {
    const unitLong = ['tablesppons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
    const unitShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
    const newIngredients = this.ingredient.map((el) => {
      // Uniform units
      let ingredient = el.toLowerCase();
      unitLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitShort[i]);
      });

      // Remove Parenthesis
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');


      // Parse ingredients into count, unit, and ingredient
      const arrIng = ingredient.split(' ');

      const unitIndex = arrIng.findIndex((el2) => unitShort.includes(el2));

      let objIng;
      if (unitIndex > -1) {
        // There is a unit
        const arrCount = arrIng.slice(0, unitIndex);

        let count;

        if (arrCount.length === 1) {
          count = eval(arrIng[0].replace('-', '+'));

        } else {
          count = eval(arrIng.slice(0, unitIndex).join('+'));
        }
        objIng = {
          count: count,
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).join(' ')
        };
      } else if (parseInt(arrIng[0], 10)) {
        // There is no unit, but the 1st element is a number
        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: '',
          ingredient: arrIng.slice(1).join(' ')
        };
      } else if (unitIndex === -1) {
        // There is no unit and no number in 1st position
        objIng = {
          count: 1,
          unit: '',
          ingredient
        };
      }
      return objIng;
    });

    this.ingredient = newIngredients;
  }
}