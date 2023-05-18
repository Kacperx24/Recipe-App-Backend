const mongoose = require('mongoose')

const Recipe = require('../models/recipe')

const getRecipes = async (req, res) => {
	const recipes = await Recipe.find({})
	res.status(201).json({ recipes })
}

const createRecipe = async (req, res, next) => {
	try {
		const {
			title,
			description,
			country,
			preparationTime,
			ingredients,
			steps,
			difficulty,
			id,
		} = req.body

		if (
			!title ||
			!description ||
			!country ||
			!preparationTime ||
			!ingredients ||
			!steps ||
			!difficulty
		) {
			const error = new Error('Invalid input data')
			throw error
		}

		const createdRecipe = new Recipe({
			title,
			description,
			country,
			preparationTime,
			ingredients,
			steps,
			difficulty,
			id,
		})

		const sess = await mongoose.startSession()
		sess.startTransaction()
		await createdRecipe.save({ session: sess })
		await sess.commitTransaction()

		res.status(201).json({ recipe: createdRecipe })
	} catch (err) {
		const error = new Error('Creating recipe failed, please try again.')

		return next(error)
	}
}

module.exports = {
	getRecipes,
	createRecipe,
}
