import { dbService } from '../services/db.service.js';

export const getComparison = async (req, res) => {
  try {
    const slugsParam = req.query.slugs;
    if (!slugsParam) {
      return res.status(400).json({
        success: false,
        error: "Query parameter 'slugs' is required (e.g. ?slugs=samsung-galaxy-s24-ultra,oneplus-12)"
      });
    }

    const slugs = String(slugsParam).split(',').map(s => s.trim()).filter(Boolean);
    const result = dbService.getComparison(slugs);

    res.json({
      success: true,
      data: result.products,
      count: result.count
    });
  } catch (error) {
    console.error('Error fetching comparison:', error);
    res.status(500).json({ success: false, error: 'Internal server error in comparison engine' });
  }
};
