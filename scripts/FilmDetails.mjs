import { renderWithTemplate, STUDIO_GHIBLI_ID, JIKAN_API_URL, setLocalStorage, getLocalStorage, makeFilmCardClickEvent } from "./utils.mjs";
import { charSimpleCardTemplate } from "./CharacterDetails.mjs";

//Get Character Information. Returns all films in ghibli
export async function fetchFilmsData() {
    //Check local storage for data stored:
    const cached = getLocalStorage("filmsData_cache");
    if (cached) {
        return cached; //return the stored data
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
    setLocalStorage('filmsData_cache', filmsData);
    return filmsData;
}

export function filmSimpleCardTemplate(film) {

    if (!film.title_english) {
        return `
        <div class="simpleFilm-card" data-film-id="${film.mal_id}">
            <img src="${film.images.webp.large_image_url}" alt="${film.title} Movie Poster" loading="lazy">
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
            <img src="${film.images.webp.large_image_url}" alt="${film.title}" loading="lazy">
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

export async function displaySimplifiedFilms(data) {
    const allFilms = await data;
    const container = document.querySelector(".film-grid");
    container.innerHTML = "";

    if (allFilms.length === 0) {
        container.innerHTML = "<h4>No Results found</h4>";
        return;
    }

    //Render card for each movie
    allFilms.forEach(film => {
        renderWithTemplate(filmSimpleCardTemplate(film), container);
    });

    makeFilmCardClickEvent(".simpleFilm-card", "./film-detail.html", "film_card_id");
}

export function filmDetailedPageTemplate(film) {
    if (!film.title_english) {

        if (!film.trailer.embed_url) {
            return `
            <div class="title-heading">
                <h1 class="film-title">${film.title}<br><span class="film-title-japanese">${film.title_japanese}</span></h1>
            </div>
            <div class="film-photos">
                <figure><img src="${film.images.webp.large_image_url}" alt="${film.title} Movie Poster" loading="lazy"></figure>
            </div>
            <div class="film-detail-info">
                <p>Japanese Title: <span>${film.title_japanese}</span></p>
                <p>Romaji Title: <span>${film.title}</span></p>
                <p>Type: <span>${film.type}</span></p>
                <p>Duration: <span>${film.duration}</span></p>
                <p>Episodes: <span>${film.episodes}</span></p>
                <p>Genres: <span>${film.genres.map(genre => genre.name).join(' , ')}</span></p>
                <p>Rating: <span>${film.rating}</span></p>
                <p>Favorites: <span>${film.favorites}</span></p>
                <p>Score: <span>${film.score}</span></p>
                <p>Score By: <span>${film.score_by}</span></p>
                <p>Status: <span>${film.status}</span></p>
            </div>
            <div class="film-general-info">
                <div class="film-background">
                    <h2>Background</h2>
                    <p>${film.background}</p>
                </div>
                <div class="film-synopsis">
                    <h2>Synopsis</h2>
                    <p>${film.synopsis}</p>
                </div>
                <div class="film-characters">
                    <h2>Characters</h2>
                </div>
            </div>
            `;

        } else {
            return `
            <div class="title-heading">
                <h1 class="film-title">${film.title}<br><span class="film-title-japanese">${film.title_japanese}</span></h1>
            </div>
            <div class="film-photos">
                <figure><img src="${film.images.webp.large_image_url}" alt="${film.title} Movie Poster" loading="lazy"></figure>
            </div>
            <div class="film-detail-info">
                <p>Japanese Title: <span>${film.title_japanese}</span></p>
                <p>Romaji Title: <span>${film.title}</span></p>
                <p>Type: <span>${film.type}</span></p>
                <p>Duration: <span>${film.duration}</span></p>
                <p>Episodes: <span>${film.episodes}</span></p>
                <p>Genres: <span>${film.genres.map(genre => genre.name).join(' , ')}</span></p>
                <p>Rating: <span>${film.rating}</span></p>
                <p>Favorites: <span>${film.favorites}</span></p>
                <p>Score: <span>${film.score}</span></p>
                <p>Score By: <span>${film.score_by}</span></p>
                <p>Status: <span>${film.status}</span></p>
            </div>
            <div class="film-general-info">
                <div class="film-background">
                    <h2>Background</h2>
                    <p>${film.background}</p>
                </div>
                <div class="film-synopsis">
                    <h2>Synopsis</h2>
                    <p>${film.synopsis}</p>
                </div>
                <div class="video film-video">
                    <h2>Trailer</h2>
                    <iframe width="560" height="315" src="${film.trailer.embed_url}" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div class="film-characters">
                    <h2>Characters</h2>
                </div>
            </div>
            `;
        }
    }
    else {
        if (!film.trailer.embed_url) {
            return `
            <div class="title-heading">
                <h1 class="film-title">${film.title_english}<br><span class="film-title-japanese">${film.title_japanese}</span></h1>
            </div>
            <div class="film-photos">
                <figure><img src="${film.images.webp.large_image_url}" alt="${film.title} Movie Poster" loading="lazy"></figure>
            </div>
            <div class="film-detail-info">
                <p>Japanese Title: <span>${film.title_japanese}</span></p>
                <p>Romaji Title: <span>${film.title}</span></p>
                <p>Type: <span>${film.type}</span></p>
                <p>Duration: <span>${film.duration}</span></p>
                <p>Episodes: <span>${film.episodes}</span></p>
                <p>Genres: <span>${film.genres.map(genre => genre.name).join(' , ')}</span></p>
                <p>Rating: <span>${film.rating}</span></p>
                <p>Favorites: <span>${film.favorites}</span></p>
                <p>Score: <span>${film.score}</span></p>
                <p>Score By: <span>${film.score_by}</span></p>
                <p>Status: <span>${film.status}</span></p>
            </div>
            <div class="film-general-info">
                <div class="film-background">
                    <h2>Background</h2>
                    <p>${film.background}</p>
                </div>
                <div class="film-synopsis">
                    <h2>Synopsis</h2>
                    <p>${film.synopsis}</p>
                </div>
                <div class="film-characters">
                    <h2>Characters</h2>
                </div>
            </div>
            `;

        } else {
            return `
            <div class="title-heading">
                <h1 class="film-title">${film.title_english}<br><span class="film-title-japanese">${film.title_japanese}</span></h1>
            </div>
            <div class="film-photos">
                <figure><img src="${film.images.webp.large_image_url}" alt="${film.title} Movie Poster" loading="lazy"></figure>
            </div>
            <div class="film-detail-info">
                <p>Japanese Title: <span>${film.title_japanese}</span></p>
                <p>Romaji Title: <span>${film.title}</span></p>
                <p>Type: <span>${film.type}</span></p>
                <p>Duration: <span>${film.duration}</span></p>
                <p>Episodes: <span>${film.episodes}</span></p>
                <p>Genres: <span>${film.genres.map(genre => genre.name).join(' , ')}</span></p>
                <p>Rating: <span>${film.rating}</span></p>
                <p>Favorites: <span>${film.favorites}</span></p>
                <p>Score: <span>${film.score}</span></p>
                <p>Score By: <span>${film.score_by}</span></p>
                <p>Status: <span>${film.status}</span></p>
            </div>
            <div class="film-general-info">
                <div class="film-background">
                    <h2>Background</h2>
                    <p>${film.background}</p>
                </div>
                <div class="film-synopsis">
                    <h2>Synopsis</h2>
                    <p>${film.synopsis}</p>
                </div>
                <div class="video film-video">
                    <h2>Trailer</h2>
                    <iframe width="560" height="315" src="${film.trailer.embed_url}" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div class="character-grid">
                    <h2>Characters</h2>
                </div>
            </div>
            `;
        }

    }
}
