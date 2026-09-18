import { authService } from '../services/auth.service.js';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: 'Name, email, and password are required.' });
    }
    const result = authService.register(name, email, password);
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required.' });
    }
    const result = authService.login(email, password);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(401).json({ success: false, error: err.message });
  }
};

export const getProfile = async (req, res) => {
  res.json({
    success: true,
    data: authService.sanitizeUser(req.user)
  });
};

export const toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const result = authService.toggleWishlist(req.user._id, productId);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const products = authService.getWishlistProducts(req.user._id);
    res.json({ success: true, data: products, count: products.length });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Error fetching wishlist' });
  }
};

export const createAlert = async (req, res) => {
  try {
    const { productId, targetPrice, email } = req.body;
    const userId = req.user ? req.user._id : null;
    const alert = authService.createPriceAlert(userId, { productId, targetPrice, email });
    res.status(201).json({ success: true, data: alert, message: 'Price alert created successfully.' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export const getAlerts = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : null;
    const alerts = authService.getUserAlerts(userId);
    res.json({ success: true, data: alerts, count: alerts.length });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Error fetching price alerts' });
  }
};

export const deleteAlert = async (req, res) => {
  try {
    const { id } = req.params;
    authService.deleteAlert(id);
    res.json({ success: true, message: 'Price alert removed.' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
