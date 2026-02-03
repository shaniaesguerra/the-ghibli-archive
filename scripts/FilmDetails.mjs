import { renderWithTemplate } from "./utils.mjs";

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

    return allFilms;
}

//fetchFilmsData();

function filmDetailTemplate(film) {
    return`
    <div class="film-card">
        <img src="${film.images.jpg.large_image_url}" alt="${film.title}">
        <h3>${film.title_english}</h3>
        <h4>${film.title_japanese}</h3>
        <p>Type: ${film.type} | Score: ${film.score} || Popularity:${film.popularity}</p>
    </div>`;
}

export async function displayFilms() {
    const allFilms = await fetchFilmsData();
    const container = document.querySelector(".film-grid");
    allFilms.forEach(film => {
        renderWithTemplate(filmDetailTemplate(film), container);
    });
}