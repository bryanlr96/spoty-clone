import Footer from "../components/Footer";
import HeaderPostLogin from "../components/HeaderPostLogin";
import Media from "../components/Media";


export default function MainPage() {

    return (
        <div className="flex flex-col min-h-screen bg-black">
            <HeaderPostLogin/>
            <main className="relative flex flex-1 w-[80%] mx-auto overflow-hidden">
                <Media/>
            </main>
            <Footer/>
        </div>
    );
}
