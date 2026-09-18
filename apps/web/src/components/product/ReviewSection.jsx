import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Star, ThumbsUp, ThumbsDown, ShieldCheck, MessageSquare, Plus, CheckCircle2, AlertCircle, X, Sparkles } from 'lucide-react';
import { useUserStore } from '../../store/userStore.js';

export function ReviewSection({ productId, productTitle }) {
  const { user, isLoggedIn, openAuthModal, token } = useUserStore();
  const [sortBy, setSortBy] = useState('helpful');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRating, setUserRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [proInput, setProInput] = useState('');
  const [conInput, setConInput] = useState('');
  const [ownershipDuration, setOwnershipDuration] = useState('1-6 months');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const { data: response, isLoading, refetch } = useQuery({
    queryKey: ['reviews', productId, sortBy],
    queryFn: async () => {
      const res = await fetch(`/api/v1/products/${productId}/reviews?sort=${sortBy}`);
      return res.json();
    }
  });

  const reviews = response?.data || [];
  const stats = response?.stats || {
    total: 0,
    averageRating: 4.6,
    distribution: { 5: 80, 4: 15, 3: 5, 2: 0, 1: 0 },
    recommendationPercentage: 95
  };

  const handleVote = async (reviewId, type) => {
    try {
      const res = await fetch(`/api/v1/reviews/${reviewId}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type })
      });
      if (res.ok) {
        refetch();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!reviewTitle.trim() || !reviewComment.trim() || !proInput.trim() || !conInput.trim()) {
      setErrorMsg('Please fill all fields including at least 1 Pro and 1 Con.');
      return;
    }

    setIsSubmitting(true);
    try {
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`/api/v1/products/${productId}/reviews`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          rating: userRating,
          title: reviewTitle,
          comment: reviewComment,
          pros: [proInput.trim()],
          cons: [conInput.trim()],
          ownershipDuration
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit review');
      }

      setSuccessMsg('Thank you! Your verified community review is now published.');
      setTimeout(() => {
        setSuccessMsg('');
        setIsModalOpen(false);
        setReviewTitle('');
        setReviewComment('');
        setProInput('');
        setConInput('');
        refetch();
      }, 2000);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-8">
      
      {/* SECTION HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-sky-400" />
            <span>Verified User Reviews & Ratings</span>
          </h2>
          <p className="text-xs text-slate-400">
            Real ownership feedback from verified buyers across India
          </p>
        </div>

        <button
          onClick={() => {
            if (!isLoggedIn) openAuthModal();
            else setIsModalOpen(true);
          }}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Write a Review</span>
        </button>
      </div>

      {/* RATING HERO & BREAKDOWN */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80">
        
        {/* Score Block */}
        <div className="md:col-span-4 text-center md:text-left flex flex-col justify-center space-y-2 md:border-r border-slate-800 md:pr-6">
          <div className="flex items-baseline justify-center md:justify-start gap-2">
            <span className="text-4xl sm:text-5xl font-black text-white">{stats.averageRating}</span>
            <span className="text-sm text-slate-400 font-bold">/ 5.0</span>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`w-4 h-4 ${s <= Math.round(stats.averageRating) ? 'fill-amber-400' : 'text-slate-600'}`}
              />
            ))}
          </div>

          <p className="text-xs text-slate-400">
            Based on <strong className="text-white">{stats.total || reviews.length}</strong> community reviews
          </p>

          <div className="pt-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{stats.recommendationPercentage}% of owners recommend this device</span>
            </span>
          </div>
        </div>

        {/* Rating Bars Breakdown */}
        <div className="md:col-span-8 space-y-2 flex flex-col justify-center">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = stats.distribution[star] || 0;
            const percentage = stats.total > 0 ? Math.round((count / stats.total) * 100) : star === 5 ? 75 : 15;
            return (
              <div key={star} className="flex items-center gap-3 text-xs">
                <span className="w-12 text-slate-400 font-semibold">{star} Stars</span>
                <div className="flex-1 h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-10 text-right text-slate-500 font-medium">{count || `${percentage}%`}</span>
              </div>
            );
          })}
        </div>

      </div>

      {/* REVIEWS FILTER & LIST */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-400 uppercase tracking-wider">
            Owner Reviews ({reviews.length})
          </span>

          <div className="flex items-center gap-2">
            <span className="text-slate-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-sky-500"
            >
              <option value="helpful">Most Helpful</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
              <option value="recent">Most Recent</option>
            </select>
          </div>
        </div>

        {/* Reviews Cards */}
        {isLoading ? (
          <div className="py-12 text-center text-slate-400 text-xs">Loading user reviews...</div>
        ) : reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3.5 hover:border-slate-700 transition-colors"
              >
                {/* Reviewer Header */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.userAvatar}
                      alt={review.userName}
                      className="w-9 h-9 rounded-full object-cover border border-slate-700"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-white">{review.userName}</h4>
                        {review.verifiedPurchase && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" /> Verified Owner
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500">
                        Owned for {review.ownershipDuration} • {new Date(review.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${s <= review.rating ? 'fill-amber-400' : 'text-slate-700'}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Title & Comment */}
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-100">{review.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{review.comment}</p>
                </div>

                {/* Pros & Cons Chips */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  {review.pros?.length > 0 && (
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider block">Strengths:</span>
                      {review.pros.map((p, i) => (
                        <p key={i} className="text-[11px] leading-tight">+ {p}</p>
                      ))}
                    </div>
                  )}

                  {review.cons?.length > 0 && (
                    <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider block">Drawbacks:</span>
                      {review.cons.map((c, i) => (
                        <p key={i} className="text-[11px] leading-tight">- {c}</p>
                      ))}
                    </div>
                  )}
                </div>

                {/* Helpful Voting */}
                <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80">
                  <span className="text-[11px]">Was this review helpful?</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleVote(review._id, 'helpful')}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 border border-slate-700 transition-colors"
                    >
                      <ThumbsUp className="w-3 h-3 text-sky-400" />
                      <span>{review.helpfulVotes || 0}</span>
                    </button>
                    <button
                      onClick={() => handleVote(review._id, 'unhelpful')}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 border border-slate-700 transition-colors"
                    >
                      <ThumbsDown className="w-3 h-3 text-slate-500" />
                      <span>{review.unhelpfulVotes || 0}</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-slate-900 text-center text-slate-400 text-xs">
            Be the first verified owner to review {productTitle}!
          </div>
        )}
      </div>

      {/* WRITE A REVIEW MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 rounded-3xl border border-slate-700 p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white">Write a Verified Review</h3>
                <p className="text-xs text-slate-400">{productTitle}</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {successMsg ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-sm font-bold text-white">Review Submitted!</h4>
                <p className="text-xs text-slate-400">{successMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
                
                {/* Star Rating Selector */}
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Your Overall Rating</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setUserRating(star)}
                        className="p-1.5 focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-6 h-6 ${star <= userRating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}`}
                        />
                      </button>
                    ))}
                    <span className="text-xs text-amber-400 font-bold ml-2">{userRating} / 5 Stars</span>
                  </div>
                </div>

                {/* Ownership Duration */}
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">How long have you owned this phone?</label>
                  <select
                    value={ownershipDuration}
                    onChange={(e) => setOwnershipDuration(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-sky-500 text-xs"
                  >
                    <option value="< 1 month">Less than 1 month</option>
                    <option value="1-6 months">1 to 6 months</option>
                    <option value="6+ months">More than 6 months</option>
                    <option value="1+ year">Over 1 year</option>
                  </select>
                </div>

                {/* Title */}
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Headline / Summary</label>
                  <input
                    type="text"
                    required
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    placeholder="e.g. Exceptional battery life and camera in sunlight"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                {/* Comment */}
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Detailed Review Experience</label>
                  <textarea
                    required
                    rows={3}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Describe real-world performance, display outdoor visibility, heating issues, camera output..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-sky-500 leading-relaxed"
                  />
                </div>

                {/* Structured Pros & Cons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-emerald-400 block mb-1 font-semibold">+ Key Strength (Pro)</label>
                    <input
                      type="text"
                      required
                      value={proInput}
                      onChange={(e) => setProInput(e.target.value)}
                      placeholder="e.g. 100W fast charger included"
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-emerald-500/40 text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-rose-400 block mb-1 font-semibold">- Key Drawback (Con)</label>
                    <input
                      type="text"
                      required
                      value={conInput}
                      onChange={(e) => setConInput(e.target.value)}
                      placeholder="e.g. Heavy in hand at 232g"
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-rose-500/40 text-white focus:outline-none"
                    />
                  </div>
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-sky-500/20 disabled:opacity-50"
                >
                  {isSubmitting ? 'Verifying & Submitting...' : 'Publish Verified Review'}
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
