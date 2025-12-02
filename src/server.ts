import 'dotenv/config';
import { createApp } from './infrastructure/http/app.js';
import { KeepAliveService } from './infrastructure/services/KeepAliveService.js';

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

const app = createApp();

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on ${BASE_URL}`);
  
  if (process.env.NODE_ENV === 'production' && process.env.ENABLE_KEEP_ALIVE === 'true') {
    const keepAliveService = new KeepAliveService(BASE_URL);
    keepAliveService.start();
  }
});

process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
