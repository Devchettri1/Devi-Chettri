import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  User, 
  Tag, 
  ArrowRight, 
  Share2, 
  Heart, 
  Search, 
  X, 
  Sparkles, 
  CheckCircle2, 
  Compass, 
  MapPin, 
  Mountain, 
  ChevronRight, 
  MessageCircle, 
  Bookmark,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { BlogPost } from '../types';
import { BLOG_POSTS, calculateReadTime } from '../data/blogData';
import { AGENCY_DETAILS } from '../data/travelData';
import { useWhatsApp } from '../utils/whatsAppContext';
import { OptimizedImage } from './ui/OptimizedImage';

interface HimalayanTravelBlogProps {
  onOpenAIChatWithTopic?: (topic: string) => void;
  onSelectPackage?: (pkgId: string) => void;
}

type BlogCategoryFilter = 'All' | 'Offbeat Gems' | 'Travel Tips' | 'Storytelling' | 'Permits & Seasons' | 'Cultural Heritage';

export const HimalayanTravelBlog: React.FC<HimalayanTravelBlogProps> = ({
  onOpenAIChatWithTopic,
  onSelectPackage,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Record<string, boolean>>({});
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const { setPageContext } = useWhatsApp();

  const categories: BlogCategoryFilter[] = [
    'All',
    'Offbeat Gems',
    'Travel Tips',
    'Storytelling',
    'Permits & Seasons',
    'Cultural Heritage'
  ];

  // Sync WhatsApp context when reading an article
  React.useEffect(() => {
    if (activeArticle) {
      setPageContext({
        type: 'general',
        title: activeArticle.title,
        subtitle: `Himalayan Blog: ${activeArticle.category} (${calculateReadTime(activeArticle.content, activeArticle.summary, activeArticle.keyTakeaways)})`,
        location: activeArticle.location || 'Sikkim & Himalayas',
      });
    }
  }, [activeArticle, setPageContext]);

  // Filtered Articles
  const filteredArticles = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCat = selectedCategory === 'All' || post.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.subtitle.toLowerCase().includes(query) ||
        post.summary.toLowerCase().includes(query) ||
        post.tags.some((t) => t.toLowerCase().includes(query)) ||
        (post.location && post.location.toLowerCase().includes(query));
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredArticle = useMemo(() => {
    return BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];
  }, []);

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShare = (post: BlogPost, e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `Read "${post.title}" on OffbeatDestination Travels: ${window.location.origin}/#blog-${post.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopiedSlug(post.id);
      setTimeout(() => setCopiedSlug(null), 2500);
    }
  };

  const handleOpenWhatsAppForBlog = (post: BlogPost) => {
    const text = `Namaste OffbeatDestination Travels! I was reading your Himalayan blog post "*${post.title}*" (${post.category}) and would like expert assistance in planning an itinerary based on these recommendations.`;
    const waUrl = `https://wa.me/${AGENCY_DETAILS.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <section id="himalayan-blog" className="py-20 bg-[#0B0F0E] text-[#F5F1E8] border-b border-[#D6B36A]/20 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#18352D]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#D6B36A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#D6B36A]/20 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#18352D] border border-[#D6B36A]/30 text-[#D6B36A] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Himalayan Travel Blog & Field Notes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F1E8] tracking-tight">
              Stories, Expert Tips & Hidden Gems
            </h2>
            <p className="text-[#A9AAA4] text-sm sm:text-base leading-relaxed">
              Curated by local Sikkimese naturalists, mountain chauffeurs, and permit experts. Discover unmapped trails, high-altitude survival wisdom, and authentic cultural heritage.
            </p>
          </div>

          {/* Real-Time Search Bar */}
          <div className="w-full md:w-80">
            <div className="relative">
              <Search className="w-4 h-4 text-[#D6B36A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stories, tips, passes..."
                className="w-full bg-[#111513] border border-[#D6B36A]/30 focus:border-[#D6B36A] text-xs text-[#F5F1E8] pl-10 pr-4 py-2.5 rounded-xl focus:outline-none placeholder-[#A9AAA4]/60 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A9AAA4] hover:text-[#F5F1E8]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Filtering Tags */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pb-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            const count = cat === 'All' ? BLOG_POSTS.length : BLOG_POSTS.filter((p) => p.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all flex items-center gap-2 border ${
                  isActive
                    ? 'bg-[#D6B36A] text-[#0B0F0E] border-[#D6B36A] shadow-lg shadow-[#D6B36A]/20 scale-105'
                    : 'bg-[#111513] text-[#A9AAA4] border-[#D6B36A]/20 hover:border-[#D6B36A]/50 hover:text-[#F5F1E8]'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                    isActive ? 'bg-[#0B0F0E] text-[#D6B36A]' : 'bg-[#18352D] text-[#D6B36A]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Featured Hero Article Banner (if 'All' or matches filter) */}
        {selectedCategory === 'All' && !searchQuery && featuredArticle && (
          <div
            onClick={() => setActiveArticle(featuredArticle)}
            className="group cursor-pointer bg-[#111513] border border-[#D6B36A]/30 hover:border-[#D6B36A] rounded-2xl overflow-hidden shadow-2xl transition-all grid grid-cols-1 lg:grid-cols-12"
          >
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden">
              <OptimizedImage
                src={featuredArticle.coverImage}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0B0F0E] via-[#0B0F0E]/30 to-transparent" />
              <span className="absolute top-4 left-4 bg-[#D6B36A] text-[#0B0F0E] text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                ★ Editor's Pick
              </span>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2.5 text-xs">
                  <span className="bg-[#18352D] text-[#D6B36A] border border-[#D6B36A]/30 px-2.5 py-1 rounded-md font-bold">
                    {featuredArticle.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-[#D6B36A] font-bold bg-[#18352D] border border-[#D6B36A]/30 px-2.5 py-1 rounded-md shadow-sm">
                    <Clock className="w-3.5 h-3.5 text-[#D6B36A]" />
                    <span>{calculateReadTime(featuredArticle.content, featuredArticle.summary, featuredArticle.keyTakeaways)}</span>
                  </span>
                  <span className="flex items-center gap-1 text-[#A9AAA4] text-[11px]">
                    <Calendar className="w-3.5 h-3.5 text-[#D6B36A]" />
                    <span>{featuredArticle.publishedDate}</span>
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#F5F1E8] group-hover:text-[#D6B36A] transition-colors leading-tight">
                  {featuredArticle.title}
                </h3>

                <p className="text-[#A9AAA4] text-xs sm:text-sm leading-relaxed line-clamp-3">
                  {featuredArticle.summary}
                </p>

                {/* Key Takeaways Chips */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-bold text-[#D6B36A] uppercase tracking-wider block">
                    Inside This Story:
                  </span>
                  {featuredArticle.keyTakeaways.slice(0, 2).map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#F5F1E8]/90">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D6B36A] flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Author & Read Action */}
              <div className="pt-4 border-t border-[#D6B36A]/20 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <OptimizedImage
                    src={featuredArticle.author.avatarUrl}
                    alt={featuredArticle.author.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#D6B36A]/50 shadow-md"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#F5F1E8] block">{featuredArticle.author.name}</span>
                    <div className="flex items-center gap-2 text-[11px] text-[#A9AAA4] mt-0.5">
                      <span>{featuredArticle.author.role}</span>
                      <span className="text-[#D6B36A]/40">•</span>
                      <span className="flex items-center gap-1 text-[#D6B36A] font-bold">
                        <Clock className="w-3 h-3 text-[#D6B36A]" />
                        <span>{calculateReadTime(featuredArticle.content, featuredArticle.summary, featuredArticle.keyTakeaways)}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[#D6B36A] font-bold text-xs group-hover:translate-x-1 transition-transform">
                  <span>Read Full Story</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredArticles.map((article) => {
            const isLiked = likedPosts[article.id];
            const isBookmarked = bookmarkedPosts[article.id];
            const readTimeText = calculateReadTime(article.content, article.summary, article.keyTakeaways);

            return (
              <article
                key={article.id}
                onClick={() => setActiveArticle(article)}
                className="group cursor-pointer bg-[#111513] border border-[#D6B36A]/20 hover:border-[#D6B36A]/60 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between flex-1 hover:-translate-y-1"
              >
                <div>
                  {/* Card Image */}
                  <div className="relative h-52 overflow-hidden">
                    <OptimizedImage
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111513] via-transparent to-transparent" />

                    {/* Category Badge */}
                    <span className="absolute top-3 left-3 bg-[#0B0F0E]/90 backdrop-blur-md text-[#D6B36A] text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md border border-[#D6B36A]/30">
                      {article.category}
                    </span>

                    {/* Read Time Pill */}
                    <span className="absolute top-3 right-3 bg-[#18352D]/90 backdrop-blur-md text-[#D6B36A] text-[10px] font-bold px-2 py-1 rounded-md border border-[#D6B36A]/30 flex items-center gap-1 shadow-md">
                      <Clock className="w-3 h-3 text-[#D6B36A]" />
                      <span>{readTimeText}</span>
                    </span>

                    {/* Location Tag if available */}
                    {article.location && (
                      <span className="absolute bottom-3 left-3 text-[11px] text-[#F5F1E8] font-semibold flex items-center gap-1 drop-shadow-md">
                        <MapPin className="w-3.5 h-3.5 text-[#D6B36A]" />
                        <span>{article.location}</span>
                      </span>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-[#A9AAA4] border-b border-[#D6B36A]/10 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#D6B36A]" />
                          <span>{article.publishedDate}</span>
                        </span>
                        <span className="text-[#D6B36A]/40">•</span>
                        <span className="flex items-center gap-1 text-[#D6B36A] font-bold bg-[#18352D] px-2 py-0.5 rounded border border-[#D6B36A]/30">
                          <Clock className="w-3 h-3 text-[#D6B36A]" />
                          <span>{readTimeText}</span>
                        </span>
                      </div>
                      {article.elevation && (
                        <span className="flex items-center gap-1 text-[#D6B36A] font-semibold text-[10px]">
                          <Mountain className="w-3 h-3" />
                          <span>{article.elevation}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-extrabold text-[#F5F1E8] group-hover:text-[#D6B36A] transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-xs text-[#A9AAA4] leading-relaxed line-clamp-3">
                      {article.summary}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {article.tags.slice(0, 3).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] bg-[#18352D]/60 text-[#F5F1E8]/80 px-2 py-0.5 rounded border border-[#D6B36A]/20"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer: Author + Actions */}
                <div className="px-5 py-3.5 border-t border-[#D6B36A]/15 bg-[#0B0F0E]/50 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <OptimizedImage
                      src={article.author.avatarUrl}
                      alt={article.author.name}
                      className="w-8 h-8 rounded-full object-cover border border-[#D6B36A]/40 shadow-sm"
                    />
                    <div>
                      <span className="text-xs font-bold text-[#F5F1E8] block leading-tight">{article.author.name}</span>
                      <div className="flex items-center gap-1 text-[10px] text-[#D6B36A] font-semibold mt-0.5">
                        <Clock className="w-2.5 h-2.5 text-[#D6B36A]" />
                        <span>{readTimeText}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => toggleLike(article.id, e)}
                      className={`p-1.5 rounded-lg border transition-all ${
                        isLiked
                          ? 'bg-rose-950/80 border-rose-500 text-rose-400'
                          : 'bg-[#111513] border-[#D6B36A]/20 text-[#A9AAA4] hover:text-[#F5F1E8]'
                      }`}
                      title="Like Story"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-400' : ''}`} />
                    </button>

                    <button
                      onClick={(e) => handleShare(article, e)}
                      className="p-1.5 rounded-lg border bg-[#111513] border-[#D6B36A]/20 text-[#A9AAA4] hover:text-[#F5F1E8] transition-all"
                      title="Share Article Link"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-1 text-[#D6B36A] font-bold text-xs pl-1">
                      <span>Read</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Empty Search State */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-16 bg-[#111513] rounded-2xl border border-[#D6B36A]/20 p-8 space-y-4 max-w-lg mx-auto">
            <BookOpen className="w-12 h-12 text-[#D6B36A] mx-auto opacity-70" />
            <h4 className="text-lg font-bold text-[#F5F1E8]">No articles found for "{searchQuery}"</h4>
            <p className="text-xs text-[#A9AAA4]">
              Try searching with another keyword like "Dzongu", "Nathula", "Permits", "Vegetarian", or reset the category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="btn-luxury text-xs px-4 py-2"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Floating / Toast notification for copied link */}
        {copiedSlug && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#18352D] text-[#D6B36A] border border-[#D6B36A] px-4 py-2.5 rounded-xl shadow-2xl text-xs font-bold flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-[#D6B36A]" />
            <span>Article share link copied to clipboard!</span>
          </div>
        )}
      </div>

      {/* FULL ARTICLE READER MODAL */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
          <div
            className="bg-[#0B0F0E] text-[#F5F1E8] border border-[#D6B36A]/40 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden relative my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="p-4 sm:p-5 border-b border-[#D6B36A]/20 flex items-center justify-between bg-[#111513] sticky top-0 z-20">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="bg-[#18352D] text-[#D6B36A] border border-[#D6B36A]/30 text-[10px] sm:text-xs font-extrabold uppercase px-2.5 py-1 rounded">
                  {activeArticle.category}
                </span>
                <span className="flex items-center gap-1.5 text-[#D6B36A] font-bold text-xs bg-[#18352D] px-2.5 py-1 rounded border border-[#D6B36A]/30 shadow-sm">
                  <Clock className="w-3.5 h-3.5 text-[#D6B36A]" />
                  <span>{calculateReadTime(activeArticle.content, activeArticle.summary, activeArticle.keyTakeaways)}</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => handleShare(activeArticle, e)}
                  className="px-3 py-1.5 bg-[#18352D] hover:bg-[#1f443a] text-[#D6B36A] text-xs font-bold rounded-lg border border-[#D6B36A]/30 flex items-center gap-1.5 transition-all"
                  title="Share"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Share</span>
                </button>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="p-1.5 rounded-lg bg-[#18352D] text-[#A9AAA4] hover:text-[#F5F1E8] border border-[#D6B36A]/30 transition-all"
                  title="Close Article"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Article Body */}
            <div className="overflow-y-auto p-5 sm:p-8 space-y-8 flex-1">
              {/* Article Hero Banner */}
              <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden border border-[#D6B36A]/20">
                <OptimizedImage
                  src={activeArticle.coverImage}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F0E] via-[#0B0F0E]/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 space-y-1">
                  {activeArticle.location && (
                    <span className="text-[#D6B36A] text-xs font-bold flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{activeArticle.location}</span>
                      {activeArticle.elevation && <span>· {activeArticle.elevation}</span>}
                    </span>
                  )}
                  <h1 className="text-xl sm:text-3xl font-black text-white leading-tight">
                    {activeArticle.title}
                  </h1>
                </div>
              </div>

              {/* Subtitle & Author Meta Box */}
              <div className="bg-[#111513] p-4 sm:p-5 rounded-xl border border-[#D6B36A]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
                <div className="flex items-center gap-3.5">
                  <OptimizedImage
                    src={activeArticle.author.avatarUrl}
                    alt={activeArticle.author.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#D6B36A] shadow-md"
                  />
                  <div>
                    <span className="font-bold text-[#F5F1E8] text-sm sm:text-base block">
                      {activeArticle.author.name}
                    </span>
                    <span className="text-xs text-[#D6B36A] font-medium block">{activeArticle.author.role}</span>
                    <div className="flex flex-wrap items-center gap-2.5 text-xs text-[#A9AAA4] mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#D6B36A]" />
                        <span>Published {activeArticle.publishedDate}</span>
                      </span>
                      <span className="text-[#D6B36A]/40">•</span>
                      <span className="flex items-center gap-1.5 text-[#D6B36A] font-bold bg-[#18352D] px-2.5 py-0.5 rounded-full border border-[#D6B36A]/30 shadow-sm">
                        <Clock className="w-3.5 h-3.5 text-[#D6B36A]" />
                        <span>{calculateReadTime(activeArticle.content, activeArticle.summary, activeArticle.keyTakeaways)}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {activeArticle.bestSeason && (
                  <div className="bg-[#18352D] px-4 py-2 rounded-xl border border-[#D6B36A]/30 text-xs shadow-sm">
                    <span className="text-[#A9AAA4] block text-[10px] uppercase font-bold">Best Season:</span>
                    <span className="font-extrabold text-[#D6B36A]">{activeArticle.bestSeason}</span>
                  </div>
                )}
              </div>

              {/* Key Takeaways Callout Box */}
              <div className="bg-[#18352D]/40 border border-[#D6B36A]/40 rounded-xl p-5 sm:p-6 space-y-3 shadow-inner">
                <h4 className="text-xs sm:text-sm font-extrabold text-[#D6B36A] uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D6B36A]" />
                  <span>Key Travel Takeaways & Insights</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeArticle.keyTakeaways.map((takeaway, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#F5F1E8]">
                      <span className="w-5 h-5 rounded-full bg-[#18352D] border border-[#D6B36A]/40 flex items-center justify-center text-[10px] font-black text-[#D6B36A] flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rich Markdown / Article Content */}
              <div className="prose prose-invert max-w-none space-y-6 text-[#F5F1E8]/90 text-sm sm:text-base leading-relaxed font-sans">
                {activeArticle.content.split('\n\n').map((paragraph, pIdx) => {
                  const trimmed = paragraph.trim();
                  if (!trimmed) return null;

                  if (trimmed.startsWith('### ')) {
                    return (
                      <h3
                        key={pIdx}
                        className="text-lg sm:text-xl font-bold text-[#D6B36A] pt-4 border-b border-[#D6B36A]/20 pb-2"
                      >
                        {trimmed.replace('### ', '')}
                      </h3>
                    );
                  }

                  if (trimmed.startsWith('- ')) {
                    const listItems = trimmed.split('\n').filter((l) => l.startsWith('- '));
                    return (
                      <ul key={pIdx} className="space-y-2 list-none pl-0 my-3">
                        {listItems.map((li, liIdx) => (
                          <li key={liIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F5F1E8]/90">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D6B36A] mt-2 flex-shrink-0" />
                            <span>{li.replace(/^- \*\*([^*]+)\*\*:/, '$1:').replace(/^- /, '')}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }

                  if (trimmed.startsWith('1. ') || trimmed.startsWith('2. ') || trimmed.startsWith('3. ') || trimmed.startsWith('4. ')) {
                    const numItems = trimmed.split('\n').filter(Boolean);
                    return (
                      <ol key={pIdx} className="space-y-2.5 my-3 pl-0 list-none">
                        {numItems.map((ni, niIdx) => (
                          <li key={niIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F5F1E8]/90">
                            <span className="text-[#D6B36A] font-bold">{niIdx + 1}.</span>
                            <span>{ni.replace(/^\d+\.\s+/, '')}</span>
                          </li>
                        ))}
                      </ol>
                    );
                  }

                  return (
                    <p key={pIdx} className="text-[#F5F1E8]/90 text-xs sm:text-sm leading-relaxed">
                      {trimmed}
                    </p>
                  );
                })}
              </div>

              {/* Related Curated Package Callout */}
              {activeArticle.relatedPackageTitle && (
                <div className="bg-[#111513] border border-[#D6B36A]/40 rounded-xl p-5 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-[10px] font-bold text-[#D6B36A] uppercase tracking-wider bg-[#18352D] px-2.5 py-1 rounded border border-[#D6B36A]/30">
                      🏔️ Recommended Tour Package
                    </span>
                    <span className="text-xs text-[#A9AAA4]">100% Tailor-Made & Customizable</span>
                  </div>

                  <h4 className="text-base sm:text-lg font-extrabold text-[#F5F1E8]">
                    {activeArticle.relatedPackageTitle}
                  </h4>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
                    <p className="text-xs text-[#A9AAA4]">
                      Experience this exact itinerary with certified hill drivers, pre-cleared military permits, and warm hotel hospitality.
                    </p>

                    <div className="flex gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => handleOpenWhatsAppForBlog(activeArticle)}
                        className="bg-[#25D366] hover:bg-[#20BD5A] text-slate-950 font-bold px-4 py-2 rounded-lg text-xs transition-all shadow-md flex items-center justify-center gap-1.5 flex-1 sm:flex-initial"
                      >
                        <MessageCircle className="w-4 h-4 fill-slate-950" />
                        <span>Book On WhatsApp</span>
                      </button>

                      {onOpenAIChatWithTopic && (
                        <button
                          onClick={() => {
                            setActiveArticle(null);
                            onOpenAIChatWithTopic(activeArticle.title);
                          }}
                          className="btn-luxury-outline-light text-xs !py-2 !px-3 flex-1 sm:flex-initial"
                        >
                          Plan with AI
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Sticky Bar */}
            <div className="p-4 bg-[#111513] border-t border-[#D6B36A]/20 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => toggleLike(activeArticle.id, e)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-all ${
                    likedPosts[activeArticle.id]
                      ? 'bg-rose-950/80 border-rose-500 text-rose-400'
                      : 'bg-[#18352D] border-[#D6B36A]/30 text-[#A9AAA4] hover:text-[#F5F1E8]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${likedPosts[activeArticle.id] ? 'fill-rose-400' : ''}`} />
                  <span>{likedPosts[activeArticle.id] ? 'Liked' : 'Like'}</span>
                </button>

                <button
                  onClick={(e) => toggleBookmark(activeArticle.id, e)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-all ${
                    bookmarkedPosts[activeArticle.id]
                      ? 'bg-[#D6B36A] text-[#0B0F0E] border-[#D6B36A]'
                      : 'bg-[#18352D] border-[#D6B36A]/30 text-[#A9AAA4] hover:text-[#F5F1E8]'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${bookmarkedPosts[activeArticle.id] ? 'fill-[#0B0F0E]' : ''}`} />
                  <span>{bookmarkedPosts[activeArticle.id] ? 'Saved' : 'Save'}</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleOpenWhatsAppForBlog(activeArticle)}
                  className="bg-[#25D366] hover:bg-[#20BD5A] text-slate-950 font-bold px-4 py-2 rounded-lg text-xs transition-all shadow-md flex items-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>Ask Local Expert</span>
                </button>

                <button
                  onClick={() => setActiveArticle(null)}
                  className="btn-luxury-outline-light text-xs !py-2 !px-4"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
