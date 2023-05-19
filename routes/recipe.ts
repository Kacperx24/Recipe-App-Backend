import express from 'express'

const router = express.Router()

import { getRecipes, createRecipe } from '../controllers/recipe'

router.get('/', getRecipes)
router.post('/', createRecipe)

export default router
