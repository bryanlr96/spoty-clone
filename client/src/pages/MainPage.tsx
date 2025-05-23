import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../hooks/useSession';

export default function MainPage() {
    const { authenticated, loading } = useSession();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !authenticated) {
            navigate('/login');
        }
    }, [authenticated, loading, navigate]);

    const handleLogout = async () => {
        await fetch('/api/logout', {
            method: 'GET',
            credentials: 'include',
        });
        window.location.href = '/login';
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Cargando...</p>
            </div>
        );
    }

    if (!authenticated) {
        return null; // o un fallback, aunque con el redirect nunca debería verse esto
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">¡Sesión iniciada!</h1>
            <p>Has accedido correctamente con Spotify.</p>
            <button
                onClick={handleLogout}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
                Cerrar sesión
            </button>
        </div>
    );
}
