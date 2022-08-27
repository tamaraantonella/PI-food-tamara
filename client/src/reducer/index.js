//Estado global inicial
const initialState = {
  recipes: [],
  allRecipes: [],
  diets:[],
  detail:[]
  
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    //traigo las recetas del backend
    case "GET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload
      }
      case "FILTER_RECIPES":
        const listedRecipes= state.allRecipes
        const recipesApi= listedRecipes.filter(recipe => !recipe.createdInDB)
        const recipesDB= listedRecipes.filter(recipe => recipe.createdInDB)
        const filteredDB = recipesDB.filter(recipe => recipe.diets.includes(action.payload))
        const alternativeFilter = recipesApi.filter(recipe=>recipe[action.payload] || recipe.diets.includes(action.payload))
        if(action.payload==='gluten free') {
          const gluten = recipesApi.filter(recipe=> recipe['glutenFree'])
          gluten.length && alternativeFilter.concat(gluten)
        }
        if(action.payload==='dairy free') {
          const dairy = recipesApi.filter(recipe=> recipe['dairyFree'])
          dairy.length && alternativeFilter.concat(dairy)
        }
        const filtered = alternativeFilter.concat(filteredDB)
        
        return {
          ...state,
          recipes: (action.payload === 'all') ? listedRecipes : filtered,
        };
      case "ORDER_BY_NAME":
        if (action.payload === "asc") state.recipes.sort((a,b) => a.name.localeCompare(b.name))
          else if (action.payload === 'desc') state.recipes.sort((a,b) => b.name.localeCompare(a.name))
        return {
          ...state,
        }
      case "SEARCH_BY_NAME": 
        return{
          ...state,
          recipes: action.payload
        }

      case "ORDER_BY_HEALTHSCORE":
        let sortedHealth = action.payload=== 'desc' ?
        state.recipes.sort(function(a,b){
          if(a.healthScore > b.healthScore) { return 1 }
          if(b.healthScore > a.healthScore) { return -1 }
          return 0
        }) :
        state.recipes.sort(function(a,b){
          if(a.healthScore > b.healthScore) { return -1 }
          if(b.healthScore > a.healthScore) { return 1 }
          return 0
        })
        return {
          ...state,
          recipes: sortedHealth
        }
      case "POST_RECIPE":
        return{
          ...state
        }
      case "GET_DIETS":
        return{
          ...state,
          diets: action.payload
        }
      case "GET_DETAIL":
        return{
          ...state,
          detail: action.payload
        }
      case "RESET_DETAIL":
        return{
          ...state,
          detail: ['']
        }
    default:
        return state;
}
}

export default rootReducer;