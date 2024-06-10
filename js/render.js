export const renderSong = (data) => {
  const receivedSong = data.response.song;
  const container = document.querySelector('#container');
  console.log('data', receivedSong);
  // container.innerHTML = JSON.stringify(data.response.song);

  const title = document.createElement('h1');
  title.innerText = receivedSong.full_title;

  const embeddedContent = document.createElement('div');
  embeddedContent.innerHTML = receivedSong.embed_content;

  const artistNames = document.createElement('p');
  artistNames.innerText = receivedSong.artist_names;

  const songImage = document.createElement('img');
  songImage.src = receivedSong.header_image_url;

  const primaryArtist = document.createElement('div');

  const primaryArtistImage = document.createElement('img');
  primaryArtistImage.src = receivedSong.primary_artist.header_image_url;
  const primaryArtistName = document.createElement('h5');
  primaryArtistName.innerText = receivedSong.primary_artist.name;

  // change to artists if there are multiple
  primaryArtist.append(primaryArtistImage, primaryArtistName);

  container.appendChild(title);
  container.appendChild(embeddedContent);
  container.appendChild(artistNames);
  container.appendChild(songImage);
  container.appendChild(primaryArtist);

  const target = container.querySelector('.rg_embed_link a');
  if (target) {
    target.setAttribute('target', '_blank');
  }
};
