import { loadFooter, getSessionStorage, renderWithTemplate} from "./utils.mjs";
import { fetchCharIdData, fetchFullCharData, charDetailedPageTemplate} from "./CharacterDetails.mjs";
import { fetchFilmsData, filmSimpleCardTemplate } from "./FilmDetails.mjs";

loadFooter();

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

