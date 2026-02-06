export function sortByScore(filmsData) {
    //From highest to lowest popularity count
    const sortedList = filmsData.toSorted((a, b) => b.score - a.score);
    return sortedList;
}