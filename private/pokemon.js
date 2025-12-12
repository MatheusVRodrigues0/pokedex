import { updatePokemonData, updateImage } from "../script/update-pokemon.js";

window.onload = function(){
  
  updatePokemonData();

  document.getElementById('loading').style.display = 'none';
  document.getElementById('container').style.display = 'block'; 
};

const selectImg = document.getElementById("details-img-select");

selectImg.addEventListener("change", updateImage);
