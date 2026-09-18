import { cacheService } from '../services/cache.service.js';

/**
 * Express Middleware for high-performance HTTP Route Caching.
 * @param {number} ttlSeconds - Cache TTL in seconds (default 600 / 10 minutes)
 * @param {string} keyPrefix - Key prefix (default 'catalog')
 */
export const cacheMiddleware = (ttlSeconds = 600, keyPrefix = 'catalog') => {
  return async (req, res, next) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    // Allow cache bypass via query flag
    if (req.query.nocache === 'true') {
      res.setHeader('X-Cache', 'BYPASS');
      return next();
    }

    // Build deterministic cache key
    const sortedQueryParams = Object.keys(req.query)
      .filter(k => k !== 'nocache')
      .sort()
      .map(k => `${k}=${req.query[k]}`)
      .join('&');

    const cacheKey = `${keyPrefix}:${req.baseUrl || ''}${req.path}${sortedQueryParams ? `?${sortedQueryParams}` : ''}`;

    try {
      const cachedData = await cacheService.get(cacheKey);

      if (cachedData) {
        res.setHeader('X-Cache', 'HIT');
        res.setHeader('X-Cache-Key', cacheKey);
        res.setHeader('X-Cache-TTL', `${ttlSeconds}s`);
        return res.json(cachedData);
      }

      // Cache Miss: intercept res.json to capture response
      res.setHeader('X-Cache', 'MISS');
      res.setHeader('X-Cache-Key', cacheKey);

      const originalJson = res.json.bind(res);

      res.json = (body) => {
        // Only cache successful 200 responses
        if (res.statusCode >= 200 && res.statusCode < 300) {
          cacheService.set(cacheKey, body, ttlSeconds).catch(() => {});
        }
        return originalJson(body);
      };

      next();
    } catch (err) {
      // In case of any cache error, fail open
      next();
    }
  };
};
