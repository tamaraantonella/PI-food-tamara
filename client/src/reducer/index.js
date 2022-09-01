//Estado global inicial
const initialState = {
  recipes: [],
  allRecipes: [],
  diets:[],
  detail:[],
  filtered:[],
  notFound:'',
  errorServer:''
  
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    //traigo las recetas del backend
    case "GET_RECIPES":
      return action.payload.error ? ({...state, errorServer:action.payload.error, recipes:[]}) : ({...state, recipes: action.payload, allRecipes: action.payload, notFound:'', errorServer:''});
    
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
      const filtered = action.payload === 'default' ? listedRecipes : alternativeFilter.concat(filteredDB)
      console.log(action.payload)
      return {
        ...state,
        filtered: (action.payload === 'default') ? listedRecipes : filtered,
        recipes: (action.payload === 'default') ? listedRecipes : filtered,
        notFound: (filtered.length===0) ? 'No se encontraron recetas' : ''
      };

    case "SEARCH_BY_NAME":  
      return action.payload.error ? ({...state, recipes:[], notFound:action.payload.error}) : ({...state, recipes:action.payload, notFound:''})

    case "SORT_RECIPES":
      const sorted = state.filtered.length ? state.filtered : state.allRecipes
      if (action.payload === "asc") (sorted.sort((a,b) => a.name.localeCompare(b.name)))
      if(action.payload ==='desc') (sorted.sort((a,b) => b.name.localeCompare(a.name)))
      if(action.payload === 'ascH') {
        sorted.sort(function(a,b){
          if(a.healthScore > b.healthScore) { return 1 }
          if(b.healthScore > a.healthScore) { return -1 }
          return 0
        })
      }
      if(action.payload === 'descH') {
        sorted.sort(function(a,b){
          if(a.healthScore > b.healthScore) { return -1 }
          if(b.healthScore > a.healthScore) { return 1 }
          return 0
        })
      }
      return{
        ...state,
        recipes: sorted
        
      }
    case "POST_RECIPE":
      return{
        ...state
      }
    case "GET_DIETS":
      return action.payload.error ? ({...state, errorServer:action.payload.error}) : ({...state, diets:action.payload, errorServer:''})
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
    case "RESET_RECIPES":
      return{
        ...state,
        filtered:[],
        recipes:[]
      }
      
    default:
        return state;
}
}

export default rootReducer;