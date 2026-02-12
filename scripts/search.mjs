import { displaySimplifiedChar } from "./CharacterDetails.mjs";
import { displaySimplifiedFilms } from "./FilmDetails.mjs";

export function searchData(inputBox, button, container, data, filterFunction) {
    // Function to handle search on Enter or button click
    const handleSearch = (e) => {
        e.preventDefault();  // Prevent form submission if inside a form
        const userInput = inputBox.value.toLowerCase();
        filterFunction(userInput, container, data);
    };

    // Trigger on Enter key
    inputBox.addEventListener("keydown", (e) => {
        if (e.key === 'Enter') { 
            handleSearch(e);
        }
    });

    // Trigger on button click
    button.addEventListener("click", handleSearch);
}

export function filterFilmResults(userInput, container, data) {
    const filteredFilms = data.filter(film => {
        let engTitle = '';
        if (film.title_english) {
            engTitle = film.title_english.toLowerCase();
        }

        let title = '';
        if (film.title) {
            title = film.title.toLowerCase();
        }

        // Return true if either title includes the user input
        return engTitle.includes(userInput) || title.includes(userInput);
    });

    container.innerHTML = ""; //clear grid
    displaySimplifiedFilms(filteredFilms); //render data
}

export function filterCharResults(userInput, container, data) {
    const filteredChar = data.filter(char => {
        return char.name.toLowerCase().includes(userInput);
    });

    container.innerHTML = ""; //clear grid
    displaySimplifiedChar(filteredChar); //render data
}


