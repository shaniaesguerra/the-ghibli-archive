import { renderWithTemplate, JIKAN_API_URL, STUDIO_GHIBLI_URL } from "./utils.mjs";
import { fetchFilmsData } from "./FilmDetails.mjs";

//Get Character Information. Returns all characters in ghibli

//Fetch CharId Data and return the information
export async function fetchCharIdData() {
    //Check local storage for data stored:
    const cached = localStorage.getItem('charID_cache');
    if (cached) {
        return JSON.parse(cached); //return the stored data
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
                    charID: c.character.mal_id
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
    localStorage.setItem('charID_cache', JSON.stringify(charIDs));
    return charIDs;
}

function charSimpleCardTemplate(char) {
    return `
        <div class="simpleChar-card" data-film-id="${char.mal_id}">
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
}