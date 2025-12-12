async function requestApiPokemon(idPokemon){
  try{
    const answer = await fetch(`https://pokeapi.co/api/v2/pokemon-form/${idPokemon}`)

    if(!answer.ok){
      throw new Error("Error searching for Pokémon.");
    }

    const data = await answer.json();
	

    return data;

  }
  catch(error){
    console.error("Request error:", error);
  }
}



export async function apiRequestPokemonEvolution(idPokemon){
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