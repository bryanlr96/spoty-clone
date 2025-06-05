

export default function Footer() {
  return (
    <footer className="w-scren h-[10dvh] text-white border-t-[#E8E8E8]/40 border-t-1">
        <div className="flex w-[90%] h-full mx-auto justify-between items-center">
        <div className="flex items-center gap-4">
            <a href="#" className="hover:underline hover:text-amber-600">Contact</a>
            -
            <a href="#" className="hover:underline hover:text-amber-600">About Us</a>
            -
            <a href="#" className="hover:underline hover:text-amber-600">Privacity Policy</a>
        </div>
        <p>©2025 - SoundStream</p>
        </div>
    </footer>
  )
}
