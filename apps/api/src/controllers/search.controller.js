import { dbService } from '../services/db.service.js';

export const searchProducts = async (req, res) => {
  try {
    const query = req.query.q || '';
    const results = dbService.search(String(query));

    res.json({
      success: true,
      data: results,
      count: results.length
    });
  } catch (error) {
    console.error('Error in search:', error);
    res.status(500).json({ success: false, error: 'Internal server error in search engine' });
  }
};

export const getPhoneFinderRecommendations = async (req, res) => {
  try {
    const criteria = req.body || {};
    const recommendations = dbService.getRecommendations(criteria);

    res.json({
      success: true,
      data: recommendations,
      count: recommendations.length
    });
  } catch (error) {
    console.error('Error computing recommendations:', error);
    res.status(500).json({ success: false, error: 'Internal server error in recommendation wizard' });
  }
};
