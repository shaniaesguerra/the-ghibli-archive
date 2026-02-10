import { loadFooter, renderDetailedPage } from "./utils.mjs";
import {fetchFilmsData, filmDetailedPageTemplate} from "./FilmDetails.mjs";

loadFooter();

const mainContainer = document.querySelector(".detailedFilmPage");
renderDetailedPage("film_card_id", mainContainer, fetchFilmsData(), filmDetailedPageTemplate);