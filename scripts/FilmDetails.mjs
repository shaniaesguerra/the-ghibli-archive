import { renderWithTemplate, STUDIO_GHIBLI_ID, JIKAN_API_URL, setSessionStorage, getSessionStorage } from "./utils.mjs";
import { charSimpleCardTemplate } from "./CharacterDetails.mjs";

//Get Character Information. Returns all films in ghibli
export async function fetchFilmsData() {
    //Check local storage for data stored:
    const cached = localStorage.getItem('filmsData_cache');
    if (cached) {
        return JSON.parse(cached); //return the stored data
    }

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
                allFilms.push(film);// store films in array
            });

            //check for another page
            hasNextPage = films.pagination.has_next_page;

            if (hasNextPage) {
                //Wait between requests
                currentPage++; //got to nextpage
                // small delay for request limit
                await new Promise(resolve => setTimeout(resolve, 1000));
            }

        } catch (error) {
            console.error('Error fetching data:', error);
            break;
        }
    }

    //console.log(allFilms); for debugging
    //to save time loading
    const filmsData = allFilms;
    localStorage.setItem('filmsData_cache', JSON.stringify(filmsData));
    return filmsData;
}

export function filmSimpleCardTemplate(film) {

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
        renderWithTemplate(filmSimpleCardTemplate(film), container);
    });

    makeCardClickEvent(".simpleFilm-card", "./film-detail.html", "film_card_id");
}

export function filmDetailedPageTemplate(film) {
    if (!film.title_english) {

        if (!film.trailer.embed_url) {
            
        } else {
            return `
            <div class="title-heading">
                <h1>Ghibli Film of the Day</h1>
                <h2 class="film-title">${film.title_english}<br><span class="film-title-japanese">${film.title_japanese}</span></h2>
            </div>
            <div class="film-photos">
                <figure><img src="" alt=""></figure>
            </div>
            <div class="film-general-info">
                <div class="film-background">
                    <h2>Background</h2>
                    <p></p>
                </div>
                <div class="film-synopsis">
                    <h2>Synopsis</h2>
                    <p></p>
                </div>
                <div class="video film-video">
                    <h2>Trailer</h2>
                    <iframe src="" frameborder="0"></iframe>
                </div>
                <div class="film-characters">
                    <!--populate with simple character cards-->
                </div>
            </div>
            <div class="film-detail-info">
                <p>Type: <span></span></p>
                <p>Duration: <span></span></p>
                <p>Episodes: <span></span></p>
                <p>Genres: <span></span></p>
                <p>Rating: <span></span></p>
                <p>Popularity: <span></span></p>
                <p>Score: <span></span></p>
                <p>Score By: <span></span></p>
                <p>Status: <span></span></p>
            </div>`;
        }
    }
    else {

    }
}

export function renderDetailedPage(storageVarName, container) {
    const filmId = getSessionStorage(storageVarName);
    renderWithTemplate(filmDetailedPageTemplate(filmId), container); 
}
