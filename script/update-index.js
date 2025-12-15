import { apiRequestPokemonsData, apiRequestPokemonsDataBytype } from "./api-request.js";
import { getPokemonDataMin } from "./get-pokemon-data.js";

function stuctureShowPokemon(pokemonData){
  const div = document.createElement("div");
  div.id = "show-pokemon";

  const a = document.createElement("a");
  a.href = `pokemon.html?search=${pokemonData.id}`;
  div.appendChild(a);
  
  const img = document.createElement("img");
  img.src = pokemonData.sprite;
  img.className = "pokemon-img";
  a.appendChild(img);

  const p = document.createElement("p");
  p.className = `pokemon-id`;
  p.textContent = pokemonData.id;
  a.appendChild(p);
  
  const h3 = document.createElement("h3");
  h3.className = "pokemon-name";
  h3.textContent = pokemonData.name;
  a.appendChild(h3);

  const ul = document.createElement("ul");
  ul.className = "pokemon-types";
  a.appendChild(ul);

  for(const type of pokemonData.types){
    const li = document.createElement('li');
    li.setAttribute("class", `pokemon-types-type style-type-${type.type.name}`);
    li.textContent = type.type.name;
    ul.appendChild(li);
  }

  return div
 
}


function updatePokemons(pokemonsData){
  const divShow = document.getElementById('show');
  const buttonPokemonsMore = document.getElementById('pokemons-more-button')
  for (const pokemonData of pokemonsData) {
    if(pokemonData.offset){
      buttonPokemonsMore.value = `offset=${pokemonData.offset}&type=${pokemonData.type}`;
      continue;
    }
    const divShowPokemon = stuctureShowPokemon(pokemonData);
    divShow.appendChild(divShowPokemon);
  }

}

function pokemonsDataNext(offset, type = 0) {
  const nextData = {
    offset: offset + 12,
    type: type
  }

  return nextData;
}

async function getPokemonsOffset(offset = 0){
  const pokemons = await apiRequestPokemonsData(offset);
  const dataPokemon = [];
  
  let i = 1;
  for (const pokemon of pokemons.results) {
    dataPokemon[i] = await getPokemonDataMin(pokemon.name);
    i++
  }

  dataPokemon[0] = pokemonsDataNext(offset);

  return dataPokemon;
}

async function getPokemonsByType(type, offset = 0){
  const pokemons = await apiRequestPokemonsDataBytype(type);
  const dataPokemon = [];
  
  dataPokemon[0] = pokemonsDataNext(offset, type);
  let i = 1;
  for (const pokemon of pokemons.pokemon) {
    if (i <= offset) {
      i++
      continue;
    }
    if (i === 13 + offset) {
      return dataPokemon;
    }
    dataPokemon.push(await getPokemonDataMin(pokemon.pokemon.name));
    i++
  }

}

async function getPokemons(){
  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");

  if(type){
    return await getPokemonsByType(type);
  }
  
  return await getPokemonsOffset();
}

export async function insertIndexPokemonsData(){
  const pokemonsData =  await getPokemons();

  updatePokemons(pokemonsData);
}

async function getMorePokemons(offset, type){
  if(type){
    return await getPokemonsByType(type, offset);
  }
  
  return await getPokemonsOffset(offset);
}

export async function updateIndexPokemonsData(offset, type){
  const pokemonsData =  await getMorePokemons(offset, type);

  updatePokemons(pokemonsData);
}