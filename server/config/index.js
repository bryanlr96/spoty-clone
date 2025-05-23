import dotenv from 'dotenv';

dotenv.config();

export const SPOTIFYCLIENTID = process.env.SPOTIFY_CLIENT_ID;
export const SPOTIFYCLIENTSECRET = process.env.SPOTIFY_CLIENT_SECRET
export const SPOTIFYREDIRECTURI = process.env.SPOTIFY_REDIRECT_URI
export const FRONTENDURL = process.env.FRONTEND_URL
export const PORT = process.env.PORT || 5000
