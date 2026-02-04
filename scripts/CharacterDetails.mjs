import { renderWithTemplate, STUDIO_GHIBLI_ID, JIKAN_API_URL, STUDIO_GHIBLI_URL } from "./utils.mjs";
import { fetchFilmsData } from "./FilmDetails.mjs";

//Get Character Information. Returns all characters in ghibli
//Helper Function:
//Get Simplified Character Data using Studio Ghibli API
async function fetchSimpleCharData() {
    let simpleCharData = [];
    try {
        const response = await fetch(`${STUDIO_GHIBLI_URL}/people`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const simpleChar = await response.json();
        //console.log(simpleChar); //for debugging
        simpleChar.forEach(char => {
            simpleCharData.push(char);
        });
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }

    //console.log(simpleCharData); //for debugging
    return simpleCharData;
}

//fetchSimpleCharData(); for debugging

//Helper Function:
//Get the Film data by passing the film url
async function getFilm(filmUrl) {
    try {
        const response = await fetch(`${filmUrl}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const film = await response.json();
        //console.log("Film:", film); //for debugging
        return film;
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
}

//Helper Function:
//Compare character data and film to get the joined data we want:
//  Film(filmID) the character was in.
async function getCharInFilm() {
    const simpleChar = await fetchSimpleCharData();
    const allFilms = await fetchFilmsData();
    const charInFilm = []; //store character name and film they were in

    for (const char of simpleChar) {
        //get film data for comparison
        const filmData = await getFilm(char.films);

        //find the data of all films to find matching film data
        const match = allFilms.find(af => af.title_english === filmData.title);
        if (match) {
            //If a match is found, get the info we need:
            charInFilm.push({
                name: char.name,
                film: match.mal_id
            });
        }
    }

    console.log(charInFilm);
    return charInFilm;
}

//getCharInFilm(); //for debugging

//Helper Function:
//Get character ID through the film ID
async function fetchFullCharData() {
    const charInFilm = await getCharInFilm();
    let allCharacters = [];


    for (const char of charInFilm) {
        try {
            const response = await fetch(`${JIKAN_API_URL}/anime/${char.film}/characters`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const charDetails = await response.json();
            console.log(charDetails); //for debugging

            //put data in list
            charDetails.data.forEach(c => {
                allCharacters.push({
                    name: encodeURIComponent(c.character.name),
                    charID: c.character.mal_id
                });
            });
            
            //Wait between requests
            await new Promise(resolve => setTimeout(resolve, 800));

        } catch (error) {
            console.error('Error fetching data:', error);
        }

    }

    console.log(allCharacters);
    return allCharacters;
}

//fetchFullCharData();

//Main Function:
//Get Full Character Data using Jikan API using the data we get
// from getCharInFilm()


//Character Simple Detail Card Template
function characterDetailTemplate(character) {

}


export default class Character {
    constructor(containerElement, dataSource) {
        this.dataSource = dataSource;
        this.container = container;
    }
    init() {

    }
    displayAllCharacters(list) {

    }
}