import axios from 'axios';


export function getRecipes() {
    return async function (dispatch) {
        //aca conecto el backend con el frontend
        var json = await axios.get('http://localhost:3001/recipes', {
        })
        return dispatch({
            type: 'GET_RECIPES',
            payload: json.data
        })
    }
}

export function filterRecipes(payload) {
    return {
        type: 'FILTER_RECIPES',
        payload
    }

}