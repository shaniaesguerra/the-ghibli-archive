import { renderWithTemplate, STUDIO_GHIBLI_ID, JIKAN_API_URL, STUDIO_GHIBLI_URL } from "./utils.mjs";
import { fetchFilmsData } from "./FilmDetails.mjs";

//Get Character Information. Returns all characters in ghibli
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

async function getFilm(filmObj) {
    try {
        const response = await fetch(`${filmObj}`);

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

//compare character data and film to get the joined data we want
async function getCharInFilm() {
    const simpleChar = await fetchSimpleCharData();
    const allFilms = await fetchFilmsData();
    const charInFilm = []; //store character name and film they were in

    for (const char of simpleChar) {
        // Now you can safely use await
        const filmData = await getFilm(char.films);

        const match = allFilms.find(af => af.title_english === filmData.title);
        if (match) {
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

//Get Full Character Data using Jikan API
async function fetchFullCharData() {

}

//fetchFullCharData();

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