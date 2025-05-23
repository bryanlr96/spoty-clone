import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes/routes.js';
import { PORT } from './config/index.js';

const app = express();

// Middlewares para parsear JSON y cookies
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // importante para que se envíen las cookies
}));

// Añadimos las rutas desde el fichero routes.js
app.use(routes)

app.listen(PORT, () => {
  console.log(`Servidor arrancado en http://localhost:${PORT}`);
});