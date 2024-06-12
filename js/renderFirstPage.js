import { getRandomSong } from './api.js';
import {
  clearPlayground,
  createErrorMessage,
  createLoader,
  createSingleSong,
} from './utils.js';

export const renderFirstPage = async () => {
  const workingArea = clearPlayground();
  const page = document.createElement('div');
  page.classList.add('first-page');

  const categories = [
    { title: 'Sanah', searchTerm: 'sanah' },
    { title: 'Polska muzyka', searchTerm: 'polska muzyka' },
    { title: 'Pop', searchTerm: 'pop' },
    { title: 'Rock and roll', searchTerm: 'rock and roll' },
    { title: 'Rap', searchTerm: 'rap' },
  ];

  const loader = createLoader();
  workingArea.appendChild(loader);
  try {
    for (const category of categories) {
      const categorySection = document.createElement('div');
      categorySection.classList.add('category-section');
      const categoryTitle = document.createElement('h3');
      categoryTitle.classList.add('songs-list__title');
      const categoryList = document.createElement('div');
      categoryTitle.textContent = category.title;
      categoryList.classList.add('songs-list');

      const { response } = await getRandomSong(category.searchTerm);
      const { hits } = response;
      const randomSongs = getRandomArrItems(hits, 4);

      randomSongs.forEach((song) => {
        const singleSong = createSingleSong(song.result);

        categoryList.appendChild(singleSong);
      });

      categorySection.appendChild(categoryTitle);
      categorySection.appendChild(categoryList);

      page.appendChild(categorySection);
    }
    setTimeout(() => {
      workingArea.removeChild(loader);
      workingArea.appendChild(page);
    }, 2000);
  } catch (error) {
    setTimeout(() => {
      workingArea.removeChild(loader);
      const errorMessage = createErrorMessage(error);

      workingArea.appendChild(errorMessage);
    }, 2000);
  }
};

function getRandomArrItems(array, count) {
  const shuffledArray = array.sort(() => 0.5 - Math.random());
  return shuffledArray.slice(0, count);
}
