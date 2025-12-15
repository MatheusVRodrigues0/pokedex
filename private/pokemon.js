import { alterLoadingContainer } from "../script/crud-elements.js";
import { updatePokemonData, updateImage } from "../script/update-pokemon.js";

window.onload = async function(){
  await updatePokemonData();

  alterLoadingContainer();
};

const selectImg = document.getElementById("details-img-select");

selectImg.addEventListener("change", updateImage);
