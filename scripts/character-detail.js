import { loadFooter, renderDetailedPage, renderWithTemplate,getSessionStorage } from "./utils.mjs";
import {fetchFilmsData, filmDetailedPageTemplate} from "./FilmDetails.mjs";
import { fetchCharIdData, fetchFullCharData} from "./CharacterDetails.mjs";

loadFooter();

const mainContainer = document.querySelector(".detailedCharPage");
renderDetailedPage("film_card_id", mainContainer, fetchCharIdData(), filmDetailedPageTemplate);

const data = await fetchFullCharData(18);
console.log(data);