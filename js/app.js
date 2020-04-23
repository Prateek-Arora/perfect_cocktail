// Instantiate Classes
const ui = new UI(),
      cocktail = new CocktailAPI(),
      cocktailDB = new CocktailDB();




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

    // When favorite button is clicked.
    if(e.target.classList.contains('favorite-btn')){
        if(e.target.classList.contains('is-favorite')){
            // remove the favorite.
            e.target.classList.remove('is-favorite');
            e.target.textContent = '+';

            // Remove from local Storage.
            cocktailDB.removeFromDB(e.target.dataset.id);
        }
        else{
            // add as a favorite.
            e.target.classList.add('is-favorite');
            e.target.textContent = '-';

            // Get the info.
            const cardBody = e.target.parentElement;

            const drinkInfo = {
                id: e.target.dataset.id,
                name: cardBody.querySelector('.card-title').textContent,
                image: cardBody.querySelector('.card-img-top').src
            }

            // Add into DB.
            cocktailDB.saveIntoDB(drinkInfo);
        }
    }
}


// Load content.
function documentReady() {

    // Display on load, the favorites from storage.
    ui.isFavorite();

    // Select the search category.
    const searchCategory = document.querySelector('.search-category');
    if(searchCategory){
        ui.displayCategories();
    }

    // Loading favourites page.
    const favoritesTable = document.querySelector('#favorites');
    if(favoritesTable){
        // Get favourites from local storage and display them.
        const drinks = cocktailDB.getFromDB();
        ui.displayFavorites(drinks);
    }

    // When recipe or remove button is clicked.
    favoritesTable.addEventListener('click', (e) => {
        e.preventDefault();

        if(e.target.classList.contains('get-recipe')){
            cocktail.getSingleRecipe(e.target.dataset.id)
                .then(recipe => {
                    // Display a single recipe.
                    ui.displaySingleRecipe(recipe.recipe.drinks[0]);
                })
        }

        if(e.target.classList.contains('remove-recipe')){
            // Remove from DOM.
            ui.removeFavorite(e.target.parentElement.parentElement);

            // Remove from local storage.
            cocktailDB.removeFromDB(e.target.dataset.id);
        }
    })
}