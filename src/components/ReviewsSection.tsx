import React, { useState } from 'react';
import { Star, MessageSquare, Send, CheckCircle2, User } from 'lucide-react';
import { Review, Attraction } from '../types';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
import
interface ReviewsSectionProps {
  reviews: Review[];
  attractions: Attraction[];
  onAddReview: (review: Omit<if
constonstonstonst
iff (!authorName.trim() || !comment.trim()) return;ff

    // บันทึกคอมเมนต์ลง Supabase
    const { error } = await supabase.from('comments').insertiff
export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  attractions,
  onAddReview
}) => {
  const [authorName, setAuthorName] = useState('');
  const [attractionId, setAttractionId] = useState(attractions[0]?.id || '');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
              if (!authorName.trim() || !comment.trim()) return;
              
                  // บันทึกคอมเมนต์ลง Supabase
                      const { error } = await supabase.from('comments').insert([
                            {
                                    name: authorName,
                                            content: comment,
                                                    rating: rating,
                                                            attraction_id: attractionId
                                                                  }
                                                                      ]);
                                                                      
                                                                          if (error) {
                                                                                console.error('Error saving comment:', error);
                                                                                    } else {
                                                                                          onAddReview({
                                                                                                  authorName,
                                                                                                          comment,
                                                                                                                  rating,
                                                                                                                          attractionId
                                                                                                                                });
                                                                                                                                
                                                                                                                                      setComment('');
                                                                                                                                            setShowSuccessToast(true);
                                                                                                                                                }
                                                                                                                                                  };
                                                                                                                                                  ienteateClientateClientteClienteClienteClientntteClienteClientClientlientiententnttifififififf
      rating,
      comment: comment.trim()
    });

    setAuthorName('');constconstconst
    setComment('');constconstconstconstconst
    setRating(5);const
    setShowSuccessToast(true);

    setTimeout(() => {
      setShowSuccessToast(false);
    }, 4000);
  };

  return (
    <section id="reviews" className="py-16 md:py-20 bg-[#FDFBF7] border-t border-[#E5D5C0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F2ED] text-[#8B5E3C] border border-[#E5D5C0] text-xs font-semibold">
            <MessageSquare className="w-3.5 h-3.5 text-[#5A5A40]" />
            <span>เสียงตอบรับจากนักเดินทาง</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#5A5A40] tracking-tight">
            รีวิวสถานที่ท่องเที่ยวสุรินทร์
          </h2>
          <p className="text-[#2D2D2A]/80 text-sm sm:text-base">
            แบ่งปันความประทับใจ ให้คะแนนดาว และแนะนำประสบการณ์ดีๆ แก่นักท่องเที่ยวท่านอื่น
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Add Review Form */}
          <div className="lg:col-span-5 bg-white rounded-xl p-5 sm:p-6 border border-[#E5D5C0] shadow-sm space-y-4">
            <div className="space-y-1 pb-3 border-b border-[#E5D5C0]/70">
              <h3 className="font-heading font-bold text-lg text-[#5A5A40] flex items-center gap-2">
                <Star className="w-4 h-4 text-[#C5A059] fill-[#C5A059]" />
                <span>เขียนรีวิวของคุณ</span>
              </h3>
              <p className="text-xs text-[#8B5E3C]">
                ข้อมูลรีวิวจะถูกจัดเก็บลงใน LocalStorage ของเบราว์เซอร์
              </p>
            </div>

            {showSuccessToast && (
              <div className="p-3 rounded-lg bg-[#F5F2ED] border border-[#C5A059] text-[#2D2D2A] text-xs flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-[#5A5A40] shrink-0" />
                <span>ส่งรีวิวสำเร็จ ขอบคุณที่ร่วมแบ่งปันประสบการณ์ครับ!</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              {/* Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#8B5E3C] block">
                  ชื่อของคุณ หรือนามแฝง *
                </label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="เช่น สมชาย ใจดี, คุณพลอย"
                  className="w-full px-3 py-2 rounded-lg bg-[#FDFBF7] border border-[#E5D5C0] focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 outline-none text-xs sm:text-sm text-[#2D2D2A]"
                />
              </div>

              {/* Attraction Selection */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#8B5E3C] block">
                  เลือกสถานที่ที่ต้องการรีวิว *
                </label>
                <select
                  value={attractionId}
                  onChange={(e) => setAttractionId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#FDFBF7] border border-[#E5D5C0] focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 outline-none text-xs sm:text-sm text-[#2D2D2A] cursor-pointer"
                >
                  {attractions.map((place) => (
                    <option key={place.id} value={place.id}>
                      {place.name} ({place.district})
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating Star Selector */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#8B5E3C] block">
                  ระดับความประทับใจ (1–5 ดาว) *
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 text-[#E5D5C0] hover:scale-110 transition-transform cursor-pointer"
                        aria-label={`ให้คะแนน ${star} ดาว`}
                      >
                        <Star
                          className={`w-5 h-5 ${
                            (hoverRating || rating) >= star
                              ? 'text-[#C5A059] fill-[#C5A059]'
                              : 'text-[#E5D5C0]'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#8B5E3C] ml-1">
                    {rating === 5 && 'ยอดเยี่ยมมาก'}
                    {rating === 4 && 'ดีมาก'}
                    {rating === 3 && 'ปานกลาง'}
                    {rating === 2 && 'พอใช้'}
                    {rating === 1 && 'ควรปรับปรุง'}
                  </span>
                </div>
              </div>

              {/* Comment */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#8B5E3C] block">
                  ความคิดเห็นหรือข้อแนะนำ *
                </label>
                <textarea
                  required
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="เขียนรีวิว เช่น บรรยากาศร่มรื่น วิวสวย อาหารอร่อย หรือข้อควรระวัง..."
                  className="w-full px-3 py-2 rounded-lg bg-[#FDFBF7] border border-[#E5D5C0] focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 outline-none text-xs sm:text-sm text-[#2D2D2A] resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
        