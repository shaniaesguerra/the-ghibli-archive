import { loadFooter, getSessionStorage, renderWithTemplate} from "./utils.mjs";
import {fetchFullCharData, charDetailedPageTemplate} from "./CharacterDetails.mjs";

loadFooter();

const mainContainer = document.querySelector(".detailedCharPage");
const charId = getSessionStorage("char_card_id");
const data = await fetchFullCharData(charId);
console.log(data);

renderWithTemplate(charDetailedPageTemplate(data), mainContainer);