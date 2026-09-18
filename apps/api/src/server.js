import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { config } from './config/index.js';
import { dbService } from './services/db.service.js';
import apiRouter from './routes/api.routes.js';

import { getSitemapXml, getRobotsTxt } from './controllers/seo.controller.js';

const app = express();

// Security & Middlewares
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(morgan('dev'));

// Programmatic SEO Crawl Endpoints
app.get('/sitemap.xml', getSitemapXml);
app.get('/robots.txt', getRobotsTxt);

// API Routes
app.use('/api/v1', apiRouter);

// Healthcheck Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    platform: 'PhonoWorld Consumer-Tech Engine',
    version: '1.0.0-PROD',
    timestamp: new Date().toISOString()
  });
});

// Start Server & Database
const startServer = async () => {
  // Initialize in-memory seed catalog
  await dbService.init();

  // Try optional MongoDB connection in background
  try {
    if (config.mongoUri) {
      await mongoose.connect(config.mongoUri, { serverSelectionTimeoutMS: 2000 });
      console.log('[PhonoWorld DB] Connected to MongoDB Atlas cluster.');
    }
  } catch (err) {
    console.log('[PhonoWorld DB] MongoDB offline/standby — using high-performance in-memory repository layer.');
  }

  app.listen(config.port, () => {
    console.log(`=======================================================`);
    console.log(`🚀 PhonoWorld API Server running on port ${config.port}`);
    console.log(`🔗 API Base: http://localhost:${config.port}/api/v1`);
    console.log(`⚡ Health Check: http://localhost:${config.port}/api/health`);
    console.log(`=======================================================`);
  });
};

startServer();
