import React, { useState } from 'react';
import { 
  Star, 
  CheckCircle2, 
  ThumbsUp, 
  MessageSquare, 
  Plus, 
  ShieldCheck, 
  X,
  AlertCircle
} from 'lucide-react';
import { Product, Review } from '../../types';
import { useStore } from '../../context/StoreContext';

interface ReviewsSectionProps {
  product: Product;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ product }) => {
  const { reviews, addReview, voteHelpful, settings } = useStore();
  
  // Filter only approved reviews for this product
  const productReviews = reviews.filter(
    r => r.productId === product.id && r.status === 'approved'
  );

  const [selectedStarFilter, setSelectedStarFilter] = useState<number | null>(null);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [votedMap, setVotedMap] = useState<Record<string, boolean>>({});

  // Review Form State
  const [newRating, setNewRating] = useState(5);
  const [newAuthor, setNewAuthor] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newIsVerified, setNewIsVerified] = useState(true);
  const [submittedNotice, setSubmittedNotice] = useState<string | null>(null);

  // Stats calculation
  const totalReviews = productReviews.length;
  const averageRating = totalReviews > 0 
    ? (productReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
    : product.rating.toFixed(1);

  const starCounts = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: productReviews.filter(r => r.rating === stars).length,
    percentage: totalReviews > 0 
      ? Math.round((productReviews.filter(r => r.rating === stars).length / totalReviews) * 100) 
      : 0
  }));

  const verifiedCount = productReviews.filter(r => r.isVerifiedBuyer).length;
  const verifiedPercentage = totalReviews > 0 ? Math.round((verifiedCount / totalReviews) * 100) : 100;

  // Filtered reviews list
  const filteredReviews = productReviews.filter(r => {
    if (selectedStarFilter && r.rating !== selectedStarFilter) return false;
    if (verifiedOnly && !r.isVerifiedBuyer) return false;
    return true;
  });

  const handleHelpful = (reviewId: string) => {
    if (!votedMap[reviewId]) {
      voteHelpful(reviewId);
      setVotedMap(prev => ({ ...prev, [reviewId]: true }));
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newTitle || !newComment) return;

    addReview({
      productId: product.id,
      authorName: newAuthor,
      authorEmail: newEmail,
      isVerifiedBuyer: newIsVerified,
      rating: newRating,
      title: newTitle,
      comment: newComment
    });

    setIsWriteModalOpen(false);
    setNewAuthor('');
    setNewEmail('');
    setNewTitle('');
    setNewComment('');

    if (settings.autoApproveReviews) {
      setSubmittedNotice('Thank you! Your verified review has been published immediately.');
    } else {
      setSubmittedNotice('Thank you! Your review has been submitted to merchant moderation and will appear shortly.');
    }

    setTimeout(() => setSubmittedNotice(null), 6000);
  };

  return (
    <div className="pt-8 border-t border-stone-800 space-y-8">
      {/* Success alert */}
      {submittedNotice && (
        <div className="p-4 bg-emerald-950/60 border border-emerald-800/80 rounded-xl text-emerald-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{submittedNotice}</span>
          </div>
          <button onClick={() => setSubmittedNotice(null)} className="p-1 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Trust Header & Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-stone-900/40 border border-stone-800/80 rounded-2xl p-6">
        {/* Score Card */}
        <div className="md:col-span-4 text-center md:text-left space-y-2 md:border-r md:border-stone-800/80 md:pr-6">
          <div className="flex items-baseline justify-center md:justify-start gap-2">
            <span className="text-4xl sm:text-5xl font-black font-mono text-stone-100">
              {averageRating}
            </span>
            <span className="text-stone-500 font-mono text-sm">/ 5.0</span>
          </div>

          <div className="flex justify-center md:justify-start text-amber-400 gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.round(Number(averageRating))
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-stone-700'
                }`}
              />
            ))}
          </div>

          <p className="text-xs text-stone-400 font-medium">
            Based on {totalReviews} client reviews
          </p>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-950 text-stone-300 text-[11px] font-mono border border-stone-800 mt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{verifiedPercentage}% Verified Field Trials</span>
          </div>
        </div>

        {/* Rating Bars */}
        <div className="md:col-span-5 space-y-1.5">
          {starCounts.map(({ stars, count, percentage }) => (
            <button
              key={stars}
              onClick={() => setSelectedStarFilter(selectedStarFilter === stars ? null : stars)}
              className={`w-full flex items-center gap-3 text-xs group text-left px-2 py-0.5 rounded transition-colors ${
                selectedStarFilter === stars ? 'bg-stone-800/80' : 'hover:bg-stone-900/50'
              }`}
            >
              <span className="w-12 font-mono text-stone-400 flex items-center gap-1">
                {stars} <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              </span>
              <div className="flex-1 h-2 bg-stone-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="w-10 text-right font-mono text-stone-500 text-[11px]">
                {count}
              </span>
            </button>
          ))}
        </div>

        {/* Write a Review Button */}
        <div className="md:col-span-3 flex flex-col items-center justify-center space-y-2 md:pl-4">
          <button
            onClick={() => setIsWriteModalOpen(true)}
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Submit Client Review</span>
          </button>
          <span className="text-[11px] text-stone-500 text-center">
            {settings.autoApproveReviews ? 'Instant publication' : 'Curated by workshop moderation'}
          </span>
        </div>
      </div>

      {/* Review Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-stone-800">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-stone-400 font-mono">Filter:</span>
          {selectedStarFilter && (
            <button
              onClick={() => setSelectedStarFilter(null)}
              className="bg-amber-500/20 text-amber-400 border border-amber-500/40 px-2 py-0.5 rounded-md flex items-center gap-1"
            >
              <span>{selectedStarFilter} Stars Only</span>
              <X className="w-3 h-3" />
            </button>
          )}
          <label className="flex items-center gap-1.5 text-stone-300 cursor-pointer ml-2">
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(e) => setVerifiedOnly(e.target.checked)}
              className="accent-amber-500 rounded bg-stone-900 border-stone-700"
            />
            <span className="text-xs">Verified buyers only</span>
          </label>
        </div>
        <span className="text-xs font-mono text-stone-500">
          Showing {filteredReviews.length} of {totalReviews}
        </span>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="py-8 text-center text-stone-500 text-xs font-mono">
            No reviews match the selected filter criteria.
          </div>
        ) : (
          filteredReviews.map(review => (
            <div
              key={review.id}
              className="bg-stone-900/40 border border-stone-800/80 rounded-xl p-5 space-y-3 transition-colors hover:border-stone-700"
            >
              {/* Header: Author & Rating */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-200 text-sm">
                      {review.authorName}
                    </span>
                    {review.isVerifiedBuyer && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified Owner
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex text-amber-400 gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < review.rating ? 'fill-amber-400' : 'text-stone-700'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] font-mono text-stone-500">
                      {review.createdAt}
                    </span>
                  </div>
                </div>

                {/* Helpful button */}
                <button
                  onClick={() => handleHelpful(review.id)}
                  disabled={votedMap[review.id]}
                  className={`flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-lg border transition-all ${
                    votedMap[review.id]
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                      : 'bg-stone-950 text-stone-400 hover:text-stone-200 border-stone-800 hover:border-stone-700'
                  }`}
                  title="Mark this review as helpful"
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>Helpful ({review.helpfulCount})</span>
                </button>
              </div>

              {/* Review Title & Content */}
              <div>
                <h4 className="font-semibold text-stone-100 text-sm">
                  {review.title}
                </h4>
                <p className="text-stone-300 text-xs sm:text-sm mt-1 leading-relaxed">
                  {review.comment}
                </p>
              </div>

              {/* Official Merchant Response */}
              {review.merchantReply && (
                <div className="bg-stone-950/80 border-l-2 border-amber-500 p-3 rounded-r-lg space-y-1 mt-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-amber-400 font-mono flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      VALENCE Workshop Response
                    </span>
                    <span className="font-mono text-stone-500">{review.merchantReply.date}</span>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed italic">
                    "{review.merchantReply.text}"
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Write a Review Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setIsWriteModalOpen(false)}
            className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm animate-in fade-in"
          />
          <div className="relative bg-stone-900 border border-stone-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl z-10 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-stone-800">
              <div>
                <h3 className="font-bold text-stone-100 text-base">Write a Review</h3>
                <p className="text-xs text-stone-400 mt-0.5">{product.name}</p>
              </div>
              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-200 rounded-lg hover:bg-stone-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4 pt-4 text-xs">
              {/* Star selection */}
              <div>
                <label className="block text-stone-300 font-medium mb-1.5">Overall Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="p-1 hover:scale-110 transition-transform focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= newRating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-stone-700 hover:text-stone-500'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="font-mono font-bold text-amber-400 ml-2 text-sm">
                    {newRating}.0 / 5
                  </span>
                </div>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 font-medium mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Liam Sterling"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 font-medium mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Headline */}
              <div>
                <label className="block text-stone-300 font-medium mb-1">Review Headline *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Unbelievable mechanical tolerance and feel"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Comment */}
              <div>
                <label className="block text-stone-300 font-medium mb-1">Your Detailed Experience *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share details on everyday ergonomics, durability, materials, sound signature, or travel use..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-lg p-3 text-stone-200 focus:outline-none focus:border-amber-500 leading-relaxed"
                />
              </div>

              {/* Verified check simulation */}
              <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-stone-950 border border-stone-850">
                <input
                  type="checkbox"
                  checked={newIsVerified}
                  onChange={(e) => setNewIsVerified(e.target.checked)}
                  className="accent-amber-500 rounded"
                />
                <span className="text-stone-300">I purchased or tested this item directly from the atelier (Verified Badge)</span>
              </label>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsWriteModalOpen(false)}
                  className="px-4 py-2 text-stone-400 hover:text-stone-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 transition-all"
                >
                  Post Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
