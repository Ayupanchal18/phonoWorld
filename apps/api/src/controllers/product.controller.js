import { dbService } from '../services/db.service.js';

export const getProducts = async (req, res) => {
  try {
    const result = dbService.getProducts(req.query);
    res.json({
      success: true,
      data: result.products,
      pagination: result.pagination
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, error: 'Internal server error fetching products' });
  }
};

export const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const detail = dbService.getProductBySlug(slug);

    if (!detail) {
      return res.status(404).json({
        success: false,
        error: `Product with slug '${slug}' not found`
      });
    }

    res.json({
      success: true,
      data: detail
    });
  } catch (error) {
    console.error('Error fetching product detail:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

export const getBrands = async (req, res) => {
  try {
    const brands = dbService.getBrands();
    res.json({
      success: true,
      data: brands
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal server error fetching brands' });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = dbService.getCategories();
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal server error fetching categories' });
  }
};

