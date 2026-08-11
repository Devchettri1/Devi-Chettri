import React, { useState, useEffect } from 'react';
import { CustomerReview } from '../types';
import { REVIEWS, AGENCY_DETAILS } from '../data/travelData';
import { Star, CheckCircle2, ThumbsUp, MessageSquarePlus, ExternalLink, Filter, X, ShieldCheck, Heart } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<CustomerReview[]>(REVIEWS);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('All');
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);

  // Form State
  const [formName, setFormName] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formPackage, setFormPackage] = useState('5N/6D Sikkim & Darjeeling Tour');
  const [formPlatform, setFormPlatform] = useState<'Google' | 'TripAdvisor' | 'WhatsApp' | 'Direct'>('Direct');
  const [formComment, setFormComment] = useState('');
  const [formPhotoUrl, setFormPhotoUrl] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  // Photo Lightbox Modal
  const [lightboxPhoto, setLightboxPhoto] = useState<string | null>(null);

  // Fetch live reviews from backend API on mount
  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setReviewsList(data);
        }
      })
      .catch((err) => console.log('Using default reviews:', err));
  }, []);

  // Filter Reviews
  const filteredReviews = reviewsList.filter((rev) => {
    const matchesPlatform = selectedPlatform === 'All' || rev.externalPlatform === selectedPlatform;
    const matchesRating = selectedRating === 0 || rev.rating >= selectedRating;
    return matchesPlatform && matchesRating;
  });

  // Helpful count handler
  const handleHelpful = async (id: string) => {
    setReviewsList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpfulCount: (r.helpfulCount || 0) + 1 } : r))
    );

    try {
      await fetch(`/api/reviews/${id}/helpful`, { method: 'POST' });
    } catch (e) {
      console.error(e);
    }
  };

  // Submit Review Handler
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formComment) return;

    setFormSubmitting(true);

    const payload = {
      author: formName,
      location: formLocation || 'India',
      rating: formRating,
      comment: formComment,
      packageTaken: formPackage,
      photoUrl: formPhotoUrl,
      externalPlatform: formPlatform,
    };

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success && data.review) {
        setReviewsList((prev) => [data.review, ...prev]);
        setFormSuccess(true);
        setTimeout(() => {
          setFormSuccess(false);
          setIsSubmitModalOpen(false);
          setFormName('');
          setFormComment('');
          setFormPhotoUrl('');
        }, 1800);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <section id="customer-reviews" className="py-16 bg-[#FAF9F6] text-[#17202A]">
      <div className="max-w-7xl mx-auto px-4 space-y-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="editorial-eyebrow">AUTHENTIC TRAVELER REVIEWS</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1F3A]">
            Traveler Experiences
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Verified feedback from guests who explored Sikkim, Darjeeling and Bhutan with our Gangtok team.
          </p>
        </div>

        {/* Reputation Summary Bar */}
        <div className="bg-white p-6 rounded border border-[#E6E2D9] shadow-sm flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="text-3xl font-serif font-bold text-[#0B1F3A]">
              4.9<span className="text-base text-[#C6A15B]"> / 5.0</span>
            </div>
            <div>
              <div className="flex text-[#C6A15B] text-xs">★★★★★</div>
              <p className="text-xs text-slate-600">Based on 540+ Google & Direct Traveler Reviews</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={AGENCY_DETAILS.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#0B1F3A] font-semibold hover:underline"
            >
              <span>Verify on Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#C6A15B]" />
            </a>

            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="btn-luxury-navy text-xs !py-2 !px-4"
            >
              <MessageSquarePlus className="w-3.5 h-3.5" />
              <span>Write Review</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-b border-[#E6E2D9] text-xs">
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-slate-500 font-medium">Source:</span>
            {['All', 'Google', 'TripAdvisor', 'WhatsApp', 'Direct'].map((plat) => (
              <button
                key={plat}
                onClick={() => setSelectedPlatform(plat)}
                className={`px-3 py-1 rounded transition-colors whitespace-nowrap ${
                  selectedPlatform === plat
                    ? 'bg-[#0B1F3A] text-white font-semibold'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-[#E6E2D9]'
                }`}
              >
                {plat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Rating:</span>
            {[0, 5, 4].map((stars) => (
              <button
                key={stars}
                onClick={() => setSelectedRating(stars)}
                className={`px-2.5 py-1 rounded transition-colors ${
                  selectedRating === stars
                    ? 'bg-[#153451] text-[#D9BC7A] font-semibold'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-[#E6E2D9]'
                }`}
              >
                {stars === 0 ? 'All' : `${stars}★+`}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="travel-card p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-[#0B1F3A]">{rev.author}</h3>
                    <p className="text-[11px] text-slate-500">{rev.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex text-[#C6A15B] text-xs">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-[#C6A15B] text-[#C6A15B]' : 'text-slate-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-400">{rev.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[10px]">
                  <span className="bg-[#FAF9F6] text-[#0B1F3A] font-medium px-2 py-0.5 rounded border border-[#E6E2D9]">
                    {rev.packageTaken}
                  </span>
                  {rev.externalPlatform && (
                    <span className="text-slate-400">via {rev.externalPlatform}</span>
                  )}
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-sans italic">
                  "{rev.comment}"
                </p>

                {rev.photoUrl && (
                  <div
                    onClick={() => setLightboxPhoto(rev.photoUrl!)}
                    className="relative h-28 rounded overflow-hidden cursor-pointer border border-[#E6E2D9]"
                  >
                    <img
                      src={rev.photoUrl}
                      alt="Traveler photo"
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#E6E2D9] flex items-center justify-between text-xs">
                <button
                  onClick={() => handleHelpful(rev.id)}
                  className="text-slate-500 hover:text-[#0B1F3A] flex items-center gap-1 text-[11px]"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Helpful ({rev.helpfulCount || 0})</span>
                </button>

                <a
                  href={`https://wa.me/${AGENCY_DETAILS.whatsappNumber}?text=Namaste!%20I%20saw%20${encodeURIComponent(rev.author)}'s%20review%20about%20"${encodeURIComponent(rev.packageTaken)}"%20and%20want%20to%20plan%20the%20same.`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#0B1F3A] hover:underline text-[11px] font-semibold"
                >
                  Ask About This Itinerary →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Write Review Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-lg w-full bg-white border border-[#E6E2D9] rounded p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E6E2D9] pb-3">
              <h3 className="font-serif font-bold text-base text-[#0B1F3A]">
                Write a Review
              </h3>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="text-slate-400 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formSuccess ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-slate-800">Review Submitted</h4>
                <p className="text-xs text-slate-500">Thank you for sharing your experience!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full bg-[#FAF9F6] border border-[#E6E2D9] rounded px-3 py-2 text-slate-900 focus:outline-none focus:border-[#0B1F3A]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">City / State</label>
                    <input
                      type="text"
                      placeholder="e.g. Kolkata"
                      value={formLocation}
                      onChange={(e) => setFormLocation(e.target.value)}
                      className="w-full bg-[#FAF9F6] border border-[#E6E2D9] rounded px-3 py-2 text-slate-900 focus:outline-none focus:border-[#0B1F3A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Tour Package</label>
                  <select
                    value={formPackage}
                    onChange={(e) => setFormPackage(e.target.value)}
                    className="w-full bg-[#FAF9F6] border border-[#E6E2D9] rounded px-3 py-2 text-slate-900 focus:outline-none focus:border-[#0B1F3A]"
                  >
                    <option value="5N/6D Sikkim & Darjeeling Tour">5N/6D Sikkim & Darjeeling Tour</option>
                    <option value="North Sikkim 3N/4D Tour">North Sikkim 3N/4D Tour</option>
                    <option value="South & West Sikkim Package">South & West Sikkim Package</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Rating</label>
                  <div className="flex gap-1 py-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setFormRating(s)}
                        className="text-[#C6A15B]"
                      >
                        <Star className={`w-5 h-5 ${s <= formRating ? 'fill-[#C6A15B]' : 'text-slate-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Your Experience *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Tell us about your driver, hotels, permits, scenery..."
                    value={formComment}
                    onChange={(e) => setFormComment(e.target.value)}
                    className="w-full bg-[#FAF9F6] border border-[#E6E2D9] rounded p-3 text-slate-900 focus:outline-none focus:border-[#0B1F3A]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="w-full btn-luxury-navy py-2.5 text-xs font-bold"
                >
                  {formSubmitting ? 'Publishing...' : 'Submit Review'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Photo Lightbox */}
      {lightboxPhoto && (
        <div
          onClick={() => setLightboxPhoto(null)}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 cursor-pointer"
        >
          <img src={lightboxPhoto} alt="Review detail" className="max-w-3xl max-h-[85vh] rounded object-contain" />
        </div>
      )}
    </section>
  );
};
