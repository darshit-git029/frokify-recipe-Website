import * as model from './model.js';
import recipeView from './views/recepiView.js';
import searchView from './views/viewSearch.js';
import resultView from './views/resultView.js';
import 'core-js/stable';
import 'regenerator-runtime';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import AddrecipeView from './views/AddrecipeView.js';




const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    resultView.update(model.getSearchResultPage())

    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);

    bookmarkView.update(model.state.bookmarks)
  } catch (err) {
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();

    //get search query 
    const query = searchView.getQuery();
    if (!query) return;

    //load search query
    await model.loadSearchResults(query);

    //render search result 
    // resultView.render(model.state.search.results);
    resultView.render(model.getSearchResultPage());

    //render search result with pagination
    paginationView.render(model.state.search)

  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (gotoPage) {
  //render new view for pagination
  resultView.render(model.getSearchResultPage(gotoPage));

  //render search result with pagination
  paginationView.render(model.state.search)


}

const controlserving = function (newServing) {
  model.updateserving(newServing)
  recipeView.update(model.state.recipe);

}

const contorlbookmark = function () {
  //ADD OR REMOVE BOOKMARK
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe)
  }
  else {
    (model.state.recipe.bookmarked)
    model.deletebokmark(model.state.recipe.id)
  }
  //DISPALY A BOOKMARK
  recipeView.render(model.state.recipe)

  //render a bookmark
  bookmarkView.render(model.state.bookmarks)

}

const cotrollbookmark = function () {
  bookmarkView.render(model.state.bookmarks)
}

const controlAddRecipes = async function (newRecipe) {
  try {
    AddrecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe)
    //  console.log(model.state.recipe);

    //render a recipe 
    recipeView.render(model.state.recipe)

    //show success messge
    AddrecipeView.renderMessage();

    //show bookmark 
    bookmarkView.render(model.state.bookmarks)

    //set time for close window 
    setTimeout(function () {
      AddrecipeView.togglewindow()
    }, 1000)

    //chabge url
    window.history.pushState(null,'',`#${model.state.recipe.id}`);
  } catch (err) {
    alert(err)

  }

}

const init = function () {
  bookmarkView.addhandlerRander(cotrollbookmark)
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addhandlerservingbtn(controlserving);
  recipeView.addhandlerbookmark(contorlbookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  AddrecipeView.addHandlerUpload(controlAddRecipes);

};

init();
