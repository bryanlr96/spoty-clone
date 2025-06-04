import { useRef, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import Reproductor from "./Reproductor"

export default function Media() {
  const { currentSong } = useAuthContext()
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  return (
    <section className="w-full flex flex-col sm:flex-row gap-10 mt-10">
      <div className="relative w-[60%] h-[500px] overflow-hidden rounded-2xl">
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-white text-4xl font-bold gap-5">
          <img src={currentSong?.image} alt="portada de la cancion" className="w-1/4 rounded-2xl" />
          <h2>{currentSong?.title}</h2>

          <audio
            ref={audioRef}
            src={currentSong?.previewUrl}
            className="w-full max-w-md"
          />

          <Reproductor
            audioRef={audioRef}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        </div>
      </div>
      <div className="flex-1 bg-white h-[500px] rounded-3xl"></div>
    </section>
  )
}
