import React, { useState } from 'react';
import { Compass, Clock, ExternalLink, Lightbulb } from 'lucide-react';
import { RECOMMENDED_ITINERARIES } from '../data/attractions';

export const ItineraryTimeline: React.FC = () => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>('trip-1-day');

  const currentPlan = RECOMMENDED_ITINERARIES.find(p => p.id === selectedPlanId) || RECOMMENDED_ITINERARIES[0];

  const handleOpenMap = (query: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${query} สุรินทร์`)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="itinerary" className="py-16 md:py-20 bg-[#F5F2ED] border-t border-[#E5D5C0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#8B5E3C] border border-[#E5D5C0] text-xs font-semibold">
            <Compass className="w-3.5 h-3.5 text-[#5A5A40]" />
            <span>เส้นทางแนะนำ (Natural Tones)</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#5A5A40] tracking-tight">
            เส้นทางท่องเที่ยวจังหวัดสุรินทร์
          </h2>
          <p className="text-[#2D2D2A]/80 text-sm sm:text-base">
            ออกแบบเส้นทางท่องเที่ยวสำเร็จรูปที่ผ่านการวางแผนเวลาอย่างลงตัว เดินทางสะดวก ไม่เหนื่อยล้า
          </p>
        </div>

        {/* Plan Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {RECOMMENDED_ITINERARIES.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlanId(plan.id)}
              className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                selectedPlanId === plan.id
                  ? 'bg-[#C5A059] text-white shadow-xs font-bold'
                  : 'bg-white hover:bg-[#E5D5C0] text-[#8B5E3C] border border-[#E5D5C0]'
              }`}
            >
              <span>{plan.title.split(':')[0]}</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full ${
                selectedPlanId === plan.id ? 'bg-[#5A5A40] text-white' : 'bg-[#F5F2ED] text-[#8B5E3C]'
              }`}>
                {plan.days.length} วัน
              </span>
            </button>
          ))}
        </div>

        {/* Active Plan Detail Box */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#E5D5C0] shadow-sm max-w-4xl mx-auto space-y-8">
          
          {/* Plan Header */}
          <div className="border-b border-[#E5D5C0]/70 pb-5 space-y-2">
            <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#F5F2ED] text-[#8B5E3C] text-xs font-bold border border-[#E5D5C0]">
              {currentPlan.durationLabel}
            </div>
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#5A5A40]">
              {currentPlan.title}
            </h3>
            <p className="text-[#2D2D2A]/80 text-sm">
              {currentPlan.tagline}
            </p>
          </div>

          {/* Days Container */}
          <div className="space-y-10">
            {currentPlan.days.map((day) => (
              <div key={day.dayNumber} className="space-y-5">
                
                {/* Day Header Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5A5A40] text-white font-heading font-bold text-xs sm:text-sm shadow-xs">
                  <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{day.dayTitle}</span>
                </div>

                {/* Timeline Stops */}
                <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#C5A059]">
                  {day.stops.map((stop, stopIndex) => (
                    <div key={stopIndex} className="relative group">
                      
                      {/* Timeline Node Icon in Natural Tones */}
                      <div className="absolute -left-[27px] sm:-left-[31px] top-1.5 w-5 h-5 rounded-full bg-[#C5A059] border-4 border-white shadow-xs group-hover:scale-125 transition-transform" />

                      {/* Content Card */}
                      <div className="bg-[#F5F2ED] hover:bg-[#E5D5C0]/40 rounded-xl p-4 border border-[#E5D5C0] transition-colors space-y-1.5">
                        
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#C5A059] text-white">
                            {stop.time}
                          </span>

                          {stop.mapQuery && (
                            <button
                              onClick={() => handleOpenMap(stop.mapQuery!)}
                              className="text-[11px] text-[#8B5E3C] hover:text-[#5A5A40] flex items-center gap-1 font-medium cursor-pointer"
                              title="เปิดแผนที่นำทาง"
                            >
                              <ExternalLink className="w-3 h-3 text-[#8B5E3C]" />
                              <span>ดูพิกัด</span>
                            </button>
                          )}
                        </div>

                        <h4 className="font-heading font-bold text-base text-[#2D2D2A]">
                          {stop.placeName}
                        </h4>

                        <p className="text-xs text-[#2D2D2A]/80 leading-relaxed">
                          {stop.description}
                        </p>

                        {stop.tip && (
                          <div className="pt-1.5 flex items-start gap-1.5 text-xs text-[#8B5E3C] bg-white p-2 rounded-lg border border-[#E5D5C0]">
                            <Lightbulb className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                            <span>{stop.tip}</span>
                          </div>
                        )}

                      </div>

                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
