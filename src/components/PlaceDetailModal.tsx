import React, { useEffect } from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  Ticket, 
  Navigation, 
  ExternalLink, 
  Sparkles, 
  Heart, 
  Plus, 
  Check 
} from 'lucide-react';
import { Attraction } from '../types';

interface PlaceDetailModalProps {
  attraction: Attraction | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  isInTrip: boolean;
  onToggleFavorite: (id: string) => void;
  onToggleTrip: (id: string) => void;
}

export const PlaceDetailModal: React.FC<PlaceDetailModalProps> = ({
  attraction,
  isOpen,
  onClose,
  isFavorite,
  isInTrip,
  onToggleFavorite,
  onToggleTrip,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !attraction) return null;

  const handleOpenMap = () => {
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(attraction.mapQuery || `${attraction.name} สุรินทร์`)}`;
    window.open(mapUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
      id="place-detail-modal-backdrop"
    >
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#FDFBF7] rounded-2xl shadow-2xl border border-[#E5D5C0] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        id="place-detail-modal-container"
      >
        {/* Modal Header & Hero Image */}
        <div className="relative h-60 sm:h-72 w-full bg-[#5A5A40] shrink-0">
          <img
            src={attraction.imageUrl}
            alt={attraction.name}
            className="w-full h-full object-cover"
            loading="eager"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />

          {/* Close Button */}
          <button
            id="close-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-[#5A5A40] text-white transition-colors cursor-pointer z-10"
            aria-label="ปิดหน้าต่าง"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Category & District */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#C5A059] text-white shadow-sm">
              {attraction.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-md text-white border border-white/25">
              {attraction.district}
            </span>
          </div>

          {/* Title on Modal Image */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl leading-tight drop-shadow-md">
              {attraction.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#E5D5C0] font-medium mt-0.5">
              {attraction.nameEn}
            </p>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          
          {/* Detailed Description */}
          <div className="space-y-1.5">
            <h3 className="font-heading font-bold text-base sm:text-lg text-[#5A5A40] flex items-center gap-2">
              <span className="w-2 h-4 bg-[#C5A059] rounded-full inline-block" />
              รายละเอียดสถานที่
            </h3>
            <p className="text-[#2D2D2A]/85 leading-relaxed text-xs sm:text-sm whitespace-pre-line">
              {attraction.fullDesc}
            </p>
          </div>

          {/* Highlights Checklist */}
          {attraction.highlights && attraction.highlights.length > 0 && (
            <div className="bg-[#F5F2ED] border border-[#E5D5C0] rounded-xl p-4 space-y-2.5">
              <h4 className="font-heading font-bold text-[#5A5A40] text-xs sm:text-sm flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                จุดเด่นที่ไม่ควรพลาด
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#2D2D2A]">
                {attraction.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#5A5A40] font-bold mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Key Facts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-[#F5F2ED] border border-[#E5D5C0] space-y-1">
              <div className="flex items-center gap-1.5 text-[#5A5A40] font-bold">
                <Clock className="w-3.5 h-3.5 text-[#8B5E3C]" />
                <span>เวลาทำการ</span>
              </div>
              <p className="text-[#2D2D2A]/80 pl-5">{attraction.hours}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F5F2ED] border border-[#E5D5C0] space-y-1">
              <div className="flex items-center gap-1.5 text-[#5A5A40] font-bold">
                <Ticket className="w-3.5 h-3.5 text-[#8B5E3C]" />
                <span>ค่าธรรมเนียมเข้าชม</span>
              </div>
              <p className="text-[#2D2D2A]/80 pl-5">{attraction.fee}</p>
            </div>
          </div>

          {/* Location & Directions */}
          <div className="space-y-2.5 p-4 rounded-xl bg-[#F5F2ED] border border-[#E5D5C0] text-xs">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#8B5E3C] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#5A5A40] block">ที่อยู่และทำเลที่ตั้ง</span>
                <span className="text-[#2D2D2A]/80">{attraction.address}</span>
              </div>
            </div>

            <div className="flex items-start gap-2 pt-2 border-t border-[#E5D5C0]/60">
              <Navigation className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#5A5A40] block">วิธีเดินทาง</span>
                <span className="text-[#2D2D2A]/80">{attraction.travelHowTo}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="p-4 bg-white border-t border-[#E5D5C0] flex flex-wrap items-center justify-between gap-2.5 shrink-0">
          <div className="flex items-center gap-2">
            <button
              id="modal-toggle-fav-btn"
              onClick={() => onToggleFavorite(attraction.id)}
              className={`px-3 py-2 rounded-full border text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                isFavorite
                  ? 'bg-rose-50 border-rose-300 text-rose-700'
                  : 'bg-[#F5F2ED] border-[#E5D5C0] text-[#8B5E3C] hover:bg-[#E5D5C0]'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'text-rose-600 fill-rose-600' : 'text-[#8B5E3C]'}`} />
              <span>{isFavorite ? 'บันทึกเป็นที่โปรดแล้ว' : 'บันทึกเป็นที่โปรด'}</span>
            </button>

            <button
              id="modal-toggle-trip-btn"
              onClick={() => onToggleTrip(attraction.id)}
              className={`px-3 py-2 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                isInTrip
                  ? 'bg-[#5A5A40] text-white hover:bg-[#5A5A40]/90'
                  : 'bg-[#C5A059] text-white hover:bg-[#8B5E3C]'
              }`}
            >
              {isInTrip ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>อยู่ในทริปแล้ว</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>เพิ่มลงทริปของฉัน</span>
                </>
              )}
            </button>
          </div>

          <button
            id="modal-open-gmaps-btn"
            onClick={handleOpenMap}
            className="px-3.5 py-2 rounded-full bg-[#5A5A40] hover:bg-[#2D2D2A] text-white text-xs font-semibold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer ml-auto"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>เปิด Google Maps</span>
          </button>
        </div>

      </div>
    </div>
  );
};
