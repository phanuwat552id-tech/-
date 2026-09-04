import React from 'react';
import { MapPin, Navigation, ExternalLink, Train, Car, Compass, Bus } from 'lucide-react';
import { ATTRACTIONS_DATA } from '../data/attractions';

export const InteractiveMapSection: React.FC = () => {
  const zones = [
    {
      title: 'โซนในเมืองสุรินทร์ & ธรรมชาติใกล้เมือง',
      districts: 'อำเภอเมืองสุรินทร์',
      icon: '🏙️',
      color: 'border-[#E5D5C0] bg-[#F5F2ED]',
      places: ATTRACTIONS_DATA.filter(p => p.district.includes('เมืองสุรินทร์'))
    },
    {
      title: 'โซนวิถีช้างใหญ่ & ริมแม่น้ำมูล',
      districts: 'อำเภอท่าตูม',
      icon: '🐘',
      color: 'border-[#E5D5C0] bg-[#F5F2ED]',
      places: ATTRACTIONS_DATA.filter(p => p.district.includes('ท่าตูม'))
    },
    {
      title: 'โซนอารยธรรมมรดกขอมโบราณ',
      districts: 'อำเภอศีขรภูมิ, อำเภอปราสาท, อำเภอสังขะ',
      icon: '🏛️',
      color: 'border-[#E5D5C0] bg-[#F5F2ED]',
      places: ATTRACTIONS_DATA.filter(p => !p.district.includes('เมืองสุรินทร์') && !p.district.includes('ท่าตูม'))
    }
  ];

  const handleOpenGoogleMaps = (query: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${query} สุรินทร์`)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleOpenSurinOverviewMap = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('สถานที่ท่องเที่ยว สุรินทร์')}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="map" className="py-16 md:py-20 bg-[#FDFBF7] border-t border-[#E5D5C0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F2ED] text-[#8B5E3C] border border-[#E5D5C0] text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5 text-[#5A5A40]" />
            <span>พิกัดและการเดินทางจริง</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#5A5A40] tracking-tight">
            แผนที่และการเดินทางท่องเที่ยวสุรินทร์
          </h2>
          <p className="text-[#2D2D2A]/80 text-sm sm:text-base">
            เชื่อมต่อตรงกับ Google Maps เพื่อการนำทางที่แม่นยำ ไม่ใช้พิกัดจำลอง พร้อมข้อมูลโซนท่องเที่ยวสำคัญ
          </p>
        </div>

        {/* Action Banner to Google Maps in Natural Tones */}
        <div className="bg-[#5A5A40] rounded-2xl p-6 sm:p-8 text-white shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-[#E5D5C0]">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/15 text-[#E5D5C0] text-xs font-semibold backdrop-blur-xs">
              <Navigation className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Google Maps Integration</span>
            </div>
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
              สำรวจแผนที่ท่องเที่ยวจังหวัดสุรินทร์
            </h3>
            <p className="text-xs sm:text-sm text-[#E5D5C0] max-w-xl">
              คลิกเพื่อเปิดแผนที่รวมสถานที่ท่องเที่ยว ร้านอาหาร และปั๊มน้ำมันในจังหวัดสุรินทร์บน Google Maps ได้ทันที
            </p>
          </div>

          <button
            id="open-surin-full-map-btn"
            onClick={handleOpenSurinOverviewMap}
            className="px-5 py-3 bg-[#C5A059] text-white hover:bg-[#8B5E3C] font-semibold text-xs sm:text-sm rounded-full shadow-md transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>เปิดแผนที่บน Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Zones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {zones.map((zone, idx) => (
            <div 
              key={idx}
              className="rounded-xl p-5 border border-[#E5D5C0] bg-white shadow-xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="text-2xl">{zone.icon}</div>
                <h4 className="font-heading font-bold text-base text-[#5A5A40]">
                  {zone.title}
                </h4>
                <p className="text-xs text-[#8B5E3C] font-medium">
                  {zone.districts}
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-[#E5D5C0]/60">
                <span className="text-[11px] font-bold text-[#8B5E3C] uppercase tracking-wider block">สถานที่ในโซนนี้:</span>
                <div className="space-y-1.5">
                  {zone.places.map((place) => (
                    <button
                      key={place.id}
                      onClick={() => handleOpenGoogleMaps(place.mapQuery)}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg bg-[#F5F2ED] hover:bg-[#E5D5C0] text-xs font-medium text-[#2D2D2A] hover:text-[#5A5A40] flex items-center justify-between border border-[#E5D5C0] transition-colors cursor-pointer group"
                    >
                      <span className="truncate">{place.name}</span>
                      <ExternalLink className="w-3 h-3 text-[#8B5E3C] group-hover:text-[#5A5A40] shrink-0 ml-1" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* How to Get to Surin (Transport Guide) */}
        <div className="bg-white rounded-xl p-5 sm:p-7 border border-[#E5D5C0] shadow-xs space-y-5">
          <h3 className="font-heading font-bold text-lg text-[#5A5A40] flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#C5A059]" />
            <span>คำแนะนำการเดินทางมายังจังหวัดสุรินทร์</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-lg bg-[#F5F2ED] border border-[#E5D5C0] space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-[#5A5A40]">
                <Train className="w-4 h-4 text-[#8B5E3C]" />
                <span>โดยรถไฟ (สายอีสานใต้)</span>
              </div>
              <p className="text-[#2D2D2A]/80 leading-relaxed text-xs">
                มีรถไฟขบวนด่วนพิเศษ ด่วน และเร็ว ออกจากสถานีกลางกรุงเทพอภิวัฒน์ถึงสถานีรถไฟสุรินทร์และศีขรภูมิทุกวัน สะดวกสบาย
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-[#F5F2ED] border border-[#E5D5C0] space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-[#5A5A40]">
                <Car className="w-4 h-4 text-[#8B5E3C]" />
                <span>โดยรถยนต์ส่วนตัว</span>
              </div>
              <p className="text-[#2D2D2A]/80 leading-relaxed text-xs">
                จากกรุงเทพฯ ใช้ทางหลวงหมายเลข 1 (พหลโยธิน) แล้วตัดเข้าทางหลวงหมายเลข 24 ผ่านโชคชัย-นางรอง-ประโคนชัย สู่สุรินทร์ (~430 กม.)
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-[#F5F2ED] border border-[#E5D5C0] space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-[#5A5A40]">
                <Bus className="w-4 h-4 text-[#8B5E3C]" />
                <span>โดยรถประจำทาง / เครื่องบิน</span>
              </div>
              <p className="text-[#2D2D2A]/80 leading-relaxed text-xs">
                รถทัวร์ออกจากสถานีขนส่งหมอชิต 2 ตลอดวัน หรือนั่งเครื่องบินลงสนามบินบุรีรัมย์ (BFV) แล้วต่อรถตู้เข้าสุรินทร์เพียง 1 ชั่วโมง
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
