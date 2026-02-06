import { loadFooter } from "./utils.mjs";
import { fetchCharIdData } from "./CharacterDetails.mjs";
import { fetchFilmsData } from "./FilmDetails.mjs";

loadFooter();

//load in data in store in Local Storage
fetchFilmsData();
setTimeout(fetchCharIdData, 2000);


//Test: Fetch data (both working)
/******************************
Studio Ghibli API
Documentation: https://ghibliapi.dev/
******************************/
//Gets Information about Ghibli Films. Returns an array of films
const GHIBLI_FILMS_API_URL = "https://ghibliapi.dev"
async function fetchGhibliFilms() {
    try {
        const response = await fetch(`${GHIBLI_FILMS_API_URL}/films`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const films = await response.json();
        console.log(films);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

//fetchGhibliFilms();


/******************************
Jikan API
Documentation: https://docs.api.jikan.moe/
******************************/
//Gets Studio Ghibli's Data:


async function fetchStudioGhibliData() {
    try {
        const response = await fetch(`${JIKAN_API_URL}/producers/${STUDIO_GHIBLI_ID}/full`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data.data);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

//fetchStudioGhibliData();
