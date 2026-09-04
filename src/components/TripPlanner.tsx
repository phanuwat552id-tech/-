import React, { useState } from 'react';
import { 
  Calculator, 
  Users, 
  CalendarDays, 
  Coins, 
  Car, 
  Utensils, 
  Hotel, 
  Ticket, 
  ShoppingBag, 
  AlertCircle, 
  CheckCircle2, 
  Info 
} from 'lucide-react';

export const TripPlanner: React.FC = () => {
  const [days, setDays] = useState<number>(2);
  const [people, setPeople] = useState<number>(2);
  const [userBudget, setUserBudget] = useState<number>(4500);

  // Cost calculation formulas based on actual travel rates in Surin
  const calculateTransport = () => {
    if (days === 1) return 500;
    if (days === 2) return 1100;
    return 1600;
  };

  const calculateFood = () => {
    const costPerDayPerPerson = 320;
    return days * people * costPerDayPerPerson;
  };

  const calculateHotel = () => {
    if (days <= 1) return 0;
    const nights = days - 1;
    const rooms = Math.ceil(people / 2);
    const roomRatePerNight = 750;
    return nights * rooms * roomRatePerNight;
  };

  const calculateEntrance = () => {
    return people * (days === 1 ? 60 : 80);
  };

  const calculateMisc = () => {
    return people * (days * 120);
  };

  const transportCost = calculateTransport();
  const foodCost = calculateFood();
  const hotelCost = calculateHotel();
  const entranceCost = calculateEntrance();
  const miscCost = calculateMisc();

  const totalCost = transportCost + foodCost + hotelCost + entranceCost + miscCost;
  const isBudgetSufficient = userBudget >= totalCost;
  const budgetDifference = Math.abs(userBudget - totalCost);

  return (
    <section id="budget" className="py-16 md:py-20 bg-[#FDFBF7] border-t border-[#E5D5C0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F2ED] text-[#8B5E3C] border border-[#E5D5C0] text-xs font-semibold">
            <Calculator className="w-3.5 h-3.5 text-[#5A5A40]" />
            <span>เครื่องมือคำนวณงบประมาณเที่ยว</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#5A5A40] tracking-tight">
            ระบบวางแผนงบประมาณการท่องเที่ยว
          </h2>
          <p className="text-[#2D2D2A]/80 text-sm sm:text-base">
            กำหนดจำนวนวัน จำนวนผู้ร่วมเดินทาง และงบประมาณของคุณ ระบบจะช่วยคำนวณค่าใช้จ่ายเบื้องต้นแบบเรียลไทม์
          </p>
        </div>

        {/* Main Calculator Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Input Controls */}
          <div className="lg:col-span-5 bg-white rounded-xl p-5 sm:p-6 border border-[#E5D5C0] shadow-sm space-y-5">
            <h3 className="font-heading font-bold text-lg text-[#5A5A40] pb-3 border-b border-[#E5D5C0]/70 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C5A059]" />
              กำหนดเงื่อนไขการเดินทาง
            </h3>

            {/* 1. Duration Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#8B5E3C] flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5 text-[#5A5A40]" />
                <span>จำนวนวันที่ท่องเที่ยว</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDays(d)}
                    className={`py-2 px-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      days === d
                        ? 'bg-[#C5A059] text-white shadow-xs'
                        : 'bg-[#F5F2ED] hover:bg-[#E5D5C0] text-[#8B5E3C]'
                    }`}
                  >
                    {d} วัน {d > 1 ? `(${d - 1} คืน)` : '(ไป-กลับ)'}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Number of Travelers */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-[#8B5E3C] flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#5A5A40]" />
                  <span>จำนวนผู้ร่วมเดินทาง</span>
                </label>
                <span className="text-xs font-bold text-[#5A5A40] bg-[#F5F2ED] px-2.5 py-0.5 rounded-lg border border-[#E5D5C0]">
                  {people} คน
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                step="1"
                value={people}
                onChange={(e) => setPeople(Number(e.target.value))}
                className="w-full accent-[#5A5A40] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#8B5E3C]/80 font-medium">
                <span>1 คน</span>
                <span>4 คน (ครอบครัว)</span>
                <span>8 คน (หมู่คณะ)</span>
              </div>
            </div>

            {/* 3. User Budget */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#8B5E3C] flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>งบประมาณที่ตั้งไว้ (บาท)</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="500"
                  step="500"
                  value={userBudget}
                  onChange={(e) => setUserBudget(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-3.5 pr-12 py-2.5 rounded-lg border border-[#E5D5C0] bg-white focus:outline-none focus:ring-2 focus:ring-[#C5A059]/30 focus:border-[#C5A059] font-bold text-[#2D2D2A] text-base transition-all"
                  placeholder="ใส่งบประมาณ เช่น 5000"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#8B5E3C] font-medium">
                  บาท
                </span>
              </div>
            </div>

            {/* Practical Travel Tips Box */}
            <div className="p-3 rounded-lg bg-[#F5F2ED] border border-[#E5D5C0] text-xs text-[#2D2D2A]/80 flex items-start gap-2">
              <Info className="w-4 h-4 text-[#8B5E3C] shrink-0 mt-0.5" />
              <span>
                💡 สุรินทร์มีค่าครองชีพและค่าเข้าชมโบราณสถานที่เป็นมิตร สำหรับทริป 2-3 วัน แนะนำแวะชิมกาละแมศีขรภูมิและซื้อผ้าไหมท่าสว่าง
              </span>
            </div>

          </div>

          {/* Right: Calculated Breakdown & Evaluation */}
          <div className="lg:col-span-7 bg-white rounded-xl p-5 sm:p-6 border border-[#E5D5C0] shadow-sm space-y-5">
            <h3 className="font-heading font-bold text-lg text-[#5A5A40] pb-3 border-b border-[#E5D5C0]/70 flex items-center justify-between">
              <span>การประเมินค่าใช้จ่ายเบื้องต้น</span>
              <span className="text-xs font-normal text-[#8B5E3C]">
                สำหรับ {people} คน ({days} วัน)
              </span>
            </h3>

            {/* Cost Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Transport */}
              <div className="p-3 rounded-lg bg-[#F5F2ED] border border-[#E5D5C0] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#5A5A40] flex items-center justify-center text-white">
                    <Car className="w-4 h-4 text-[#E5D5C0]" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#8B5E3C] block">ค่าเดินทาง &amp; น้ำมัน</span>
                    <span className="text-sm font-bold text-[#2D2D2A]">
                      {transportCost.toLocaleString()} บาท
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-[#8B5E3C]/70">เฉลี่ยรวม</span>
              </div>

              {/* Food */}
              <div className="p-3 rounded-lg bg-[#F5F2ED] border border-[#E5D5C0] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#C5A059] flex items-center justify-center text-white">
                    <Utensils className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#8B5E3C] block">ค่าอาหาร &amp; เครื่องดื่ม</span>
                    <span className="text-sm font-bold text-[#2D2D2A]">
                      {foodCost.toLocaleString()} บาท
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-[#8B5E3C]/70">{days} วัน</span>
              </div>

              {/* Accommodation */}
              <div className="p-3 rounded-lg bg-[#F5F2ED] border border-[#E5D5C0] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#8B5E3C] flex items-center justify-center text-white">
                    <Hotel className="w-4 h-4 text-[#E5D5C0]" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#8B5E3C] block">
                      ค่าที่พัก {days > 1 ? `(${days - 1} คืน)` : ''}
                    </span>
                    <span className="text-sm font-bold text-[#2D2D2A]">
                      {hotelCost > 0 ? `${hotelCost.toLocaleString()} บาท` : 'ไม่ต้องค้างคืน'}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-[#8B5E3C]/70">
                  {hotelCost > 0 ? `${Math.ceil(people / 2)} ห้อง` : '0 คืน'}
                </span>
              </div>

              {/* Entrance */}
              <div className="p-3 rounded-lg bg-[#F5F2ED] border border-[#E5D5C0] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#5A5A40] flex items-center justify-center text-white">
                    <Ticket className="w-4 h-4 text-[#C5A059]" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#8B5E3C] block">ค่าเข้าชม &amp; กิจกรรม</span>
                    <span className="text-sm font-bold text-[#2D2D2A]">
                      {entranceCost.toLocaleString()} บาท
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-[#8B5E3C]/70">{people} ท่าน</span>
              </div>

              {/* Misc */}
              <div className="sm:col-span-2 p-3 rounded-lg bg-[#F5F2ED] border border-[#E5D5C0] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#8B5E3C] flex items-center justify-center text-white">
                    <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#8B5E3C] block">ค่าของฝาก &amp; ค่าใช้จ่ายจิปาถะ</span>
                    <span className="text-sm font-bold text-[#2D2D2A]">
                      {miscCost.toLocaleString()} บาท
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-[#8B5E3C]/70">กาละแม/ผ้าไหม</span>
              </div>

            </div>

            {/* Total Comparison Box (Natural Tones) */}
            <div className="p-4 rounded-xl bg-[#5A5A40] text-white space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/20 pb-2">
                <span className="text-[#E5D5C0] text-xs font-medium">รวมค่าใช้จ่ายทั้งหมดโดยประมาณ</span>
                <span className="font-heading font-extrabold text-2xl text-[#C5A059]">
                  ฿{totalCost.toLocaleString()}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#E5D5C0]">
                <span>งบประมาณที่คุณตั้งไว้</span>
                <span className="font-bold text-white text-sm">฿{userBudget.toLocaleString()}</span>
              </div>
            </div>

            {/* Budget Assessment Result & Guidance */}
            {isBudgetSufficient ? (
              <div className="p-3.5 rounded-lg bg-[#F5F2ED] border border-[#C5A059] text-[#2D2D2A] flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#5A5A40] shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                  <span className="font-bold text-[#5A5A40] block">
                    ✓ งบประมาณเพียงพอสำหรับการเดินทาง
                  </span>
                  <p className="text-[#2D2D2A]/80">
                    คุณเหลืองบประมาณสำรอง <strong>฿{budgetDifference.toLocaleString()}</strong> สามารถนำไปใช้เลือกซื้อผ้าไหมยกทอง หรืออาหารพื้นเมืองอร่อยๆ ได้
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-3.5 rounded-lg bg-[#F5F2ED] border border-[#8B5E3C] text-[#2D2D2A] flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-[#8B5E3C] shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                  <span className="font-bold text-[#8B5E3C] block">
                    ⚠ งบประมาณเกินไปเล็กน้อย (ขาดอยู่ ฿{budgetDifference.toLocaleString()})
                  </span>
                  <p className="text-[#2D2D2A]/80">
                    คำแนะนำ: สามารถเลือกที่พักโฮมสเตย์ชุมชนหรือแชร์ค่าเดินทางร่วมกันเพื่อช่วยประหยัดงบได้
                  </p>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
