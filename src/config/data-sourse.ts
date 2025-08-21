import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';

// más adelante vamos a ir agregando entidades acá
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [],
  synchronize: true, // ⚠️ SOLO en desarrollo, en producción usamos migraciones
  logging: false,
});