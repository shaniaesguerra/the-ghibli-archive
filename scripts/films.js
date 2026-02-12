import { loadFooter } from "./utils.mjs";
import { displaySimplifiedFilms, fetchFilmsData } from "./FilmDetails.mjs";
import { sortByTitleAZ, sortByTitleZA, sortByDurationLS, sortByDurationSL, sortByReleaseDateON, sortByReleaseDateNO, sortByPopularityHL , sortByPopularityLH} from "./Sort.mjs";

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

displaySimplifiedFilms(fetchFilmsData());

const filmData = await fetchFilmsData();
const container = document.querySelector(".film-grid");
const titleBtnAZ = document.querySelector("#filter-titleBtn-AZ");
const titleBtnZA = document.querySelector("#filter-titleBtn-ZA");
const rTimeBtnSL = document.querySelector("#filter-rtimeBtn-SL");
const rTimeBtnLS = document.querySelector("#filter-rtBtn-LS");
const dateBtnON = document.querySelector("#filter-dateBtn-ON");
const dateBtnNO = document.querySelector("#filter-dateBtn-NO");
const popularBtnLH = document.querySelector("#filter-popularityBtn-LH");
const popularBtnHL = document.querySelector("#filter-popularityBtn-HL");

titleBtnAZ.addEventListener("click", () => {
    container.innerHTML = " ";
    const list = sortByTitleAZ(filmData);
    displaySimplifiedFilms(list);
});

titleBtnZA.addEventListener("click", () => {
    container.innerHTML = " ";
    const list = sortByTitleZA(filmData);
    displaySimplifiedFilms(list);
});


rTimeBtnLS.addEventListener("click", () => {
    container.innerHTML = " ";
    const list = sortByDurationLS(filmData);
    displaySimplifiedFilms(list);
})

rTimeBtnSL.addEventListener("click", () => {
    container.innerHTML = " ";
    const list = sortByDurationSL(filmData);
    displaySimplifiedFilms(list);
})

dateBtnON.addEventListener("click", () => {
    container.innerHTML = " ";
    const list = sortByReleaseDateON(filmData);
    displaySimplifiedFilms(list);
})

dateBtnNO.addEventListener("click", () => {
    container.innerHTML = " ";
    const list = sortByReleaseDateNO(filmData);
    displaySimplifiedFilms(list);
})

popularBtnHL.addEventListener("click", () => {
    container.innerHTML = " ";
    const list = sortByPopularityHL(filmData);
    displaySimplifiedFilms(list);
})

popularBtnLH.addEventListener("click", () => {
    container.innerHTML = " ";
    const list = sortByPopularityLH(filmData);
    displaySimplifiedFilms(list);
})