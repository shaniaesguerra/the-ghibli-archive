// retrieve data from localstorage
export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));

}
// save data to local storage
export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

//Load Template for Header and footer
export async function loadTemplate(path) {
    const response = await fetch(path);
    return await response.text();
}

//Render Header and Footer
export async function loadHeaderFooter() {
    const templateHeader = await loadTemplate("../partials/header.html");
    const templateFooter = await loadTemplate("../partials/footer.html");

    const header = document.querySelector("#dynamic-header");
    const footer = document.querySelector("#dynamic-footer");

    renderWithTemplate(templateHeader, header);
    renderWithTemplate(templateFooter, footer);
}

//Render data on template
export function renderWithTemplate(template, parentElement, data, callback) {
    parentElement.innerHTML += template;
    if (callback) {
        callback(data);
    }
}