import type { Ingredient } from "../models/Ingredient";

export const ingredientManager = (containerId: string, addbtnId: string): HTMLElement => {
    const container = document.getElementById(containerId);
    const addBtn = document.getElementById(addbtnId);

    if (!container) throw new Error(`Container with id "${containerId}" not found`);
    if (!addBtn) throw new Error(`Button with id "${addbtnId}" not found`);

    addBtn.addEventListener("click", () => {
        const ingredientDiv = document.createElement("div");

        const ingredientNameInput = document.createElement("input");
        ingredientNameInput.placeholder = "Ingredient";
        ingredientNameInput.required = true;

        const ingredientAmountInput = document.createElement("input");
        ingredientAmountInput.placeholder = "Amount";
        ingredientAmountInput.required = true;

        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", () => ingredientDiv.remove());

        ingredientDiv.append(
            ingredientNameInput,
            ingredientAmountInput,
            removeBtn
        );
        container?.appendChild(ingredientDiv);
    });
    return container;
}

export const getIngredients = (container: HTMLElement): Ingredient[] => {
    const divs = Array.from(container.children) as HTMLDivElement[];
    return divs.map(div => {
        const inputs = div.getElementsByTagName("input");
        return { 
            name: inputs[0].value, 
            amount: inputs[1].value 
        };
    });
}