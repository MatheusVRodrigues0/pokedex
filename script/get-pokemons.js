async function requestApi(searchApi){
  try{
    const answer = await fetch(searchApi);

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


export async function getPokemons(){
  const params = new URLSearchParams(window.location.search);
  const typePokemon = params.get("type");

  let searchApi = "https://pokeapi.co/api/v2/pokemon?limit=12&offset=0";
  if(typePokemon){
    if(typePokemon <= 0 || typePokemon > 20){
      console.log("type incorrect");
      return; 
    }

    searchApi = `https://pokeapi.co/api/v2/type/${typePokemon}`;
  }

  const dataPokemons =  await requestApi(searchApi);
  console.log(dataPokemons);
}