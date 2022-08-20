//Estado global inicial
const initialState = {
  recipes: [],
  types: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    //traigo las recetas del backend
    case "GET_RECIPES":
      return {
        ...state,
        recipes: action.payload
      }
    case "FILTER_RECIPES":
      const allRecipes = state.recipes;
      const dietFilter = action.payload === 'All' ? allRecipes : allRecipes.filter(recipe => recipe.diets.includes(action.payload));
        return {
        ...state,
        types: dietFilter,
      }
    default:
        return state;
}
}

export default rootReducer;