import { getPokemon, updateImage } from "./update-pokemon.js";

window.onload = getPokemon;

const selectImg = document.getElementById("details-img-select");

selectImg.addEventListener("change", updateImage);

//evolutions https://pokeapi.co/api/v2/pokemon-species/