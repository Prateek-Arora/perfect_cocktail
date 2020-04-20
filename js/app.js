// Instantiate Classes





// Create Event Listeners.
eventListeners();
function eventListeners(){

    // Add event listener for form submission.
    const searchForm = document.querySelector('#search-form');
    if(searchForm){
        searchForm.addEventListener('submit', getCocktails);
    }
    
}


// Get cocktails function.
function getCocktails(){

}