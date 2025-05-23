import querystring from 'querystring';
import { SPOTIFYCLIENTID, SPOTIFYCLIENTSECRET, SPOTIFYREDIRECTURI } from '../config/index.js';
import axios from 'axios';

class AuthController {

  static login(req, res) {
    const scope = 'user-read-private user-read-email';

    const queryParams = querystring.stringify({
      response_type: 'code',
      client_id: SPOTIFYCLIENTID,
      scope,
      redirect_uri: SPOTIFYREDIRECTURI,
      show_dialog: true
    });

    const authURL = `https://accounts.spotify.com/authorize?${queryParams}`;
    res.redirect(authURL);
  }

  static async callback(req, res) {
    const code = req.query.code || null

    if (!code) return res.status(400).send('No se recibió ningún código de autorización.')

    try {
      const response = await axios.post(
        //ruta donde hacemos la petición
        'https://accounts.spotify.com/api/token',
        //petición
        querystring.stringify({
          grant_type: 'authorization_code',
          code,
          redirect_uri: SPOTIFYREDIRECTURI,
        }),
        //cabeceras
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + Buffer.from(`${SPOTIFYCLIENTID}:${SPOTIFYCLIENTSECRET}`).toString('base64')
          }
        }
      )

      const { access_token, refresh_token, expires_in } = response.data;
      console.log('antes de guardar la cookie')
      //guardamos la cookie
      res.cookie('access_token', access_token, {
        httpOnly: true,
        secure: false,
        maxAge: expires_in * 1000,
        sameSite: 'lax',
        path: '/',
      });
      console.log('cookie guardada')

      //redireccion al main
      return res.json(process.env.FRONTEND_URL);

    } catch (error) {
      console.error('Error al intercambiar el código por tokens:', error.response?.data || error.message);
      res.status(500).send('Error al obtener el token de acceso.');
    }
  }

  static async checkSession(req, res) {
    const token = req.cookies?.access_token;

    if (!token) {
      return res.status(200).json({ authenticated: false });
    }

    try {
      await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return res.status(200).json({ authenticated: true });

    } catch (error) {
      if (error.response && error.response.status === 401) {
        return res.status(200).json({ authenticated: false });
      }

      console.error('Error verificando token Spotify:', error.message);
      return res.status(500).json({ authenticated: false, error: 'Error interno' });
    }
  }
}

export default AuthController;
