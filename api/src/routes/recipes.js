const express = require("express");
const router = express.Router();
const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { API_KEY } = process.env;
const {getAllInfo} = require("../controllers/index");


router.get("/", async (req, res) => {
    const { name } = req.query;
    const info = await getAllInfo();
    if (name) {
        //si busco garlic, me devuelve todas las recetas que contengan garlic, si no, solo me devuelve las recetas cuyo nombre sea unicamente garlic.
        let matchedRecipe = await info.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
        if (matchedRecipe.length) return res.json(matchedRecipe)
        return res.status(404).json({ message: "No recipes found" })
    }
    res.json(info);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        //si id es mayor a 8, entonces es un id de db
        if (id.length > 8) {
        const recipeDB = await Recipe.findByPk(id, {
            include: {
            model: Diet,
            attributes: ["name"],
            through: {
                attributes: [],
            },
            },
        });
        if (recipeDB) {
            const recipe = {
            id: recipeDB.id,
            name: recipeDB.name,
            summary: recipeDB.summary,
            score: recipeDB.score,
            healthScore: recipeDB.healthScore,
            image: recipeDB.image,
            steps: recipeDB.steps,
            diets: recipeDB.diets?.map((diet) => diet.name),
            };
            return res.json(recipe);
        }
        return res.status(404).json({ message: "No recipe found" });
        }
        if (id.length < 8) {
            const recipe = await axios.get(
                `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&addRecipeInformation=true`
            );
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
                steps:
                recipeApi.analyzedInstructions[0] &&
                recipeApi.analyzedInstructions[0].steps
                    ? recipeApi.analyzedInstructions[0].steps
                        .map((item) => item.step)
                        .join("\n")
                    : "",
            };
            if (recipeInfo) {
                return res.json(recipeInfo);
            }
        }
    } catch (error) {
        console.error(error);
    }
    });

router.post("/", async (req, res) => {
    const { name, summary, healthScore, steps, image,diets} = req.body
    //como no sabemos como nos llega la informacion, siempre es bueno usar try catch, para evitar errores
    if (!summary || !name) return res.status(404).send('Falta enviar datos obligatorios')
    try {
        const data = { name, summary, healthScore, steps, image }
        const newRecipe = await Recipe.create(data)
        await newRecipe.addDiet(diets)
        return res.status(201).json(newRecipe)
    } catch (error) {
        console.error(error)
    }
});


module.exports = router;
