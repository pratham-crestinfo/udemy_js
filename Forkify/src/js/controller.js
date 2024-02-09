import "core-js/stable";
import "regenerator-runtime/runtime"
import * as model from "./modal.js"
import RecipeView from "./view/recipeview.js"
import searchView from "./view/searchView.js";
import resutslView from "./view/resutslView.js";
import PaginationView from "./view/pageView.js"
import recipeview from "./view/recipeview.js";
import BookmarksView from "./view/bookmarkview.js";
import AddRecipeView from "./view/addReceipeView.js";
import {MODAL_CLOSE_SEC} from "./config.js";



const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// if(module.hot){
//   module.hot.accept();
// }


const controlRecipes  = async function()
{
  try{
    const id=window.location.hash.slice(1);
    if(!id) return;

    // resutslView.update(model.getSearchResultsPage())
    // BookmarksView.update(model.state.bookmarks);
    //FETCHING RECEIPE

    RecipeView.renderSpinner();

    //RENDERING
    await model.loadRecipe(id);

    //RENDERING RECEIPE
    RecipeView.render(model.state.recipe);  

  }
  catch(err)
  {
    // console.log(err); 
     RecipeView.renderError(); 
  }
};


const controlSearchResults = async function()
{
  try{
    resutslView.renderSpinner(); 
    const query=searchView.getQuery();
    if(!query)return;
    await model.loadSearchResults(query);
    console.log(model.state.search.results);
    resutslView.render(model.getSearchResultsPage());
    PaginationView.render(model.state.search)
  }
  catch(err){
    console.log(err);
  }
}

const controlPagination = function(goToPage)
{
  console.log(goToPage); 
  resutslView.render(model.getSearchResultsPage(goToPage));
  PaginationView.render(model.state.search)
}
const controlServings=function(newServings)
{
  console.log(newServings)
  model.updateServings(newServings);
  RecipeView.render(model.state.recipe);  
}
const controlAddBookmark = function()
{
  if(!model.state.recipe.bookmarked)
  {
    model.addBookmark(model.state.recipe);
  }
 else{
    model.deleteBookmark(model.state.recipe.id);
 }
 recipeview.update(model.state.recipe );
 BookmarksView.render(model.state.bookmarks);
}

const controlBookmarks = function ()
{
  BookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    AddRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render recipe
    RecipeView.render(model.state.recipe);

    // Success message
    AddRecipeView.renderMessage();

    // Render bookmark view
    BookmarksView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close form window
    setTimeout(function () {
      AddRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('💥', err);
    AddRecipeView.renderError(err.message);
  }
};
function init()
{
  // BookmarksView.addHandlerRender(controlBookmarks);
  RecipeView.addHandlerRender(controlRecipes);
  RecipeView.addHandlerUpdateServings(controlServings); 
  recipeview.addHandlerAddBookmakup(controlAddBookmark); 
  searchView.addHandlerSearch(controlSearchResults);
  PaginationView.addHandlerClick(controlPagination);
  AddRecipeView.addHandlerUpload(controlAddRecipe);

}
init();
