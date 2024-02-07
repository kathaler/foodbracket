import './preferences-form.js'; // Adjust the path as necessary
import './card-menu.js'; // Adjust the path as necessary

// Listen for the preferences-updated event on the document
document.addEventListener('preferences-updated', (event) => {
    const cardMenu = document.querySelector('#cardMenu') as CardMenu; // Typecast cardMenu to the appropriate type
    if (cardMenu) {
        // Assuming card-menu has a method to update based on preferences
        cardMenu.filterRestaurants(event.detail);
    }
});

  