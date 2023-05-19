import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'

dotenv.config()

import recipeRouter from './routes/recipe'

const app: Express = express()

app.use(cors())

app.use(express.json())

app.use('/recipes', recipeRouter)

mongoose
	.connect(
		`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.4takabv.mongodb.net/?retryWrites=true&w=majority`
	)
	.then(() => app.listen(process.env.PORT || 5000))
	.catch(err => {
		console.log(err)
	})
