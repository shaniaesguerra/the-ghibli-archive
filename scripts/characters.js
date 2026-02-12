import { displaySimplifiedChar, fetchCharIdData, fetchFullCharData } from "./CharacterDetails.mjs";
import { fetchFilmsData } from "./FilmDetails.mjs";
import { sortByNameAZ, sortByNameZA, sortByPopularityHL, sortByPopularityLH } from "./Sort.mjs";
import { loadFooter } from "./utils.mjs";

loadFooter();
displaySimplifiedChar(fetchCharIdData());

const charIdData = await fetchCharIdData();
const filmData = await fetchFilmsData();
const container = document.querySelector(".character-grid");

const nameBtnAZ = document.querySelector("#filter-nameBtn-AZ");
const nameBtnZA = document.querySelector("#filter-nameBtn-ZA");
const movieTitleBtnSL = document.querySelector("#filter-movieTitleBtn-AZ");
const movieTitleBtnLS = document.querySelector("#filter-movieTitleBtn-ZA");
const popularityBtnLH = document.querySelector("#filter-popularityBtn-LH");
const popularityBtnHL = document.querySelector("#filter-popularityBtn-HL");

nameBtnAZ.addEventListener("click", () => {
    container.innerHTML = " ";
    const list = sortByNameAZ(charIdData);
    displaySimplifiedChar(list);
});

nameBtnZA.addEventListener("click", () => {
    container.innerHTML = " ";
    const list = sortByNameZA(charIdData);
    displaySimplifiedChar(list);
});

popularityBtnHL.addEventListener("click", () => {
    container.innerHTML = " ";
    const list = sortByPopularityHL(charIdData);
    displaySimplifiedChar(list);
});

popularityBtnLH.addEventListener("click", () => {
    container.innerHTML = " ";
    const list = sortByPopularityLH(charIdData);
    displaySimplifiedChar(list);
});