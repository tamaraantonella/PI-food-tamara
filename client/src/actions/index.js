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


export function sortRecipes(payload){
    return{
        type: 'SORT_RECIPES',
        payload
    }
}

export function searchByName(payload){
    return async function(dispatch){
        try {
            var json = await axios.get('http://localhost:3001/recipes?name='+ payload)
            return dispatch({
                type: 'SEARCH_BY_NAME',
                payload: json.data
            })
        }catch (error) {
            console.log(error)
        }
    }
}

export function getDiets (){
    return async function(dispatch){
        var diets = await axios.get('http://localhost:3001/diets', {})
        return dispatch({
            type: 'GET_DIETS',
            payload: diets.data
        })
    }
}

export function postRecipe(payload){
    return async function (){
        var info = await axios.post('http://localhost:3001/recipes', payload)
        return {
            type: 'POST_RECIPE',
            info
        }
    }
}

export function getDetail(id){
    return function(dispatch) {
      return fetch(`http://localhost:3001/recipes/${id}`)
        .then(response => response.json())
        .then(json => {
            
          dispatch(
            { type: "GET_DETAIL", 
            payload: json });
        });
    };
  }
  
export function resetDetail (){
    return{
        type: 'RESET_DETAIL'
    }
}

export function resetRecipes(){
    return{
        type: 'RESET_RECIPES'
    }
}