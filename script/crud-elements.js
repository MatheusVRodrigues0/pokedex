export function alterLoadingContainer() {
  const loading = document.getElementById('loading');
  loading.classList.add('none');

  const container = document.getElementById('container');
  container.classList.remove('none');
}

export function alterLoadingButton() {
  const loading = document.getElementById('loading-more');
  loading.classList.toggle('none');

  const button = document.getElementById('pokemons-more-button');
  button.classList.toggle('none');
}