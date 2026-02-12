import { fetchFilmsData } from "./FilmDetails.mjs";

export function sortByTitleAZ(filmsData) {
    // From A-Z (ascending alphabetical)
    const sortedList = filmsData.slice().sort((a, b) => {
        const aTitle = a.title_english || a.title || "";
        const bTitle = b.title_english || b.title || "";
        return aTitle.toLowerCase().localeCompare(bTitle.toLowerCase());  // alphabetical comparison
    });
    return sortedList;
}

export function sortByTitleZA(filmsData) {
    // From Z-A (descending alphabetical)
    const sortedList = filmsData.slice().sort((a, b) => {
        const aTitle = a.title_english || a.title || "";
        const bTitle = b.title_english || b.title || "";
        return bTitle.toLowerCase().localeCompare(aTitle.toLowerCase());  // reverse comparison
    });
    return sortedList;
}

export function sortByScoreHL(filmsData) {
    //From highest to lowest score count
    const sortedList = filmsData.sort((a, b) => b.score - a.score);
    return sortedList;
}
export function sortByScoreLH(filmsData) {
    //From lowest to highest score count
    const sortedList = filmsData.sort((a, b) => a.score - b.score);
    return sortedList;
}

export function sortByPopularityHL(data) {
    //From highest to lowest favorite count
    const sortedList = data.sort((a, b) => b.favorites - a.favorites);
    return sortedList;
}
export function sortByPopularityLH(data) {
    //From lowest to highest favorite count
    const sortedList = data.sort((a, b) => a.favorites - b.favorites);
    return sortedList;
}

export function sortByReleaseDateNO(filmsData) {
    //From newest to oldest film
    const sortedList = filmsData.sort((a, b) => new Date(b.aired.from) - new Date(a.aired.from));
    return sortedList;
}
export function sortByReleaseDateON(filmsData) {
    //From oldest to newest film
    const sortedList = filmsData.sort((a, b) => new Date(a.aired.from) - new Date(b.aired.from));
    return sortedList;
}

// sort by duration: 
function returnTotalMinutes(stringDuration) {
    // Check data for these formats:         "X hr Y min",            "X min",       "X sec per ep",     "X sec"
    const stringTime = stringDuration.match(/(\d+)\s*hr\s*(\d+)\s*min|(\d+)\s*min|(\d+)\s*sec\s*per\s*ep|(\d+)\s*sec/);
    if (!stringTime) {
        throw new Error(`Invalid duration format: ${stringDuration}`);
    }

    let totalMinutes = 0;

    if (stringTime[1 && stringTime[2]]) {
        // if format is "X hr Y min"
        const hours = parseFloat(stringTime[1], 10);
        const minutes = parseFloat(stringTime[2], 10);
        totalMinutes = (hours * 60) + minutes;
    }
    else if (stringTime[3]) {
        // else if format is "X min"
        totalMinutes = parseFloat(stringTime[3], 10);
    }
    else if (stringTime[4]) {
        // else if format is "X sec per ep"
        const seconds = parseFloat(stringTime[4], 10);
        totalMinutes = seconds / 60; 
    }
    else if (stringTime[5]) {
        // else if format is "X sec"
        const seconds = parseFloat(stringTime[5], 10);
        totalMinutes = seconds / 60;
    }

    return totalMinutes; 
}

export function sortByDurationLS(filmsData) {
    //From longest to shortest film
    const sortedList = filmsData.sort((a, b) => returnTotalMinutes(a.duration) - returnTotalMinutes(b.duration));
    return sortedList;
}

export function sortByDurationSL(filmsData) {
    //From shortest to longest film
    const sortedList = filmsData.sort((a, b) => returnTotalMinutes(b.duration) - returnTotalMinutes(a.duration));
    return sortedList;
}

/* Character Page Filters */
export function sortByNameAZ(charData) {
    // From A-Z (ascending alphabetical)
    const sortedList = charData.slice().sort((a, b) => {
        const aName = a.name || "";
        const bName = b.name || "";
        return aName.toLowerCase().localeCompare(bName.toLowerCase());  // alphabetical comparison
    });
    return sortedList;
}

export function sortByNameZA(charData) {
    // From Z-A (descending alphabetical)
    const sortedList = charData.slice().sort((a, b) => {
        const aName = a.name || "";
        const bName = b.name || "";
        return bName.toLowerCase().localeCompare(aName.toLowerCase());  // reverse comparison
    });
    return sortedList;
}


