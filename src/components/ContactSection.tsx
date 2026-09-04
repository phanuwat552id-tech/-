import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');

    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <section id="contact" className="py-16 md:py-20 bg-[#FDFBF7] border-t border-[#E5D5C0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F2ED] text-[#8B5E3C] border border-[#E5D5C0] text-xs font-semibold">
            <Mail className="w-3.5 h-3.5 text-[#5A5A40]" />
            <span>ช่องทางติดต่อสอบถาม</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#5A5A40] tracking-tight">
            ติดต่อเรา & ข้อมูลจังหวัดสุรินทร์
          </h2>
          <p className="text-[#2D2D2A]/80 text-sm sm:text-base">
            ส่งข้อความเสนอแนะ ติดต่อผู้จัดทำโครงงาน หรือสอบถามข้อมูลการท่องเที่ยวจังหวัดสุรินทร์
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Info & Tourist Hotlines */}
          <div className="lg:col-span-5 bg-white rounded-xl p-5 sm:p-7 border border-[#E5D5C0] shadow-sm space-y-5">
            
            <div>
              <h3 className="font-heading font-bold text-lg sm:text-xl text-[#5A5A40]">
                เที่ยวสุรินทร์ เมืองช้าง
              </h3>
              <p className="text-xs text-[#8B5E3C] font-medium mt-1">
                โครงงานพัฒนาเว็บไซต์แนะนำสถานที่ท่องเที่ยวเชิงการศึกษา
              </p>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm text-[#2D2D2A]">
              
              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F5F2ED] border border-[#E5D5C0] flex items-center justify-center text-[#5A5A40] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#5A5A40] block text-xs">ที่ตั้งโครงการ</span>
                  <span className="text-xs text-[#2D2D2A]/80">
                    จังหวัดสุรินทร์ 32000 (ดินแดนปราสาทหิน ถิ่นช้างใหญ่ ผ้าไหมงาม ประคำสวย)
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F5F2ED] border border-[#E5D5C0] flex items-center justify-center text-[#5A5A40] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#5A5A40] block text-xs">อีเมลติดต่อ (โครงงาน)</span>
                  <span className="text-xs text-[#2D2D2A]/80">contact@surin-travel.edu</span>
                </div>
              </div>

              {/* Social Media */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F5F2ED] border border-[#E5D5C0] flex items-center justify-center text-[#5A5A40] shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#5A5A40] block text-xs">โซเชียลมีเดีย</span>
                  <span className="text-xs text-[#2D2D2A]/80 block">Facebook: facebook.com/SurinTravelEdu</span>
                  <span className="text-xs text-[#2D2D2A]/80 block">Instagram: @surin_elephant_city</span>
                </div>
              </div>

              {/* Tourism Hotlines */}
              <div className="flex items-start gap-3 pt-2 border-t border-[#E5D5C0]/60">
                <div className="w-8 h-8 rounded-lg bg-[#F5F2ED] border border-[#E5D5C0] flex items-center justify-center text-[#C5A059] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#5A5A40] block text-xs">สายด่วนท่องเที่ยวทางการ</span>
                  <span className="text-xs text-[#2D2D2A]/80 block">ททท. สำนักงานสุรินทร์: 044-514447</span>
                  <span className="text-xs text-[#2D2D2A]/80 block">สายด่วนตำรวจท่องเที่ยว: 1155</span>
                  <span className="text-xs text-[#2D2D2A]/80 block">สายด่วนข้อมูลท่องเที่ยว: 1672</span>
                </div>
              </div>

            </div>

            {/* Student Note Badge */}
            <div className="p-3 rounded-lg bg-[#F5F2ED] border border-[#E5D5C0] text-xs text-[#8B5E3C]">
              <span className="font-bold text-[#5A5A40] block mb-1">หมายเหตุสำหรับครูและนักเรียน:</span>
              <p className="text-[11px] leading-relaxed">
                เว็บไซต์นี้พัฒนาขึ้นเพื่อวัตถุประสงค์ทางการศึกษา นำเสนอข้อมูลสถานที่ท่องเที่ยวจริงของจังหวัดสุรินทร์เพื่อสนับสนุนการเรียนรู้ด้านคอมพิวเตอร์และการพัฒนาเว็บ
              </p>
            </div>

          </div>

          {/* Right: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-xl p-5 sm:p-7 border border-[#E5D5C0] shadow-sm space-y-4">
            <div className="space-y-1 pb-3 border-b border-[#E5D5C0]/70">
              <h3 className="font-heading font-bold text-lg text-[#5A5A40]">
                แบบฟอร์มส่งข้อความ
              </h3>
              <p className="text-xs text-[#8B5E3C]">
                กรอกข้อมูลเพื่อส่งข้อความหรือสอบถามข้อมูลเพิ่มเติม
              </p>
            </div>

            {isSubmitted && (
              <div className="p-3.5 rounded-lg bg-[#F5F2ED] border border-[#C5A059] text-[#2D2D2A] text-xs flex items-start gap-2.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-[#5A5A40] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#5A5A40] block">ส่งข้อความสำเร็จเรียบร้อย!</span>
                  <span>ขอบคุณสำหรับความคิดเห็น ข้อความของคุณจะช่วยให้เว็บไซต์นี้ดียิ่งขึ้นครับ</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#8B5E3C] block">
                    ชื่อ-นามสกุล *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="เช่น ด.ช. ภูวนัย ชัยชนะ"
                    className="w-full px-3 py-2 rounded-lg bg-[#FDFBF7] border border-[#E5D5C0] focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 outline-none text-xs sm:text-sm text-[#2D2D2A]"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#8B5E3C] block">
                    อีเมลติดต่อกลับ *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full px-3 py-2 rounded-lg bg-[#FDFBF7] border border-[#E5D5C0] focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 outline-none text-xs sm:text-sm text-[#2D2D2A]"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#8B5E3C] block">
                  ข้อความ / ข้อเสนอแนะ *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="พิมพ์ข้อความที่นี่ เช่น สอบถามเส้นทาง แนะนำสถานที่ท่องเที่ยวเพิ่มเติม หรือชื่นชมผลงาน..."
                  className="w-full px-3 py-2 rounded-lg bg-[#FDFBF7] border border-[#E5D5C0] focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 outline-none text-xs sm:text-sm text-[#2D2D2A] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 bg-[#C5A059] hover:bg-[#8B5E3C] text-white font-semibold text-xs sm:text-sm rounded-full shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>ส่งข้อความ</span>
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
