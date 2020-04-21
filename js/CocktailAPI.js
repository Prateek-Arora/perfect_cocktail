class CocktailAPI{
    // Get recipe by name.
    async getDrinksByName(name){
        const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;

        // Search by name.
        const apiResponse = await fetch(url);

        // Returns a JSON response.
        const cocktails = await apiResponse.json();
        return {
            cocktails
        }
    }

    // Get recipes by ingredients.
    async getDrinksByIngredient(ingredient){
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;

        // Search by ingredient.
        const apiResponse = await fetch(url);

        // Return a JSON response.
        const cocktails = await apiResponse.json();
        return {
            cocktails
        }
    }
}