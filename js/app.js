// Instantiate Classes
const ui = new UI(),
      cocktail = new CocktailAPI();  




// Create Event Listeners.
function eventListeners(){

    // Document Loaded.
    document.addEventListener('DOMContentLoaded', documentReady);

    // Add event listener for form submission.
    const searchForm = document.querySelector('#search-form');
    if(searchForm){
        searchForm.addEventListener('submit', getCocktails);
    }

    // The results div listeners.
    const resultsDiv = document.querySelector('#results');
    if(resultsDiv){
        resultsDiv.addEventListener('click', resultsDelegation);
    }
    
}
eventListeners();

// Get cocktails function.
function getCocktails(e){
    e.preventDefault();

    const search = document.querySelector('#search').value;
    if(search === ''){
        // Print the error.
        ui.printMessage('Form cannot be empty','danger');
    }
    else{

        // Server response from promise.
        let serverResponse;

        // Type of search(ingredients, name) etc.
        const type = document.querySelector('#type').value;

        // Evaluate the type of method and then execute the query.
        switch(type) {
            case 'name':
                serverResponse = cocktail.getDrinksByName( search );
                break;
            case 'ingredient':
                serverResponse = cocktail.getDrinksByIngredient( search );
                break;
            case 'category':
                serverResponse = cocktail.getDrinksByCategory( search );
                break;
            case 'alcohol':
                serverResponse = cocktail.getDrinksByAlcohol( search );
                break;

        }

        ui.clearResults();


        // Query the REST API.
        serverResponse.then(cocktails => {
                if(cocktails.cocktails.drinks === null){
                    // Item doesn't exists.
                    ui.printMessage('No results found, please try a different item', 'danger');
                }
                else{
                    if(type === 'name'){
                        // get drinks with ingredients.
                        ui.displayDrinksWithIngredients(cocktails.cocktails.drinks);
                    }
                    else{
                        // get drinks without ingredients.
                        ui.displayDrinks(cocktails.cocktails.drinks);
                    }
                }
            })
    }
}

// Delegation from results area.
function resultsDelegation(e) {
    e.preventDefault();

    if(e.target.classList.contains('get-recipe')){
        cocktail.getSingleRecipe(e.target.dataset.id)
            .then(recipe => {
                // Display a single recipe.
                ui.displaySingleRecipe(recipe.recipe.drinks[0]);
            })
    }
}


// Load content.
function documentReady() {
    // Select the search category.
    const searchCategory = document.querySelector('.search-category');
    if(searchCategory){
        ui.displayCategories();
    }
}