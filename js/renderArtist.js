import { getSong } from './api.js';
import { clearPlayground, createHomeBtn } from './utils.js';

export const renderArtist = (artistData, songsData) => {
  console.log('artist data', artistData);
  console.log('songs data', songsData);

  const artist = artistData.response.artist;

  const workingArea = clearPlayground();

  // artist
  const artistPart = document.createElement('div');
  artistPart.classList.add('single-artist-part');

  const artistImageWrapper = document.createElement('div');
  artistImageWrapper.classList.add('single-artist-image__wrapper');
  const artistImage = document.createElement('img');
  artistImage.classList.add('single-artist-image');
  artistImage.src = artist.image_url;

  artistImageWrapper.appendChild(artistImage);

  const artistContent = document.createElement('div');
  artistContent.classList.add('single-artist-content');

  const artistName = document.createElement('h1');
  artistName.classList.add('single-artist-name');
  artistName.textContent = artist.name;

  let artistAlternativeNames;
  if (artist.alternate_names && artist.alternate_names.length > 0) {
    artistAlternativeNames = document.createElement('div');
    artistAlternativeNames.classList.add(
      'single-artist-alternative__names',
      'bold-text'
    );
    artistAlternativeNames.innerHTML =
      '<span>Alternate names: </span>' + artist.alternate_names.join(', ');
  }

  let socials;
  if (artist.facebook_name || artist.instagram_name || artist.twitter_name) {
    socials = document.createElement('div');
    socials.classList.add('single-artist-socials');

    if (artist.facebook_name) {
      const facebook = document.createElement('p');
      facebook.textContent = 'Facebook: ' + artist.facebook_name;
      socials.appendChild(facebook);
    }

    if (artist.instagram_name) {
      const instagram = document.createElement('p');
      instagram.textContent = 'Instagram: ' + artist.instagram_name;
      socials.appendChild(instagram);
    }

    if (artist.twitter_name) {
      const twitter = document.createElement('p');
      twitter.textContent = 'Twitter: ' + artist.twitter_name;
      socials.appendChild(twitter);
    }
  }

  const geniusLink = document.createElement('a');
  geniusLink.classList.add('single-artist-link');
  geniusLink.href = artist.url;
  geniusLink.textContent = `${artist.name} on Genius`;

  const homeBtn = createHomeBtn();

  artistContent.appendChild(artistName);

  if (artistAlternativeNames) {
    artistContent.appendChild(artistAlternativeNames);
  }

  if (socials) {
    artistContent.appendChild(socials);
  }

  artistContent.appendChild(geniusLink);

  artistContent.appendChild(homeBtn);

  artistPart.appendChild(artistImageWrapper);
  artistPart.appendChild(artistContent);

  workingArea.appendChild(artistPart);

  // artist

  // artist songs

  const songs = songsData.response.songs;

  const songsListWrapper = document.createElement('div');
  songsListWrapper.classList.add('songs-list__wrapper');
  if (songs) {
    const songsListTitle = document.createElement('h3');
    songsListTitle.textContent = `${artist.name}'s most popular songs`;
    songsListTitle.classList.add('songs-list__title');
    songsListWrapper.appendChild(songsListTitle);
    const songsList = document.createElement('div');
    songsList.classList.add('songs-list');
    songs.forEach((song) => {
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

      songsList.appendChild(singleSong);
    });

    songsListWrapper.appendChild(songsList);
  }

  workingArea.appendChild(songsListWrapper);

  // artist songs
};
