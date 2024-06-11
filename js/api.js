import { GENIUS_BASE_URL } from '../constants.js';
import { CLIENT_ACCESS_TOKEN } from '../environment.js';
import { renderArtist } from './renderArtist.js';
import { renderSong } from './renderSong.js';

export const getSong = async (id) => {
  try {
    fetch(`${GENIUS_BASE_URL}songs/${id}?access_token=${CLIENT_ACCESS_TOKEN}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        renderSong(data);
        console.log(data);
      });
  } catch (err) {
    console.log(err.toJSON());
  }
};

export const getArtist = async (id) => {
  try {
    fetch(`${GENIUS_BASE_URL}artists/${id}?access_token=${CLIENT_ACCESS_TOKEN}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const artistSongs = getArtistSongs(id);
        artistSongs.then((songs) => {
          renderArtist(data, songs);
        });
      });
  } catch (err) {
    console.log(err.toJSON());
  }
};

export const getArtistSongs = async (id, numberOfSongs = 10) => {
  try {
    return fetch(
      `${GENIUS_BASE_URL}artists/${id}/songs?access_token=${CLIENT_ACCESS_TOKEN}&per_page=${numberOfSongs}&sort=popularity`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      });
  } catch (err) {
    console.log(err.toJSON());
  }
};

export const search = async (artist) => {
  try {
    fetch(
      `http://api.genius.com/search?q=${artist}&access_token=${CLIENT_ACCESS_TOKEN}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  } catch (err) {
    console.log(err.toJSON());
  }
};
