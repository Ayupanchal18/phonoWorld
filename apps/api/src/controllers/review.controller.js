import { reviewService } from '../services/review.service.js';

export const getProductReviews = async (req, res) => {
  try {
    const { id } = req.params;
    const { sort, page, limit } = req.query;
    const result = reviewService.getReviewsByProduct(id, {
      sort: sort ? String(sort) : 'helpful',
      page: page ? parseInt(String(page), 10) : 1,
      limit: limit ? parseInt(String(limit), 10) : 10
    });

    res.json({
      success: true,
      data: result.reviews,
      stats: result.stats
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Internal server error fetching reviews' });
  }
};

export const submitReview = async (req, res) => {
  try {
    const { id } = req.params;
    const reviewData = req.body;
    const user = req.user || null;

    const newReview = reviewService.createReview(id, reviewData, user);
    res.status(201).json({
      success: true,
      data: newReview,
      message: 'Review published successfully.'
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export const voteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.body; // 'helpful' | 'unhelpful'
    const ip = req.ip || req.headers['x-forwarded-for'] || 'guest';

    const result = reviewService.voteReview(id, type, ip);
    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
