export type PlaceCategory = 'ทั้งหมด' | 'ธรรมชาติ' | 'ประวัติศาสตร์' | 'วัฒนธรรม' | 'ครอบครัว' | 'จุดชมวิว';

export interface Attraction {
  id: string;
  name: string;
  nameEn: string;
  district: string;
  shortDesc: string;
  fullDesc: string;
  category: 'ธรรมชาติ' | 'ประวัติศาสตร์' | 'วัฒนธรรม' | 'ครอบครัว' | 'จุดชมวิว';
  hours: string;
  fee: string;
  estimatedFeeNum: number; // For calculator estimate (THB)
  address: string;
  travelHowTo: string;
  highlights: string[];
  imageUrl: string;
  mapQuery: string;
}

export interface Review {
  id: string;
  attractionId: string;
  attractionName: string;
  authorName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ItineraryStop {
  time: string;
  placeName: string;
  description: string;
  tip?: string;
  mapQuery?: string;
}

export interface ItineraryDay {
  dayNumber: number;
  dayTitle: string;
  stops: ItineraryStop[];
}

export interface ItineraryPlan {
  id: string;
  title: string;
  durationLabel: string;
  tagline: string;
  days: ItineraryDay[];
}
