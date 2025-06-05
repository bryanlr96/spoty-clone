import type { Track } from "../types/SpotifyTypes"

export function removeDuplicatesById(songs: Track[]): Track[] {
  const seen = new Set<string>()
  return songs.filter(song => {
    if (seen.has(song.id)) return false
    seen.add(song.id)
    return true
  })
}