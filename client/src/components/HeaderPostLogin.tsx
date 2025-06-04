import { HiOutlineSearch } from "react-icons/hi";
import { useAuthContext } from "../hooks/useAuthContext";
import { HiChevronDown } from "react-icons/hi";

export default function HeaderPostLogin() {
    const { authData } = useAuthContext()


    return (
        <header className="w-scren h-[10dvh] text-white border-b-[#E8E8E8]/40 border-b-1">
            <div className="flex w-[90%] h-full mx-auto justify-between items-center">
                <div className="flex items-center gap-3">
                    <img src="./SoundStreamLogo.svg" alt="Logo de la app" width={40} />
                    <h2 className="text-3xl font-bold">SoundStream</h2>
                </div>

                <form className=" flex items-center bg-white border-1  border-[#E8E8E8] rounded-2xl px-4 py-2 w-1/3"> 
                    <input type="text" name="search" id="search" placeholder="Search" className="text-black flex-1 border-none focus:outline-none focus:ring-0"/>
                    <button>
                        <HiOutlineSearch className="text-black"/>
                    </button>
                </form>

                <button
                    className="text-white flex items-center font-bold"
                //   onClick={}
                >
                    {authData?.user.image && (
                        <img
                            src={authData.user.image}
                            alt="profile image"
                            className="w-10 h-10 rounded-full object-cover mr-2"
                        />
                    )}
                    Profile
                    <HiChevronDown size={20}/>
                </button>
            </div>
        </header>
    )
}
