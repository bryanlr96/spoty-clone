import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import routes from './routes/routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares para parsear JSON y cookies
app.use(express.json());
app.use(cookieParser());

// Añadimos las rutas desde el fichero routes.js
app.use(routes)

app.listen(PORT, () => {
  console.log(`Servidor arrancado en http://localhost:${PORT}`);
});