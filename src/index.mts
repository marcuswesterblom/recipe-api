import Recipe from "./models/Recipe.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";

dotenv.config();

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
    console.error("MONGO_URI is not defined in .env file");
    process.exit(1);
}
mongoose.connect(mongoUri)
    .then(() => console.log("MongoDB connected!"))
    .catch((err) => console.log("MongoDB connection error:", err));

const app = express();
app.use(express.json());

app.get("/", (_, res) => {
    res.status(200).send("Welcome to my Recipe API");
});

// Get Recipes from database
app.get("/api/recipes", async (_, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).json({
            success: true,
            count: recipes.length,
            recipes: recipes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
});
// Create recipes
app.post("/api/recipes", async (req, res) => {
    try {
        const recipe = await Recipe.create(req.body);
        res.status(200).json({
            success: true,
            data: recipe
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Couldn't create recipe",
            error: error instanceof Error ? error.message: "Okänt fel"
        });
    }
}); 

app.listen(3000, () => {
    console.log("Api is up and running");
});