import { renderWithTemplate, STUDIO_GHIBLI_ID, JIKAN_API_URL } from "./utils.mjs";

//Get Character Information. Returns all films in ghibli
export async function fetchFilmsData() {
    let currentPage = 1;
    let allFilms = [];
    let hasNextPage = true;

    while (hasNextPage) {
        try {
            const response = await fetch(`${JIKAN_API_URL}/anime?producers=${STUDIO_GHIBLI_ID}&page=${currentPage}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const films = await response.json();
            //console.log(films); //for debugging

            //put data in list
            films.data.forEach(film => {
                allFilms.push(film);
            });

            //check for another page
            hasNextPage = films.pagination.has_next_page;

            if (hasNextPage) {
                //Wait between requests
                currentPage++; //got to nextpage
                await new Promise(resolve => setTimeout(resolve, 1000));
            }

        } catch (error) {
            console.error('Error fetching data:', error);
            break;
        }
    }

    //console.log(allFilms); for debugging
    return allFilms;
}

function filmSimpleDetailTemplate(film) {

    if (!film.title_english) {
        return `
        <div class="simpleFilm-card" data-film-id="${film.mal_id}">
            <img src="${film.images.webp.large_image_url}" alt="${film.title}">
            <h3>${film.title}</h3>
            <h4>${film.title_japanese}</h4>
            <div class="filmCard-overlay">
                <span class="film-rating">${film.rating.split(' ', 1)}</span>
                <span class="film-score">${film.score}</span>
                <span class="film-favorites">${film.favorites}</span>
            </div>
        </div>`;
    } else {
        return `
        <div class="simpleFilm-card" data-film-id="${film.mal_id}">
            <img src="${film.images.webp.large_image_url}" alt="${film.title}">
            <h3>${film.title_english}</h3>
            <h4>${film.title_japanese}</h4>
            <div class="filmCard-overlay">
                <span class="film-rating">${film.rating.split(' ', 1)}</span>
                <span class="film-score">${film.score}</span>
                <span class="film-favorites">${film.favorites}</span>
             </div>
        </div>`;
    }
}

export async function displaySimplifiedFilms() {
    const allFilms = await fetchFilmsData();
    const container = document.querySelector(".film-grid");

    //Render card for each movie
    allFilms.forEach(film => {
        renderWithTemplate(filmSimpleDetailTemplate(film), container);
    });
}