//Estado global inicial
const initialState = {
  recipes: [],

};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    //traigo las recetas del backend
    case "GET_RECIPES":
        return {
            ...state,
            recipes: action.payload
        }

    default:
        return state;
}
}

export default rootReducer;