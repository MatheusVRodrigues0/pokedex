export function alterLoadingContainer() {
  const loading = document.getElementById('loading');
  loading.classList.add('none');

  const container = document.getElementById('container');
  container.classList.remove('none');
}