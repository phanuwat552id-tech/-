import React from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#5A5A40] text-[#F5F2ED] border-t border-[#E5D5C0] pt-12 pb-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-white/15">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#C5A059] flex items-center justify-center text-white text-base">
                🐘
              </div>
              <span className="font-heading font-bold text-lg text-white">
                เที่ยวสุรินทร์ <span className="text-[#C5A059]">เมืองช้าง</span>
              </span>
            </div>
            <p className="text-xs text-[#E5D5C0] max-w-md leading-relaxed">
              เว็บไซต์แนะนำสถานที่ท่องเที่ยวสำคัญของจังหวัดสุรินทร์ 
              รวบรวมข้อมูลธรรมชาติ ประวัติศาสตร์ขอมโบราณ วิถีชีวิตคนกับช้าง และมรดกผ้าไหมยกทองระดับโลก
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] text-[#C5A059] font-medium">
              <Sparkles className="w-3 h-3" />
              <span>โครงการพัฒนาทักษะวิชาการเพื่อการศึกษา</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#C5A059]">
              เมนูลัด
            </h4>
            <ul className="space-y-1.5 text-xs text-[#E5D5C0]">
              <li>
                <a href="#places" className="hover:text-white transition-colors">
                  สถานที่ท่องเที่ยวทั้งหมด
                </a>
              </li>
              <li>
                <a href="#budget" className="hover:text-white transition-colors">
                  ระบบคำนวณงบประมาณเที่ยว
                </a>
              </li>
              <li>
                <a href="#mytrip" className="hover:text-white transition-colors">
                  ทริปของฉัน (My Trip)
                </a>
              </li>
              <li>
                <a href="#itinerary" className="hover:text-white transition-colors">
                  เส้นทางท่องเที่ยวแนะนำ
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  รีวิวจากผู้เยี่ยมชม
                </a>
              </li>
            </ul>
          </div>

          {/* Tourism Contacts */}
          <div className="space-y-2.5">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#C5A059]">
              สายด่วนการท่องเที่ยว
            </h4>
            <ul className="space-y-1.5 text-xs text-[#E5D5C0]">
              <li className="flex items-center gap-1.5">
                <span className="text-[#C5A059]">•</span>
                <span>ททท. สุรินทร์: 044-514447</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-[#C5A059]">•</span>
                <span>ศูนย์ดำรงธรรม สุรินทร์: 1567</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-[#C5A059]">•</span>
                <span>สายด่วนท่องเที่ยว: 1672</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-[#C5A059]">•</span>
                <span>ตำรวจท่องเที่ยว: 1155</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-[#C5A059]">•</span>
                <span>สภ.เมืองสุรินทร์: 044-511007</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E5D5C0]">
          <div className="space-y-0.5 text-center sm:text-left">
            <p className="font-medium text-white">
              โครงการพัฒนาทักษะวิชาการ: การสร้างเว็บไซต์แนะนำการท่องเที่ยวท้องถิ่น (จังหวัดสุรินทร์)
            </p>
            <p className="text-[11px] text-[#E5D5C0]/80">
              จัดทำโดยนักเรียนเพื่อการศึกษา | ภาษาไทย 100% | รองรับการทำงานแบบ Responsive
            </p>
          </div>

          {/* Back to Top Button */}
          <button
            id="back-to-top-btn"
            onClick={scrollToTop}
            className="px-4 py-2 rounded-full bg-[#C5A059] hover:bg-[#8B5E3C] text-white transition-all flex items-center gap-2 cursor-pointer shadow-xs text-xs font-semibold"
            title="กลับขึ้นสู่ด้านบน"
          >
            <span>กลับสู่ด้านบน</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
