

export default function MainPage() {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">¡Sesión iniciada!</h1>
            <p>Has accedido correctamente con Spotify.</p>
            <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
                Cerrar sesión
            </button>
        </div>
    );
}
