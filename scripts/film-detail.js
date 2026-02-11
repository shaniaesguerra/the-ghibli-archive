import { loadFooter, renderFilmDetailedPage, renderWithTemplate,getSessionStorage } from "./utils.mjs";
import {fetchFilmsData, filmDetailedPageTemplate} from "./FilmDetails.mjs";
import { fetchCharIdData, charSimpleCardTemplate } from "./CharacterDetails.mjs";

loadFooter();

const mainContainer = document.querySelector(".detailedFilmPage");
renderFilmDetailedPage("film_card_id", mainContainer, fetchFilmsData(), filmDetailedPageTemplate);

const charData = await fetchCharIdData();
const charContainer = document.querySelector(".character-grid");
charData.forEach(cData => {
    if (Number(getSessionStorage("film_card_id")) == Number(cData.filmID)) {
        renderWithTemplate(charSimpleCardTemplate(cData), charContainer);
    }
});