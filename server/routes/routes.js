import express from 'express';
// import { spotifyLogin, spotifyCallback } from './controllers/loginController.js';

const router = express.Router();

router.get('/login', (req, res) => {
  console.log('login route hit');
  res.send('Login route works');
});

router.get('/callback', (req, res) => {
  console.log('callback route hit');
  res.send('Callback route works');
});


export default router;