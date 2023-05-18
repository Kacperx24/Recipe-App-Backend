const express = require('express')
const router = express.Router()

const { getRecipes, createRecipe } = require('../controllers/recipe')

router.get('/', getRecipes)
router.post('/', createRecipe)

module.exports = router
