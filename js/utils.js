import { getSong } from './api.js';
import { renderFirstPage } from './renderFirstPage.js';

export function createSingleSong(song) {
  const singleSong = document.createElement('div');
  singleSong.addEventListener('click', (event) => {
    getSong(song.id);
  });
  singleSong.classList.add('song-item');
  singleSong.style.backgroundImage = `url(${song.song_art_image_thumbnail_url})`;

  const singleSongHover = document.createElement('div');
  singleSongHover.classList.add('song-item__hover');
  const singleSongHoverTitle = document.createElement('h3');
  singleSongHoverTitle.textContent = song.title;
  singleSongHoverTitle.classList.add('song-item__hover-title');
  const singleSongHoverArtists = document.createElement('h4');
  singleSongHoverArtists.textContent = song.artist_names;
  singleSongHoverArtists.classList.add('song-item__hover-artists');
  const singleSongHoverDate = document.createElement('p');
  singleSongHoverDate.textContent = song.release_date_for_display;
  singleSongHoverDate.classList.add('song-item__hover-date');

  singleSongHover.appendChild(singleSongHoverTitle);
  singleSongHover.appendChild(singleSongHoverArtists);
  singleSongHover.appendChild(singleSongHoverDate);

  singleSong.appendChild(singleSongHover);

  return singleSong;
}

export function clearPlayground() {
  const workingArea = document.querySelector('#workingArea');
  workingArea.innerHTML = '';
  workingArea.scrollTo(0, 0);

  return workingArea;
}

export function createHomeBtn() {
  const homeBtn = document.createElement('button');
  homeBtn.classList.add('home-btn');
  homeBtn.textContent = 'Go home';
  homeBtn.addEventListener('click', (event) => {
    renderFirstPage();
  });

  return homeBtn;
}
