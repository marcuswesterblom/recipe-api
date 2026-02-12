import Recipe from "./models/Recipe.mjs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import { recipeRouter } from "./routes/RecipeRouter.mjs";

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

app.use("/api/recipes", recipeRouter);

app.listen(3000, () => {
    console.log("Api is up and running");
});