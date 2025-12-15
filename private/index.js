import { alterLoadingButton, alterLoadingContainer } from "../script/crud-elements.js";
import { insertIndexPokemonsData, updateIndexPokemonsData } from "../script/update-index.js";

window.onload = async function() {
  await insertIndexPokemonsData();

  alterLoadingContainer();
}

const pokemonMore = document.getElementById('pokemons-more-button');

pokemonMore.addEventListener('click', async function() {
  const value = pokemonMore.getAttribute('value');
  
  const offset = Number(value.split('&')[0].split('=')[1]);
  const type = Number(value.split('&')[1].split('=')[1]);

  alterLoadingButton();
  await updateIndexPokemonsData(offset, type);
  alterLoadingButton();
});

//offset=123&type=3