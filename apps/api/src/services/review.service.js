import { dbService } from './db.service.js';

class ReviewService {
  constructor() {
    this.reviews = new Map();
    this.votedIps = new Set();
    this.initSeedReviews();
  }

  initSeedReviews() {
    const seedReviewsList = [
      {
        _id: 'rev_s24u_01',
        productId: 'prod_samsung_s24_ultra',
        userId: 'user_rohit_m',
        userName: 'Rohit Mukherjee',
        userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=80',
        rating: 5,
        title: 'The anti-reflective screen is revolutionary in Delhi sunlight',
        comment: 'Upgraded from S22 Ultra. The flat Gorilla Armor display completely eliminates glare when using outdoors in bright daylight. Galaxy AI call translation worked seamlessly during my trip to Tokyo. Battery easily lasts 1.5 days with 7.5 hours screen-on-time.',
        pros: ['Anti-reflective screen is unbeatable in Indian outdoors', '7 years of promised updates gives long-term peace of mind', 'S-Pen remote shutter is super handy'],
        cons: ['Heavy in pocket during gym sessions', '45W charging feels slow compared to my brother\'s OnePlus 12'],
        ownershipDuration: '1-6 months',
        verifiedPurchase: true,
        helpfulVotes: 48,
        unhelpfulVotes: 2,
        status: 'published',
        createdAt: '2024-04-12T10:30:00.000Z'
      },
      {
        _id: 'rev_s24u_02',
        productId: 'prod_samsung_s24_ultra',
        userId: 'user_priya_s',
        userName: 'Priya Sharma',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80',
        rating: 4,
        title: 'Top tier camera system, but missed the bundled adapter',
        comment: 'The 5x periscope 50MP sensor produces significantly sharper results at night than the older 10x sensor on S23 Ultra. Nightography mode is pristine. Dropped 1 star because Samsung should provide a 45W adapter in the box at ₹1.3 Lakh price tag.',
        pros: ['Sharp 50MP 5x zoom with zero optical noise', 'Titanium frame feels indestructible', 'One UI 6.1 animations are butter smooth'],
        cons: ['No charging brick in box', 'Speaker bass could be punchier'],
        ownershipDuration: '6+ months',
        verifiedPurchase: true,
        helpfulVotes: 32,
        unhelpfulVotes: 1,
        status: 'published',
        createdAt: '2024-06-20T15:45:00.000Z'
      },
      {
        _id: 'rev_op12_01',
        productId: 'prod_oneplus_12',
        userId: 'user_vikram_k',
        userName: 'Vikram Kulkarni',
        userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=80&auto=format&fit=crop&q=80',
        rating: 5,
        title: '100W SUPERVOOC and 5400mAh battery changed my workflow',
        comment: 'Charges from 1% to 100% in exactly 26 minutes with the included 100W brick. 2K ProXDR screen is jaw-droppingly bright. Hasselblad color tuning on portraits delivers natural skin tones without aggressive post-processing.',
        pros: ['100W charger bundled in box', 'Massive 5400mAh battery easily provides 8+ hours SOT', 'Fluid OxygenOS experience'],
        cons: ['Curved glass makes finding tempered protectors tricky'],
        ownershipDuration: '1-6 months',
        verifiedPurchase: true,
        helpfulVotes: 56,
        unhelpfulVotes: 3,
        status: 'published',
        createdAt: '2024-03-15T09:12:00.000Z'
      },
      {
        _id: 'rev_x100p_01',
        productId: 'prod_vivo_x100_pro',
        userId: 'user_ananya_d',
        userName: 'Ananya Dutta',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
        rating: 5,
        title: 'Best smartphone camera on the planet in 2024/2025',
        comment: 'The 1-inch Sony sensor with ZEISS APO floating periscope produces DSLR-like natural depth of field and zero chromatic aberration. The telephoto macro mode captures details that are invisible to the naked eye. AnTuTu 2.2M score handles Genshin Impact at max settings.',
        pros: ['ZEISS 1-inch sensor dynamic range is unmatched', 'Telephoto macro photography is addictive', '100W wired + 50W wireless charging'],
        cons: ['Funtouch OS has a few duplicate system apps', 'Chunky camera bump'],
        ownershipDuration: '1-6 months',
        verifiedPurchase: true,
        helpfulVotes: 41,
        unhelpfulVotes: 0,
        status: 'published',
        createdAt: '2024-05-02T18:20:00.000Z'
      },
      {
        _id: 'rev_edge50f_01',
        productId: 'prod_moto_edge_50_fusion',
        userId: 'user_arjun_n',
        userName: 'Arjun Nair',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
        rating: 5,
        title: 'IP68 water resistance and 144Hz display under ₹23k is a steal',
        comment: 'Tested underwater in a pool and it survived without any issues. Vegan leather back in Marshmallow Blue feels super premium and does not attract smudges. Sony LYT-700C sensor takes crisp daylight and night shots. Hello UI is completely ad-free.',
        pros: ['Full IP68 protection at this price is unprecedented', 'Zero bloatware Hello UI with Moto gestures', '144Hz 3D curved pOLED screen'],
        cons: ['Not meant for heavy 3D gaming (Snapdragon 7s Gen 2)'],
        ownershipDuration: '< 1 month',
        verifiedPurchase: true,
        helpfulVotes: 39,
        unhelpfulVotes: 1,
        status: 'published',
        createdAt: '2024-06-18T11:05:00.000Z'
      }
    ];

    seedReviewsList.forEach(r => this.reviews.set(r._id, r));
  }

  getReviewsByProduct(productId, { sort = 'helpful', page = 1, limit = 10 } = {}) {
    let list = Array.from(this.reviews.values())
      .filter(r => r.productId === productId && r.status === 'published');

    // Aggregate statistics
    const totalCount = list.length;
    const ratingSum = list.reduce((acc, r) => acc + r.rating, 0);
    const averageRating = totalCount > 0 ? Number((ratingSum / totalCount).toFixed(1)) : 4.5;

    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    list.forEach(r => {
      if (distribution[r.rating] !== undefined) distribution[r.rating]++;
    });

    // Sorting
    if (sort === 'highest') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'lowest') {
      list.sort((a, b) => a.rating - b.rating);
    } else if (sort === 'recent') {
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else {
      // default: helpful
      list.sort((a, b) => b.helpfulVotes - a.helpfulVotes);
    }

    const paginated = list.slice((page - 1) * limit, page * limit);

    return {
      reviews: paginated,
      stats: {
        total: totalCount,
        averageRating,
        distribution,
        recommendationPercentage: totalCount > 0 ? Math.round(((distribution[5] + distribution[4]) / totalCount) * 100) : 92
      }
    };
  }

  createReview(productId, reviewData, user) {
    const { rating, title, comment, pros, cons, ownershipDuration } = reviewData;

    // Strict Anti-Spam Validation
    if (!rating || rating < 1 || rating > 5) {
      throw new Error('A valid star rating (1 to 5) is required.');
    }
    if (!title || title.trim().length < 5) {
      throw new Error('Review title must be at least 5 characters.');
    }
    if (!comment || comment.trim().length < 15) {
      throw new Error('Please write a detailed review (minimum 15 characters).');
    }
    if (!pros || !pros.length) {
      throw new Error('Please provide at least 1 key pro/strength.');
    }
    if (!cons || !cons.length) {
      throw new Error('Please provide at least 1 con/drawback to ensure balanced authenticity.');
    }

    // Basic profanity check
    const badWords = ['spam', 'fake', 'scam', 'cheat'];
    const lowerText = `${title} ${comment}`.toLowerCase();
    const isSuspicious = badWords.some(w => lowerText.includes(w));

    const newReview = {
      _id: `rev_${Date.now()}`,
      productId,
      userId: user?._id || 'user_guest',
      userName: user?.name || 'Verified Indian Buyer',
      userAvatar: user?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=80',
      rating: Number(rating),
      title: title.trim(),
      comment: comment.trim(),
      pros: Array.isArray(pros) ? pros : [String(pros)],
      cons: Array.isArray(cons) ? cons : [String(cons)],
      ownershipDuration: ownershipDuration || '1-6 months',
      verifiedPurchase: true,
      helpfulVotes: 0,
      unhelpfulVotes: 0,
      status: isSuspicious ? 'pending' : 'published',
      createdAt: new Date().toISOString()
    };

    this.reviews.set(newReview._id, newReview);
    console.log(`[PhonoWorld Reviews] New review submitted for ${productId} with rating ${rating}★`);
    return newReview;
  }

  voteReview(reviewId, type = 'helpful', userIdentifier = 'guest_ip') {
    const key = `${reviewId}_${userIdentifier}`;
    if (this.votedIps.has(key)) {
      throw new Error('You have already voted on this review.');
    }

    const review = this.reviews.get(reviewId);
    if (!review) throw new Error('Review not found.');

    if (type === 'helpful') review.helpfulVotes++;
    else review.unhelpfulVotes++;

    this.votedIps.add(key);
    return {
      helpfulVotes: review.helpfulVotes,
      unhelpfulVotes: review.unhelpfulVotes
    };
  }
}

export const reviewService = new ReviewService();
