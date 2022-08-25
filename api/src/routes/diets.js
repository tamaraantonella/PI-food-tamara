const express = require('express')
const router = express.Router()
const {Diet} = require('../db');


router.get('/', async (req, res) => {
    try {
        let diets = await Diet.findAll();
        res.status(200).json(diets);
    } catch (error){
        res.status(400).send(error);
    }
})

module.exports = router;