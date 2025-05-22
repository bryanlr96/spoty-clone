import dotenv from 'dotenv';

dotenv.config();

export const config = {
  spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
  spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  spotifyRedirectUri: process.env.SPOTIFY_REDIRECT_URI,
  frontendUrl: process.env.FRONTEND_URL,
  port: process.env.PORT || 5000,
};
