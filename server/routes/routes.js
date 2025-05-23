import express from 'express';
import AuthController from '../controllers/AutgController.js';

const router = express.Router();

router.get('/login', AuthController.login);

router.get('/callback', AuthController.callback);

router.get('/check-session', AuthController.checkSession);


export default router;