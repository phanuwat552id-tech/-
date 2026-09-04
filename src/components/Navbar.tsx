import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Heart, 
  MapPin, 
  Compass, 
  Calendar, 
  FileCode2, 
  PhoneCall, 
  Star,
  Luggage
} from 'lucide-react';

interface NavbarProps {
  favoritesCount: number;
  tripPlacesCount?: number;
  tripCount?: number;
  onOpenFavorites: () => void;
  onOpenStudentCode: () => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  favoritesCount,
  tripPlacesCount,
  tripCount,
  onOpenFavorites,
  onOpenStudentCode,
  activeSection
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const actualTripCount = tripPlacesCount ?? tripCount ?? 0;

  const navItems = [
    { id: 'hero', label: 'หน้าแรก', icon: Compass },
    { id: 'places', label: 'สถานที่ท่องเที่ยว', icon: MapPin },
    { id: 'budget', label: 'วางแผนงบเที่ยว', icon: Calendar },
    { id: 'mytrip', label: 'ทริปของฉัน', icon: Luggage, badge: actualTripCount },
    { id: 'itinerary', label: 'แนะนำเส้นทาง', icon: Compass },
    { id: 'map', label: 'แผนที่', icon: MapPin },
    { id: 'reviews', label: 'รีวิว', icon: Star },
    { id: 'contact', label: 'ติดต่อเรา', icon: PhoneCall },
  ];

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E5D5C0] shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Logo & Branding */}
          <a 
            href="#hero" 
            onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }}
            className="flex items-center gap-3 group text-left cursor-pointer"
            id="brand-logo-btn"
          >
            <div className="w-10 h-10 bg-[#5A5A40] rounded-full flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform shrink-0">
              <span className="text-xl select-none" role="img" aria-label="ช้างสุรินทร์">🐘</span>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-[#5A5A40] tracking-tight leading-tight group-hover:text-[#8B5E3C] transition-colors">
                เที่ยวสุรินทร์ <span className="text-[#C5A059]">เมืองช้าง</span>
              </h1>
              <span className="text-[11px] sm:text-xs text-[#8B5E3C]/80 font-medium block">
                มนต์เสน่ห์เมืองช้าง อารยธรรมขอม และธรรมชาติ
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-[#8B5E3C]">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3 py-1.5 text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer rounded-lg ${
                    isActive 
                      ? 'text-[#5A5A40] border-b-2 border-[#C5A059] font-bold bg-[#F5F2ED]/60' 
                      : 'hover:text-[#C5A059] hover:bg-[#F5F2ED]/80'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 text-xs font-bold rounded-full bg-[#C5A059] text-white min-w-5 text-center">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Favorites Button */}
            <button
              id="navbar-favorites-btn"
              onClick={onOpenFavorites}
              title="ดูรายการสถานที่โปรด"
              className="relative p-2 text-[#8B5E3C] hover:text-[#C5A059] hover:bg-[#F5F2ED] rounded-xl transition-all border border-[#E5D5C0] cursor-pointer flex items-center gap-1.5"
            >
              <Heart className={`w-4 h-4 ${favoritesCount > 0 ? 'text-[#8B5E3C] fill-[#8B5E3C]' : 'text-[#8B5E3C]'}`} />
              <span className="text-xs font-medium hidden md:inline">สถานที่โปรด</span>
              {favoritesCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 text-xs font-bold rounded-full bg-[#8B5E3C] text-white min-w-5 text-center shadow-xs">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Student Project Code Button */}
            <button
              id="navbar-student-code-btn"
              onClick={onOpenStudentCode}
              className="px-4 py-2 text-xs font-semibold rounded-full bg-[#C5A059] hover:bg-[#8B5E3C] text-white shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              title="ดูโค้ดสำหรับส่งครู (HTML/CSS/JS)"
            >
              <FileCode2 className="w-3.5 h-3.5 text-amber-100" />
              <span>โค้ดส่งครู</span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="mobile-favorites-shortcut"
              onClick={onOpenFavorites}
              className="relative p-2 text-[#8B5E3C] hover:text-[#C5A059] rounded-lg"
              aria-label="สถานที่โปรด"
            >
              <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'text-[#8B5E3C] fill-[#8B5E3C]' : 'text-[#8B5E3C]'}`} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-[#8B5E3C] text-white">
                  {favoritesCount}
                </span>
              )}
            </button>

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#5A5A40] hover:text-[#8B5E3C] hover:bg-[#F5F2ED] rounded-xl transition-colors cursor-pointer"
              aria-label="เปิดเมนูหลัก"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E5D5C0] px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#E5D5C0]/70">
            <button
              onClick={() => { setIsMobileMenuOpen(false); onOpenFavorites(); }}
              className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-[#F5F2ED] text-[#8B5E3C] font-medium text-xs border border-[#E5D5C0]"
            >
              <Heart className="w-4 h-4 fill-[#8B5E3C]" />
              <span>สถานที่โปรด ({favoritesCount})</span>
            </button>
            <button
              onClick={() => { setIsMobileMenuOpen(false); onOpenStudentCode(); }}
              className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-[#C5A059] text-white font-medium text-xs"
            >
              <FileCode2 className="w-4 h-4 text-white" />
              <span>โค้ดส่งครู</span>
            </button>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[#2D2D2A] hover:bg-[#F5F2ED] hover:text-[#C5A059] text-sm font-medium transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-[#8B5E3C]" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-[#C5A059] text-white">
                      {item.badge} สถานที่
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
