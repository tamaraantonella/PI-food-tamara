const express = require('express')
const router = express.Router()
const axios = require('axios');
const { Recipe, Diet} = require('../db');
const {API_KEY} = process.env;

//get recipes from api
const getApiInfo = async () => {
    try{
        const apiInfo = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
        const { results } = apiInfo.data ;
        if (results.length > 0) {
            let response = await results?.map((recipeItem) => {
                return {
                    name: recipeItem.title,
                    vegetarian: recipeItem.vegetarian,
                    vegan: recipeItem.vegan,
                    glutenFree: recipeItem.glutenFree,
                    dairyFree: recipeItem.dairyFree,
                    image: recipeItem.image,
                    idApi: recipeItem.id,
                    score: recipeItem.spoonacularScore,
                    healthScore: recipeItem.healthScore,
                    types: recipeItem.dishTypes?.map(element => element),
                    diets: recipeItem.diets?.map(element => element),
                    summary:recipeItem.summary,
                    steps: (recipeItem.analyzedInstructions[0] && recipeItem.analyzedInstructions[0].steps?recipeItem.analyzedInstructions[0].steps.map(item=>item.step).join(" \n"):'')
                }
            })
        return response;
    }} catch (error) {
        console.error(error);
        return ([])
    }
}
//get recipes from db
const getDBInfo = async () => {
    try {
        const getDBinfo = await Recipe.findAll({
                include:{
                    model: Diet,
                    attributes: ['name'],
                    through:{
                        attributes: []
                    }
                }
            })
            let response = await getDBinfo?.map(recipe => {
                    return {
                        id: recipe.id,
                        name: recipe.name,
                        summary: recipe.summary,
                        score: recipe.score,
                        healthScore: recipe.healthScore,
                        image: recipe.image,
                        steps: recipe.steps,
                        diets: recipe.diets?.map(diet => diet.name),
                    }
                });
            return response;
        }catch (error) {
            console.error(error);
        }
    }
const getAllInfo = async () => {
    try{
        const apiInfo = await getApiInfo();
        const bdInfo = await getDBInfo();
        const infoTotal = apiInfo.concat(bdInfo);
        return infoTotal;
    }catch (error) {
        console.error(error);
    }
}

router.get('/', async (req, res) => {
    const { name } = req.query
    if (name) {
        const info = await getAllInfo();
        info.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
        if(info.length > 0){
            return res.json(info);
        }
        return res.status(404).json({message: 'No recipes found'});
    }
    res.json(await getAllInfo());
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        //si id es mayor a 8, entonces es un id de db
        if (id.length > 8) {
            const recipeDB = await Recipe.findByPk(id, {
                include: {
                    model: Diet,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }
            })
            if (recipeDB) {
                const recipe = {
                    id: recipeDB.id,
                    name: recipeDB.name,
                    summary: recipeDB.summary,
                    score: recipeDB.score,
                    healthScore: recipeDB.healthScore,
                    image: recipeDB.image,
                    steps: recipeDB.steps,
                    diets: recipeDB.diets?.map(diet => diet.name),
                }
                return res.json(recipe);
            }
            return res.status(404).json({message: 'No recipe found'});
        }
        if (id.length < 8) {
            const recipe = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&addRecipeInformation=true`)
            const recipeApi = recipe.data;
            let recipeInfo = {
                id: recipeApi.id,
                name: recipeApi.title,
                vegetarian: recipeApi.vegetarian,
                vegan: recipeApi.vegan,
                glutenFree: recipeApi.glutenFree,
                dairyFree: recipeApi.dairyFree,
                image: recipeApi.image,
                summary: recipeApi.summary,
                healthScore: recipeApi.healthScore,
                score: recipeApi.spoonacularScore,
                steps: recipeApi.analyzedInstructions[0] && recipeApi.analyzedInstructions[0].steps?recipeApi.analyzedInstructions[0].steps.map(item=>item.step).join("\n"):'',
            }
            if (recipeInfo) {
                return res.json(recipeInfo);
            }
        }
    } catch (error) {
        console.error(error);
    }
})

module.exports= router