import { getArtist } from './api.js';

export const renderSong = (data) => {
  const receivedSong = data.response.song;
  const workingArea = document.querySelector('#workingArea');

  workingArea.innerHTML = '';
  console.log('data', receivedSong);

  const createArtistSection = (titleText, artists) => {
    const section = document.createElement('div');
    section.classList.add('section');
    const sectionTitle = document.createElement('h2');
    sectionTitle.textContent = titleText;
    sectionTitle.classList.add('section-title');
    section.append(sectionTitle);

    const sectionInner = document.createElement('div');
    const artistsIndividualClass = titleText.replace(/\s+/g, '-').toLowerCase();
    sectionInner.classList.add('section-inner', artistsIndividualClass);

    artists.forEach((artist) => {
      const artistDiv = document.createElement('div');
      artistDiv.classList.add('artist-item');

      artistDiv.setAttribute('target', '_blank');
      const artistImage = document.createElement('img');
      artistImage.src = artist.image_url;
      artistImage.classList.add('artist-item__img');
      const artistName = document.createElement('h3');
      artistName.innerText = artist.name;
      artistName.classList.add('artist-item__name');
      artistDiv.append(artistImage, artistName);

      artistDiv.addEventListener('click', (event) => {
        getArtist(artist.id);
      });
      sectionInner.appendChild(artistDiv);
    });

    section.appendChild(sectionInner);

    return section;
  };

  const title = document.createElement('h1');
  title.classList.add('song-title');
  title.textContent = receivedSong.title;

  const artistNames = document.createElement('p');
  artistNames.classList.add('artist-names', 'bold-text');
  artistNames.textContent = 'By ' + receivedSong.artist_names;

  const topPart = document.createElement('div');
  topPart.classList.add('song-top');

  const songImageWrapper = document.createElement('div');
  songImageWrapper.classList.add('song-image__wrapper');
  const songImage = document.createElement('img');
  songImage.classList.add('song-image');
  songImage.src = receivedSong.song_art_image_url;

  songImageWrapper.appendChild(songImage);

  const primaryArtists = createArtistSection(
    'Primary Artists',
    receivedSong.primary_artists
  );

  primaryArtists.classList.add('primary-artists__list');

  topPart.appendChild(songImageWrapper);
  topPart.appendChild(primaryArtists);

  const songInfoWrapper = document.createElement('div');
  songInfoWrapper.classList.add('song-info__wrapper');

  let releaseDate;
  if (receivedSong.release_date_for_display) {
    releaseDate = document.createElement('p');
    releaseDate.classList.add('bold-text');
    releaseDate.innerHTML =
      'Release date:' + receivedSong.release_date_for_display;

    songInfoWrapper.appendChild(releaseDate);
  }

  let language;
  if (receivedSong.language) {
    language = document.createElement('p');
    language.classList.add('bold-text');
    language.textContent = 'Language: ' + receivedSong.language;
    songInfoWrapper.appendChild(language);
  }

  let mediaLinks;

  if (receivedSong.media) {
    mediaLinks = document.createElement('div');
    mediaLinks.classList.add('media-links');
    const mediaLinksTitle = document.createElement('h2');
    mediaLinksTitle.textContent = 'Media';
    mediaLinks.append(mediaLinksTitle);
    for (let i = 0; i < receivedSong.media.length; i++) {
      const link = document.createElement('a');
      link.classList.add('media-links__item');
      link.href = receivedSong.media[i].url;
      link.setAttribute('target', '_blank');
      link.innerText = 'Link ' + (i + 1);

      mediaLinks.appendChild(link);
    }
  }

  let middlePart;

  let featuredArtists;
  if (
    receivedSong.featured_artists &&
    receivedSong.featured_artists.length > 0
  ) {
    middlePart = document.createElement('div');
    middlePart.classList.add('song-middle');

    featuredArtists = createArtistSection(
      'Featured Artists',
      receivedSong.featured_artists
    );

    middlePart.appendChild(featuredArtists);
  }

  let album;
  if (receivedSong.album) {
    if (!middlePart) {
      middlePart = document.createElement('div');
      middlePart.classList.add('song-middle');
    }

    album = document.createElement('div');
    album.classList.add('album');

    const albumPart = document.createElement('div');
    albumPart.classList.add('album-part');

    const albumTitle = document.createElement('h2');
    albumTitle.textContent = 'Album';
    albumTitle.classList.add('album-section__title', 'section-title');

    const albumItem = document.createElement('a');
    albumItem.classList.add('album-item');
    albumItem.setAttribute('target', '_blank');
    albumItem.href = 'https://genius.com/albums/Sanah/Uczta';
    albumItem.innerHTML = `<img class="album-item__img" src="${receivedSong.album.cover_art_url}"/>
    <div class="album-item__title-wrapper"><h3 class="album-item__title">${receivedSong.album.name}</h3></div>
    `;

    const artistPart = document.createElement('div');
    artistPart.classList.add('artist-part');
    artistPart.innerHTML = `<h2 class="artist-part__title section-title">Artist</h2>
    <a class="artist-part__item" target="_blank" href="${receivedSong.album.artist.url}">
     <img class="artist-part__item-img" src="${receivedSong.album.artist.image_url}"/>
     <h3 class="artist-part__item-name">${receivedSong.album.artist.name}</h3>
     </a>`;

    albumPart.append(albumTitle);
    albumPart.appendChild(albumItem);

    album.appendChild(albumPart);
    album.appendChild(artistPart);

    middlePart.appendChild(album);
  }

  const artistsWrapper = document.createElement('div');
  artistsWrapper.classList.add('artists-wrapper');

  const producerArtists = createArtistSection(
    'Producer Artists',
    receivedSong.producer_artists
  );
  const writerArtists = createArtistSection(
    'Writer Artists',
    receivedSong.writer_artists
  );

  producerArtists.classList.add('producer-artists');
  writerArtists.classList.add('writer-artists');

  artistsWrapper.appendChild(producerArtists);
  artistsWrapper.appendChild(writerArtists);

  workingArea.appendChild(title);
  workingArea.appendChild(artistNames);
  workingArea.appendChild(topPart);
  workingArea.appendChild(songInfoWrapper);

  if (mediaLinks) {
    workingArea.appendChild(mediaLinks);
  }

  if (middlePart) {
    workingArea.appendChild(middlePart);
  }

  workingArea.appendChild(artistsWrapper);
};
