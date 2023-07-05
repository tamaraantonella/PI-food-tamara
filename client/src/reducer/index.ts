import { State } from './types';

interface Action {
  type: string;
  payload: Payload | string;
}
interface Payload {
  error?: string;
}

const initialState: State = {
  recipes: [],
  allRecipes: [],
  diets: [],
  detail: [],
  filtered: [],
  errorServer: ''
};

function rootReducer(state = initialState, { type, payload }: Action) {
  switch (type) {
    case 'GET_RECIPES':
      if (typeof payload === 'string') return;
      return payload.error
        ? { ...state, errorServer: payload.error, recipes: [] }
        : {
            ...state,
            recipes: payload,
            allRecipes: payload,
            errorServer: '',
            notFound: undefined
          };

    case 'FILTER_RECIPES':
      if (typeof payload === 'object') return;
      const listedRecipes = state.allRecipes;
      const recipesApi = listedRecipes.filter((recipe) => !recipe.createdInDB);
      const recipesDB = listedRecipes.filter((recipe) => recipe.createdInDB);
      const filteredDB = recipesDB.filter((recipe) =>
        recipe.diets.includes(payload)
      );

      if (typeof payload === 'object') return;
      const alternativeFilter = recipesApi.filter((recipe) =>
        recipe.diets.includes(payload)
      );
      if (payload === 'gluten free') {
        const gluten = recipesApi.filter((recipe) => recipe['glutenFree']);
        gluten.length && alternativeFilter.concat(gluten);
      }
      if (payload === 'dairy free') {
        const dairy = recipesApi.filter((recipe) => recipe['dairyFree']);
        dairy.length && alternativeFilter.concat(dairy);
      }
      const filtered =
        payload === 'default'
          ? listedRecipes
          : alternativeFilter.concat(filteredDB);
      return {
        ...state,
        filtered: payload === 'default' ? listedRecipes : filtered,
        recipes: payload === 'default' ? listedRecipes : filtered,
        notFound:
          filtered.length === 0 ? 'Recipe not found, try another one!' : undefined
      };

    case 'SEARCH_BY_NAME':
      if (typeof payload === 'string') return;
      return payload.error
        ? { ...state, recipes: [], notFound: payload.error }
        : { ...state, recipes: payload, notFound: '' };

    case 'SORT_RECIPES':
      const sorted = state.filtered.length ? state.filtered : state.allRecipes;
      if (payload === 'asc')
        sorted.sort((a, b) => a.name.localeCompare(b.name));
      if (payload === 'desc')
        sorted.sort((a, b) => b.name.localeCompare(a.name));
      if (payload === 'ascH') {
        sorted.sort(function (a, b) {
          if (a.healthScore > b.healthScore) {
            return 1;
          }
          if (b.healthScore > a.healthScore) {
            return -1;
          }
          return 0;
        });
      }
      if (payload === 'descH') {
        sorted.sort(function (a, b) {
          if (a.healthScore > b.healthScore) {
            return -1;
          }
          if (b.healthScore > a.healthScore) {
            return 1;
          }
          return 0;
        });
      }
      return {
        ...state,
        recipes: sorted
      };
    case 'POST_RECIPE':
      return {
        ...state
      };
    case 'GET_DIETS':
      if (typeof payload === 'string') return;
      return payload.error
        ? { ...state, errorServer: payload.error }
        : { ...state, diets: payload, errorServer: '' };
    case 'GET_DETAIL':
      if (typeof payload === 'string') return;
      return payload.error
        ? { ...state, notFound: payload }
        : { ...state, detail: payload, notFound: '' };
    case 'RESET_DETAIL':
      return {
        ...state,
        detail: [''],
        notFound: ''
      };
    case 'RESET_RECIPES':
      return {
        ...state,
        filtered: [],
        recipes: []
      };
    case 'FILTER_ORIGIN':
      const previousFiltered = state.filtered.length
        ? state.filtered
        : state.allRecipes;
      const filteredFromDB = previousFiltered.filter(
        (recipe) => recipe.createdInDb
      );
      if (payload === 'db' && filteredFromDB.length) {
        return { ...state, recipes: filteredFromDB, notFound: '' };
      }
      if (payload === 'db' && !filteredFromDB.length) {
        return { ...state, recipes: [], notFound: 'No recipes found' }
      }
      return {
        ...state,
        recipes: state.allRecipes
      };
    default:
      return state;
  }
}

export default rootReducer;
