import React from 'react';
import { Search, Calendar, Sparkles, Award, MapPin, Compass } from 'lucide-react';

interface HeroProps {
  onExploreClick?: () => void;
  onSearchClick?: () => void;
  onPlanTripClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onExploreClick, 
  onSearchClick, 
  onPlanTripClick 
}) => {
  const handleSearchClick = onExploreClick || onSearchClick || (() => {});
  const handlePlanTripClick = onPlanTripClick || (() => {});

  return (
    <section id="hero" className="relative overflow-hidden bg-[#FDFBF7]">
      
      {/* 1. Natural Tones Signature Banner */}
      <div className="bg-[#5A5A40] relative overflow-hidden py-10 sm:py-12 border-b border-[#E5D5C0]">
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none" 
          style={{ 
            backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', 
            backgroundSize: '12px 12px' 
          }} 
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-2 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-[#E5D5C0] text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>ยินดีต้อนรับสู่ดินแดนอีสานใต้ แหล่งรวมอารยธรรมขอมโบราณ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              ค้นพบเสน่ห์<span className="text-[#C5A059]">เมืองช้าง</span>
            </h2>
            <p className="text-[#E5D5C0] text-sm sm:text-base leading-relaxed max-w-2xl">
              สัมผัสธรรมชาติ วัฒนธรรม และประวัติศาสตร์ที่งดงามของจังหวัดสุรินทร์ แหล่งรวมอารยธรรมขอมโบราณและวิถีคนเลี้ยงช้างที่ใหญ่ที่สุดในโลก
            </p>
          </div>
        </div>
      </div>

      {/* 2. Hero Interactive Content Section */}
      <div className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: Story, Philosophy & Buttons */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5F2ED] text-[#8B5E3C] border border-[#E5D5C0] text-xs sm:text-sm font-semibold shadow-2xs">
                <span>🐘 ถิ่นช้างใหญ่ ผ้าไหมงาม ประคำสวย ร่ำรวยวัฒนธรรม</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2D2D2A] tracking-tight leading-[1.2]">
                เที่ยวสุรินทร์ <span className="text-[#5A5A40]">วิถีธรรมชาติ</span> &amp; <span className="text-[#C5A059]">มรดกขอมโบราณ</span>
              </h1>

              <p className="text-base sm:text-lg text-[#8B5E3C] font-normal leading-relaxed">
                “ค้นพบเสน่ห์เมืองช้าง สัมผัสธรรมชาติ วัฒนธรรม และประวัติศาสตร์”
              </p>

              <p className="text-xs sm:text-sm text-[#2D2D2A]/80 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                สัมผัสความยิ่งใหญ่ของวิถีคนกับช้างที่ใหญ่ที่สุดในโลก ตระการตามรดกปราสาทหินขอมโบราณ 
                ผืนป่าธรรมชาติพนมสวาย และผ้าไหมยกทองชั้นสูงบ้านท่าสว่าง
              </p>

              {/* Call To Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  id="hero-search-places-btn"
                  onClick={handleSearchClick}
                  className="w-full sm:w-auto px-6 py-3 bg-[#C5A059] hover:bg-[#8B5E3C] text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer text-sm"
                >
                  <Search className="w-4 h-4 text-white" />
                  <span>ค้นหาสถานที่ท่องเที่ยว</span>
                </button>

                <button
                  id="hero-plan-trip-btn"
                  onClick={handlePlanTripClick}
                  className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-[#F5F2ED] text-[#5A5A40] border border-[#E5D5C0] font-semibold rounded-full shadow-xs hover:shadow-sm transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer text-sm"
                >
                  <Calendar className="w-4 h-4 text-[#8B5E3C]" />
                  <span>คำนวณงบประมาณเที่ยว</span>
                </button>
              </div>

              {/* Natural Highlights Tones */}
              <div className="pt-5 border-t border-[#E5D5C0] grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F5F2ED] border border-[#E5D5C0]">
                  <div className="w-8 h-8 rounded-lg bg-[#5A5A40] flex items-center justify-center text-white shrink-0">
                    <Award className="w-4 h-4 text-[#C5A059]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#2D2D2A]">หมู่บ้านช้าง</div>
                    <div className="text-[11px] text-[#8B5E3C]">ใหญ่ที่สุดในโลก</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F5F2ED] border border-[#E5D5C0]">
                  <div className="w-8 h-8 rounded-lg bg-[#5A5A40] flex items-center justify-center text-white shrink-0">
                    <Compass className="w-4 h-4 text-[#C5A059]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#2D2D2A]">ปราสาทศีขรภูมิ</div>
                    <div className="text-[11px] text-[#8B5E3C]">ทับหลังศิวนาฏราช</div>
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F5F2ED] border border-[#E5D5C0]">
                  <div className="w-8 h-8 rounded-lg bg-[#5A5A40] flex items-center justify-center text-white shrink-0">
                    <MapPin className="w-4 h-4 text-[#C5A059]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#2D2D2A]">วนอุทยานพนมสวาย</div>
                    <div className="text-[11px] text-[#8B5E3C]">ระฆัง 1,080 ใบ</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual Showcase in Natural Tones Frame */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Main Visual Card */}
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#E5D5C0] bg-[#5A5A40] group">
                  <img
                    src="https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1000&q=80"
                    alt="ช้างสุรินทร์และวิถีคนเลี้ยงช้าง ศูนย์คชศึกษาบ้านตากลาง"
                    className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  
                  {/* Natural tone overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D2D2A]/90 via-[#2D2D2A]/30 to-transparent" />

                  {/* Bottom Card Caption */}
                  <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#C5A059] text-white text-xs font-semibold mb-2">
                      <span>🐘 สัญลักษณ์ประจำจังหวัดสุรินทร์</span>
                    </div>
                    <h3 className="font-heading font-bold text-xl text-white">
                      ศูนย์คชศึกษา บ้านตากลาง
                    </h3>
                    <p className="text-xs text-[#E5D5C0] mt-1 line-clamp-2">
                      สัมผัสความน่ารักและความผูกพันอันแน่นแฟ้นระหว่างชาวกูยกับช้างไทย ณ อำเภอท่าตูม
                    </p>
                  </div>
                </div>

                {/* Floating Badge 1 (Top Right) */}
                <div className="absolute -top-3 -right-3 sm:-right-4 bg-white px-3.5 py-2 rounded-xl shadow-md border border-[#E5D5C0] flex items-center gap-2.5">
                  <span className="text-2xl" role="img" aria-label="ปราสาทหิน">🏛️</span>
                  <div>
                    <div className="text-xs font-bold text-[#5A5A40]">มรดกอารยธรรมขอม</div>
                    <div className="text-[11px] text-[#8B5E3C]">ปราสาทหินขอมโบราณ</div>
                  </div>
                </div>

                {/* Floating Badge 2 (Bottom Left) */}
                <div className="absolute -bottom-3 -left-3 sm:-left-4 bg-white px-3.5 py-2 rounded-xl shadow-md border border-[#E5D5C0] flex items-center gap-2.5">
                  <span className="text-2xl" role="img" aria-label="ธรรมชาติ">🌿</span>
                  <div>
                    <div className="text-xs font-bold text-[#5A5A40]">ธรรมชาติอุดมสมบูรณ์</div>
                    <div className="text-[11px] text-[#8B5E3C]">วนอุทยาน &amp; อ่างเก็บน้ำ</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
