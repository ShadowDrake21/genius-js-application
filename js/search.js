import { search } from './api.js';
import { clearPlayground, createHomeBtn, createSingleSong } from './utils.js';

export const renderSearch = async (searchTerm) => {
  const workingArea = clearPlayground();

  const searchSection = document.createElement('div');
  searchSection.classList.add('category-section');
  const searchTitleWrapper = document.createElement('div');
  searchTitleWrapper.classList.add('search-title__wrapper');

  const searchTitle = document.createElement('h3');
  searchTitle.classList.add('search__title');
  searchTitle.textContent = 'Search: ' + searchTerm;

  const homeBtn = createHomeBtn();

  searchTitleWrapper.appendChild(searchTitle);
  searchTitleWrapper.appendChild(homeBtn);

  const searchList = document.createElement('div');
  searchList.classList.add('songs-list');

  try {
    const { response } = await search(searchTerm);
    const { hits } = response;

    hits.forEach((song) => {
      const singleSong = createSingleSong(song.result);

      searchList.appendChild(singleSong);
    });
  } catch (error) {
    console.log('Error retrieving found songs:', error);
  }

  searchSection.appendChild(searchTitleWrapper);

  searchSection.appendChild(searchList);

  workingArea.appendChild(searchSection);
};
