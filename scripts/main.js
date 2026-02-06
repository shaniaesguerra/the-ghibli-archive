import { loadFooter } from "./utils.mjs";
import { fetchCharIdData } from "./CharacterDetails.mjs";
import { fetchFilmsData } from "./FilmDetails.mjs";

loadFooter();

//load in data in store in Local Storage
fetchFilmsData();
setTimeout(fetchCharIdData, 2000);

/************** Ghibli Film of the Day **************/




/************** Top 3 Popular Films **************/




