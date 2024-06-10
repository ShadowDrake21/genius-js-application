import { GENIUS_BASE_URL } from '../constants.js';
import { CLIENT_ACCESS_TOKEN } from '../environment.js';
import { renderSong } from './render.js';

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
        console.log(data);
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
