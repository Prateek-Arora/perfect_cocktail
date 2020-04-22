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

    // Get drinks by category.
    async getDrinksByCategory(category){
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;

        // Search by category.
        const apiResponse = await fetch(url);

        // Return a JSON response.
        const cocktails = await apiResponse.json();
        return {
            cocktails
        }
    }


    // Get drinks by alcohol/non-alcohol.
    async getDrinksByAlcohol(term){
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${term}`;

        // Search by category.
        const apiResponse = await fetch(url);

        // Return a JSON response.
        const cocktails = await apiResponse.json();
        return {
            cocktails
        }
    }

    // Get a single recipe by id.
    async getSingleRecipe(id) {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

        // Search by id.
        const apiResponse = await fetch(url);

        // Return a JSON response.
        const recipe = await apiResponse.json();
        return {
            recipe
        }
    }

    // Get the categories.
    async getCategories(){
        const url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;

        // Search by id.
        const apiResponse = await fetch(url);

        // Return a JSON response.
        const categories = await apiResponse.json();
        return {
            categories
        }
    }
}