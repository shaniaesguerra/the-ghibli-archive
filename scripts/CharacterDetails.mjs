import { renderWithTemplate, JIKAN_API_URL, STUDIO_GHIBLI_URL } from "./utils.mjs";
import { fetchFilmsData } from "./FilmDetails.mjs";

//Get Character Information. Returns all characters in ghibli

//Fetch CharId Data and return the information
async function fetchCharIdData() {
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
    const idList = Object.keys(uniqueIds); //using objects gets only one instance of the id

    for (const id of idList) {
        const res = await fetch(`${JIKAN_API_URL}/anime/${id}/characters`);
        const json = await res.json();

        if (json.data) {
            json.data.forEach(c => {
                allCharacters.push({
                    name: c.character.name.toString(),
                    charID: c.character.mal_id
                });
            });
        }
        // small delay for request limit
        await new Promise(resolve => setTimeout(resolve, 350));
    }

    console.log(allCharacters);
    return allCharacters;
}
//fetchCharIdData();

//Get Full Character Data from an id list
function getFullCharData(charList) {
    
}

//Character Simple Detail Card Template
function characterDetailTemplate(character) {

}