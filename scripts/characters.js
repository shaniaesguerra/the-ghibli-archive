import { renderCharacterTemplate } from "./utils.mjs";

const charContainer = document.querySelector(".character-container");
const characterCard = document.createElement('div');
const mainContainer = document.querySelector('main');

//Get information for Character Cards
// -- establish utils export function and import it here
/*
 - Character Class
 - members: container to append div, 
 - init()
 - displayAllCharacters()
     - fetch all charactersfrom url
     - display characters
 - display a character( id)
     - gets an id of the character
     - can be used for single search
 - renderCharacterTemplate()
     - a template to display info for a character card
 */

class Character{
    constructor(container, data) {
        this.data = data;
        this.container = container;
    }
    init() {
        
    }
    displayAllCharacters(data, container) {
        
    }
    displayOneCharacter(data, id, container) {
        
    }
}