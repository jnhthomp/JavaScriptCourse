import {
  elements
} from './base'; // Holds DOM strings

//  Return the input value of search field
export const getInput = () => elements.searchInput.value;

// Clear the search field of all input
export const clearInput = () => {
  elements.searchInput.value = '';
};

// Clear the generated list of results in the search result list
export const clearResults = () => {
  elements.searchResList.innerHTML = '';
};


// Prevents overflow onto second line in recipe list for longer titles
const limitRecipeTitle = (title, limit = 17) => {
  // Createa an array to store the new title in
  const newTitle = [];
  // Checks if the title is too long or not.
  if (title.length > limit) {
    // Split the title into an array by each space character
    // Reduce can be used to work through the title array and perform a function on each item. It has access to the accumulator variable which is updated with the return outside of the if statement
    title.split(' ').reduce((acc, cur) => {
      // Check if the title would be too long if the current word was added
      if (acc + cur.length <= limit) {
        // If not too long then add it to the newTitle array
        newTitle.push(cur);
      }
      // update the value of accumulator (acc)
      return acc + cur.length;
    }, 0); // 0 is initial value of accumulator (acc)

    // Format and return the newTitle
    // .join(' ') creates a string from the array and inserts a space between each item
    return `${newTitle.join(' ')} ...`;
  }
  // Return title immediately if not too long
  return title;
};

// Generate html for a single recipe to be shown in results list
const renderRecipe = (recipe) => {
  // HTML string to add data about a recipe to
  // The title will be checked with limitRecipeTitle before being added
  const markup = (
    `<li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>`);
  // add the generated HTML at the end of the list of results
  elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

//  Receives an array of recieps from index.js
//  Cycles through them and renderRecipe generates html and adds to results list for each one
export const renderResults = (recipes) => {
  recipes.forEach(renderRecipe);
};