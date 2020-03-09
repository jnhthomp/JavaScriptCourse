// Used to hold DOM strings
export const elements = {
  searchForm: document.querySelector('.search'),
  searchInput: document.querySelector('.search__field'),
  searchRes: document.querySelector('.results'),
  searchResList: document.querySelector('.results__list'),
  searchResPages: document.querySelector('.results__pages'),
  recipe: document.querySelector('.recipe'),
  shopping: document.querySelector('.shopping__list'),
  likesMenu: document.querySelector('.likes__field'),
  likesList: document.querySelector('.likes__list')
};

// Used to hold DOM strings without the period for use inside of html
// Doesn't contain document.querySelector because there are instances we need to use the string only and without querySelector
export const elementStrings = {
  loader: 'loader' // class of loading icon
};

// Render loading icon within a specified parent class
export const renderLoader = (parent) => {
  // Loader css to insert
  const loader = (
    `<div class="${elementStrings.loader}">
      <svg>
        <use href="img/icons.svg#icon-cw"></use>
      <svg>
     </div>`
  );

  // Insert the html into the parent that was specified at the top
  parent.insertAdjacentHTML('afterbegin', loader);
};

// Delete a rendered loader from the screen
export const clearLoader = () => {
  // specify the loader. There should only be one at a time so we shouldn't need to specify a parent
  const loader = document.querySelector(`.${elementStrings.loader}`);
  if (loader) { // If the loader exists
    // Delete the loader icon
    loader.parentElement.removeChild(loader);
  }
};