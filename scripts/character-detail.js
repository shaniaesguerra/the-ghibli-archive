import { loadFooter, getSessionStorage, renderWithTemplate} from "./utils.mjs";
import { fetchCharIdData, fetchFullCharData, charDetailedPageTemplate} from "./CharacterDetails.mjs";
import { fetchFilmsData, filmSimpleCardTemplate } from "./FilmDetails.mjs";

loadFooter();
// Store the selected elements that we are going to use
const navbutton = document.querySelector('#ham-btn');
const navBar = document.querySelector('#nav-bar');

// Toggle the show class off and on
navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navBar.classList.toggle('show');
});

document.querySelectorAll('.navigation a').forEach(link => {
    link.addEventListener('click', () => {
        navbutton.classList.remove('show');
        navBar.classList.remove('show');
    });
});

const mainContainer = document.querySelector(".detailedCharPage");
const charId = getSessionStorage("char_card_id");
const data = await fetchFullCharData(charId);
//console.log(data);

renderWithTemplate(charDetailedPageTemplate(data), mainContainer);

//Show associated film card with character
const filmData = await fetchFilmsData();
const charData = await fetchCharIdData();
let filmId = 0;
const filmContainer = document.querySelector(".char-films");

charData.forEach(char => {
    if (char.charID == charId) {
        filmId = char.filmID;
    }
});

filmData.forEach(film => {
    if (Number(film.mal_id) == filmId) {
        renderWithTemplate(filmSimpleCardTemplate(film), filmContainer);
    }
});

