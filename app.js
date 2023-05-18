const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const recipeRouter = require('./routes/recipe')

const app = express()

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
