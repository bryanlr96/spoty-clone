import querystring from 'querystring';
import { SPOTIFYCLIENTID, SPOTIFYCLIENTSECRET, SPOTIFYREDIRECTURI } from '../config/index.js';
import axios from 'axios';
import SpotifyService from '../services/SpotifyService.js';

class AuthController {

  static login(req, res) {
    const scope = [
      'user-read-private',
      'user-read-email',
      'user-read-recently-played',
      'user-library-read',
      'playlist-read-private',
      'playlist-read-collaborative',
      'user-read-playback-state',
    ].join(' ');

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

      //guardamos la cookie
      res.cookie('access_token', access_token, {
        httpOnly: true,
        secure: false, // ¡NO pongas esto en true mientras uses HTTP!
        sameSite: 'lax', // O 'strict'
        maxAge: expires_in * 1000,
        path: '/'
      });

      //redireccion al main
      res.redirect(process.env.FRONTEND_URL);

    } catch (error) {
      console.error('Error al intercambiar el código por tokens:', error.response?.data || error.message);
      res.status(500).send('Error al obtener el token de acceso.');
    }
  }

  static async checkSession(req, res) {
    const token = req.cookies.access_token

    if (!token) {
      return res.status(200).json({ authenticated: false })
    }

    try {
      const [user, playlists, likedSongs, recentlyPlayed] = await Promise.all([
        SpotifyService.getUserInfo(token),
        SpotifyService.getUserPlaylists(token),
        SpotifyService.getLikedSongs(token),
        SpotifyService.getRecentlyPlayed(token),
      ])

      return res.status(200).json({
        authenticated: true,
        access_token: token,
        expires_at: null, // Si quieres añadir el vencimiento, tendrás que guardarlo tú cuando lo recibes
        user: {
          id: user.id,
          name: user.display_name,
          email: user.email,
          image: user.images[0]?.url || null
        },
        playlists,
        likedSongs,
        recentlyPlayed,
      })
    } catch (error) {
      console.error('Error al verificar sesión:', error.response?.data || error.message)
      return res.status(500).json({ authenticated: false, error: 'Error al obtener los datos del usuario' })
    }

  }
}

export default AuthController;
