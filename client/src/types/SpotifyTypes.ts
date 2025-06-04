type User = {
    id: string
    name: string
    email: string
    image: string | null
}

type Playlist = {
    id: string
    name: string
    description: string
    images: { url: string }[]
    tracks: { total: number }
}

export type Track = {
    id: string
    title: string
    artist: string
    album: {
        name: string
        images: { url: string }[]
    }
    duration_ms: number
    image: string
    previewUrl: string
}

export type AuthData = {
    authenticated: boolean
    access_token: string
    expires_at: number | null
    user: User
    playlists: Playlist[]
    likedSongs: Track[]
    recentlyPlayed: Track[]
}