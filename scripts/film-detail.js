import { loadFooter, renderFilmDetailedPage, renderWithTemplate,getSessionStorage } from "./utils.mjs";
import {fetchFilmsData, filmDetailedPageTemplate} from "./FilmDetails.mjs";
import { fetchCharIdData, charSimpleCardTemplate } from "./CharacterDetails.mjs";

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

const mainContainer = document.querySelector(".detailedFilmPage");
renderFilmDetailedPage("film_card_id", mainContainer, fetchFilmsData(), filmDetailedPageTemplate);

const charData = await fetchCharIdData();
const charContainer = document.querySelector(".character-grid");
charData.forEach(cData => {
    if (Number(getSessionStorage("film_card_id")) == Number(cData.filmID)) {
        renderWithTemplate(charSimpleCardTemplate(cData), charContainer);
    }
});