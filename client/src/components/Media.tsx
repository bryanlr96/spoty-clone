import { useRef, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import Reproductor from "./Reproductor"
import SortableSongList from "./SortableSongList"

export default function Media() {
  const { currentSong, currentPlaylist } = useAuthContext()
  const [isPlaying, setIsPlaying] = useState(false)
  const [loop, setLoop]= useState(false)
  const audioRef = useRef(null)

  return (
    <section className="w-full flex flex-col sm:flex-row gap-10 mt-10">
      <div className="relative w-[70%] h-[500px] overflow-hidden rounded-2xl">
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-white text-4xl font-bold gap-5 bg-white/10">
          <img src={currentSong?.image} alt="portada de la cancion" className="w-1/4 rounded-2xl" />
          <h2>{currentSong?.title}</h2>

          <audio
            ref={audioRef}
            src={currentSong?.previewUrl}
            loop={loop}
          />

          <Reproductor
            audioRef={audioRef}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            loop={loop}
            setLoop={setLoop}
          />
        </div>
      </div>
      <div className="flex-1 h-[500px] rounded-3xl flex flex-col text-white">
        <h2 className="text-3xl font-bold">Next Songs</h2>
        {currentPlaylist.length > 0 ? <SortableSongList/> : <><span>No songs in the queue</span>Add some or use a playlist<span></span></>}
      </div>
    </section>
  )
}
