import express from 'express';
import AuthController from '../controllers/AuthController.js';

const router = express.Router();

router.get('/login', AuthController.login);

router.get('/callback', AuthController.callback);

router.get('/auth', AuthController.checkSession)


export default router;