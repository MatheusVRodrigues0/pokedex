import { requestApiPokemon } from "./update-pokemon.js";

async function requestApiEvolution(idPokemon){
  try{
    const answer = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${idPokemon}/`);

    if(!answer.ok){
      throw new Error("Error searching for Pokémon.");
    }

    const data = await answer.json();
    
    const answer1 = await fetch(data.evolution_chain.url); 

    if(!answer1.ok){
      throw new Error("Error searching for Pokémon.");
    }

    const dataEvolution = await answer1.json();

    return dataEvolution;

  }
  catch{

  }
}

async function getPokemon(idPokemon){
  const data = await requestApiPokemon(idPokemon);

  const dataPokemon = {
    id: data.id,
    name: data.pokemon.name,
    sprite: data.sprites.front_default,
    types:  data.types
  }

  return dataPokemon;
}


async function getPokemons(dataEvolution){
  const dataPokemons = [];

  let i = 1;
  let count = 0;
  let string = '';

  while (i === 1) {
    if(count > 0){
      dataEvolution = dataEvolution.evolves_to[0];

      if(!dataEvolution){
        i = 0;
        continue;
      }
    }
    
    dataPokemons[count] = await getPokemon(dataEvolution.species.name);
    
    count++;
  }
  return dataPokemons;
}

export async function getPokemonEvolution(idPokemon){
  const dataEvolution = await requestApiEvolution(idPokemon);
  
  const dataPokemons = await getPokemons(dataEvolution.chain);

  return dataPokemons;
}


// dataEvolution.chain.evolves_to[0].evolves_to[0].species.name //charizard

// dataEvolution.chain.evolves_to[0].species.name //charmeleon

// dataEvolution.chain.species.name //charmander

// {
//   "baby_trigger_item": null,
//   "chain": {
//     "evolution_details": [],
//     "evolves_to": [
//       {
//         "evolves_to": [
//           {
//             "evolves_to": [],
//             "is_baby": false,
//             "species": {
//               "name": "charizard",
//               "url": "https://pokeapi.co/api/v2/pokemon-species/6/"
//             }
//           }
//         ],
//         "is_baby": false,
//         "species": {
//           "name": "charmeleon",
//           "url": "https://pokeapi.co/api/v2/pokemon-species/5/"
//         }
//       }
//     ],
//     "is_baby": false,
//     "species": {
//       "name": "charmander",
//       "url": "https://pokeapi.co/api/v2/pokemon-species/4/"
//     }
//   },
//   "id": 2
// }