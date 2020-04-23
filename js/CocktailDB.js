class CocktailDB {

    // Save the recipes into local storage.
    saveIntoDB(drink){
        let drinks = this.getFromDB();
        drinks.push(drink);

        // Add the new array to local storage.
        localStorage.setItem('drinks', JSON.stringify(drinks));
    }

    // Removes element from local storage.
    removeFromDB(id){
        const drinks = this.getFromDB();

        // Loop through the array.
        drinks.forEach((drink, index) => {
            if(drink.id === id){
                drinks.splice(index, 1);
            }
        });

        // Set the new array into local storage.
        localStorage.setItem('drinks', JSON.stringify(drinks));
    }


    getFromDB(){
        let drinks;

        // Check from local storage.
        if(localStorage.getItem('drinks') === null){
            drinks= [];
        }
        else{
            drinks = JSON.parse(localStorage.getItem('drinks'));
        }
        return drinks;
    }
}