import {async} from "regenerator-runtime";
import {getJSON,sendJSON,AJAX} from "./view/helpers.js"
import {API_URL} from "./config.js";
import {RES_PER_PAGE} from "./config.js"
import {KEY} from "./config.js"



export  const state={
    recipe:{},
    search:{
        query:"",
        results:[],
        page:1,
        resultsPerPage:RES_PER_PAGE
    },
    bookmarks:[]  
}
export const loadRecipe = async function(id)
{
    try{
        // const res= await fetch(`${API_URL}/${id}`);
        // const data=await res.json();
        // if(!res.ok) throw new Error(`${data.message} (${res.status})`)
        const data = await getJSON(`${API_URL}/${id}`)

    //SUCCEESSFULL FETCHING
    const recipe=data.data.recipe; 
    state.recipe = {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    }; 
    // console.log(typeof state.recipe.servings);
    if(state.bookmarks.some(bookmark=>bookmark.id === id))
    state.recipe.bookmarked=true;
    else
    state.recipe.bookmarked=false;
}
    catch(err)
    {
        throw err;
    }
}
const createRecipeObject = function (data) {
    const { recipe } = data.data;
    return {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
      ...(recipe.key && { key: recipe.key }),
    };
  };
export const loadSearchResults = async function(query)
{
    try{
        state.search.query=query; 
        const data=await getJSON(`${API_URL}/?search=${query}`);
        // console.log(data);
        state.search.results=data.data.recipes.map(rec=>{
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                sourceUrl: rec.source_url,
                image: rec.image_url
            }
        })
        state.search.page=1
    }
    catch(err){
        console.log(`${err}😎`);
        throw err;
    }
}
// loadSearchResults("pizza");

export const getSearchResultsPage = function(page=state.search.page)
{
    state.search.page=page;
    const start=(page-1)*RES_PER_PAGE;
    const end=(page)*RES_PER_PAGE;
    return state.search.results.slice(start,end)
} 
export const updateServings=function(newServings)
{
    // console.log(newServings)
    state.recipe.ingredients.forEach(ing=>{
        ing.quantity=(ing.quantity*newServings)/state.recipe.servings;
    });
    state.recipe.servings=newServings;
}

const persistBookMarks = function()
{
    localStorage.setItem("bookmarks",JSON.stringify(state.bookmarks));
}

export const addBookmark = function(recipe)
{
    state.bookmarks.push(recipe);
    if(recipe.id === state.recipe.id) state.recipe.bookmarked=true;
    persistBookMarks();
}

export const deleteBookmark = function(id)
{
    const index=state.bookmarks.findIndex(el=>el.id === id);
    state.bookmarks.splice(index,1);
    if( id === state.recipe.id) state.recipe.bookmarked = false;
    persistBookMarks();

}
const init=function()
{
    const storage=localStorage.getItem("bookmarks");
    if(storage) state.bookmarks = JSON.parse(storage);
}
init();
console.log(state.bookmarks);
export const uploadRecipe = async function (newRecipe) {
    try {
      const ingredients = Object.entries(newRecipe)
        .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
        .map(ing => {
          const ingArr = ing[1].split(',').map(el => el.trim());
          // const ingArr = ing[1].replaceAll(' ', '').split(',');
          if (ingArr.length !== 3)
            throw new Error(
              'Wrong ingredient fromat! Please use the correct format :)'
            );
  
          const [quantity, unit, description] = ingArr;
  
          return { quantity: quantity ? +quantity : null, unit, description };
        });
  
      const recipe = {
        title: newRecipe.title,
        source_url: newRecipe.sourceUrl,
        image_url: newRecipe.image,
        publisher: newRecipe.publisher,
        cooking_time: +newRecipe.cookingTime,
        servings: +newRecipe.servings,
        ingredients,
      };
  
      const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
      state.recipe = createRecipeObject(data);
      addBookmark(state.recipe);
    } catch (err) {
      throw err;
    }
  };
  