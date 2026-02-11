import {getLocalStorage, getSessionStorage, setSessionStorage, setLocalStorage, renderWithTemplate, JIKAN_API_URL, STUDIO_GHIBLI_URL, makeCharCardClickEvent } from "./utils.mjs";
import { fetchFilmsData } from "./FilmDetails.mjs";

//Get Character Information. Returns all characters in ghibli

//Fetch CharId Data and return the information
export async function fetchCharIdData() {
    //Check local storage for data stored:
    const cached = getLocalStorage("charID_cache");
    if (cached) {
        return cached; //return the stored data
    }

    //else load the data:
    // fetch all the data once to avoid a long wait
    const [ghibliPeople, jikanFilms, ghibliFilms] = await Promise.all([
        fetch(`${STUDIO_GHIBLI_URL}/people`).then(res => res.json()),
        fetchFilmsData(),
        fetch(`${STUDIO_GHIBLI_URL}/films`).then(res => res.json())
    ]);

    // Get Ghibli Film URLs to corresponding Jikan Film mal_IDs
    // creating a simple object: { "https://ghibli.../film-id": 199 }
    const urlToMalId = {};
    ghibliFilms.forEach(gf => {
        const match = jikanFilms.find(jf => jf.title_english === gf.title);
        if (match) {
            //get corresponding Film URl: Film mal_id
            urlToMalId[gf.url] = match.mal_id
        };
    });
    //console.log(urlToMalId);

    // Get unique Film IDs to fetch
    // using an object as a toggle prevents duplicate IDs
    const uniqueIds = {};
    //Get People data from Studio Ghibli API:
    ghibliPeople.forEach(character => {
        //For each Character, get the corresponding film url array:
        character.films.forEach(url => {
            const malId = urlToMalId[url];
            if (malId) {
                // if the id exists, update the object:
                // Film mal_id: state(true or false)
                uniqueIds[malId] = true
            };
        });
    });

    // Fetch character data needed: name, character mal_id from Jikan 
    // using the uniqueIds object
    let allCharacters = [];
    const filmIdList = Object.keys(uniqueIds); //using objects gets only one instance of the id

    for (const id of filmIdList) {
        try {
            const response = await fetch(`${JIKAN_API_URL}/anime/${id}/characters`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const json = await response.json();
            //console.log(json); debugging

            if (json.data) {
                const filmChars = json.data.map(c => ({
                    name: c.character.name.toString(),
                    photo: c.character.images.webp,
                    charID: c.character.mal_id,
                    filmID: id
                }));
                
                filmChars.forEach(fc => {
                    allCharacters.push(fc);
                })
                
            }
            // small delay for request limit
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        catch (error) {
            console.error('Error fetching data:', error);
            break;
        }
    }
    
    //console.log(allCharacters); debugging

    //Use local storage to store results
    //to save time loading
    const charIDs = allCharacters;
    setLocalStorage("charID_cache", charIDs);
    return charIDs;
}

export function charSimpleCardTemplate(char) {
    return `
        <div class="simpleChar-card" data-char-id="${char.charID}">
            <img src="${char.photo.image_url}" alt="${char.name}'s Photo">
            <h3>${char.name}</h3>
        </div>`;
}

//Get Full Character Data from an id list:
export async function displaySimplifiedChar() {
    const allsimpleChar = await fetchCharIdData();
    const container = document.querySelector(".character-grid");
    //Render card for each movie
    allsimpleChar.forEach(char => {
        renderWithTemplate(charSimpleCardTemplate(char), container);
    });

    makeCharCardClickEvent(".simpleChar-card", "./character-detail.html", "char_card_id");
}

//Fetch full char id:
export async function fetchFullCharData(charId) {
    let charData = null;
    
    try {
        const response = await fetch(`${JIKAN_API_URL}/characters/${charId}/full`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const charJson = await response.json();
        //console.log(charJson); //for debugging

        //put data in list:
        charData = charJson.data; //store character data

    }
    catch (error) {
        console.error('Error fetching data:', error);
    }

    return charData;
}

export function charDetailedPageTemplate(char) {
    if (!char.title_english) {

        if (!char.trailer.embed_url) {
            return `
            <div class="title-heading">
                <h1 class="char-title">${char.title}<br><span class="char-title-japanese">${char.title_japanese}</span></h1>
            </div>
            <div class="char-photos">
                <figure><img src="${char.images.webp.large_image_url}" alt="${char.title} Movie Poster"></figure>
            </div>
            <div class="char-general-info">
                <div class="char-background">
                    <h2>Background</h2>
                    <p>${char.background}</p>
                </div>
                <div class="char-synopsis">
                    <h2>Synopsis</h2>
                    <p>${char.synopsis}</p>
                </div>
                <div class="char-characters">
                    <h2>Characters</h2>
                </div>
            </div>
            <div class="char-detail-info">
                <p>Japanese Title: <span>${char.title_japanese}</span></p>
                <p>Romaji Title: <span>${char.title}</span></p>
                <p>Type: <span>${char.type}</span></p>
                <p>Duration: <span>${char.duration}</span></p>
                <p>Episodes: <span>${char.episodes}</span></p>
                <p>Genres: <span>${char.genres.map(genre => genre.name).join(' , ')}</span></p>
                <p>Rating: <span>${char.rating}</span></p>
                <p>Favorites: <span>${char.favorites}</span></p>
                <p>Score: <span>${char.score}</span></p>
                <p>Score By: <span>${char.score_by}</span></p>
                <p>Status: <span>${char.status}</span></p>
            </div>`;

        } else {
            return `
            <div class="title-heading">
                <h1 class="char-title">${char.title}<br><span class="char-title-japanese">${char.title_japanese}</span></h1>
            </div>
            <div class="char-photos">
                <figure><img src="${char.images.webp.large_image_url}" alt="${char.title} Movie Poster"></figure>
            </div>
            <div class="char-general-info">
                <div class="char-background">
                    <h2>Background</h2>
                    <p>${char.background}</p>
                </div>
                <div class="char-synopsis">
                    <h2>Synopsis</h2>
                    <p>${char.synopsis}</p>
                </div>
                <div class="video char-video">
                    <h2>Trailer</h2>
                    <iframe width="560" height="315" src="${char.trailer.embed_url}" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div class="char-characters">
                    <h2>Characters</h2>
                </div>
            </div>
            <div class="char-detail-info">
                <p>Japanese Title: <span>${char.title_japanese}</span></p>
                <p>Romaji Title: <span>${char.title}</span></p>
                <p>Type: <span>${char.type}</span></p>
                <p>Duration: <span>${char.duration}</span></p>
                <p>Episodes: <span>${char.episodes}</span></p>
                <p>Genres: <span>${char.genres.map(genre => genre.name).join(' , ')}</span></p>
                <p>Rating: <span>${char.rating}</span></p>
                <p>Favorites: <span>${char.favorites}</span></p>
                <p>Score: <span>${char.score}</span></p>
                <p>Score By: <span>${char.score_by}</span></p>
                <p>Status: <span>${char.status}</span></p>
            </div>`;
        }
    }
    else {
        if (!char.trailer.embed_url) {
            return `
            <div class="title-heading">
                <h1 class="char-title">${char.title_english}<br><span class="char-title-japanese">${char.title_japanese}</span></h1>
            </div>
            <div class="char-photos">
                <figure><img src="${char.images.webp.large_image_url}" alt="${char.title} Movie Poster"></figure>
            </div>
            <div class="char-general-info">
                <div class="char-background">
                    <h2>Background</h2>
                    <p>${char.background}</p>
                </div>
                <div class="char-synopsis">
                    <h2>Synopsis</h2>
                    <p>${char.synopsis}</p>
                </div>
                <div class="char-characters">
                    <h2>Characters</h2>
                </div>
            </div>
            <div class="char-detail-info">
                <p>Japanese Title: <span>${char.title_japanese}</span></p>
                <p>Romaji Title: <span>${char.title}</span></p>
                <p>Type: <span>${char.type}</span></p>
                <p>Duration: <span>${char.duration}</span></p>
                <p>Episodes: <span>${char.episodes}</span></p>
                <p>Genres: <span>${char.genres.map(genre => genre.name).join(' , ')}</span></p>
                <p>Rating: <span>${char.rating}</span></p>
                <p>Favorites: <span>${char.favorites}</span></p>
                <p>Score: <span>${char.score}</span></p>
                <p>Score By: <span>${char.score_by}</span></p>
                <p>Status: <span>${char.status}</span></p>
            </div>`;

        } else {
            return `
            <div class="title-heading">
                <h1 class="char-title">${char.title_english}<br><span class="char-title-japanese">${char.title_japanese}</span></h1>
            </div>
            <div class="char-photos">
                <figure><img src="${char.images.webp.large_image_url}" alt="${char.title} Movie Poster"></figure>
            </div>
            <div class="char-general-info">
                <div class="char-background">
                    <h2>Background</h2>
                    <p>${char.background}</p>
                </div>
                <div class="char-synopsis">
                    <h2>Synopsis</h2>
                    <p>${char.synopsis}</p>
                </div>
                <div class="video char-video">
                    <h2>Trailer</h2>
                    <iframe width="560" height="315" src="${char.trailer.embed_url}" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div class="character-grid">
                    <h2>Characters</h2>
                </div>
            </div>
            <div class="char-detail-info">
                <p>Japanese Title: <span>${char.title_japanese}</span></p>
                <p>Romaji Title: <span>${char.title}</span></p>
                <p>Type: <span>${char.type}</span></p>
                <p>Duration: <span>${char.duration}</span></p>
                <p>Episodes: <span>${char.episodes}</span></p>
                <p>Genres: <span>${char.genres.map(genre => genre.name).join(' , ')}</span></p>
                <p>Rating: <span>${char.rating}</span></p>
                <p>Favorites: <span>${char.favorites}</span></p>
                <p>Score: <span>${char.score}</span></p>
                <p>Score By: <span>${char.score_by}</span></p>
                <p>Status: <span>${char.status}</span></p>
            </div>`;
        }

    }
}