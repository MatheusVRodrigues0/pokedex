
async function requestApi(idPokemon){
  try{

    if(!idPokemon){
      throw new Error("Id or Name invalid");
    }

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

function updateSelectOptions(sprites){
  const select = document.getElementById("details-img-select");
  
  for(let key in sprites){
    const sprite = sprites[key];

    if(sprite === null){
      continue;
    }

    const option = document.createElement("option");
    option.value = sprite;
    option.textContent = key;
    select.appendChild(option);

  }

}

function updateTypes(types){
  const ul = document.getElementById("details-type-itens"); 

  for(const type of types){
    const li = document.createElement("li");
    li.setAttribute("class", `style-type-${type.type.name}`);
    ul.appendChild(li);

    const a = document.createElement("a");
    a.setAttribute("href", `index.html?type=${type.type.name}`);
    a.textContent = type.type.name;
    li.appendChild(a);
  }
}

function updatePokemon(dataPokemon){
  const pokemonName = document.getElementById("details-identifier-name"); 
  pokemonName.textContent = dataPokemon.pokemon.name;
  
  const pokemonId = document.getElementById("details-identifier-id");
  pokemonId.textContent = dataPokemon.id;

  updateSelectOptions(dataPokemon.sprites);
  
  const pokemonImg = document.getElementById("details-img-image");
  pokemonImg.setAttribute("src", dataPokemon.sprites.front_default);

  updateTypes(dataPokemon.types);
}

function updateElementsHtmlByPokemon(dataPokemon){
  const aPrevious = document.getElementById("pagination-previous");
  aPrevious.setAttribute("href", `pokemon.html?search=${dataPokemon.id - 1}`);
  
  const aNext = document.getElementById("pagination-next");
  aNext.setAttribute("href", `pokemon.html?search=${dataPokemon.id + 1}`);
  

  
  updatePokemon(dataPokemon);
}


export async function getPokemon() {
  const params = new URLSearchParams(window.location.search);

  const idPokemon = params.get("search");

  const dataPokemon = await requestApi(idPokemon);

  updateElementsHtmlByPokemon(dataPokemon);

}

export function updateImage(event){
  const value = event.target.value;

  const pokemonImage = document.getElementById("details-img-image");
  pokemonImage.setAttribute("src", value);  
}

