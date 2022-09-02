const express = require('express');
const router = express.Router()
const {loadAllDiets} = require ('../controllers/index')
// const { Diet } = require("../db");

router.get('/', loadAllDiets)
 

module.exports = router;