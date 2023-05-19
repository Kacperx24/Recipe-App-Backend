import { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'

const Recipe = require('../models/recipe')

export const getRecipes = async (req: Request, res: Response) => {
	const recipes = await Recipe.find({})
	res.status(201).json({ recipes })
}

export const createRecipe = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
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
