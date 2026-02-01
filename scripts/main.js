//Test: Fetch data (both working)
/******************************
Studio Ghibli API
Documentation: https://ghibliapi.dev/
******************************/
//Gets Information about Ghibli Films. Returns an array of films
const GHIBLI_FILMS_API_URL = "https://ghibliapi.dev/films"
async function fetchGhibliFilms() {
    try {
        const response = await fetch('https://ghibliapi.dev/films');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const films = await response.json();
        console.log(films);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchGhibliFilms();

/******************************
Jikan API
Documentation: https://docs.api.jikan.moe/
******************************/
//Gets Studio Ghibli's Data:
const STUDIO_GHIBLI_ID = 21;
const JIKAN_API_URL = `https://api.jikan.moe/v4/producers/${STUDIO_GHIBLI_ID}/full`;

async function fetchGhibliData() {
    try {
        const response = await fetch(JIKAN_API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data.data);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchGhibliData();
