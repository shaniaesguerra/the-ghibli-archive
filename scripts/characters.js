import { displaySimplifiedChar, fetchCharIdData, fetchFullCharData } from "./CharacterDetails.mjs";
import { fetchFilmsData } from "./FilmDetails.mjs";
import { sortByNameAZ, sortByNameZA, sortByPopularityHL, sortByPopularityLH } from "./Sort.mjs";
import { loadFooter } from "./utils.mjs";

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

displaySimplifiedChar(fetchCharIdData());

const charIdData = await fetchCharIdData();
const container = document.querySelector(".character-grid");

const nameBtnAZ = document.querySelector("#filter-nameBtn-AZ");
const nameBtnZA = document.querySelector("#filter-nameBtn-ZA");
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