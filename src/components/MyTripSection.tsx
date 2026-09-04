import React from 'react';
import { 
  Luggage, 
  Trash2, 
  Ticket, 
  Printer, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Attraction } from '../types';

interface MyTripSectionProps {
  tripPlaces: Attraction[];
  onRemoveFromTrip: (id: string) => void;
  onClearTrip: () => void;
  onOpenDetail: (attraction: Attraction) => void;
  onExploreMore: () => void;
}

export const MyTripSection: React.FC<MyTripSectionProps> = ({
  tripPlaces,
  onRemoveFromTrip,
  onClearTrip,
  onOpenDetail,
  onExploreMore
}) => {
  const estimatedAdmissionCost = tripPlaces.reduce((sum, item) => sum + (item.estimatedFeeNum || 0), 0);

  const handlePrintTrip = () => {
    window.print();
  };

  return (
    <section id="mytrip" className="py-16 md:py-20 bg-[#FDFBF7] border-t border-[#E5D5C0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F2ED] text-[#8B5E3C] border border-[#E5D5C0] text-xs font-semibold">
              <Luggage className="w-3.5 h-3.5 text-[#5A5A40]" />
              <span>บันทึกด้วยระบบ LocalStorage</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#5A5A40] tracking-tight">
              ทริปการเดินทางของฉัน
            </h2>
            <p className="text-[#2D2D2A]/80 text-sm sm:text-base">
              รายการสถานที่ที่คุณเลือกไว้สำหรับการเดินทางท่องสุรินทร์
            </p>
          </div>

          {/* Quick Action Tools */}
          {tripPlaces.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrintTrip}
                className="px-3.5 py-2 text-xs font-medium rounded-lg border border-[#E5D5C0] bg-white hover:bg-[#F5F2ED] text-[#8B5E3C] flex items-center gap-1.5 cursor-pointer transition-colors"
                title="พิมพ์รายการทริป"
              >
                <Printer className="w-4 h-4 text-[#8B5E3C]" />
                <span>พิมพ์/บันทึก PDF</span>
              </button>
              
              <button
                onClick={onClearTrip}
                className="px-3.5 py-2 text-xs font-medium rounded-lg border border-[#E5D5C0] bg-white hover:bg-rose-50 text-rose-700 flex items-center gap-1.5 cursor-pointer transition-colors"
                title="ล้างรายการสถานที่ทั้งหมดในทริป"
              >
                <Trash2 className="w-4 h-4 text-rose-600" />
                <span>ล้างทริปทั้งหมด</span>
              </button>
            </div>
          )}
        </div>

        {/* Content Area */}
        {tripPlaces.length === 0 ? (
          /* Empty State */
          <div className="p-10 sm:p-14 text-center rounded-xl border border-dashed border-[#E5D5C0] bg-white space-y-4 max-w-xl mx-auto shadow-xs">
            <div className="w-14 h-14 rounded-full bg-[#F5F2ED] text-[#5A5A40] flex items-center justify-center mx-auto text-2xl border border-[#E5D5C0]">
              🐘
            </div>
            <div className="space-y-1">
              <h3 className="font-heading font-bold text-lg text-[#5A5A40]">
                ยังไม่มีสถานที่ในทริปของคุณ
              </h3>
              <p className="text-xs text-[#8B5E3C] max-w-sm mx-auto">
                เริ่มต้นจัดทริปง่ายๆ เพียงเลื่อนไปดูที่ส่วนสถานที่ท่องเที่ยว แล้วกดปุ่ม 
                <strong> “เพิ่มลงทริปของฉัน”</strong> ในสถานที่ที่คุณอยากไป
              </p>
            </div>
            <button
              onClick={onExploreMore}
              className="px-5 py-2.5 bg-[#C5A059] hover:bg-[#8B5E3C] text-white text-xs font-semibold rounded-full shadow-xs transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <span>เลือกสถานที่ท่องเที่ยว</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          /* Trip Summary & Items List */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            
            {/* Left: Selected Places List */}
            <div className="lg:col-span-8 space-y-3">
              {tripPlaces.map((place, index) => (
                <div
                  key={place.id}
                  className="bg-white rounded-xl p-4 border border-[#E5D5C0] shadow-xs hover:border-[#C5A059] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5">
                    {/* Order Badge */}
                    <div className="w-7 h-7 rounded-full bg-[#5A5A40] text-white font-heading font-bold text-xs flex items-center justify-center shrink-0">
                      {index + 1}
                    </div>

                    {/* Thumbnail Image */}
                    <img
                      src={place.imageUrl}
                      alt={place.name}
                      className="w-16 h-16 rounded-lg object-cover shrink-0 border border-[#E5D5C0]"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />

                    {/* Place Info */}
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C5A059] text-white">
                          {place.category}
                        </span>
                        <span className="text-[11px] text-[#8B5E3C]">
                          {place.district}
                        </span>
                      </div>
                      <h4 className="font-heading font-bold text-sm sm:text-base text-[#2D2D2A] leading-tight">
                        {place.name}
                      </h4>
                      <p className="text-[11px] text-[#2D2D2A]/80 line-clamp-1">
                        {place.shortDesc}
                      </p>
                      <div className="text-[11px] text-[#8B5E3C] flex items-center gap-1 pt-0.5">
                        <Ticket className="w-3 h-3 text-[#5A5A40]" />
                        <span>{place.fee}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex sm:flex-col items-center sm:items-end gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E5D5C0]/60">
                    <button
                      onClick={() => onOpenDetail(place)}
                      className="text-xs font-semibold text-[#8B5E3C] hover:text-[#C5A059] underline underline-offset-2 p-1 cursor-pointer"
                    >
                      ดูข้อมูล
                    </button>
                    <button
                      onClick={() => onRemoveFromTrip(place.id)}
                      className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="นำออกจากทริป"
                      aria-label="ลบสถานที่"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Trip Statistics & Checklist Card */}
            <div className="lg:col-span-4 bg-white rounded-xl p-5 sm:p-6 border border-[#E5D5C0] shadow-sm space-y-5 sticky top-24">
              <div className="space-y-1 border-b border-[#E5D5C0]/80 pb-3">
                <span className="text-xs font-bold text-[#C5A059] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  สรุปรายละเอียดทริป
                </span>
                <h3 className="font-heading font-bold text-lg text-[#5A5A40]">
                  ข้อมูลการเดินทาง
                </h3>
              </div>

              {/* Stats */}
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center py-1">
                  <span className="text-[#8B5E3C]">จำนวนสถานที่ที่เลือก</span>
                  <span className="font-heading font-bold text-lg text-[#5A5A40]">
                    {tripPlaces.length} แห่ง
                  </span>
                </div>

                <div className="flex justify-between items-center py-1 border-t border-[#E5D5C0]/60 pt-2.5">
                  <span className="text-[#8B5E3C]">ค่าเข้าชมรวมโดยประมาณ</span>
                  <span className="font-bold text-[#2D2D2A]">
                    {estimatedAdmissionCost > 0 ? `฿${estimatedAdmissionCost}/คน` : 'ฟรีทุกแห่ง'}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1 border-t border-[#E5D5C0]/60 pt-2.5">
                  <span className="text-[#8B5E3C]">ระยะเวลาแนะนำ</span>
                  <span className="font-bold text-[#2D2D2A]">
                    {tripPlaces.length <= 3 ? '1 วัน' : tripPlaces.length <= 6 ? '2 วัน 1 คืน' : '3 วัน 2 คืน'}
                  </span>
                </div>
              </div>

              {/* Useful Notice */}
              <div className="p-3 rounded-lg bg-[#F5F2ED] border border-[#E5D5C0] text-xs text-[#2D2D2A]/80 space-y-1">
                <span className="font-bold text-[#5A5A40] block">💡 คำแนะนำการเดินทาง</span>
                <p>
                  สถานที่ในหน้านี้ถูกจัดเก็บใน LocalStorage อัตโนมัติ ข้อมูลจะไม่สูญหายแม้ปิดหน้าจอ
                </p>
              </div>

              {/* Add more button */}
              <button
                onClick={onExploreMore}
                className="w-full py-2.5 rounded-full bg-[#C5A059] hover:bg-[#8B5E3C] text-white font-semibold text-xs transition-colors text-center cursor-pointer shadow-xs"
              >
                + เพิ่มสถานที่อื่นลงในทริป
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
