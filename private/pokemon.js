import { getDataPokemon, updateImage } from "../script/update-pokemon.js";

window.onload = function(){
  
  getDataPokemon();

  document.getElementById('loading').style.display = 'none';
  document.getElementById('container').style.display = 'block'; 
};

const selectImg = document.getElementById("details-img-select");

selectImg.addEventListener("change", updateImage);
