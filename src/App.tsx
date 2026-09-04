import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  X, 
  Filter, 
  MapPin, 
  Sparkles, 
  Compass, 
  ChevronDown,
  Layers
} from 'lucide-react';

import { ATTRACTIONS_DATA, INITIAL_REVIEWS, CATEGORIES } from './data/attractions';
import { Attraction, Review } from './types';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PlaceCard } from './components/PlaceCard';
import { PlaceDetailModal } from './components/PlaceDetailModal';
import { TripPlanner } from './components/TripPlanner';
import { MyTripSection } from './components/MyTripSection';
import { ItineraryTimeline } from './components/ItineraryTimeline';
import { InteractiveMapSection } from './components/InteractiveMapSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FavoritesSection } from './components/FavoritesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { StudentCodeExportModal } from './components/StudentCodeExportModal';

export default function App() {
  // --- LocalStorage State Hooks ---
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('surin_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [tripIds, setTripIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('surin_my_trip');
      return saved ? JSON.parse(saved) : ['ban-ta-klang', 'prasat-sikhoraphum'];
    } catch {
      return ['ban-ta-klang', 'prasat-sikhoraphum'];
    }
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('surin_reviews');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  // Sync state changes with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('surin_favorites', JSON.stringify(favoriteIds));
    } catch (e) {
      console.error('LocalStorage write error:', e);
    }
  }, [favoriteIds]);

  useEffect(() => {
    try {
      localStorage.setItem('surin_my_trip', JSON.stringify(tripIds));
    } catch (e) {
      console.error('LocalStorage write error:', e);
    }
  }, [tripIds]);

  useEffect(() => {
    try {
      localStorage.setItem('surin_reviews', JSON.stringify(reviews));
    } catch (e) {
      console.error('LocalStorage write error:', e);
    }
  }, [reviews]);

  // --- UI Filter & Search State ---
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [selectedDistrict, setSelectedDistrict] = useState('ทั้งหมด');

  // --- Modal Visibility State ---
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isCodeExportOpen, setIsCodeExportOpen] = useState(false);

  // Available districts for filter
  const districts = useMemo(() => {
    const list = Array.from(new Set(ATTRACTIONS_DATA.map(a => a.district)));
    return ['ทั้งหมด', ...list];
  }, []);

  // Filtered Attractions Calculation
  const filteredAttractions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return ATTRACTIONS_DATA.filter((place) => {
      // Category Match
      const matchesCategory = selectedCategory === 'ทั้งหมด' || place.category === selectedCategory;

      // District Match
      const matchesDistrict = selectedDistrict === 'ทั้งหมด' || place.district === selectedDistrict;

      // Search Query Match (Checks name, english name, district, shortDesc, highlights)
      const matchesSearch = !query || 
        place.name.toLowerCase().includes(query) ||
        place.nameEn.toLowerCase().includes(query) ||
        place.district.toLowerCase().includes(query) ||
        place.shortDesc.toLowerCase().includes(query) ||
        place.highlights.some(h => h.toLowerCase().includes(query));

      return matchesCategory && matchesDistrict && matchesSearch;
    });
  }, [searchQuery, selectedCategory, selectedDistrict]);

  // Favorite Attractions List
  const favoriteAttractions = useMemo(() => {
    return ATTRACTIONS_DATA.filter(place => favoriteIds.includes(place.id));
  }, [favoriteIds]);

  // Trip Attractions List
  const tripAttractions = useMemo(() => {
    return ATTRACTIONS_DATA.filter(place => tripIds.includes(place.id));
  }, [tripIds]);

  // Handlers
  const handleToggleFavorite = (id: string) => {
    setFavoriteIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleToggleTrip = (id: string) => {
    setTripIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleRemoveFromTrip = (id: string) => {
    setTripIds(prev => prev.filter(item => item !== id));
  };

  const handleClearTrip = () => {
    if (window.confirm('คุณต้องการลบสถานที่ทั้งหมดออกจากทริปใช่หรือไม่?')) {
      setTripIds([]);
    }
  };

  const handleAddReview = (newRev: Omit<Review, 'id' | 'date'>) => {
    const fullReview: Review = {
      ...newRev,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('th-TH', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      })
    };
    setReviews(prev => [fullReview, ...prev]);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#2D2D2A] selection:bg-[#E5D5C0] selection:text-[#5A5A40]">
      
      {/* 1. Header Navigation */}
      <Navbar
        favoritesCount={favoriteIds.length}
        tripPlacesCount={tripIds.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenStudentCode={() => setIsCodeExportOpen(true)}
      />

      {/* 2. Hero Section */}
      <Hero
        onExploreClick={() => scrollToSection('places')}
        onPlanTripClick={() => scrollToSection('budget')}
      />

      {/* 3. Main Tourist Places Section with Real-time Search & Filter */}
      <section id="places" className="py-16 md:py-20 bg-[#FDFBF7] border-b border-[#E5D5C0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5D5C0] text-[#5A5A40] text-xs font-semibold">
              <Compass className="w-3.5 h-3.5 text-[#5A5A40]" />
              <span>แหล่งท่องเที่ยวชั้นนำ</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#5A5A40] tracking-tight">
              สถานที่ท่องเที่ยวแนะนำจังหวัดสุรินทร์
            </h2>
            <p className="text-[#8B5E3C] text-sm sm:text-base">
              สัมผัสความตระการตาของอารยธรรมขอมโบราณ ธรรมชาติเขียวขจี และวิถีชีวิตคนเลี้ยงช้าง
            </p>
          </div>

          {/* Search Bar & Filter Controls Container */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E5D5C0] shadow-xs mb-10 space-y-6">
            
            {/* Top Search Input */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B5E3C]" />
              <input
                id="main-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหาสถานที่ เช่น วนอุทยานพนมสวาย, ปราสาทศีขรภูมิ, ช้าง..."
                className="w-full pl-12 pr-10 py-3 rounded-full bg-[#F5F2ED] border border-[#E5D5C0] focus:bg-white focus:border-[#C5A059] focus:ring-3 focus:ring-[#C5A059]/20 outline-hidden text-sm sm:text-base text-[#2D2D2A] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 text-[#8B5E3C] hover:text-[#5A5A40] rounded-full hover:bg-[#E5D5C0] transition-colors cursor-pointer"
                  title="ล้างคำค้นหา"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Pills & District Filter */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2 border-t border-[#E5D5C0]/60">
              
              {/* Category Pills */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 sm:gap-2 w-full md:w-auto">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm transition-all cursor-pointer ${
                      selectedCategory === category
                        ? 'bg-[#5A5A40] text-white shadow-xs font-semibold'
                        : 'bg-[#F5F2ED] text-[#8B5E3C] hover:bg-[#E5D5C0] hover:text-[#5A5A40]'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* District Select Dropdown */}
              <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                <span className="text-xs text-[#8B5E3C] font-medium hidden sm:inline">อำเภอ:</span>
                <div className="relative">
                  <select
                    id="district-filter-select"
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="appearance-none pl-3 pr-8 py-1.5 rounded-full bg-[#F5F2ED] border border-[#E5D5C0] text-xs sm:text-sm font-medium text-[#5A5A40] hover:bg-[#E5D5C0] focus:ring-2 focus:ring-[#C5A059] outline-hidden cursor-pointer"
                  >
                    {districts.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-[#8B5E3C] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {(searchQuery || selectedCategory !== 'ทั้งหมด' || selectedDistrict !== 'ทั้งหมด') && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('ทั้งหมด');
                      setSelectedDistrict('ทั้งหมด');
                    }}
                    className="px-2.5 py-1 rounded-full text-xs text-rose-700 hover:bg-rose-50 font-medium transition-colors cursor-pointer"
                  >
                    รีเซ็ต
                  </button>
                )}
              </div>

            </div>

            {/* Results Count Badge */}
            <div className="text-xs text-[#8B5E3C] flex items-center justify-between">
              <span>พบ <strong>{filteredAttractions.length}</strong> จาก {ATTRACTIONS_DATA.length} สถานที่ท่องเที่ยว</span>
              {(selectedCategory !== 'ทั้งหมด' || selectedDistrict !== 'ทั้งหมด' || searchQuery) && (
                <span className="text-[#C5A059] font-medium">กำลังแสดงผลลัพธ์ที่ผ่านการกรอง</span>
              )}
            </div>

          </div>

          {/* Attractions Grid */}
          {filteredAttractions.length === 0 ? (
            <div className="p-10 text-center rounded-2xl bg-white border border-[#E5D5C0] max-w-lg mx-auto space-y-4 shadow-2xs">
              <div className="w-14 h-14 rounded-full bg-[#F5F2ED] text-[#8B5E3C] flex items-center justify-center mx-auto text-2xl border border-[#E5D5C0]">
                🔍
              </div>
              <div className="space-y-1">
                <h3 className="font-heading font-bold text-base sm:text-lg text-[#5A5A40]">
                  ไม่พบสถานที่ท่องเที่ยวที่ค้นหา
                </h3>
                <p className="text-xs text-[#8B5E3C]">
                  ลองเปลี่ยนคำค้นหา หรือกดปุ่มรีเซ็ตตัวกรองเพื่อดูสถานที่ท่องเที่ยวทั้งหมด
                </p>
              </div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('ทั้งหมด');
                  setSelectedDistrict('ทั้งหมด');
                }}
                className="px-5 py-2 bg-[#C5A059] hover:bg-[#8B5E3C] text-white text-xs font-semibold rounded-full transition-colors cursor-pointer shadow-xs"
              >
                ล้างการค้นหาทั้งหมด
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAttractions.map((attraction) => (
                <PlaceCard
                  key={attraction.id}
                  attraction={attraction}
                  isFavorite={favoriteIds.includes(attraction.id)}
                  isInTrip={tripIds.includes(attraction.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onToggleTrip={handleToggleTrip}
                  onOpenDetail={(a) => setSelectedAttraction(a)}
                />
              ))}
            </div>
          )}

        </div>
      </section>

      {/* 4. Budget Calculator Section */}
      <TripPlanner />

      {/* 5. My Trip Section (LocalStorage) */}
      <MyTripSection
        tripPlaces={tripAttractions}
        onRemoveFromTrip={handleRemoveFromTrip}
        onClearTrip={handleClearTrip}
        onOpenDetail={(a) => setSelectedAttraction(a)}
        onExploreMore={() => scrollToSection('places')}
      />

      {/* 6. Recommended Itinerary Timeline */}
      <ItineraryTimeline />

      {/* 7. Interactive Map & Transport Section */}
      <InteractiveMapSection />

      {/* 8. User Reviews Section (LocalStorage) */}
      <ReviewsSection
        reviews={reviews}
        attractions={ATTRACTIONS_DATA}
        onAddReview={handleAddReview}
      />

      {/* 9. Contact & Provincial Info Section */}
      <ContactSection />

      {/* 10. Footer */}
      <Footer />

      {/* Modals */}
      {/* Detail Modal */}
      <PlaceDetailModal
        attraction={selectedAttraction}
        isOpen={Boolean(selectedAttraction)}
        onClose={() => setSelectedAttraction(null)}
        isFavorite={selectedAttraction ? favoriteIds.includes(selectedAttraction.id) : false}
        isInTrip={selectedAttraction ? tripIds.includes(selectedAttraction.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onToggleTrip={handleToggleTrip}
      />

      {/* Favorites Modal */}
      <FavoritesSection
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favoriteAttractions}
        onToggleFavorite={handleToggleFavorite}
        onOpenDetail={(a) => setSelectedAttraction(a)}
        onExploreMore={() => scrollToSection('places')}
      />

      {/* Student Code Export Modal (for Homework Submission) */}
      <StudentCodeExportModal
        isOpen={isCodeExportOpen}
        onClose={() => setIsCodeExportOpen(false)}
      />

    </div>
  );
}
