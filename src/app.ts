import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';
import { AppDataSource } from './config/data-sourse';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Ruta de prueba
app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

// Función para arrancar
async function start() {
  try {
    await AppDataSource.initialize();
    console.log('📦 Conectado a la base de datos');

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
    });
  } catch (err) {
    console.error('❌ Error al iniciar la app:', err);
  }
}

// Si este archivo se ejecuta directamente → arrancamos
if (require.main === module) {
  start();
}

export default app;