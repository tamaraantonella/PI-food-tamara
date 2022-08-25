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
            const newId=id.substring(1);
            const recipe = await axios.get(
                `https://api.spoonacular.com/recipes/${newId}/information?apiKey=${API_KEY}&addRecipeInformation=true`
            );
            const recipeApi = recipe.data; 
            let recipeInfo = {
                id: recipeApi.id,
                name: recipeApi.title,
                image: recipeApi.image,
                summary: recipeApi.summary,
                healthScore: recipeApi.healthScore,
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
    !diets ? diets=[''] : [...diets]
    try {
        const data = { name, summary, healthScore, steps, image }
        const newRecipe = await Recipe.create(data)
        //busco todas las dietas que coincidan con las que me llegaron y las asocio a la receta
        //porque la idea es que la nueva receta, se relacione con las dietas que ya existen en la base de datos
        let newDiets = await Promise.all(diets.map(d=> Diet.findOne({where: {name: d}})))
        // let newDiets = await Diet.findAll({ where: { name: diets } })
        newRecipe.addDiets(newDiets)
        return res.status(201).json(newRecipe)
    } catch (error) {
        console.error(error)
    }
});


module.exports = router;
