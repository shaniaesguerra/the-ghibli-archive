export function featuredFilmTemplate(film) {
    if (!film.title_english) {

        if (!film.trailer.embed_url) {
            return `
            <img src="${film.images.webp.large_image_url}" alt="${film.title_english} Movie Poster">
            <h2>Ghibli Film of the Day</h2>
            <h3 id="film-title">${film.title} | <span>${film.title_japanese}</span></h3>
            `;
        } else {
            return `
            <img src="${film.images.webp.large_image_url}" alt="${film.title_english} Movie Poster">
            <h2>Ghibli Film of the Day</h2>
            <h3 id="film-title">${film.title} | <span>${film.title_japanese}</span></h3>
            <iframe width="560" height="315" src="${film.trailer.embed_url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            `;
        }
    }
    else {
        if (!film.trailer.embed_url) {
            return `
            <img src="${film.images.webp.large_image_url}" alt="${film.title_english} Movie Poster">
            <h2>Ghibli Film of the Day</h2>
            <h3 id="film-title">${film.title_english} | <span>${film.title_japanese}</span></h3>
            `;
        } else {
            return `
            <img src="${film.images.webp.large_image_url}" alt="${film.title_english} Movie Poster">
            <h2>Ghibli Film of the Day</h2>
            <h3 id="film-title">${film.title_english} | <span>${film.title_japanese}</span></h3>
            <iframe width="560" height="315" src="${film.trailer.embed_url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            `;
        }
    }
}