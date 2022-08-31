const axios = require("axios");
const { Recipe, Diet } = require("../db");


const { getAllInfo} = require ("./recipesControllers")
const { getAllDiets } = require ("./dietsControllers")

//cargar todas las dietas
const loadAllDiets = async (req,res) => {
    try {
        const diets = await getAllDiets();
        return res.json(diets);
    } catch (error) {
        console.log("🚀 ~ file: index.js ~ line 14 ~ loadAllDiets ~ error", error)
        res.status(400).json({msg:error});
    }
}

//receta por query (nombre)
const getRecipes = async (req, res) => {
    const { name } = req.query;
    
    try {
        const info = await getAllInfo();
        if (name) {
            let matchedRecipe = await info.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
            if (matchedRecipe.length) return res.json(matchedRecipe)
            return res.status(404).json({ message: "No recipes found" })
        }
        console.log("🚀 ~ file: index.js ~ line 24 ~ getRecipes ~ info", info)
        return res.json(info)
    } catch (error) {
        console.log("🚀 ~ file: index.js ~ line 33 ~ getRecipes ~ error", error)
        
    }
}

//receta por id
const getRecipeById = async (req, res) => {
    const { id } = req.params;
    const recipesTotal = await getAllInfo()
    const newId=Number(id.substring(1))
    if(id){
            let recipeId = await recipesTotal.filter((r) => r.id === newId);
            recipeId.length
            ? res.status(200).json(recipeId)
            : res.status(404).send("Recipe not found");
        }
}


//crear receta
const createNewRecipe = async (req, res) => {
    const { name, summary, healthScore, steps, image,diets} = req.body
    //como no sabemos como nos llega la informacion, siempre es bueno usar try catch, para evitar errores
    healthScore=parseInt(healthScore)
    //validaciones
    if (!summary || !name) return res.status(404).send('Falta enviar datos obligatorios')
    !diets ? diets=[''] : [...diets]
    if(name.length > 100 || name.length < 3) return res.status(404).send('El nombre debe tener entre 3 y 100 caracteres')
    if(name.search(/[^{};*@>!<]*$/g) !== 0) return res.status(404).send('El nombre no puede contener caracteres especiales')
    if(summary.length > 500 || summary.length < 3) return res.status(404).send('El resumen debe tener entre 3 y 500 caracteres')
    if(healthScore > 100 || healthScore < 0) return res.status(404).send('El score debe ser un numero entre 0 y 100')
    if(typeof healthScore !== 'number') return res.status(404).send('El score debe ser un numero')
    try {
        const data = { name, summary, healthScore, steps, image }
        const newRecipe = await Recipe.create(data)
        //busco todas las dietas que coincidan con las que me llegaron y las asocio a la receta
        //porque la idea es que la nueva receta, se relacione con las dietas que ya existen en la base de datos
        let newDiets = await Promise.all(diets.map(d=> Diet.findOne({where: {name: d}})))
        //las asocio
        newRecipe.addDiets(newDiets)
        return res.status(201).json(newRecipe)
    } catch (error) {
        console.log("🚀 ~ file: index.js ~ line 75 ~ createNewRecipe ~ error", error)
    }
}



module.exports = {
    getRecipes,
    loadAllDiets,
    getRecipeById, 
    createNewRecipe,
}