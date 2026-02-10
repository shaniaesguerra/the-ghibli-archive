export const STUDIO_GHIBLI_ID = 21;
export const JIKAN_API_URL = "https://api.jikan.moe/v4";
export const STUDIO_GHIBLI_URL = "https://ghibliapi.dev";

// retrieve data from localstorage
export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));

}
// save data to local storage
export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// retrieve data from sessionstorage
export function getSessionStorage(key) {
    return JSON.parse(sessionStorage.getItem(key));

}
// save data to session storage
export function setSessionStorage(key, data) {
    sessionStorage.setItem(key, JSON.stringify(data));
}

//Load Template for Header and footer
export async function loadTemplate(path) {
    const response = await fetch(path);
    return await response.text();
}

//Render Header and Footer
export async function loadFooter() {
    const templateFooter = await loadTemplate("https://shaniaesguerra.github.io/the-ghibli-archive/partials/footer.html");
    const footer = document.querySelector("#dynamic-footer");
    renderWithTemplate(templateFooter, footer);
}

//Render data on template
export function renderWithTemplate(template, parentElement, data, callback) {
    parentElement.innerHTML += template;
    if (callback) {
        callback(data);
    }
}

//Get random number
export function getRandomNumber(min, max) {
    const minimum = Math.ceil(min);
    const maximum = Math.floor(max);
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

//make card click event for each card
export function makeCardClickEvent(cardClass, path, varName) {
    //get all cards:
    const cards = document.querySelectorAll(cardClass);

    cards.forEach(card => {
        card.addEventListener('click', () => {
            setSessionStorage(varName, card.dataset.filmId);
            window.location.href = path;
        });
    });
}
