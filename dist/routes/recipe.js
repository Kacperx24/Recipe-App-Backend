"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const recipe_1 = require("../controllers/recipe");
router.get('/', recipe_1.getRecipes);
router.post('/', recipe_1.createRecipe);
exports.default = router;
