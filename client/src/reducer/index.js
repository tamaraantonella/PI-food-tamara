//Estado global inicial
const initialState = {
  recipes: [],
  allRecipes: [],
  diets:[]
  
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
        const allRecipes= state.allRecipes
        const createdInDB= allRecipes.filter(recipe => recipe.createdInDB) 
        const recipesFromApi= allRecipes.filter(recipe => !recipe.createdInDB)
        if(action.payload==='vegetarian' || action.payload==='vegan' || action.payload==='glutenFree' || action.payload==='dairyFree'){
          const filterInDB = createdInDB.filter(recipe => recipe.diets.includes(action.payload))
          const filterInApi = recipesFromApi.filter(recipe => recipe[action.payload]===true)
          return {
            ...state,
            recipes: filterInApi.concat(filterInDB)
          }
        } else{
          const dietFilter = action.payload === 'all' ? allRecipes : allRecipes.filter(recipe => recipe.diets.includes(action.payload));
          return {
            ...state,
            recipes: dietFilter
          }
        }
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
    default:
        return state;
}
}

export default rootReducer;