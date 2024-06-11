export const renderSong = (data) => {
  const receivedSong = data.response.song;
  const container = document.querySelector('#container');
  console.log('data', receivedSong);
  // container.innerHTML = JSON.stringify(data.response.song);

  const title = document.createElement('h1');
  title.innerText = receivedSong.full_title;

  const artistNames = document.createElement('p');
  artistNames.innerText = receivedSong.artist_names;

  const songImage = document.createElement('img');
  songImage.src = receivedSong.header_image_url;

  const primaryArtists = document.createElement('div');

  const primaryArtistsTitle = document.createElement('h2');
  primaryArtistsTitle.textContent = 'Primary Artists';
  primaryArtists.append(primaryArtistsTitle);

  for (const primaryArtist of receivedSong.primary_artists) {
    const primaryArtistDiv = document.createElement('div');
    const primaryArtistImage = document.createElement('img');
    primaryArtistImage.src = primaryArtist.header_image_url;
    const primaryArtistName = document.createElement('h3');
    primaryArtistName.innerText = primaryArtist.name;
    primaryArtistDiv.append(primaryArtistImage, primaryArtistName);
    primaryArtists.appendChild(primaryArtistDiv);
  }

  let featuredArtists;
  if (receivedSong.featured_artists) {
    featuredArtists = document.createElement('div');

    const featuredArtistsTitle = document.createElement('h2');
    featuredArtistsTitle.textContent = 'Featured Artists';
    featuredArtists.append(featuredArtistsTitle);

    for (const featuredArtist of receivedSong.featured_artists) {
      const featuredArtistDiv = document.createElement('div');
      const featuredArtistImage = document.createElement('img');
      featuredArtistImage.src = featuredArtist.header_image_url;
      const featuredArtistName = document.createElement('h3');
      featuredArtistName.innerText = featuredArtist.name;
      featuredArtistDiv.append(featuredArtistImage, featuredArtistName);
      featuredArtists.appendChild(featuredArtistDiv);
    }
  }

  const language = document.createElement('p');
  language.innerText = 'Language: ' + receivedSong.language;

  let album;
  if (receivedSong.album) {
    album = document.createElement('div');

    const albumTitle = document.createElement('h2');
    albumTitle.textContent = 'Album';
    album.append(albumTitle);

    const albumItem = document.createElement('a');
    albumItem.setAttribute('target', '_blank');
    albumItem.href = 'https://genius.com/albums/Sanah/Uczta';
    albumItem.innerHTML = `<img src="${receivedSong.album.cover_art_url}"/>
  <h3>${receivedSong.album.name}</h3>
  <div>
  <h4>Artist</h4>
  <img src="${receivedSong.album.artist.image_url}"/>
  <p>${receivedSong.album.artist.name}</p>
  </div>
  `;

    album.appendChild(albumItem);
  }

  let mediaLinks;

  if (receivedSong.media) {
    mediaLinks = document.createElement('div');
    const mediaLinksTitle = document.createElement('h2');
    mediaLinksTitle.textContent = 'Media';
    mediaLinks.append(mediaLinksTitle);
    for (let i = 0; i < receivedSong.media.length; i++) {
      const link = document.createElement('a');
      link.href = receivedSong.media[i].url;
      link.setAttribute('target', '_blank');
      link.innerText = 'Link ' + (i + 1);

      mediaLinks.appendChild(link);
    }
  }

  const producerArtists = document.createElement('div');

  const producerArtistsTitle = document.createElement('h2');
  producerArtistsTitle.textContent = 'Producer Artists';
  producerArtists.append(producerArtistsTitle);
  for (const producer of receivedSong.producer_artists) {
    const producerItem = document.createElement('a');
    producerItem.href = producer.url;
    producerItem.setAttribute('target', '_blank');
    producerItem.innerHTML = `<img src="${producer.image_url}"/>
  <h3>${producer.name}</h3>
  <div>`;
    producerArtists.appendChild(producerItem);
  }

  let releaseDate;
  if (receivedSong.release_date_for_display) {
    releaseDate = document.createElement('div');
    releaseDate.innerHTML =
      '<span>Release date:</span> ' + receivedSong.release_date_for_display;
  }

  const writerArtists = document.createElement('div');

  const writerArtistsTitle = document.createElement('h2');
  writerArtistsTitle.textContent = 'Writer Artists';
  writerArtists.append(writerArtistsTitle);
  for (const writer of receivedSong.writer_artists) {
    const writerItem = document.createElement('a');
    writerItem.href = writer.url;
    writerItem.setAttribute('target', '_blank');
    writerItem.innerHTML = `<img src="${writer.image_url}"/>
  <h3>${writer.name}</h3>
  <div>`;
    writerArtists.appendChild(writerItem);
  }

  container.appendChild(title);
  container.appendChild(artistNames);
  container.appendChild(songImage);
  container.appendChild(primaryArtists);
  container.appendChild(featuredArtists);
  container.appendChild(language);

  if (album) {
    container.appendChild(album);
  }

  if (mediaLinks) {
    container.appendChild(mediaLinks);
  }

  container.appendChild(producerArtists);

  if (releaseDate) {
    container.appendChild(releaseDate);
  }

  container.appendChild(writerArtists);
};
