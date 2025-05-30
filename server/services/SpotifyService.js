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
    const data = await fetchFromSpotify('/me/player/recently-played?limit=10', token)
    return data.items.map(item => ({
      id: item.track.id,
      title: item.track.name,
      artist: item.track.artists.map(a => a.name).join(', '),
      album: item.track.album.name,
      image: item.track.album.images[0]?.url,
      playedAt: item.played_at
    }))
  }
}
