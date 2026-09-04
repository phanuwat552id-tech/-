import React from 'react';
import { Heart, X, Eye, ArrowRight } from 'lucide-react';
import { Attraction } from '../types';

interface FavoritesSectionProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Attraction[];
  onToggleFavorite: (id: string) => void;
  onOpenDetail: (attraction: Attraction) => void;
  onExploreMore: () => void;
}

export const FavoritesSection: React.FC<FavoritesSectionProps> = ({
  isOpen,
  onClose,
  favorites,
  onToggleFavorite,
  onOpenDetail,
  onExploreMore,
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
      id="favorites-modal-backdrop"
    >
      <div 
        className="relative w-full max-w-2xl max-h-[85vh] bg-[#FDFBF7] rounded-2xl shadow-2xl border border-[#E5D5C0] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#F5F2ED] border-b border-[#E5D5C0] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#5A5A40] text-white flex items-center justify-center shadow-xs">
              <Heart className="w-4 h-4 fill-white" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-[#5A5A40]">
                สถานที่ท่องเที่ยวโปรดของฉัน
              </h3>
              <p className="text-xs text-[#8B5E3C] font-medium">
                บันทึกไว้ทั้งหมด {favorites.length} สถานที่ (LocalStorage)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#E5D5C0] text-[#8B5E3C] transition-colors cursor-pointer"
            aria-label="ปิด"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1">
          {favorites.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#F5F2ED] text-[#8B5E3C] flex items-center justify-center mx-auto text-2xl border border-[#E5D5C0]">
                ❤️
              </div>
              <h4 className="font-heading font-bold text-base text-[#5A5A40]">
                ยังไม่มีสถานที่โปรดในรายการ
              </h4>
              <p className="text-xs text-[#8B5E3C] max-w-xs mx-auto">
                กดปุ่มรูปหัวใจ ❤️ ที่การ์ดสถานที่ท่องเที่ยวเพื่อบันทึกรายการที่คุณอยากไป
              </p>
              <button
                onClick={() => {
                  onClose();
                  onExploreMore();
                }}
                className="mt-2 px-4 py-2 rounded-full bg-[#C5A059] text-white text-xs font-semibold hover:bg-[#8B5E3C] transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>เลือกชมสถานที่ท่องเที่ยว</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {favorites.map((place) => (
                <div
                  key={place.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#E5D5C0] hover:border-[#C5A059] transition-all gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={place.imageUrl}
                      alt={place.name}
                      className="w-12 h-12 rounded-lg object-cover shrink-0 border border-[#E5D5C0]"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-[#C5A059] text-white">
                          {place.category}
                        </span>
                        <span className="text-[11px] text-[#8B5E3C] truncate">
                          {place.district}
                        </span>
                      </div>
                      <h5 className="font-heading font-bold text-xs sm:text-sm text-[#2D2D2A] truncate">
                        {place.name}
                      </h5>
                      <span className="text-[11px] text-[#8B5E3C] truncate block">
                        {place.fee}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => {
                        onClose();
                        onOpenDetail(place);
                      }}
                      className="p-1.5 text-[#8B5E3C] hover:text-[#5A5A40] hover:bg-[#F5F2ED] rounded-lg text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer"
                      title="ดูรายละเอียด"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="hidden sm:inline text-xs">ดูข้อมูล</span>
                    </button>

                    <button
                      onClick={() => onToggleFavorite(place.id)}
                      className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="นำออกจากสถานที่โปรด"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-white border-t border-[#E5D5C0] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#5A5A40] hover:bg-[#2D2D2A] text-white rounded-full text-xs font-semibold transition-colors cursor-pointer"
          >
            ปิดหน้าต่าง
          </button>
        </div>

      </div>
    </div>
  );
};
