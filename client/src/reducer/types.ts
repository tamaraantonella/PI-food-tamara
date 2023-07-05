
export interface State {
  recipes: Recipe[];
  allRecipes: Recipe[];
  diets: Diet[];
  detail: Detail[];
  filtered: any[];
  notFound?: NotFound;
  errorServer: string;
}
export interface Diet {
  id: number;
  name: string;
}
export interface Detail {
  id: number;
  name: string;
  image: string;
  healthScore: number;
  summary: string;
  diets: string[];
  steps: string[];
  glutenFree?: boolean;
  vegan?: boolean;
  vegetarian?: boolean;
  dairyFree?: boolean;
}
export interface NotFound {
  error?: string;
}

export interface Recipe {
  id: number;
  image: string;
  name: string;
  healthScore: number;
  diets: string[];
  vegetarian?: boolean;
  vegan?: boolean;
  glutenFree?: boolean;
  dairyFree?: boolean;
  createdInDB?: boolean;
}
