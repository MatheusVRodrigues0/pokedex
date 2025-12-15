import { alterLoadingContainer } from "../script/crud-elements.js";
import { updateIndexPokemonsData } from "../script/update-index.js";

window.onload = async function() {
  await updateIndexPokemonsData();

  alterLoadingContainer();
}