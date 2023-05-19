"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ingredientSchema = new Schema({
    unit: { type: String, required: true },
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
});
const stepSchema = new Schema({
    point: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
});
const recipeSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    country: { type: String, required: true },
    preparationTime: { type: Number, required: true },
    ingredients: {
        type: [ingredientSchema],
        required: true,
    },
    steps: {
        type: [stepSchema],
        required: true,
    },
    difficulty: { type: String, required: true },
    id: { type: String, required: true },
});
module.exports = mongoose_1.default.model('Recipe', recipeSchema);
