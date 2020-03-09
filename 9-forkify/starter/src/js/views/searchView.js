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
  elements.searchResList.innerHTML = ''; // Remove list of resutls
  elements.searchResPages.innerHTML = ''; // Remove prev/next page btns
};

export const highlightSelected = (id) => {
  const resultsArr = Array.from(document.querySelectorAll('.results__link'));
  resultsArr.forEach((el) => {
    el.classList.remove('results__link--active');
  });
  document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active');
};

// Prevents overflow onto second line in recipe list for longer titles
export const limitRecipeTitle = (title, limit = 17) => {
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


// Create prev/next page buttons
// Recieves current page and whether the button should show previous/next (type)
const createButton = (page, type) => `
  <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page-1 : page + 1}>
    <span>Page ${type === 'prev' ? page-1 : page + 1}</span>
    <svg class="search__icon">
      <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
    </svg>
  </button>`;

// Decides how many and white type of buttons per page
// Organizes how many results will be displayed on each page
const renderButtons = (page, numResults, resPerPage) => {
  // How many total pages will be needed?
  const pages = Math.ceil(numResults / resPerPage);
  // HTML for button will be generated below but needs to be available outside the function so it can be returned and reused between if statements
  let button;
  if (page === 1) {
    // Only button to go to next page
    button = createButton(page, 'next');
  } else if (page < pages) {
    // Both next and previous page buttons
    button = `${createButton(page, 'prev')}${createButton(page, 'next')}`;
  } else {
    // Only button to go to previous page
    button = createButton(page, 'prev');
  }

  // Add the generated button html to the DOM
  elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};




//  Receives an array of recieps from index.js
//  Cycles through them and renderRecipe generates html and adds to results list for each one
export const renderResults = (recipes, page = 1, resPerPage = 10) => {
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;


  recipes.slice(start, end).forEach(renderRecipe);
  renderButtons(page, recipes.length, resPerPage);
};