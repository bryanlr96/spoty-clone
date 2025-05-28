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
  origin: 'http://127.0.0.1:5713',
  credentials: true
}));

// Añadimos las rutas desde el fichero routes.js
app.use(routes)

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Servidor arrancado en http://127.0.0.1:${PORT}`);
});