import './style.css'
import './scss/main.scss';
import { ingredientManager } from './utils/ingredientManager';
import { buildRecipeFromForm } from './utils/formData';
import { createRecipe } from './services/api';

const form = document.getElementById("recipeForm") as HTMLFormElement;
const ingredientsContainer = ingredientManager("ingredientsContainer", "addIngredientsBtn");
const categorySelect = document.getElementById("categorySelect") as HTMLSelectElement;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const recipe = buildRecipeFromForm(form, ingredientsContainer, categorySelect);

  try {
    const data = await createRecipe(recipe);
    console.log("Recipe created:", data);
    alert("Recipe created successfully!");
    form.reset();
    ingredientsContainer.innerHTML = "";
  } catch (err) {
    console.error(err);
    alert("Error creating recipe");
  }
});