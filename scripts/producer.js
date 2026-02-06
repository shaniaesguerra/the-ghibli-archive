import { JIKAN_API_URL, STUDIO_GHIBLI_ID } from "./utils.mjs";

//Gets Studio Ghibli's Data:
async function fetchStudioGhibliData() {
    try {
        const response = await fetch(`${JIKAN_API_URL}/producers/${STUDIO_GHIBLI_ID}/full`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data.data);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

//fetchStudioGhibliData();