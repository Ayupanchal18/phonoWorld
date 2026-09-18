import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { config } from './config/index.js';
import { dbService } from './services/db.service.js';
import apiRouter from './routes/api.routes.js';
import { getSitemapXml, getRobotsTxt } from './controllers/seo.controller.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const webDistPath = path.resolve(__dirname, '../../../apps/web/dist');

const app = express();

// Security & Middlewares
app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(morgan('combined'));

// Programmatic SEO Crawl Endpoints
app.get('/sitemap.xml', getSitemapXml);
app.get('/robots.txt', getRobotsTxt);

// Healthcheck Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    platform: 'PhonoWorld Consumer-Tech Engine',
    version: '1.0.0-PROD',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/v1', apiRouter);

// Serve Static Frontend SPA on Render / Production
if (fs.existsSync(webDistPath)) {
  console.log(`[PhonoWorld Web] Serving static production bundle from: ${webDistPath}`);
  app.use(express.static(webDistPath));

  // SPA Fallback for client-side routing (React Router / dynamic views)
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/') || req.path.startsWith('/sitemap.xml') || req.path.startsWith('/robots.txt')) {
      return next();
    }
    res.sendFile(path.join(webDistPath, 'index.html'));
  });
}

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

  app.listen(config.port, '0.0.0.0', () => {
    console.log(`=======================================================`);
    console.log(`🚀 PhonoWorld Server running on port ${config.port}`);
    console.log(`🔗 API Base: http://localhost:${config.port}/api/v1`);
    console.log(`⚡ Health Check: http://localhost:${config.port}/api/health`);
    console.log(`🌐 Web UI: http://localhost:${config.port}/`);
    console.log(`=======================================================`);
  });
};

startServer();

