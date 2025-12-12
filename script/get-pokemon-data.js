import { apiRequestPokemonData } from "./api-request.js";

export async function getPokemonDataAll(idPokemon){
  const data = await apiRequestPokemonData(idPokemon);

  const dataPokemon = {
    id: data.id,
    name: data.pokemon.name,
    sprites: data.sprites,
    types:  data.types
  }

  return dataPokemon;
}


export async function getPokemonDataMin(idPokemon){
  const data = await apiRequestPokemonData(idPokemon);

  const dataPokemon = {
    id: data.id,
    name: data.pokemon.name,
    sprite: data.sprites.front_default,
    types:  data.types
  }

  return dataPokemon;
}