import { useState, useEffect, type MutableRefObject } from "react"
import { FaPlay, FaPause, FaBackward, FaForward, FaRandom, FaRedo } from "react-icons/fa"


export interface ReproductorProps {
  audioRef: MutableRefObject<HTMLAudioElement | null>
  isPlaying: boolean
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Reproductor({ audioRef, isPlaying, setIsPlaying }:ReproductorProps) {
  const [progress, setProgress] = useState(0)

  // Actualiza el progreso mientras el audio se reproduce
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => {
      const percent = (audio.currentTime / audio.duration) * 100
      setProgress(percent || 0)
    }

    audio.addEventListener("timeupdate", updateProgress)
    return () => {
      audio.removeEventListener("timeupdate", updateProgress)
    }
  }, [audioRef])

  const togglePlayback = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    const audio = audioRef.current
    if (!audio) return

    const newTime = (value / 100) * audio.duration
    audio.currentTime = newTime
    setProgress(value)
  }

  return (
    <>
      <div className="w-[80%] flex items-center justify-center text-white gap-7">
        <button className="cursor-pointer">
          <FaBackward />
        </button>

        <button
          className="p-5 rounded-full bg-[#38E07A] cursor-pointer"
          onClick={togglePlayback}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        <button className="cursor-pointer">
          <FaForward />
        </button>
      </div>

      <div className="w-[80%] flex items-center justify-center gap-5 text-xl">
        <button className="cursor-pointer">
          <FaRandom />
        </button>

        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#38E07A]"
        />

        <button className="cursor-pointer">
          <FaRedo />
        </button>
      </div>
    </>
  )
}
