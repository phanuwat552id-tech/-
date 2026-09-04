import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  FileCode2, 
  BookOpen, 
  ExternalLink, 
  Download,
  Terminal,
  Code
} from 'lucide-react';

interface StudentCodeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudentCodeExportModal: React.FC<StudentCodeExportModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'instructions' | 'html' | 'css' | 'js'>('instructions');
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, tabName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTab(tabName);
    setTimeout(() => {
      setCopiedTab(null);
    }, 2500);
  };

  const sampleHtmlCode = `<!-- 
========================================================================
โครงงาน: เว็บไซต์แนะนำสถานที่ท่องเที่ยวจังหวัดสุรินทร์
ชื่อเว็บไซต์: "เที่ยวสุรินทร์ เมืองช้าง"
ไฟล์: index.html
จัดทำขึ้นเพื่อการศึกษา (HTML5, CSS3, Vanilla JavaScript)
========================================================================
-->
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>เที่ยวสุรินทร์ เมืองช้าง - เว็บไซต์แนะนำสถานที่ท่องเที่ยว</title>
  <link rel="stylesheet" href="style.css">
  <!-- Google Fonts: Sarabun & Kanit -->
  <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@400;600;700&family=Sarabun:wght@300;400;500;600&display=swap" rel="stylesheet">
</head>
<body>

  <!-- 1. ส่วนหัวและแถบนำทาง (Navbar) -->
  <nav class="navbar" id="navbar">
    <div class="nav-container">
      <div class="nav-brand">
        <span class="logo-icon">🐘</span>
        <span class="brand-text">เที่ยวสุรินทร์ <strong>เมืองช้าง</strong></span>
      </div>
      <div class="nav-links" id="navLinks">
        <a href="#hero">หน้าแรก</a>
        <a href="#places">สถานที่ท่องเที่ยว</a>
        <a href="#budget">คำนวณงบเที่ยว</a>
        <a href="#mytrip">ทริปของฉัน (<span id="tripBadge">0</span>)</a>
        <a href="#itinerary">แนะนำเส้นทาง</a>
        <a href="#reviews">รีวิว</a>
        <a href="#favorites">สถานที่โปรด (<span id="favBadge">0</span>)</a>
        <a href="#contact">ติดต่อเรา</a>
      </div>
      <button class="menu-toggle" id="menuToggle" aria-label="เปิดเมนู">☰</button>
    </div>
  </nav>

  <!-- 2. ส่วนแนะนำหน้าแรก (Hero Section) -->
  <header class="hero" id="hero">
    <div class="hero-content">
      <div class="hero-badge">ยินดีต้อนรับสู่แดนอีสานใต้</div>
      <h1>เที่ยวสุรินทร์ <span class="highlight">เมืองช้าง</span></h1>
      <p class="tagline">“ค้นพบเสน่ห์เมืองช้าง สัมผัสธรรมชาติ วัฒนธรรม และประวัติศาสตร์”</p>
      <div class="hero-buttons">
        <a href="#places" class="btn btn-primary">ค้นหาสถานที่ท่องเที่ยว</a>
        <a href="#budget" class="btn btn-secondary">วางแผนการเดินทาง</a>
      </div>
    </div>
  </header>

  <!-- 3. ส่วนค้นหาและกรองประเภทสถานที่ (Search & Filter Section) -->
  <section class="places-section" id="places">
    <div class="container">
      <div class="section-title">
        <h2>สถานที่ท่องเที่ยวแนะนำ</h2>
        <p>ค้นพบแหล่งท่องเที่ยวธรรมชาติ มรดกขอมโบราณ และวิถีคนกับช้าง</p>
      </div>

      <!-- กล่องค้นหา (Search Bar) -->
      <div class="search-box">
        <input type="text" id="searchInput" placeholder="ค้นหาด้วยชื่อสถานที่, อำเภอ หรือประเภท..." autocomplete="off">
        <button id="clearSearchBtn" title="ล้างการค้นหา">✕</button>
      </div>

      <!-- ปุ่มตัวกรองประเภท (Category Filters) -->
      <div class="filter-buttons" id="filterButtons">
        <button class="filter-btn active" data-category="ทั้งหมด">ทั้งหมด</button>
        <button class="filter-btn" data-category="ธรรมชาติ">ธรรมชาติ</button>
        <button class="filter-btn" data-category="ประวัติศาสตร์">ประวัติศาสตร์</button>
        <button class="filter-btn" data-category="วัฒนธรรม">วัฒนธรรม</button>
        <button class="filter-btn" data-category="ครอบครัว">ครอบครัว</button>
        <button class="filter-btn" data-category="จุดชมวิว">จุดชมวิว</button>
      </div>

      <!-- กริดแสดงการ์ดสถานที่ท่องเที่ยว (Render โดย JavaScript) -->
      <div class="places-grid" id="placesGrid"></div>

      <!-- ข้อความเมื่อค้นหาไม่พบ -->
      <div id="noResults" class="no-results" style="display: none;">
        <p>ไม่พบสถานที่ที่ค้นหา</p>
      </div>
    </div>
  </section>

  <!-- 4. หน้าต่างป๊อปอัปรายละเอียดสถานที่ (Modal) -->
  <div class="modal" id="detailModal">
    <div class="modal-content" id="modalContent">
      <button class="close-modal" id="closeModalBtn">&times;</button>
      <div id="modalBody"></div>
    </div>
  </div>

  <!-- 5. ระบบคำนวณงบประมาณ (Budget Calculator) -->
  <section class="budget-section" id="budget">
    <div class="container">
      <div class="section-title">
        <h2>ระบบวางแผนงบประมาณเที่ยว</h2>
        <p>คำนวณค่าใช้จ่ายเบื้องต้นตามจำนวนวันและผู้เดินทาง</p>
      </div>
      <div class="budget-grid">
        <div class="budget-card input-card">
          <label>จำนวนวัน: 
            <select id="calcDays">
              <option value="1">1 วัน (เช้า-เย็นกลับ)</option>
              <option value="2" selected>2 วัน (1 คืน)</option>
              <option value="3">3 วัน (2 คืน)</option>
            </select>
          </label>
          <label>จำนวนคน: 
            <input type="number" id="calcPeople" value="2" min="1" max="10">
          </label>
          <label>งบประมาณที่คุณตั้งไว้ (บาท): 
            <input type="number" id="calcBudget" value="4500" min="500" step="500">
          </label>
          <button id="recalcBtn" class="btn btn-primary">คำนวณค่าใช้จ่าย</button>
        </div>
        <div class="budget-card result-card" id="calcResults"></div>
      </div>
    </div>
  </section>

  <!-- 6. ระบบจัดทริปของฉัน (My Trip) -->
  <section class="mytrip-section" id="mytrip">
    <div class="container">
      <div class="section-title">
        <h2>ทริปการเดินทางของฉัน</h2>
        <p>สถานที่ที่คุณเลือกไว้ (จัดเก็บด้วย LocalStorage)</p>
      </div>
      <div id="myTripList" class="trip-list"></div>
    </div>
  </section>

  <!-- 7. เส้นทางท่องเที่ยวแนะนำ (Recommended Itinerary) -->
  <section class="itinerary-section" id="itinerary">
    <div class="container">
      <div class="section-title">
        <h2>แนะนำเส้นทางท่องเที่ยว</h2>
        <p>ทริปตัวอย่าง 1 วัน และ 2 วัน พร้อม Timeline</p>
      </div>
      <div class="itinerary-tabs">
        <button class="itinerary-tab active" data-itinerary="1">ทริป 1 วัน</button>
        <button class="itinerary-tab" data-itinerary="2">ทริป 2 วัน</button>
      </div>
      <div id="itineraryContent" class="timeline-box"></div>
    </div>
  </section>

  <!-- 8. ระบบรีวิว (Reviews) -->
  <section class="reviews-section" id="reviews">
    <div class="container">
      <div class="section-title">
        <h2>รีวิวจากผู้ท่องเที่ยว</h2>
      </div>
      <div class="reviews-layout">
        <form id="reviewForm" class="review-form">
          <h3>เขียนรีวิว</h3>
          <input type="text" id="reviewerName" placeholder="ชื่อของคุณ" required>
          <select id="reviewPlace" required></select>
          <select id="reviewRating">
            <option value="5">⭐⭐⭐⭐⭐ (5 ดาว)</option>
            <option value="4">⭐⭐⭐⭐ (4 ดาว)</option>
            <option value="3">⭐⭐⭐ (3 ดาว)</option>
            <option value="2">⭐⭐ (2 ดาว)</option>
            <option value="1">⭐ (1 ดาว)</option>
          </select>
          <textarea id="reviewComment" placeholder="เขียนความคิดเห็นของคุณ..." rows="3" required></textarea>
          <button type="submit" class="btn btn-primary">ส่งรีวิว</button>
        </form>
        <div id="reviewsList" class="reviews-list"></div>
      </div>
    </div>
  </section>

  <!-- 9. ข้อมูลติดต่อ (Contact) -->
  <section class="contact-section" id="contact">
    <div class="container">
      <div class="section-title">
        <h2>ติดต่อเรา</h2>
      </div>
      <div class="contact-grid">
        <div class="contact-info">
          <p><strong>ชื่อเว็บไซต์:</strong> เที่ยวสุรินทร์ เมืองช้าง</p>
          <p><strong>จังหวัด:</strong> สุรินทร์</p>
          <p><strong>Email:</strong> contact@surin-travel.edu</p>
          <p><strong>Facebook:</strong> เที่ยวสุรินทร์ เมืองช้าง</p>
          <p><strong>Instagram:</strong> @surin_elephant_city</p>
        </div>
        <form class="contact-form" onsubmit="alert('ส่งข้อความเรียบร้อย'); return false;">
          <input type="text" placeholder="ชื่อของคุณ" required>
          <input type="email" placeholder="Email ของคุณ" required>
          <textarea placeholder="ข้อความ" rows="3" required></textarea>
          <button type="submit" class="btn btn-primary">ส่งข้อความ</button>
        </form>
      </div>
    </div>
  </section>

  <!-- 10. ส่วนท้าย (Footer) -->
  <footer class="footer">
    <p>© 2026 เที่ยวสุรินทร์ เมืองช้าง</p>
    <p>เว็บไซต์จัดทำขึ้นเพื่อการศึกษา</p>
    <button id="backToTopBtn" class="back-to-top">↑ กลับสู่ด้านบน</button>
  </footer>

  <script src="script.js"></script>
</body>
</html>`;

  const sampleCssCode = `/* 
========================================================================
โครงงาน: เว็บไซต์แนะนำสถานที่ท่องเที่ยวจังหวัดสุรินทร์
ไฟล์: style.css (ธีมเมืองช้าง วัฒนธรรม สีเขียว น้ำตาล ทอง ครีม)
========================================================================
*/
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Sarabun', sans-serif;
  background-color: #fcfaf6;
  color: #333333;
  line-height: 1.6;
  scroll-behavior: smooth;
}

h1, h2, h3, h4, .brand-text {
  font-family: 'Kanit', sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* แถบนำทาง Navbar */
.navbar {
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid #e8e3d9;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.25rem;
  color: #2b2b2b;
}

.nav-brand strong {
  color: #8c5836;
}

.nav-links a {
  text-decoration: none;
  color: #4a4a4a;
  margin-left: 16px;
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: #8c5836;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

/* ส่วน Hero */
.hero {
  background: linear-gradient(rgba(45, 30, 15, 0.55), rgba(45, 30, 15, 0.7)),
              url('https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1400&q=80') center/cover no-repeat;
  color: #ffffff;
  padding: 100px 20px;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-badge {
  display: inline-block;
  background: rgba(212, 175, 55, 0.85);
  color: #1a1a1a;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 15px;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 15px;
}

.hero .highlight {
  color: #f7d070;
}

.tagline {
  font-size: 1.25rem;
  margin-bottom: 30px;
}

/* ปุ่มทั่วไป */
.btn {
  display: inline-block;
  padding: 10px 24px;
  border-radius: 8px;
  font-family: 'Kanit', sans-serif;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: transform 0.2s, background-color 0.2s;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn-primary {
  background-color: #8c5836;
  color: #ffffff;
}

.btn-primary:hover {
  background-color: #704225;
}

.btn-secondary {
  background-color: #ffffff;
  color: #8c5836;
  margin-left: 10px;
}

/* การค้นหาและตัวกรอง */
.section-title {
  text-align: center;
  margin: 50px 0 25px;
}

.search-box {
  max-width: 550px;
  margin: 0 auto 20px;
  position: relative;
}

.search-box input {
  width: 100%;
  padding: 12px 40px 12px 18px;
  border: 1px solid #d4cdc1;
  border-radius: 25px;
  font-size: 1rem;
}

.search-box button {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
}

.filter-buttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 35px;
}

.filter-btn {
  padding: 8px 18px;
  border-radius: 20px;
  border: 1px solid #d4cdc1;
  background: #ffffff;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.filter-btn.active, .filter-btn:hover {
  background: #2d6a4f;
  color: #ffffff;
  border-color: #2d6a4f;
}

/* การ์ดสถานที่ท่องเที่ยว */
.places-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
}

.place-card {
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  border: 1px solid #eee8dd;
  transition: transform 0.25s, box-shadow 0.25s;
  display: flex;
  flex-direction: column;
}

.place-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.card-img {
  width: 100%;
  height: 190px;
  object-cover: cover;
  position: relative;
}

.card-body {
  padding: 18px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-title {
  font-size: 1.15rem;
  margin-bottom: 6px;
  color: #222;
}

.card-district {
  font-size: 0.8rem;
  color: #777;
  margin-bottom: 10px;
}

.card-desc {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 15px;
}

.card-actions {
  display: flex;
  gap: 8px;
}

/* Modal ป๊อปอัป */
.modal {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  z-index: 2000;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-content {
  background: #ffffff;
  width: 100%;
  max-width: 650px;
  max-height: 85vh;
  overflow-y: auto;
  border-radius: 12px;
  padding: 25px;
  position: relative;
}

.close-modal {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 1.5rem;
  border: none;
  background: none;
  cursor: pointer;
}

/* Footer */
.footer {
  background: #1f1d1a;
  color: #b0a89d;
  text-align: center;
  padding: 30px 20px;
  margin-top: 60px;
}

.back-to-top {
  margin-top: 12px;
  padding: 6px 14px;
  background: #8c5836;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

/* Responsive มือถือ */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
  .menu-toggle {
    display: block;
  }
  .hero h1 {
    font-size: 2.2rem;
  }
}`;

  const sampleJsCode = `/* 
========================================================================
โครงงาน: เว็บไซต์แนะนำสถานที่ท่องเที่ยวจังหวัดสุรินทร์
ไฟล์: script.js
รวมทุกฟังก์ชัน JavaScript ที่ใช้งานได้จริง:
1. ข้อมูลสถานที่ท่องเที่ยว (Attractions Data)
2. การแสดงผลการ์ดสถานที่ (Render Cards)
3. ระบบค้นหาแบบเรียลไทม์ (Real-time Search)
4. ระบบกรองตามประเภท (Category Filter)
5. หน้าต่างรายละเอียด (Detail Modal)
6. บันทึกสถานที่โปรด (Favorites with LocalStorage)
7. ระบบจัดทริปของฉัน (My Trip with LocalStorage)
8. เครื่องมือคำนวณงบประมาณ (Budget Calculator)
9. แนะนำเส้นทางท่องเที่ยว (Itinerary Timeline)
10. ระบบรีวิว (Reviews with LocalStorage)
========================================================================
*/

// --- 1. ข้อมูลสถานที่ท่องเที่ยวจังหวัดสุรินทร์ ---
const attractionsData = [
  {
    id: "phanom-sawai",
    name: "วนอุทยานพนมสวาย",
    district: "อำเภอเมืองสุรินทร์",
    category: "ธรรมชาติ",
    shortDesc: "ยอดเขาศักดิ์สิทธิ์ 3 ยอด แหล่งเคารพสักการะ จุดชมวิว 360 องศา และระฆัง 1,080 ใบ",
    fullDesc: "วนอุทยานพนมสวาย มีเนินเขา 3 ยอด ได้แก่ ยอดเขาชาย ยอดเขาหญิง และยอดเขาคอก ประดิษฐานพระพุทธสุรินทรมงคล และมีบันไดระฆัง 1,080 ใบให้เคาะเพื่อความเป็นสิริมงคล",
    hours: "เปิดทุกวัน 08:30 – 16:30 น.",
    fee: "ไม่มีค่าธรรมเนียมเข้าชม (ฟรี)",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ban-ta-klang",
    name: "ศูนย์คชศึกษา / หมู่บ้านช้างบ้านตากลาง",
    district: "อำเภอท่าตูม",
    category: "ครอบครัว",
    shortDesc: "หมู่บ้านช้างเลี้ยงที่ใหญ่ที่สุดในโลก สัมผัสวิถีชีวิตชาวกูยคนเลี้ยงช้าง",
    fullDesc: "แหล่งท่องเที่ยวทางวัฒนธรรมที่มีชื่อเสียงระดับโลก ชมการแสดงความฉลาดแสนรู้ของช้าง ป้อนอาหาร และเรียนรู้วิถีชีวิตคนกับช้าง",
    hours: "เปิดทุกวัน 08:30 – 16:30 น.",
    fee: "ผู้ใหญ่ 50 บาท, เด็ก 20 บาท",
    image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "prasat-sikhoraphum",
    name: "ปราสาทศีขรภูมิ",
    district: "อำเภอศีขรภูมิ",
    category: "ประวัติศาสตร์",
    shortDesc: "ปราสาทหินขอม 5 ยอดบนฐานศิลาแลงเดียวกัน ทับหลังศิวนาฏราชที่สมบูรณ์ที่สุด",
    fullDesc: "ปราสาทศิลปะขอมโบราณ สร้างราวพุทธศตวรรษที่ 17 โดดเด่นด้วยทับหลังศิวนาฏราช 10 กร และภาพสลักนางอัปสรถือดอกบัวอันงดงาม",
    hours: "เปิดทุกวัน 07:30 – 18:00 น.",
    fee: "ชาวไทย 10 บาท, ชาวต่างชาติ 50 บาท",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Prasat_Sikhoraphum_01.jpg/1200px-Prasat_Sikhoraphum_01.jpg"
  },
  {
    id: "prasat-chang-pi",
    name: "ปราสาทช่างปี่",
    district: "อำเภอศีขรภูมิ",
    category: "ประวัติศาสตร์",
    shortDesc: "อโรคยศาล (สุขศาลาโบราณ) ในรัชสมัยพระเจ้าชัยวรมันที่ 7 แห่งอาณาจักรขอม",
    fullDesc: "ศาสนสถานประจำสุขศาลาโบราณ 1 ใน 102 แห่ง สร้างด้วยศิลาแลงและหินทราย สะท้อนประวัติศาสตร์การแพทย์และการสาธารณสุขยุคโบราณ",
    hours: "เปิดทุกวัน เวลากลางวัน",
    fee: "ไม่มีค่าธรรมเนียมเข้าชม (ฟรี)",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Prasat_Hin_Phanom_Rung_2015.jpg/1200px-Prasat_Hin_Phanom_Rung_2015.jpg"
  },
  {
    id: "prasat-yai-ngao",
    name: "ปราสาทยายเหงา",
    district: "อำเภอสังขะ",
    category: "ประวัติศาสตร์",
    shortDesc: "ปราสาทอิฐคู่ทรงคุณค่าศิลปะขอม พร้อมตำนานยายเหงาอันเปี่ยมเสน่ห์",
    fullDesc: "โบราณสถานศิลปะขอม สร้างราวพุทธศตวรรษที่ 17 ก่อด้วยอิฐ 2 องค์บนฐานศิลาแลง บรรยากาศเงียบสงบในอำเภอสังขะ",
    hours: "เปิดทุกวัน เวลากลางวัน",
    fee: "ไม่มีค่าธรรมเนียมเข้าชม (ฟรี)",
    image: "https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "huai-saneng",
    name: "อ่างเก็บน้ำห้วยเสนง",
    district: "อำเภอเมืองสุรินทร์",
    category: "จุดชมวิว",
    shortDesc: "ทะเลสาบน้ำจืดขนาดใหญ่ จุดชมพระอาทิตย์ตกดินสุดโรแมนติกของเมืองสุรินทร์",
    fullDesc: "ปอดสีเขียวของชาวสุรินทร์ มีสันเขื่อนสำหรับออกกำลังกาย ร้านอาหารริมน้ำ และทัศนียภาพยามเย็นที่งดงาม",
    hours: "เปิดทุกวัน 06:00 – 18:30 น.",
    fee: "ไม่มีค่าธรรมเนียมเข้าชม (ฟรี)",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "surin-museum",
    name: "พิพิธภัณฑสถานแห่งชาติสุรินทร์",
    district: "อำเภอเมืองสุรินทร์",
    category: "วัฒนธรรม",
    shortDesc: "คลังมรดกทางวัฒนธรรม นิทรรศการมัลติมีเดียรวบรวม 4 กลุ่มชาติพันธุ์สุรินทร์",
    fullDesc: "แหล่งเรียนรู้ประวัติศาสตร์ โบราณคดี ชาติพันธุ์วิทยาชาวเขมร ลาว กูย และจีน และจัดแสดงผ้าไหมยกทองโบราณ",
    hours: "วันพุธ-อาทิตย์ 09:00 – 16:00 น. (ปิดจันทร์-อังคาร)",
    fee: "ชาวไทย 20 บาท (นักเรียนในเครื่องแบบเข้าชมฟรี)",
    image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "phraya-surin-monument",
    name: "อนุสาวรีย์พระยาสุรินทรภักดีศรีณรงค์จางวาง",
    district: "อำเภอเมืองสุรินทร์",
    category: "วัฒนธรรม",
    shortDesc: "สักการะเจ้าเมืองสุรินทร์คนแรก ศูนย์รวมจิตใจของชาวสุรินทร์",
    fullDesc: "อนุสาวรีย์เจ้าเมืองสุรินทร์คนแรก (เชียงปุ่ม) มือขวาถือของ้าว มือซ้ายถือเคียว ณ วงเวียนทางเข้าเมืองสุรินทร์ด้านใต้",
    hours: "เปิดตลอด 24 ชั่วโมง",
    fee: "ไม่มีค่าธรรมเนียมเข้าชม (ฟรี)",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Phraya_Surin_Phakdi_Sri_Narong_Changwang_Monument.jpg/1024px-Phraya_Surin_Phakdi_Sri_Narong_Changwang_Monument.jpg"
  }
];

// สถานะและ LocalStorage
let currentCategory = "ทั้งหมด";
let favorites = JSON.parse(localStorage.getItem("surin_favs")) || [];
let myTrip = JSON.parse(localStorage.getItem("surin_trip")) || [];
let reviews = JSON.parse(localStorage.getItem("surin_reviews")) || [
  { name: "คุณกิตติพงษ์", place: "ศูนย์คชศึกษาบ้านตากลาง", rating: 5, comment: "ประทับใจความฉลาดของช้างมากครับ" }
];

// เมื่อโหลดหน้าเว็บเสร็จ
document.addEventListener("DOMContentLoaded", () => {
  renderPlaces();
  updateBadges();
  renderMyTrip();
  renderReviews();
  setupEventListeners();
  calculateBudget();
});

// --- 2. แสดงผลการ์ดสถานที่ ---
function renderPlaces() {
  const grid = document.getElementById("placesGrid");
  const search = document.getElementById("searchInput").value.toLowerCase().trim();
  const noResults = document.getElementById("noResults");

  const filtered = attractionsData.filter(place => {
    const matchCategory = currentCategory === "ทั้งหมด" || place.category === currentCategory;
    const matchSearch = place.name.toLowerCase().includes(search) ||
                        place.district.toLowerCase().includes(search) ||
                        place.category.toLowerCase().includes(search);
    return matchCategory && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = "";
    noResults.style.display = "block";
    return;
  }

  noResults.style.display = "none";
  grid.innerHTML = filtered.map(place => {
    const isFav = favorites.includes(place.id);
    const inTrip = myTrip.includes(place.id);
    return \`
      <div class="place-card">
        <img src="\${place.image}" alt="\${place.name}" class="card-img" onerror="this.src='https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=800&q=80'">
        <div class="card-body">
          <div>
            <h3 class="card-title">\${place.name}</h3>
            <p class="card-district">📍 \${place.district} | ประเภท: \${place.category}</p>
            <p class="card-desc">\${place.shortDesc}</p>
          </div>
          <div class="card-actions">
            <button onclick="openDetail('\${place.id}')" class="btn btn-primary" style="font-size: 0.8rem; padding: 6px 12px;">ดูรายละเอียด</button>
            <button onclick="openMap('\${place.name}')" class="btn" style="font-size: 0.8rem; padding: 6px 12px; background: #eee;">เปิดแผนที่</button>
            <button onclick="toggleFav('\${place.id}')" class="btn" style="padding: 6px 10px; background: #fff0f0; color: #d00;">\${isFav ? '❤️' : '🤍'}</button>
            <button onclick="toggleTrip('\${place.id}')" class="btn" style="font-size: 0.8rem; padding: 6px 10px; background: \${inTrip ? '#2d6a4f' : '#333'}; color: #fff;">\${inTrip ? '✓ ในทริป' : '+ ทริป'}</button>
          </div>
        </div>
      </div>
    \`;
  }).join("");
}

// --- 3. ระบบค้นหา Real-time ---
document.getElementById("searchInput").addEventListener("input", renderPlaces);
document.getElementById("clearSearchBtn").addEventListener("click", () => {
  document.getElementById("searchInput").value = "";
  renderPlaces();
});

// --- 4. ระบบ Filter ---
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");
    currentCategory = e.target.dataset.category;
    renderPlaces();
  });
});

// --- 5. ระบบ Modal รายละเอียด ---
function openDetail(id) {
  const place = attractionsData.find(p => p.id === id);
  if (!place) return;
  const modal = document.getElementById("detailModal");
  const body = document.getElementById("modalBody");
  body.innerHTML = \`
    <img src="\${place.image}" style="width:100%; height:240px; object-fit:cover; border-radius:8px; margin-bottom:15px;">
    <h2>\${place.name}</h2>
    <p style="color: #666; margin-bottom: 10px;">📍 \${place.district} (ประเภท: \${place.category})</p>
    <p style="margin-bottom: 15px;">\${place.fullDesc}</p>
    <p><strong>เวลาเปิด-ปิด:</strong> \${place.hours}</p>
    <p><strong>ค่าเข้าชม:</strong> \${place.fee}</p>
    <div style="margin-top: 20px;">
      <button onclick="openMap('\${place.name}')" class="btn btn-primary">เปิดใน Google Maps</button>
    </div>
  \`;
  modal.style.display = "flex";
}

document.getElementById("closeModalBtn").addEventListener("click", () => {
  document.getElementById("detailModal").style.display = "none";
});

// --- 6. ระบบ Favorites (LocalStorage) ---
function toggleFav(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(item => item !== id);
  } else {
    favorites.push(id);
  }
  localStorage.setItem("surin_favs", JSON.stringify(favorites));
  updateBadges();
  renderPlaces();
}

// --- 7. ระบบ My Trip (LocalStorage) ---
function toggleTrip(id) {
  if (myTrip.includes(id)) {
    myTrip = myTrip.filter(item => item !== id);
  } else {
    myTrip.push(id);
  }
  localStorage.setItem("surin_trip", JSON.stringify(myTrip));
  updateBadges();
  renderPlaces();
  renderMyTrip();
}

function renderMyTrip() {
  const container = document.getElementById("myTripList");
  if (myTrip.length === 0) {
    container.innerHTML = "<p style='text-align:center; color:#888;'>ยังไม่มีสถานที่ในทริปของคุณ กด '+ ทริป' เพื่อเพิ่ม</p>";
    return;
  }
  container.innerHTML = myTrip.map(id => {
    const p = attractionsData.find(x => x.id === id);
    if (!p) return "";
    return \`
      <div style="display:flex; justify-content:space-between; align-items:center; padding:10px; background:#fff; margin-bottom:8px; border-radius:8px; border:1px solid #eee;">
        <span>🐘 \${p.name} (\${p.district})</span>
        <button onclick="toggleTrip('\${p.id}')" style="background:#fee; color:#c00; border:none; padding:4px 8px; border-radius:4px; cursor:pointer;">ลบ</button>
      </div>
    \`;
  }).join("");
}

function updateBadges() {
  document.getElementById("favBadge").textContent = favorites.length;
  document.getElementById("tripBadge").textContent = myTrip.length;
}

// --- 8. คำนวณงบประมาณ (Budget Calculator) ---
function calculateBudget() {
  const days = parseInt(document.getElementById("calcDays").value);
  const people = parseInt(document.getElementById("calcPeople").value);
  const budget = parseFloat(document.getElementById("calcBudget").value);

  const transport = days === 1 ? 500 : days === 2 ? 1100 : 1600;
  const food = days * people * 320;
  const hotel = days > 1 ? (days - 1) * Math.ceil(people / 2) * 750 : 0;
  const entrance = people * (days === 1 ? 60 : 80);
  const misc = people * days * 120;
  const total = transport + food + hotel + entrance + misc;

  const resultDiv = document.getElementById("calcResults");
  const isEnough = budget >= total;

  resultDiv.innerHTML = \`
    <h3>สรุปค่าใช้จ่ายประมาณการ:</h3>
    <p>• ค่าเดินทาง/น้ำมัน: \${transport.toLocaleString()} บาท</p>
    <p>• ค่าอาหาร (\${days} วัน): \${food.toLocaleString()} บาท</p>
    <p>• ค่าที่พัก (\${days > 1 ? days-1 : 0} คืน): \${hotel.toLocaleString()} บาท</p>
    <p>• ค่าเข้าชม: \${entrance.toLocaleString()} บาท</p>
    <p>• อื่นๆ/ของฝาก: \${misc.toLocaleString()} บาท</p>
    <hr style="margin:10px 0; border:0; border-top:1px solid #ddd;">
    <h4 style="color:\${isEnough ? '#2d6a4f' : '#b00'}">รวมทั้งหมด: \${total.toLocaleString()} บาท</h4>
    <p style="font-size:0.85rem; margin-top:6px;">\${
      isEnough 
        ? "✓ งบประมาณเพียงพอสำหรับการเดินทางอย่างสบาย!"
        : "⚠ งบอาจไม่พอ แนะนำให้ปรับลดค่าที่พักหรือร่วมแชร์ค่าเดินทาง"
    }</p>
  \`;
}
document.getElementById("recalcBtn").addEventListener("click", calculateBudget);

// --- 9. เปิด Google Maps ---
function openMap(name) {
  const url = \`https://www.google.com/maps/search/?api=1&query=\${encodeURIComponent(name + ' สุรินทร์')}\`;
  window.open(url, "_blank");
}

// --- 10. ระบบรีวิว (LocalStorage) ---
function renderReviews() {
  const list = document.getElementById("reviewsList");
  list.innerHTML = reviews.map(r => \`
    <div style="background:#f9f8f5; padding:12px; border-radius:8px; margin-bottom:10px; border:1px solid #eee;">
      <strong>\${r.name}</strong> - \${r.place} (\${'⭐'.repeat(r.rating)})
      <p style="font-size:0.9rem; margin-top:4px;">"\${r.comment}"</p>
    </div>
  \`).join("");

  // อัปเดต dropdown สถานที่ในฟอร์มรีวิว
  const select = document.getElementById("reviewPlace");
  select.innerHTML = attractionsData.map(p => \`<option value="\${p.name}">\${p.name}</option>\`).join("");
}

document.getElementById("reviewForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("reviewerName").value;
  const place = document.getElementById("reviewPlace").value;
  const rating = parseInt(document.getElementById("reviewRating").value);
  const comment = document.getElementById("reviewComment").value;

  reviews.unshift({ name, place, rating, comment });
  localStorage.setItem("surin_reviews", JSON.stringify(reviews));
  renderReviews();
  alert("ส่งรีวิวเรียบร้อย ขอบคุณครับ!");
  e.target.reset();
});

// Back to top
document.getElementById("backToTopBtn").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#FDFBF7] rounded-2xl shadow-2xl border border-[#E5D5C0] overflow-hidden flex flex-col animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 bg-[#5A5A40] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#C5A059] flex items-center justify-center text-white">
              <FileCode2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-white">
                โค้ดสำหรับส่งครู (HTML5, CSS3, JavaScript)
              </h3>
              <p className="text-xs text-[#E5D5C0]">
                แยกไฟล์เป็น index.html, style.css, script.js พร้อมใช้งานและสามารถดับเบิลคลิกเปิดได้ทันที
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-[#E5D5C0] hover:text-white transition-colors cursor-pointer"
            aria-label="ปิด"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-2 p-2.5 bg-[#F5F2ED] border-b border-[#E5D5C0] shrink-0">
          <button
            onClick={() => setActiveTab('instructions')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'instructions'
                ? 'bg-white text-[#5A5A40] shadow-xs border border-[#E5D5C0]'
                : 'text-[#8B5E3C] hover:bg-[#E5D5C0]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>คำแนะนำและวิธีเปิดไฟล์</span>
          </button>

          <button
            onClick={() => setActiveTab('html')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'html'
                ? 'bg-white text-[#5A5A40] shadow-xs border border-[#E5D5C0]'
                : 'text-[#8B5E3C] hover:bg-[#E5D5C0]'
            }`}
          >
            <Code className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>index.html</span>
          </button>

          <button
            onClick={() => setActiveTab('css')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'css'
                ? 'bg-white text-[#5A5A40] shadow-xs border border-[#E5D5C0]'
                : 'text-[#8B5E3C] hover:bg-[#E5D5C0]'
            }`}
          >
            <Code className="w-3.5 h-3.5 text-[#5A5A40]" />
            <span>style.css</span>
          </button>

          <button
            onClick={() => setActiveTab('js')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'js'
                ? 'bg-white text-[#5A5A40] shadow-xs border border-[#E5D5C0]'
                : 'text-[#8B5E3C] hover:bg-[#E5D5C0]'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-[#8B5E3C]" />
            <span>script.js</span>
          </button>

          <a
            href="/student-project/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto px-3 py-1.5 rounded-full bg-[#C5A059] hover:bg-[#8B5E3C] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            title="เปิดหน้าเว็บฉบับ HTML/JS แท้ในแท็บใหม่"
          >
            <span>เปิดหน้าฉบับ Vanilla ในแท็บใหม่</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Tab Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 font-mono text-xs text-stone-800">
          
          {activeTab === 'instructions' && (
            <div className="font-sans space-y-6 text-sm text-stone-700">
              
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                <h4 className="font-heading font-bold text-base text-amber-950 flex items-center gap-2">
                  <span className="text-xl">🎓</span>
                  คู่มือสำหรับนักเรียนนำไปส่งครูและปรับแต่งเพิ่มเติม
                </h4>
                <p className="text-xs text-stone-700 leading-relaxed">
                  โค้ดในระบบนี้ถูกออกแบบให้เป็นไปตามข้อกำหนดโครงงานคอมพิวเตอร์ระดับมัธยม/อาชีวะทั้งหมด
                  โดยใช้เทคโนโลยีพื้นฐานมาตรฐานเว็บ <strong>HTML5, CSS3, และ Vanilla JavaScript</strong> โดยไม่ต้องติดตั้งโปรแกรมพิเศษใดๆ
                </p>
              </div>

              {/* Step 1: How to run */}
              <div className="space-y-2">
                <h5 className="font-heading font-bold text-base text-stone-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs flex items-center justify-center font-mono">1</span>
                  วิธีเปิดใช้งานเว็บไซต์บนเครื่องคอมพิวเตอร์
                </h5>
                <ol className="list-decimal list-inside space-y-1.5 text-xs sm:text-sm pl-4 text-stone-600">
                  <li>สร้างโฟลเดอร์ใหม่ เช่น ตั้งชื่อว่า <code className="bg-stone-100 px-1.5 py-0.5 rounded text-amber-800 font-bold">surin-travel</code></li>
                  <li>คัดลอกโค้ดจากแท็บ <strong>index.html</strong> ไปบันทึกเป็นไฟล์ชื่อ <code className="bg-stone-100 px-1 py-0.5 rounded font-mono">index.html</code></li>
                  <li>คัดลอกโค้ดจากแท็บ <strong>style.css</strong> ไปบันทึกเป็นไฟล์ชื่อ <code className="bg-stone-100 px-1 py-0.5 rounded font-mono">style.css</code> (ไว้ในโฟลเดอร์เดียวกัน)</li>
                  <li>คัดลอกโค้ดจากแท็บ <strong>script.js</strong> ไปบันทึกเป็นไฟล์ชื่อ <code className="bg-stone-100 px-1 py-0.5 rounded font-mono">script.js</code> (ไว้ในโฟลเดอร์เดียวกัน)</li>
                  <li><strong>ดับเบิลคลิกที่ไฟล์ <code className="bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-bold">index.html</code></strong> ได้ทันที เว็บไซต์จะเปิดทำงานบน Google Chrome หรือ Microsoft Edge โดยไม่ต้องต่อเน็ตหรือรันเซิร์ฟเวอร์!</li>
                </ol>
              </div>

              {/* Step 2: How to edit tourist places */}
              <div className="space-y-2">
                <h5 className="font-heading font-bold text-base text-stone-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-800 text-white text-xs flex items-center justify-center font-mono">2</span>
                  วิธีแก้ไขข้อมูลสถานที่ท่องเที่ยว
                </h5>
                <p className="text-xs text-stone-600">
                  เปิดไฟล์ <code className="bg-stone-100 px-1.5 py-0.5 rounded font-mono font-bold text-amber-800">script.js</code> ด้วยโปรแกรม Notepad หรือ VS Code แล้วค้นหาตัวแปร:
                </p>
                <div className="p-3 bg-stone-900 text-amber-300 rounded-xl font-mono text-xs overflow-x-auto">
                  const attractionsData = [...]
                </div>
                <p className="text-xs text-stone-600">
                  คุณสามารถแก้ไขชื่อสถานที่, อำเภอ, ประเภท, คำอธิบาย, เวลาเปิด-ปิด, และลิงก์รูปภาพ หรือคัดลอกบล็อกเพื่อเพิ่มสถานที่ใหม่ได้ตามต้องการ
                </p>
              </div>

              {/* Step 3: Explanation of JavaScript modules */}
              <div className="space-y-2">
                <h5 className="font-heading font-bold text-base text-stone-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-800 text-white text-xs flex items-center justify-center font-mono">3</span>
                  ฟังก์ชัน JavaScript ในโปรเจกต์ (สำหรับตอบคำถามคุณครู)
                </h5>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-700">
                  <li className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                    <strong>Search & Filter:</strong> ใช้ <code className="text-amber-800 font-bold">Array.filter()</code> คัดกรองชื่อและประเภทแบบ Real-time
                  </li>
                  <li className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                    <strong>Detail Modal:</strong> ใช้ฟังก์ชัน <code className="text-amber-800 font-bold">openDetail(id)</code> ดึงข้อมูลขึ้นแสดงในป๊อปอัป
                  </li>
                  <li className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                    <strong>LocalStorage:</strong> บันทึกรายการโปรด รีวิว และทริปด้วย <code className="text-amber-800 font-bold">localStorage.setItem()</code>
                  </li>
                  <li className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                    <strong>Budget Calculator:</strong> ฟังก์ชันคำนวณค่าอาหาร ค่ารถ ค่าที่พักตามจำนวนวันและคนแบบ Real-time
                  </li>
                </ul>
              </div>

            </div>
          )}

          {activeTab === 'html' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[#8B5E3C] text-xs font-medium">index.html (HTML5)</span>
                <button
                  onClick={() => copyToClipboard(sampleHtmlCode, 'html')}
                  className="px-3 py-1.5 rounded-full bg-[#C5A059] hover:bg-[#8B5E3C] text-white font-sans text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  {copiedTab === 'html' ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedTab === 'html' ? 'คัดลอกเรียบร้อย!' : 'คัดลอกโค้ด HTML'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-[#2D2D2A] text-stone-100 overflow-x-auto max-h-96 leading-relaxed select-all">
                {sampleHtmlCode}
              </pre>
            </div>
          )}

          {activeTab === 'css' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[#8B5E3C] text-xs font-medium">style.css (CSS3)</span>
                <button
                  onClick={() => copyToClipboard(sampleCssCode, 'css')}
                  className="px-3 py-1.5 rounded-full bg-[#C5A059] hover:bg-[#8B5E3C] text-white font-sans text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  {copiedTab === 'css' ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedTab === 'css' ? 'คัดลอกเรียบร้อย!' : 'คัดลอกโค้ด CSS'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-[#2D2D2A] text-stone-100 overflow-x-auto max-h-96 leading-relaxed select-all">
                {sampleCssCode}
              </pre>
            </div>
          )}

          {activeTab === 'js' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[#8B5E3C] text-xs font-medium">script.js (JavaScript Vanilla)</span>
                <button
                  onClick={() => copyToClipboard(sampleJsCode, 'js')}
                  className="px-3 py-1.5 rounded-full bg-[#C5A059] hover:bg-[#8B5E3C] text-white font-sans text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  {copiedTab === 'js' ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedTab === 'js' ? 'คัดลอกเรียบร้อย!' : 'คัดลอกโค้ด JS'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-[#2D2D2A] text-stone-100 overflow-x-auto max-h-96 leading-relaxed select-all">
                {sampleJsCode}
              </pre>
            </div>
          )}

        </div>

        {/* Modal Bottom Footer */}
        <div className="p-3.5 bg-white border-t border-[#E5D5C0] flex justify-between items-center text-xs text-[#8B5E3C] shrink-0">
          <span>💡 นักเรียนสามารถคัดลอกโค้ดทั้ง 3 ไฟล์ไปสร้างโครงงานส่งครูได้ทันที</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#5A5A40] hover:bg-[#2D2D2A] text-white rounded-full text-xs font-semibold transition-colors cursor-pointer"
          >
            ปิดหน้าต่าง
          </button>
        </div>

      </div>
    </div>
  );
};
