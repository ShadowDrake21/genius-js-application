import { CLIENT_ACCESS_TOKEN } from '../environment.js';

async function getLyrics(artist) {
  // const searchUrl = `http://api.genius.com/search?q=${artist}&access_token=${CLIENT_ACCESS_TOKEN}`;
  const searchUrl = `http://api.genius.com/songs/${artist}?access_token=${CLIENT_ACCESS_TOKEN}`;

  try {
    fetch(searchUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  } catch (err) {
    console.log(err.toJSON());
  }
}

const init = (artist) => {
  getLyrics(artist).then((value) => {
    console.log(value);
  });
};

init('7022998');
