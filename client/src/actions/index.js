import axios from 'axios';
const url ='https://http-nodejs-production-13ee.up.railway.app/'

export function getRecipes() {
    return async function (dispatch) {
        try
        {
            let json = await axios.get('https://http-nodejs-production-13ee.up.railway.app/recipes')
            return dispatch({
                type: 'GET_RECIPES',
                payload: json.data
            })
        } catch (error)
        {
            const errorMessage = { error: error.message }
            return dispatch({
                type: 'GET_RECIPES',
                payload: errorMessage
            })

        }
    }
}

export function getDiets() {
    return async function (dispatch) {
        try
        {
            var diets = await axios.get(url+'diets', {})
            return dispatch({
                type: 'GET_DIETS',
                payload: diets.data
            })
        } catch (error)
        {
            const errorMessage = { error: error.message }
            return dispatch({
                type: 'GET_DIETS',
                payload: errorMessage
            })
        }
    }
}
export function filterRecipes(payload) {
    console.log(payload)
    return {
        type: 'FILTER_RECIPES',
        payload
    }

}
export function filterOrigin(payload) {
    return {
        type: 'FILTER_ORIGIN',
        payload
    }
}


export function sortRecipes(payload) {
    return {
        type: 'SORT_RECIPES',
        payload
    }
}

export function searchByName(payload) {
    return async function (dispatch) {
        try
        {
            var json = await axios.get(url+'recipes?name=' + payload)
            return dispatch({
                type: 'SEARCH_BY_NAME',
                payload: json.data
            })

        } catch (error)
        {
            const errorMessage = { error: error.message }
            return dispatch({
                type: 'SEARCH_BY_NAME',
                payload: errorMessage
            })
        }
    }
}



export function postRecipe(payload) {
    return async function (dispatch) {
        try
        {
            var info = await axios.post(url+'recipes', payload)
            return dispatch({
                type: 'POST_RECIPE',
                info
            })
        } catch (error)
        {
            console.error(error.message)
        }
    }
}

export function getDetail(id) {
    return async function (dispatch) {
        try
        {
            const info = await axios.get(url+'recipes/' + id)
            return dispatch({
                type: 'GET_DETAIL',
                payload: info.data
            })
        } catch (error)
        {
            return dispatch({
                type: 'GET_DETAIL',
                payload: { error: error.message }
            })
        }
    };
}

export function resetDetail() {
    return {
        type: 'RESET_DETAIL'
    }
}

export function resetRecipes() {
    return {
        type: 'RESET_RECIPES'
    }
}
