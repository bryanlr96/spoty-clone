import Footer from "../components/Footer";
import HeaderPrelogin from "../components/HeaderPrelogin";
import { useState, useEffect } from "react";


export default function LoginPage() {

    const handleLogin = () => {
        window.location.href = "/api/login";
    }

    const slogans = [
        "More than listening — understanding what moves you.",
        "Music that adapts to your heartbeat.",
        "Every song tells your story.",
        "Find your rhythm, find yourself.",
        "Let SoundStream read between the lyrics."
    ];

    const [currentSlogan, setCurrentSlogan] = useState(0);
    const [fade, setFade] = useState(true)

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false)
            setTimeout(() => {
                setFade(true)
                setCurrentSlogan((prev) => (prev + 1) % slogans.length);
            }, 500)
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-black">
            <HeaderPrelogin />

            <main className="relative flex flex-1 w-full overflow-hidden">
                <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
                    <source src="./banner.mp4" type="video/mp4" />
                </video>

                <div className="relative z-10 flex flex-col items-center justify-center w-full bg-black/80 px-6 text-center text-white gap-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
                        Your music, your way
                    </h1>
                    <p className={`text-xl md:text-4xl font-bold text-gray-300 transition-opacity duration-500 ${fade ? 'opacity-100': 'opacity-0'}`}>
                        {slogans[currentSlogan]}
                    </p>
                    <button
                        onClick={handleLogin}
                        className="bg-[#38E07A] hover:bg-[#2fcf6e] text-black font-bold text-lg px-8 py-3 rounded-full transition-all shadow-xl cursor-pointer"
                    >
                        Login with SoundStream
                    </button>
                </div>
            </main>

            <Footer />
        </div>
    );
}
