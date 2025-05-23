import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../hooks/useSession';

export default function LoginPage() {
    const { authenticated, loading } = useSession();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && authenticated) {
            navigate('/');
        }
    }, [authenticated, loading, navigate]);

    const handleLogin = () => {
        window.location.href = '/api/login'; // Ruta del backend para login con Spotify
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Cargando...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Bienvenido a SpotyClone</h1>
            <button
                onClick={handleLogin}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
                Iniciar sesión con Spotify
            </button>
        </div>
    )
}
