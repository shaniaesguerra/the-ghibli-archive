export function featuredFilmTemplate(film) {
    if (!film.title_english) {

        if (!film.trailer.embed_url) {
            return `
            <div class="featureFilm-info">
                <figure>
                    <img src="${film.images.webp.large_image_url}" alt="${film.title} Movie Poster">
                </figure>
                <div class="title-heading">
                    <h1>Ghibli Film of the Day</h1>
                    <h2 class="film-title">${film.title}<br><span class="film-title-japanese">${film.title_japanese}</span></h2>
                </div>
                <h4>Synopsis:</h4>
                <p>${film.synopsis}</p>
            </div >
            `;
        } else {
            return `
            <div class="featureFilm-info">
                <figure>
                    <img src="${film.images.webp.large_image_url}" alt="${film.title} Movie Poster">
                </figure>
                <div class="title-heading">
                    <h1>Ghibli Film of the Day</h1>
                    <h2 class="film-title">${film.title}<br><span class="film-title-japanese">${film.title_japanese}</span></h2>
                </div>
                <h4>Synopsis:</h4>
                <p>${film.synopsis}</p>
            </div >
            <h3>👀 Watch the trailer ⤵️</h3>
            <div class="video">
                <iframe width="560" height="315" src="${film.trailer.embed_url}" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>`;
        }
    }
    else {
        if (!film.trailer.embed_url) {
            return `
            <div class="featureFilm-info">
                <figure>
                    <img src="${film.images.webp.large_image_url}" alt="${film.title_english} Movie Poster">
                </figure>
                <div class="title-heading">
                    <h1>Ghibli Film of the Day</h1>
                    <h2 class="film-title">${film.title_english}<br><span class="film-title-japanese">${film.title_japanese}</span></h2>
                </div>
                <h4>Synopsis:</h4>
                <p>${film.synopsis}</p>
            </div >
            `;
        } else {
            return `
            <div class="featureFilm-info">
                <figure>
                    <img src="${film.images.webp.large_image_url}" alt="${film.title_english} Movie Poster">
                </figure>
                <div class="title-heading">
                    <h1>Ghibli Film of the Day</h1>
                    <h2 class="film-title">${film.title_english}<br><span class="film-title-japanese">${film.title_japanese}</span></h2>
                </div>
                <h4>Synopsis:</h4>
                <p>${film.synopsis}</p>
            </div>
            <h3>👀 Watch the trailer ⤵️</h3>
            <div class="video">
                <iframe width="560" height="315" src="${film.trailer.embed_url}" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>`;
        }
    }
}