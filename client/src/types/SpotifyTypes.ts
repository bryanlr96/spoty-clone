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

type Track = {
    id: string
    name: string
    artists: { name: string }[]
    album: {
        name: string
        images: { url: string }[]
    }
    duration_ms: number
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