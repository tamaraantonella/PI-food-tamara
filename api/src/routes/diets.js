const express = require('express')
const router = express.Router()
const {Diet} = require('../db');


router.get('/', async (req, res) => {
    const typeOfDiet = ['Gluten Free', 'Ketogenic', 'Vegetarian', 'Lacto-Vegetarian', 'Ovo-Vegetarian', 'Vegan', 'Pescetarian', 'Paleo', 'Primal','Low FODMAP', 'Whole30']
    try {
        //findOrCreate, revisa si el elemento esta en la base de datos, si no, lo crea.
        //asi que todas estos tipos de dieta se crean en la base de datos en diets
        await Promise.all(typeOfDiet.map(type => {Diet.findOrCreate({where: {name: type}})}))
        let typesDiet = await Diet.findAll({attributes: ['name']});
        res.status(200).json(typesDiet);
    } catch (error){
        res.status(400).send(error);
    }
})

module.exports = router;