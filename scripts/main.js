import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
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

const STUDIO_GHIBLI_ID = 21;
const JIKAN_API_URL = `https://api.jikan.moe/v4`;
//Get Character Information. Returns all characters in ghibli
async function fetchFilmsData() {
    let currentPage = 1;
    let allFilms = [];
    let hasNextPage = true;

    while (hasNextPage) {
        try {
            const response = await fetch(`${JIKAN_API_URL}/anime?producers=${STUDIO_GHIBLI_ID}&page=${currentPage}`);
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const characters = await response.json();
            //console.log(characters); //for debugging

            //put data in list
            characters.data.forEach(char => {
                allFilms.push(char);
            });

            //check for another page
            hasNextPage = characters.pagination.has_next_page;
            
            if (hasNextPage) {
                //Wait between requests
                currentPage++; //got to nextpage
                await new Promise(resolve => setTimeout(resolve, 400));
            }

        } catch (error) {
            console.error('Error fetching data:', error);
            break;
        }
    }

   console.log(allFilms); 
}

//fetchFilmsData();


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
