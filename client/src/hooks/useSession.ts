import { useState, useEffect, useCallback } from 'react';
import { checkSession } from '../utils/auth';


export function useSession() {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const verifySession = useCallback(async () => {
        setLoading(true);
        const isAuth = await checkSession();
        setAuthenticated(isAuth);
        setLoading(false);
    }, []);

    useEffect(() => {
        verifySession();
    }, [verifySession]);

    return { authenticated, loading, verifySession };
}
