type SessionResponse = {
  authenticated: boolean;
}

export async function checkSession(): Promise<boolean> {
  try {
    const response = await fetch('/api/check-session', {
      credentials: 'include',
    });
    if (!response.ok) return false;
    const data: SessionResponse = await response.json();
    return data.authenticated;
  } catch (error) {
    console.error('Error comprobando sesión:', error);
    return false;
  }
}
