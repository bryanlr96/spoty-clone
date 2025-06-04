import axios from 'axios'

const BASE_URL = 'https://api.spotify.com/v1'

async function fetchFromSpotify(endpoint, token) {
  const response = await axios.get(`${BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.data
}

async function fetchItunesPreviewUrl(title, artist) {
  const query = encodeURIComponent(`${title} ${artist}`)
  const response = await fetch(`https://itunes.apple.com/search?term=${query}&entity=song&limit=1`)
  const data = await response.json()

  if (data.resultCount > 0 && data.results[0].previewUrl) {
    return data.results[0].previewUrl
  }

  return null
}

export default {
  async getUserInfo(token) {
    return await fetchFromSpotify('/me', token)
  },

  async getLikedSongs(token) {
    const data = await fetchFromSpotify('/me/tracks?limit=20', token)
    return data.items.map(item => ({
      id: item.track.id,
      title: item.track.name,
      artist: item.track.artists.map(a => a.name).join(', '),
      album: item.track.album.name,
      image: item.track.album.images[0]?.url
    }))
  },

  async getUserPlaylists(token) {
    const data = await fetchFromSpotify('/me/playlists?limit=10', token)
    return data.items.map(playlist => ({
      id: playlist.id,
      name: playlist.name,
      totalTracks: playlist.tracks.total,
      image: playlist.images[0]?.url
    }))
  },

  async getRecentlyPlayed(token) {
    const data = await fetchFromSpotify('/me/player/recently-played?limit=10', token);
    return Promise.all(
      data.items.map(async (item) => {
        const spotifyPreview = item.track.preview_url;
        if (spotifyPreview) {
          return {
            id: item.track.id,
            title: item.track.name,
            artist: item.track.artists.map(a => a.name).join(', '),
            album: item.track.album.name,
            image: item.track.album.images[0]?.url,
            playedAt: item.played_at,
            previewUrl: spotifyPreview,
          };
        } else {
          // Si no hay preview en Spotify, buscar en iTunes
          const artist = item.track.artists.map(a => a.name).join(', ');
          const title = item.track.name;
          const itunesPreview = await fetchItunesPreviewUrl(artist, title);
          return {
            id: item.track.id,
            title: item.track.name,
            artist,
            album: item.track.album.name,
            image: item.track.album.images[0]?.url,
            playedAt: item.played_at,
            previewUrl: itunesPreview,
          };
        }
      })
    );
  },

}
