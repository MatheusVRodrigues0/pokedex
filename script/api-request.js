
export async function apiRequestPokemonData(idPokemon){
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



export async function apiRequestPokemonEvolutionData(idPokemon){
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

export async function apiRequestPokemonsDataBytype(type){
  try{
    const answer = await fetch(`https://pokeapi.co/api/v2/type/${type}`);

    if(!answer.ok){
      throw new Error("Error searching for Pokémons.");
    }

    const data = await answer.json();
	

    return data;

  }
  catch(error){
    console.error("Request error:", error);
  }  
}

export async function apiRequestPokemonsData(offset = 0){
  try{
    const answer = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=${offset}`);

    if(!answer.ok){
      throw new Error("Error searching for Pokémons.");
    }

    const data = await answer.json();
	

    return data;

  }
  catch(error){
    console.error("Request error:", error);
  }  
}