import { apiRequestPokemonEvolutionData } from "./api-request.js";
import { getPokemonDataMin } from "./get-pokemon-data.js";

async function getPokemonsEvolutionData(dataEvolution){
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
    
    dataPokemons[count] = await getPokemonDataMin(dataEvolution.species.name);
    
    count++;
  }
  return dataPokemons;
}

export async function getPokemonEvolution(idPokemon){
  const dataEvolution = await apiRequestPokemonEvolutionData(idPokemon);
  
  const dataPokemons = await getPokemonsEvolutionData(dataEvolution.chain);

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