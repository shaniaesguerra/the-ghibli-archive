import { loadFooter, renderCharDetailedPage, renderWithTemplate,getSessionStorage } from "./utils.mjs";
import {fetchFilmsData} from "./FilmDetails.mjs";
import {fetchFullCharData, charDetailedPageTemplate} from "./CharacterDetails.mjs";

loadFooter();

const mainContainer = document.querySelector(".detailedCharPage");
const charId = getSessionStorage("char_card_id");
renderCharDetailedPage("char_card_id", mainContainer, fetchFullCharData, charId, charDetailedPageTemplate);

const data = await fetchFullCharData(18);
console.log(data);