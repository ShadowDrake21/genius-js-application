import { renderFirstPage } from './renderFirstPage.js';
import { renderSearch } from './search.js';

renderFirstPage();

document.querySelector('#searchForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const searchInput = document.querySelector('#searchForm input[type="text"]');

  const searchTerm = searchInput.value;

  renderSearch(searchTerm);

  searchInput.value = '';
});
