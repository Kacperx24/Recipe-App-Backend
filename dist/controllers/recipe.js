"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRecipe = exports.getRecipes = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Recipe = require('../models/recipe');
const getRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipes = yield Recipe.find({});
    res.status(201).json({ recipes });
});
exports.getRecipes = getRecipes;
const createRecipe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, country, preparationTime, ingredients, steps, difficulty, id, } = req.body;
        if (!title ||
            !description ||
            !country ||
            !preparationTime ||
            !ingredients ||
            !steps ||
            !difficulty) {
            const error = new Error('Invalid input data');
            throw error;
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
        });
        const sess = yield mongoose_1.default.startSession();
        sess.startTransaction();
        yield createdRecipe.save({ session: sess });
        yield sess.commitTransaction();
        res.status(201).json({ recipe: createdRecipe });
    }
    catch (err) {
        const error = new Error('Creating recipe failed, please try again.');
        return next(error);
    }
});
exports.createRecipe = createRecipe;
