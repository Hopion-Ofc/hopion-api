import express from 'express';
import cors from 'cors';
import { emailRoutes } from '../../presentation/routes/emailRoutes.js';
import { errorHandler } from '../../presentation/middlewares/errorHandler.js';

export const createApp = () => {
  const app = express();

  app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  }));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.use('/api', emailRoutes);

  app.use(errorHandler);

  return app;
};
