import { loadFooter,getRandomNumber,getLocalStorage, setLocalStorage, renderWithTemplate } from "./utils.mjs";
import { fetchCharIdData } from "./CharacterDetails.mjs";
import { fetchFilmsData, filmSimpleCardTemplate} from "./FilmDetails.mjs";
import { featuredFilmTemplate } from "./FeaturedFilm.mjs";
import { sortByScore } from "./Sort.mjs";

loadFooter();

//load in data in store in Local Storage -- fetch data only once
const filmsData = await fetchFilmsData();
setTimeout(fetchCharIdData, 2000);

/************** Ghibli Film of the Day **************/
//Get just the date today -- YYYY-MM-DD --
const dateToday = new Date().toISOString().slice(0, 10);
//const dateToday = "2026-02-07"; //for debugging
//console.log("Date Today: ", dateToday); //for debugging

const lastVisitDate = getLocalStorage("today_date");
let currentFilmIndex = getLocalStorage("current_film_number");

const container = document.querySelector("#filmOfTheDay");

//Get number of visits:
// if date today is equal to last visit date and currentFilmIndex is not null:
if (lastVisitDate === dateToday && currentFilmIndex !== null) {
    // get content for today using existing currentFilmIndex
    // Render the content in home page:
    renderWithTemplate(featuredFilmTemplate(filmsData[currentFilmIndex]), container);
}
else {
    // if date today is NOT EQUAL to last visit date,
    // It means a NEW DAY, NEW FILM OF THE DAY:

    // Get new Film Index to show:
    currentFilmIndex = getRandomNumber(0, filmsData.length);

    // Render the content in home page:
    renderWithTemplate(featuredFilmTemplate(filmsData[currentFilmIndex]), container);

    //set local storage to today
    setLocalStorage("today_date", dateToday);
    setLocalStorage("current_film_number", currentFilmIndex);
}

/************** Most Popular Films **************/
//Sort from highest to lowest popularity 
const sortedPopularityList = sortByScore(filmsData);
//console.log(sortedPopularityList); debugging
const popularityContainer = document.querySelector("#popularFilms");

//Get only the top 10 to render on page
for (let i = 0;  i < 10; i++) {
    renderWithTemplate(filmSimpleCardTemplate(sortedPopularityList[i]), popularityContainer);
}



