import { getPokemonEvolution } from "./evolution-pokemon-data.js";
import { getPokemonDataAll } from "./get-pokemon-data.js";


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
    if(key === "front_default"){
      option.selected = true;
    }
    select.appendChild(option);

  }

}

function updateTypes(types){
  const ul = document.getElementById("details-type-itens"); 

  for(const type of types){
    const li = document.createElement("li");
    li.className = `pokemon-types-type style-type-${type.type.name}`;
    ul.appendChild(li);

    const a = document.createElement("a");
    a.setAttribute("href", `index.html?type=${type.type.name}`);
    a.setAttribute("class", `style-type-${type.type.name}`);
    a.textContent = type.type.name;
    li.appendChild(a);
  }
}

function updateEvolution(evolutions){
  const ul = document.getElementById("details-evolutions");
  
  let className = 'midlle';
  let i = 1
  for(const key in evolutions){
    const evolution = evolutions[key];
    if(i == evolutions.length){
      className = '';
    } 

    const li = document.createElement('li');
    li.setAttribute("class", className);
    ul.appendChild(li);

    const a = document.createElement("a");
    a.setAttribute('href', `pokemon.html?search=${evolution.id}`);
    li.appendChild(a);

    const img = document.createElement("img");
    img.setAttribute('src', evolution.sprite);
    a.appendChild(img);

    const h3 = document.createElement("h3");
    h3.textContent = evolution.name;
    a.appendChild(h3);

    const ulTypes = document.createElement("ul");
    // ulTypes.setAttribute("id", "details-evolutions-type");
    a.appendChild(ulTypes);


    for(const type of evolution.types){
      const liType = document.createElement('li');
      liType.setAttribute("class", `style-type-${type.type.name}`);
      ulTypes.appendChild(liType);

      const aType = document.createElement("a");
      aType.setAttribute("href", `index.html?type=${type.type.name}`);
      aType.setAttribute("class", `style-type-${type.type.name}`);
      aType.textContent = type.type.name;
      liType.appendChild(aType);
    }


    i++;
  }
}


function updatePokemon(dataPokemon){
  const pokemonName = document.getElementById("details-identifier-name"); 
  pokemonName.textContent = dataPokemon.name;
  
  const pokemonId = document.getElementById("details-identifier-id");
  pokemonId.textContent = dataPokemon.id;

  updateSelectOptions(dataPokemon.sprites);
  
  const pokemonImg = document.getElementById("details-img-image");
  pokemonImg.setAttribute("src", dataPokemon.sprites.front_default);
  pokemonImg.className = "pokemon-img";

  updateTypes(dataPokemon.types);

  updateEvolution(dataPokemon.evolution);
}


function updateElementsHtmlByPokemon(dataPokemon){
  const aPrevious = document.getElementById("pagination-previous");
  aPrevious.setAttribute("href", `pokemon.html?search=${dataPokemon.id - 1}`);
  
  const aNext = document.getElementById("pagination-next");
  aNext.setAttribute("href", `pokemon.html?search=${dataPokemon.id + 1}`);
  

  
  updatePokemon(dataPokemon);

}


export async function updatePokemonData() {
  const params = new URLSearchParams(window.location.search);
  const idPokemon = params.get("search");

  const dataPokemon = await getPokemonDataAll(idPokemon);

  dataPokemon.evolution = await getPokemonEvolution(idPokemon);

  updateElementsHtmlByPokemon(dataPokemon);
}

export function updateImage(event){
  const value = event.target.value;

  const pokemonImage = document.getElementById("details-img-image");
  pokemonImage.setAttribute("src", value);  
}

