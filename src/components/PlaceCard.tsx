import React, { useState } from 'react';
import { Heart, Clock, Ticket, ExternalLink, Plus, Check, Eye } from 'lucide-react';
import { Attraction } from '../types';

interface PlaceCardProps {
  attraction: Attraction;
  isFavorite: boolean;
  isInTrip: boolean;
  onToggleFavorite: (id: string) => void;
  onToggleTrip: (id: string) => void;
  onOpenDetail: (attraction: Attraction) => void;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({
  attraction,
  isFavorite,
  isInTrip,
  onToggleFavorite,
  onToggleTrip,
  onOpenDetail,
}) => {
  const [imgError, setImgError] = useState(false);

  const handleOpenMap = (e: React.MouseEvent) => {
    e.stopPropagation();
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(attraction.mapQuery || `${attraction.name} สุรินทร์`)}`;
    window.open(mapUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      id={`place-card-${attraction.id}`}
      className="group bg-white rounded-xl overflow-hidden border border-[#E5D5C0] shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col h-full"
    >
      {/* Image Header with Natural Tones Badges */}
      <div className="relative h-48 sm:h-52 overflow-hidden bg-[#F5F2ED]">
        {!imgError ? (
          <img
            src={attraction.imageUrl}
            alt={attraction.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#5A5A40] text-white p-4 text-center">
            <span className="text-3xl mb-1">🐘</span>
            <span className="font-heading font-semibold text-sm">{attraction.name}</span>
            <span className="text-xs text-[#E5D5C0] mt-0.5">{attraction.district}</span>
          </div>
        )}

        {/* Natural Tones Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D2D2A]/80 via-transparent to-[#2D2D2A]/30 pointer-events-none" />

        {/* Category & District Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 items-center">
          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#C5A059] text-white shadow-2xs">
            {attraction.category}
          </span>
          <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#2D2D2A]/70 backdrop-blur-xs text-[#E5D5C0] border border-white/20">
            {attraction.district}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          id={`fav-btn-${attraction.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(attraction.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-xs transition-all cursor-pointer shadow-xs border ${
            isFavorite
              ? 'bg-[#8B5E3C] text-white border-[#8B5E3C]'
              : 'bg-white/90 text-[#8B5E3C] border-[#E5D5C0] hover:bg-white hover:text-rose-600'
          }`}
          title={isFavorite ? 'นำออกจากสถานที่โปรด' : 'บันทึกเป็นสถานที่โปรด'}
          aria-label="บันทึกเป็นสถานที่โปรด"
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Bottom Place Name on Image */}
        <div className="absolute bottom-2.5 left-3 right-3 text-white pointer-events-none">
          <h3 className="font-heading font-bold text-base sm:text-lg leading-snug drop-shadow-md">
            {attraction.name}
          </h3>
          <p className="text-[10px] text-[#E5D5C0] font-medium drop-shadow-xs">
            {attraction.nameEn}
          </p>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-3">
        
        {/* Short Description */}
        <p className="text-xs text-[#2D2D2A]/80 line-clamp-2 leading-relaxed">
          {attraction.shortDesc}
        </p>

        {/* Hours & Fee Details */}
        <div className="space-y-1 pt-2 border-t border-[#E5D5C0]/60 text-[11px] text-[#8B5E3C]">
          <div className="flex items-start gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#5A5A40] shrink-0 mt-0.5" />
            <span className="line-clamp-1">{attraction.hours}</span>
          </div>
          <div className="flex items-start gap-1.5">
            <Ticket className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
            <span className="line-clamp-1 font-medium text-[#2D2D2A]">{attraction.fee}</span>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="pt-2 border-t border-[#E5D5C0]/60 space-y-2">
          
          {/* Details & Maps */}
          <div className="flex items-center justify-between gap-2">
            <button
              id={`detail-btn-${attraction.id}`}
              onClick={() => onOpenDetail(attraction)}
              className="flex-1 text-[11px] font-semibold bg-[#5A5A40] hover:bg-[#8B5E3C] text-white px-3 py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-xs"
            >
              <Eye className="w-3 h-3 text-[#E5D5C0]" />
              <span>รายละเอียด</span>
            </button>

            <button
              id={`map-btn-${attraction.id}`}
              onClick={handleOpenMap}
              className="text-[11px] font-medium text-[#8B5E3C] bg-[#F5F2ED] hover:bg-[#E5D5C0] border border-[#E5D5C0] px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
              title="เปิด Google Maps ในแท็บใหม่"
            >
              <ExternalLink className="w-3 h-3 text-[#8B5E3C]" />
              <span>แผนที่</span>
            </button>
          </div>

          {/* Add to Trip Action Button */}
          <button
            id={`trip-btn-${attraction.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleTrip(attraction.id);
            }}
            className={`w-full py-1.5 px-3 text-[11px] font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              isInTrip
                ? 'bg-[#C5A059] text-white shadow-2xs hover:bg-[#8B5E3C]'
                : 'bg-white text-[#8B5E3C] border border-[#E5D5C0] hover:bg-[#F5F2ED]'
            }`}
          >
            {isInTrip ? (
              <>
                <Check className="w-3 h-3 text-white" />
                <span>อยู่ในทริปของคุณแล้ว</span>
              </>
            ) : (
              <>
                <Plus className="w-3 h-3 text-[#8B5E3C]" />
                <span>เพิ่มลงทริปของฉัน</span>
              </>
            )}
          </button>

        </div>

      </div>
    </div>
  );
};
