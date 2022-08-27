const express = require('express');
const router = express.Router()
const {loadAllDiets} = require ('../controllers/index')

router.get('/', loadAllDiets)

module.exports = router;