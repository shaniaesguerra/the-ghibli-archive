export function featuredFilmTemplate(film) {
    if (!film.title_english) {

        if (!film.trailer.embed_url) {
            return `
            <figure><img src="${film.images.webp.large_image_url}" alt="${film.title_english} Movie Poster"></figure>
            <h3 class="film-title">${film.title}<br><span class="film-title-japanese">${film.title_japanese}</span></h3>
            <h4>Synopsis:</h4>
            <p>${film.synopsis}</p>
            `;
        } else {
            return `
            <div class="featureFilm-info">
                <figure>
                    <img src="${film.images.webp.large_image_url}" alt="${film.title_english} Movie Poster">
                </figure>
                <h4>Synopsis:</h4>
                <p>${film.synopsis}</p>
            </div>

            <div class="hero-container">
                <div class="video">
                <iframe width="560" height="315" src="${film.trailer.embed_url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div class="hero-overlay-content">
                    <h1>Ghibli Film of the Day</h1>
                    <h2 class="film-title">${film.title}<br><span class="film-title-japanese">${film.title_japanese}</span></h2>
                </div>
            </div>
            `;
        }
    }
    else {
        if (!film.trailer.embed_url) {
            return `
            <figure><img src="${film.images.webp.large_image_url}" alt="${film.title_english} Movie Poster"></figure>
            <h3 class="film-title">${film.title_english}<br><span class="film-title-japanese">${film.title_japanese}</span></h3>
            <h4>Synopsis:</h4>
            <p>${film.synopsis}</p>
            `;
        } else {
            return `
            <div class="featureFilm-info">
                <figure>
                    <img src="${film.images.webp.large_image_url}" alt="${film.title_english} Movie Poster">
                </figure>
                <h4>Synopsis:</h4>
                <p>${film.synopsis}</p>
            </div>
            
            <div class="hero-container">
                <div class="video">
                <iframe width="560" height="315" src="${film.trailer.embed_url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div class="hero-overlay-content">
                    <h1>Ghibli Film of the Day</h1>
                    <h2 class="film-title">${film.title_english}<br><span class="film-title-japanese">${film.title_japanese}</span></h2>
                </div>
            </div>`;
        }
    }
}