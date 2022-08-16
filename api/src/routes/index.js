const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const recipes = require('./recipes');
const diets = require('./diets');

router.use('/diets', diets);
router.use('/recipes', recipes)
module.exports = router;
