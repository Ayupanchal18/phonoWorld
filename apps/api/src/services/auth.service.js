import crypto from 'crypto';
import { dbService } from './db.service.js';

class AuthService {
  constructor() {
    this.users = new Map();
    this.alerts = new Map();
    this.sessions = new Map();

    // Create a regular user for testing
    const demoPasswordHash = this.hashPassword('demo1234');
    const demoUser = {
      _id: 'user_demo_001',
      name: 'Aayush Tech',
      email: 'aayush@phonoworld.in',
      passwordHash: demoPasswordHash,
      role: 'user',
      wishlist: [],
      createdAt: new Date().toISOString()
    };
    this.users.set(demoUser._id, demoUser);
    this.users.set(demoUser.email, demoUser);

    // Create an Admin user for CMS testing
    const adminPasswordHash = this.hashPassword('admin1234');
    const adminUser = {
      _id: 'user_admin_001',
      name: 'PhonoWorld Admin',
      email: 'admin@phonoworld.in',
      passwordHash: adminPasswordHash,
      role: 'admin',
      wishlist: [],
      createdAt: new Date().toISOString()
    };
    this.users.set(adminUser._id, adminUser);
    this.users.set(adminUser.email, adminUser);
  }

  hashPassword(password) {
    return crypto.createHash('sha256').update(password + 'phonoworld_salt_2026').digest('hex');
  }

  generateToken(user) {
    const payload = JSON.stringify({ id: user._id, email: user.email, role: user.role, time: Date.now() });
    const token = Buffer.from(payload).toString('base64url');
    this.sessions.set(token, user._id);
    return token;
  }

  verifyToken(token) {
    if (!token) return null;
    const userId = this.sessions.get(token);
    if (!userId) {
      // Decode fallback
      try {
        const decoded = JSON.parse(Buffer.from(token, 'base64url').toString('utf-8'));
        return this.users.get(decoded.id) || null;
      } catch (e) {
        return null;
      }
    }
    return this.users.get(userId) || null;
  }

  register(name, email, password) {
    const cleanEmail = email.toLowerCase().trim();
    if (this.users.has(cleanEmail)) {
      throw new Error('An account with this email already exists.');
    }

    const newUser = {
      _id: `user_${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      passwordHash: this.hashPassword(password),
      role: 'user',
      wishlist: [],
      createdAt: new Date().toISOString()
    };

    this.users.set(newUser._id, newUser);
    this.users.set(newUser.email, newUser);

    const token = this.generateToken(newUser);
    return { user: this.sanitizeUser(newUser), token };
  }

  login(email, password) {
    const cleanEmail = email.toLowerCase().trim();
    const user = this.users.get(cleanEmail);
    if (!user) {
      throw new Error('Invalid email or password.');
    }

    const hash = this.hashPassword(password);
    if (user.passwordHash !== hash) {
      throw new Error('Invalid email or password.');
    }

    const token = this.generateToken(user);
    return { user: this.sanitizeUser(user), token };
  }

  sanitizeUser(user) {
    const { passwordHash, ...safe } = user;
    return safe;
  }

  toggleWishlist(userId, productId) {
    const user = this.users.get(userId);
    if (!user) throw new Error('User not found.');

    const exists = user.wishlist.includes(productId);
    if (exists) {
      user.wishlist = user.wishlist.filter(id => id !== productId);
    } else {
      user.wishlist.push(productId);
    }

    return {
      wishlist: user.wishlist,
      isWishlisted: !exists
    };
  }

  getWishlistProducts(userId) {
    const user = this.users.get(userId);
    if (!user) return [];

    const products = [];
    user.wishlist.forEach(prodId => {
      const prod = dbService.products.get(prodId);
      if (prod) {
        products.push({
          ...prod,
          brand: dbService.brands.get(prod.brand) || prod.brand
        });
      }
    });

    return products;
  }

  createPriceAlert(userId, { productId, targetPrice, email }) {
    const cleanEmail = email.toLowerCase().trim();
    const product = dbService.products.get(productId);
    if (!product) throw new Error('Product not found for price alert.');

    const newAlert = {
      _id: `alert_${Date.now()}`,
      userId: userId || 'guest',
      productId: product._id,
      productTitle: product.title,
      productSlug: product.slug,
      targetPrice: Number(targetPrice),
      startingPrice: product.priceSummary?.minPrice || 0,
      email: cleanEmail,
      status: 'active',
      createdAt: new Date().toISOString()
    };

    this.alerts.set(newAlert._id, newAlert);
    console.log(`[PhonoWorld Alerts] Price drop alert registered for ${cleanEmail} -> ${product.title} at ₹${targetPrice}`);
    return newAlert;
  }

  getUserAlerts(userId) {
    const list = Array.from(this.alerts.values());
    if (!userId) return list;
    return list.filter(a => a.userId === userId);
  }

  deleteAlert(alertId) {
    return this.alerts.delete(alertId);
  }
}

export const authService = new AuthService();
