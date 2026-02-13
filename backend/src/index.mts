import { config } from "dotenv";
import mongoose from "mongoose";
import express, { json } from "express";
import { recipeRouter } from "./routes/RecipeRouter.mjs";

config();

const mongoUri = process.env.MONGO_URI || "";

if (!mongoUri) {
    throw("MONGO_URI is not defined in .env file");
}

const app = express();
app.use(json());

app.use("/api/recipes", recipeRouter);

app.listen(3000, async () => {
    try {
        await mongoose.connect(mongoUri);
        console.log("Api is up and running");
    } catch (error) {
        console.error(error);
    }
});