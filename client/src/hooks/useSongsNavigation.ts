import { useAuthContext } from "../hooks/useAuthContext"

export function useSongNavigation() {
    const { currentPlaylist, currentSong, setCurrentSong } = useAuthContext()

    const playNext = () => {
        if (!currentSong || currentPlaylist.length === 0) return

        const index = currentPlaylist.findIndex(song => song.id === currentSong.id)
        const nextIndex = (index + 1) % currentPlaylist.length

        setCurrentSong(currentPlaylist[nextIndex])
    }

    const playPrevious = () => {
        if (!currentSong || currentPlaylist.length === 0) return

        const index = currentPlaylist.findIndex(song => song.id === currentSong.id)
        const previousIndex =
            (index - 1 + currentPlaylist.length) % currentPlaylist.length

        setCurrentSong(currentPlaylist[previousIndex])
    }

    return { playNext, playPrevious }
}
