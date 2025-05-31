
export default function HeaderPrelogin() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  }
  return (
    <header className="w-scren h-[10dvh] text-white border-b-[#E8E8E8] border-b-1">
      <div className="flex w-[90%] h-full mx-auto justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="./SoundStreamLogo.svg" alt="Logo de la app" width={40} />
          <h2 className="text-3xl font-bold">SoundStream</h2>
        </div>
        <button className="bg-[#38E07A] py-2 px-5 rounded-2xl font-bold text-black cursor-pointer"
          onClick={handleLogin}
        >
          Sing in
        </button>
      </div>
    </header>
  )
}
