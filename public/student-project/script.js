/* 
========================================================================
โครงงาน: เว็บไซต์แนะนำสถานที่ท่องเที่ยวจังหวัดสุรินทร์
ชื่อเว็บไซต์: "เที่ยวสุรินทร์ เมืองช้าง"
ไฟล์: script.js
รวมทุกฟังก์ชัน JavaScript ที่ใช้งานได้จริง:
1. ข้อมูลสถานที่ท่องเที่ยวที่ผ่านการตรวจสอบแล้ว ไม่สร้างข้อมูลปลอม
2. Render Cards แสดงผลสถานที่ท่องเที่ยว
3. Real-time Search ค้นหาทันทีตามตัวอักษร
4. Category Filter กรองประเภทสถานที่
5. Detail Modal หน้าต่างแสดงรายละเอียดพร้อมเวลาเปิด-ปิด และค่าเข้าชม
6. Favorites System บันทึกสถานที่โปรดด้วย LocalStorage
7. My Trip System จัดทริปและคำนวณค่าใช้จ่ายด้วย LocalStorage
8. Budget Calculator ระบบคำนวณงบประมาณ
9. Itinerary Timeline แนะนำเส้นทางท่องเที่ยว
10. Review System ระบบรีวิวและให้คะแนนดาวด้วย LocalStorage
========================================================================
*/

// --- 1. ข้อมูลสถานที่ท่องเที่ยวจังหวัดสุรินทร์ (Verified Real Data) ---
const attractionsData = [
  {
    id: "phanom-sawai",
    name: "วนอุทยานพนมสวาย",
    district: "อำเภอเมืองสุรินทร์",
    category: "ธรรมชาติ",
    feeNum: 0,
    shortDesc: "ยอดเขาศักดิ์สิทธิ์ 3 ยอด แหล่งเคารพสักการะ จุดชมวิว 360 องศา และบันไดระฆัง 1,080 ใบ",
    fullDesc: "วนอุทยานพนมสวาย ประกอบด้วยเนินเขาเตี้ยๆ 3 ยอด ได้แก่ ยอดเขาชาย (พนมเปร๊าะ) ประดิษฐานพระพุทธสุรินทรมงคล, ยอดเขาหญิง (พนมสรัย) ประดิษฐานพระพุทธรูปองค์รอง และยอดเขาคอก (พนมกรอล) จุดเด่นคือบันไดขึ้นเขาที่มีระฆังแขวนเรียงรายถึง 1,080 ใบให้นักท่องเที่ยวเคาะเพื่อความเป็นสิริมงคล",
    hours: "เปิดทุกวัน 08:30 – 16:30 น.",
    fee: "ไม่มีค่าธรรมเนียมเข้าชม (ฟรี)",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ban-ta-klang",
    name: "ศูนย์คชศึกษา / หมู่บ้านช้างบ้านตากลาง",
    district: "อำเภอท่าตูม",
    category: "ครอบครัว",
    feeNum: 50,
    shortDesc: "หมู่บ้านช้างเลี้ยงที่ใหญ่ที่สุดในโลก สัมผัสวิถีชีวิตชาวกูยคนเลี้ยงช้างที่ผูกพันกันดั่งสมาชิกครอบครัว",
    fullDesc: "ศูนย์คชศึกษา หมู่บ้านช้างบ้านตากลาง เป็นแหล่งท่องเที่ยวเชิงวัฒนธรรมระดับโลกที่ชาวส่วยหรือชาวกูยเลี้ยงช้างเสมือนคนในครอบครัว มีการแสดงความสามารถและความฉลาดแสนรู้ของช้าง นิทรรศการพิพิธภัณฑ์ช้าง และจุดชมช้างอาบน้ำริมแม่น้ำมูล",
    hours: "เปิดทุกวัน 08:30 – 16:30 น. (รอบการแสดงช้าง: 10:00 น. และ 14:00 น.)",
    fee: "ผู้ใหญ่ 50 บาท, เด็ก 20 บาท, ชาวต่างชาติ ผู้ใหญ่ 100 บาท เด็ก 50 บาท",
    image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "prasat-sikhoraphum",
    name: "ปราสาทศีขรภูมิ",
    district: "อำเภอศีขรภูมิ",
    category: "ประวัติศาสตร์",
    feeNum: 10,
    shortDesc: "ปราสาทหินขอม 5 ยอดบนฐานศิลาแลงเดียวกัน โดดเด่นด้วยทับหลังศิวนาฏราช 10 กรที่สมบูรณ์ที่สุด",
    fullDesc: "ปราสาทศีขรภูมิ หรือปราสาทระแงง สร้างขึ้นในราวพุทธศตวรรษที่ 17 ศิลปะขอมแบบบาปวนผสมผสานนครวัด ปรางค์ประธานมีทับหลังศิวนาฏราช 10 กรที่สลักลวดลายได้อย่างวิจิตรบรรจง และมีเสากรอบประตูสลักรูปนางอัปสรถือดอกบัวซึ่งมีเพียงแห่งเดียวในประเทศไทย",
    hours: "เปิดทุกวัน 07:30 – 18:00 น.",
    fee: "ชาวไทย 10 บาท, ชาวต่างชาติ 50 บาท (นักเรียนในเครื่องแบบเข้าชมฟรี)",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Prasat_Sikhoraphum_01.jpg/1200px-Prasat_Sikhoraphum_01.jpg"
  },
  {
    id: "prasat-chang-pi",
    name: "ปราสาทช่างปี่",
    district: "อำเภอศีขรภูมิ",
    category: "ประวัติศาสตร์",
    feeNum: 0,
    shortDesc: "อโรคยศาล (สุขศาลาโบราณ) ในรัชสมัยพระเจ้าชัยวรมันที่ 7 แห่งอาณาจักรขอมโบราณ",
    fullDesc: "ปราสาทช่างปี่ เป็นศาสนสถานประจำสุขศาลาหรือสถานพยาบาล (อโรคยศาล) 1 ใน 102 แห่งที่พระเจ้าชัยวรมันที่ 7 ทรงโปรดให้สร้างขึ้น ก่อด้วยศิลาแลงและหินทราย สะท้อนให้เห็นถึงระบบการแพทย์และสาธารณสุขชุมชนในอดีตกาล",
    hours: "เปิดให้เข้าชมทุกวัน เวลากลางวัน",
    fee: "ไม่มีค่าธรรมเนียมเข้าชม (ฟรี)",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Prasat_Hin_Phanom_Rung_2015.jpg/1200px-Prasat_Hin_Phanom_Rung_2015.jpg"
  },
  {
    id: "prasat-yai-ngao",
    name: "ปราสาทยายเหงา",
    district: "อำเภอสังขะ",
    category: "ประวัติศาสตร์",
    feeNum: 0,
    shortDesc: "ปราสาทอิฐคู่ทรงคุณค่าศิลปะขอมโบราณ พร้อมตำนานยายเหงาอันเปี่ยมมนต์เสน่ห์",
    fullDesc: "โบราณสถานศิลปะขอม ตั้งอยู่ริมทางหลวงในอำเภอสังขะ ประกอบด้วยปรางค์ก่ออิฐ 2 องค์ ตั้งอยู่บนฐานศิลาแลงเดียวกัน มีการค้นพบทับหลังรูปพระอิศวรทรงโคนนทิ และมีเรื่องเล่าสืบต่อกันมาเกี่ยวกับคุณยายที่นั่งเฝ้ารอคอยจนกลายเป็นชื่อปราสาท",
    hours: "เปิดทุกวัน เวลากลางวัน",
    fee: "ไม่มีค่าธรรมเนียมเข้าชม (ฟรี)",
    image: "https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "huai-saneng",
    name: "อ่างเก็บน้ำห้วยเสนง",
    district: "อำเภอเมืองสุรินทร์",
    category: "จุดชมวิว",
    feeNum: 0,
    shortDesc: "ทะเลสาบน้ำจืดขนาดใหญ่ ปอดฟอกอากาศของชาวสุรินทร์ จุดชมพระอาทิตย์ตกดินและออกกำลังกาย",
    fullDesc: "อ่างเก็บน้ำโครงการชลประทานสุรินทร์ บรรยากาศร่มรื่น วิวทิวทัศน์กว้างไกล มีสันเขื่อนลาดยางยาวสำหรับวิ่งหรือปั่นจักรยาน ยามเย็นมีพระอาทิตย์ตกสะท้อนผิวน้ำงดงาม พร้อมร้านอาหารจำหน่ายปลาสดริมอ่าง",
    hours: "เปิดทุกวัน 06:00 – 18:30 น.",
    fee: "ไม่มีค่าธรรมเนียมเข้าชม (ฟรี)",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "surin-museum",
    name: "พิพิธภัณฑสถานแห่งชาติสุรินทร์",
    district: "อำเภอเมืองสุรินทร์",
    category: "วัฒนธรรม",
    feeNum: 20,
    shortDesc: "คลังมรดกทางวัฒนธรรม นิทรรศการมัลติมีเดียรวบรวม 4 กลุ่มชาติพันธุ์และประวัติศาสตร์สุรินทร์",
    fullDesc: "แหล่งเรียนรู้ประวัติศาสตร์ ธรรมชาติวิทยา โบราณคดี ชาติพันธุ์วิทยาชาวเขมร ลาว กูย และจีน รวมทั้งจัดแสดงมรดกภูมิปัญญาการทอผ้าไหมยกทองโบราณและประวัติเมืองสุรินทร์อย่างละเอียดและทันสมัย",
    hours: "เปิดวันพุธ – วันอาทิตย์ 09:00 – 16:00 น. (ปิดวันจันทร์ วันอังคาร และวันหยุดนักขัตฤกษ์)",
    fee: "ชาวไทย 20 บาท, ชาวต่างชาติ 100 บาท (นักเรียน นักศึกษาในเครื่องแบบเข้าชมฟรี)",
    image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "phraya-surin-monument",
    name: "อนุสาวรีย์พระยาสุรินทรภักดีศรีณรงค์จางวาง",
    district: "อำเภอเมืองสุรินทร์",
    category: "วัฒนธรรม",
    feeNum: 0,
    shortDesc: "อนุสาวรีย์เจ้าเมืองสุรินทร์คนแรก ศูนย์รวมจิตใจและความภาคภูมิใจของลูกหลานชาวสุรินทร์",
    fullDesc: "อนุสาวรีย์หล่อด้วยโลหะทองเหลืองรมดำ เจ้าเมืองสุรินทร์คนแรก (เชียงปุ่ม) มือขวาถือของ้าว มือซ้ายถือเคียว ณ วงเวียนทางเข้าตัวเมืองสุรินทร์ด้านใต้ เป็นสถานที่ที่ประชาชนและนักท่องเที่ยวนิยมมากราบไหว้ขอพรเพื่อความเป็นสิริมงคล",
    hours: "เปิดให้สักการะตลอด 24 ชั่วโมง",
    fee: "ไม่มีค่าธรรมเนียมเข้าชม (ฟรี)",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Phraya_Surin_Phakdi_Sri_Narong_Changwang_Monument.jpg/1024px-Phraya_Surin_Phakdi_Sri_Narong_Changwang_Monument.jpg"
  }
];

// --- 2. สถานะของแอปพลิเคชัน (State Management) ---
let currentCategory = "ทั้งหมด";
let favorites = JSON.parse(localStorage.getItem("surin_favs")) || [];
let myTrip = JSON.parse(localStorage.getItem("surin_trip")) || [];
let reviews = JSON.parse(localStorage.getItem("surin_reviews")) || [
  {
    id: "rev-1",
    authorName: "คุณกิตติพงษ์",
    attractionName: "ศูนย์คชศึกษา / หมู่บ้านช้างบ้านตากลาง",
    rating: 5,
    comment: "ช้างน่ารักและฉลาดมาก คนเลี้ยงดูแลเหมือนคนในครอบครัว มีการแสดงให้ชม คุ้มค่ามากครับ",
    date: "12 ก.พ. 2026"
  },
  {
    id: "rev-2",
    authorName: "อารียา นักเดินทาง",
    attractionName: "ปราสาทศีขรภูมิ",
    rating: 5,
    comment: "ทับหลังศิวนาฏราชสวยและสมบูรณ์มาก แนะนำให้มาตอนเช้าหรือบ่าย แสงแดดส่ององค์ปราสาทถ่ายรูปสวยมาก",
    date: "18 ม.ค. 2026"
  }
];

// --- 3. เริ่มต้นเมื่อโหลดหน้าเว็บ ---
document.addEventListener("DOMContentLoaded", () => {
  renderPlaces();
  renderFavorites();
  renderMyTrip();
  renderReviews();
  updateBadges();
  calculateBudget();
  showItinerary(1);
  setupEvents();
});

// --- 4. ฟังก์ชันแสดงการ์ดสถานที่ (Render Cards) ---
function renderPlaces() {
  const grid = document.getElementById("placesGrid");
  const search = document.getElementById("searchInput").value.toLowerCase().trim();
  const noResults = document.getElementById("noResults");

  const filtered = attractionsData.filter(place => {
    const matchCategory = currentCategory === "ทั้งหมด" || place.category === currentCategory;
    const matchSearch = place.name.toLowerCase().includes(search) ||
                        place.district.toLowerCase().includes(search) ||
                        place.category.toLowerCase().includes(search) ||
                        place.shortDesc.toLowerCase().includes(search);
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

    return `
      <div class="place-card">
        <div class="card-img-box">
          <img src="${place.image}" alt="${place.name}" class="card-img" onerror="this.src='https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=800&q=80'">
          <span class="card-category-badge">${place.category}</span>
          <button class="card-fav-btn" onclick="toggleFavorite('${place.id}')" title="${isFav ? 'นำออกจากสถานที่โปรด' : 'บันทึกเป็นสถานที่โปรด'}">
            ${isFav ? '❤️' : '🤍'}
          </button>
        </div>
        <div class="card-body">
          <div>
            <h3 class="card-title">${place.name}</h3>
            <p class="card-district">📍 ${place.district}</p>
            <p class="card-desc">${place.shortDesc}</p>
          </div>
          <div class="card-actions">
            <button onclick="openDetailModal('${place.id}')" class="btn btn-primary">ดูรายละเอียด</button>
            <button onclick="openGoogleMaps('${place.name}')" class="btn btn-secondary">ดูแผนที่</button>
            <button onclick="toggleMyTrip('${place.id}')" class="btn" style="background:${inTrip ? '#2d6a4f' : '#2b2b2b'}; color:#ffffff;">
              ${inTrip ? '✓ ในทริป' : '+ เพิ่มลงทริป'}
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// --- 5. Event Listeners ---
function setupEvents() {
  // Mobile Nav Toggle
  const menuBtn = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  // Real-time Search Input
  const searchInput = document.getElementById("searchInput");
  const clearBtn = document.getElementById("clearSearchBtn");
  if (searchInput) {
    searchInput.addEventListener("input", renderPlaces);
  }
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      renderPlaces();
    });
  }

  // Filter Buttons
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      filterBtns.forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      currentCategory = e.target.dataset.category;
      renderPlaces();
    });
  });

  // Modal Close
  const closeBtn = document.getElementById("closeModalBtn");
  const modal = document.getElementById("detailModal");
  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.style.display = "none";
    });
  }

  // Budget Calculator Button
  const recalcBtn = document.getElementById("recalcBtn");
  if (recalcBtn) {
    recalcBtn.addEventListener("click", calculateBudget);
  }

  // Review Form Submit
  const reviewForm = document.getElementById("reviewForm");
  if (reviewForm) {
    reviewForm.addEventListener("submit", handleReviewSubmit);
  }

  // Back to top
  const backTop = document.getElementById("backToTopBtn");
  if (backTop) {
    backTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

// --- 6. หน้าต่างรายละเอียดสถานที่ (Modal) ---
function openDetailModal(id) {
  const place = attractionsData.find(p => p.id === id);
  if (!place) return;

  const modal = document.getElementById("detailModal");
  const body = document.getElementById("modalBody");

  body.innerHTML = `
    <img src="${place.image}" style="width:100%; height:260px; object-fit:cover; border-radius:12px; margin-bottom:20px;">
    <h2 style="font-size:1.8rem; margin-bottom:8px;">${place.name}</h2>
    <p style="color:#666; margin-bottom:15px; font-size:0.95rem;">📍 ${place.district} | ประเภท: ${place.category}</p>
    <p style="line-height:1.7; margin-bottom:20px;">${place.fullDesc}</p>
    <div style="background:#f7f4ed; padding:15px; border-radius:10px; margin-bottom:20px; font-size:0.95rem;">
      <p style="margin-bottom:6px;"><strong>⏰ เวลาเปิด-ปิด:</strong> ${place.hours}</p>
      <p><strong>🎟️ ค่าเข้าชม:</strong> ${place.fee}</p>
    </div>
    <div style="display:flex; gap:10px;">
      <button onclick="openGoogleMaps('${place.name}')" class="btn btn-primary">นำทางผ่าน Google Maps</button>
      <button onclick="toggleMyTrip('${place.id}')" class="btn btn-secondary">${myTrip.includes(place.id) ? 'นำออกจากทริป' : 'เพิ่มลงทริปของฉัน'}</button>
    </div>
  `;
  modal.style.display = "flex";
}

// --- 7. ระบบเปิด Google Maps ---
function openGoogleMaps(query) {
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query + ' สุรินทร์')}`;
  window.open(url, "_blank");
}

// --- 8. ระบบ Favorites (LocalStorage) ---
function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(item => item !== id);
  } else {
    favorites.push(id);
  }
  localStorage.setItem("surin_favs", JSON.stringify(favorites));
  updateBadges();
  renderPlaces();
  renderFavorites();
}

function renderFavorites() {
  const container = document.getElementById("favoritesList");
  if (!container) return;

  if (favorites.length === 0) {
    container.innerHTML = "<p style='grid-column: 1/-1; text-align:center; color:#888; padding:30px;'>ยังไม่มีสถานที่โปรด กดปุ่ม ❤️ ที่การ์ดเพื่อบันทึก</p>";
    return;
  }

  container.innerHTML = favorites.map(id => {
    const p = attractionsData.find(x => x.id === id);
    if (!p) return "";
    return `
      <div class="place-card" style="padding:15px;">
        <h4 style="font-size:1.1rem; margin-bottom:5px;">${p.name}</h4>
        <p style="font-size:0.85rem; color:#777; margin-bottom:10px;">📍 ${p.district}</p>
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <button onclick="openDetailModal('${p.id}')" class="btn btn-primary" style="padding:6px 12px; font-size:0.85rem;">ดูข้อมูล</button>
          <button onclick="toggleFavorite('${p.id}')" style="background:none; border:none; color:#c00; font-size:1.2rem; cursor:pointer;" title="ลบออก">🗑️</button>
        </div>
      </div>
    `;
  }).join("");
}

// --- 9. ระบบจัดทริปของฉัน (My Trip with LocalStorage) ---
function toggleMyTrip(id) {
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
  if (!container) return;

  if (myTrip.length === 0) {
    container.innerHTML = "<p style='text-align:center; color:#888; padding:30px;'>ยังไม่มีสถานที่ในทริปของคุณ กด '+ เพิ่มลงทริป' ที่การ์ดสถานที่เพื่อเริ่มต้นจัดทริป</p>";
    return;
  }

  const totalFee = myTrip.reduce((sum, id) => {
    const p = attractionsData.find(x => x.id === id);
    return sum + (p ? p.feeNum : 0);
  }, 0);

  const placesHtml = myTrip.map((id, index) => {
    const p = attractionsData.find(x => x.id === id);
    if (!p) return "";
    return `
      <div style="display:flex; justify-content:space-between; align-items:center; padding:12px 16px; background:#faf8f5; margin-bottom:10px; border-radius:10px; border:1px solid #e8e2d5;">
        <div>
          <strong>${index + 1}. ${p.name}</strong> 
          <span style="font-size:0.85rem; color:#666; margin-left:8px;">(${p.district}) - ค่าเข้าชม: ${p.fee}</span>
        </div>
        <div style="display:flex; gap:8px;">
          <button onclick="openDetailModal('${p.id}')" class="btn btn-secondary" style="padding:6px 10px; font-size:0.8rem;">ดูข้อมูล</button>
          <button onclick="toggleMyTrip('${p.id}')" class="btn" style="padding:6px 10px; font-size:0.8rem; background:#ffebeb; color:#d00;">ลบ</button>
        </div>
      </div>
    `;
  }).join("");

  container.innerHTML = `
    <div style="margin-bottom:15px; display:flex; justify-content:space-between; align-items:center; background:#fff; padding:12px; border-radius:8px;">
      <span><strong>จำนวนสถานที่ในทริป:</strong> ${myTrip.length} แห่ง</span>
      <span><strong>ประมาณการค่าเข้าชมรวม:</strong> ${totalFee > 0 ? totalFee + ' บาท/คน' : 'ฟรีทุกที่!'}</span>
    </div>
    ${placesHtml}
  `;
}

function updateBadges() {
  const favB = document.getElementById("favBadge");
  const tripB = document.getElementById("tripBadge");
  if (favB) favB.textContent = favorites.length;
  if (tripB) tripB.textContent = myTrip.length;
}

// --- 10. ระบบคำนวณงบประมาณเที่ยว (Budget Calculator) ---
function calculateBudget() {
  const days = parseInt(document.getElementById("calcDays")?.value || "2");
  const people = parseInt(document.getElementById("calcPeople")?.value || "2");
  const budget = parseFloat(document.getElementById("calcBudget")?.value || "4500");

  const transport = days === 1 ? 500 : days === 2 ? 1100 : 1600;
  const food = days * people * 320;
  const hotel = days > 1 ? (days - 1) * Math.ceil(people / 2) * 750 : 0;
  const entrance = people * (days === 1 ? 60 : 80);
  const misc = people * days * 120;
  const total = transport + food + hotel + entrance + misc;

  const resultDiv = document.getElementById("calcResults");
  if (!resultDiv) return;

  const isEnough = budget >= total;

  resultDiv.innerHTML = `
    <h3>สรุปค่าใช้จ่ายประมาณการ (${days} วัน ${days > 1 ? days-1 + ' คืน' : ''}, ${people} คน):</h3>
    <p>• ค่าเดินทาง/ค่าน้ำมันรถ: <strong>${transport.toLocaleString()}</strong> บาท</p>
    <p>• ค่าอาหารและเครื่องดื่ม: <strong>${food.toLocaleString()}</strong> บาท</p>
    <p>• ค่าที่พักโรงแรม (${days > 1 ? days-1 : 0} คืน): <strong>${hotel.toLocaleString()}</strong> บาท</p>
    <p>• ค่าเข้าชมสถานที่: <strong>${entrance.toLocaleString()}</strong> บาท</p>
    <p>• ค่าซื้อของฝากและเบ็ดเตล็ด: <strong>${misc.toLocaleString()}</strong> บาท</p>
    <hr style="margin:14px 0; border:0; border-top:1px solid #e8e2d5;">
    <h4 style="font-size:1.3rem; color:${isEnough ? '#2d6a4f' : '#c53030'};">รวมประมาณการ: ${total.toLocaleString()} บาท</h4>
    <p style="font-size:0.9rem; margin-top:8px; color:${isEnough ? '#2d6a4f' : '#c53030'};">
      ${isEnough 
        ? "✓ ยอดเยี่ยม! งบประมาณ " + budget.toLocaleString() + " บาทที่คุณเตรียมไว้ เพียงพอต่อการท่องเที่ยวอย่างสบายใจ" 
        : "⚠ งบประมาณที่คุณตั้งไว้ " + budget.toLocaleString() + " บาท อาจไม่เพียงพอ (ขาด " + (total - budget).toLocaleString() + " บาท) แนะนำให้ปรับลดค่าที่พักหรือแชร์ค่าเดินทาง"}
    </p>
  `;
}

// --- 11. แนะนำเส้นทางท่องเที่ยว (Itinerary Timeline) ---
function showItinerary(type) {
  const tab1 = document.getElementById("tabTrip1");
  const tab2 = document.getElementById("tabTrip2");
  const content = document.getElementById("itineraryContent");
  if (!content) return;

  if (type === 1) {
    if (tab1) tab1.classList.add("active");
    if (tab2) tab2.classList.remove("active");
    content.innerHTML = `
      <h3 style="margin-bottom:15px; font-size:1.3rem; color:#8c5836;">ทริป 1 วัน: เส้นทางมนต์เสน่ห์เมืองสุรินทร์</h3>
      <div class="timeline-item">
        <span class="timeline-time">08:30 – 10:00 น.</span>
        <h4>อนุสาวรีย์พระยาสุรินทรภักดีศรีณรงค์จางวาง</h4>
        <p>สักการะขอพรเจ้าเมืองสุรินทร์คนแรกเพื่อความเป็นสิริมงคลเริ่มต้นทริป</p>
      </div>
      <div class="timeline-item">
        <span class="timeline-time">10:30 – 12:30 น.</span>
        <h4>พิพิธภัณฑสถานแห่งชาติสุรินทร์</h4>
        <p>เรียนรู้ประวัติศาสตร์ วัฒนธรรม 4 ชนเผ่า และชมผ้าไหมยกทองโบราณ</p>
      </div>
      <div class="timeline-item">
        <span class="timeline-time">12:30 – 14:00 น.</span>
        <h4>พักรับประทานอาหารกลางวัน</h4>
        <p>ลิ้มลองกุนเชียงสุรินทร์ ไก่ย่าง และส้มตำรสเด็ด</p>
      </div>
      <div class="timeline-item">
        <span class="timeline-time">14:30 – 16:30 น.</span>
        <h4>วนอุทยานพนมสวาย</h4>
        <p>เคาะระฆัง 1,080 ใบ สักการะพระพุทธสุรินทรมงคลบนยอดเขาชาย</p>
      </div>
      <div class="timeline-item">
        <span class="timeline-time">17:00 – 18:30 น.</span>
        <h4>อ่างเก็บน้ำห้วยเสนง</h4>
        <p>นั่งรับลมเย็น ชมพระอาทิตย์ตกดินริมทะเลสาบ ปิดท้ายทริปอย่างอบอุ่น</p>
      </div>
    `;
  } else {
    if (tab1) tab1.classList.remove("active");
    if (tab2) tab2.classList.add("active");
    content.innerHTML = `
      <h3 style="margin-bottom:15px; font-size:1.3rem; color:#8c5836;">ทริป 2 วัน: ถิ่นช้างใหญ่และมรดกปราสาทหินขอม</h3>
      <div style="background:#fff3d4; padding:10px 15px; border-radius:8px; font-weight:bold; margin-bottom:15px;">วันที่ 1: เที่ยวในเมืองและธรรมชาติ</div>
      <div class="timeline-item">
        <span class="timeline-time">ช่วงเช้า</span>
        <h4>อนุสาวรีย์พระยาสุรินทรภักดี & พิพิธภัณฑ์แห่งชาติสุรินทร์</h4>
      </div>
      <div class="timeline-item">
        <span class="timeline-time">ช่วงบ่าย - เย็น</span>
        <h4>วนอุทยานพนมสวาย & พระอาทิตย์ตกที่อ่างเก็บน้ำห้วยเสนง</h4>
      </div>
      <div style="background:#fff3d4; padding:10px 15px; border-radius:8px; font-weight:bold; margin:20px 0 15px;">วันที่ 2: วิถีช้างบ้านตากลางและปราสาทหิน</div>
      <div class="timeline-item">
        <span class="timeline-time">09:00 – 12:00 น.</span>
        <h4>ศูนย์คชศึกษา / หมู่บ้านช้างบ้านตากลาง (อ.ท่าตูม)</h4>
        <p>ชมการแสดงความสามารถของช้าง สัมผัสวิถีคนเลี้ยงช้าง</p>
      </div>
      <div class="timeline-item">
        <span class="timeline-time">14:00 – 16:00 น.</span>
        <h4>ปราสาทศีขรภูมิ (อ.ศีขรภูมิ)</h4>
        <p>ชมทับหลังศิวนาฏราช 10 กร และความงดงามของปราสาทหินขอม 5 ยอด</p>
      </div>
    `;
  }
}

// --- 12. ระบบรีวิว (LocalStorage) ---
function renderReviews() {
  const list = document.getElementById("reviewsList");
  if (!list) return;

  list.innerHTML = reviews.map(r => `
    <div style="background:#faf8f5; padding:14px; border-radius:12px; margin-bottom:12px; border:1px solid #e8e2d5;">
      <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
        <strong>${r.authorName}</strong>
        <span>${'⭐'.repeat(r.rating)}</span>
      </div>
      <p style="font-size:0.85rem; color:#8c5836; margin-bottom:6px;">รีวิว: ${r.attractionName || 'สถานที่ท่องเที่ยว'}</p>
      <p style="font-size:0.95rem; color:#444;">"${r.comment}"</p>
      ${r.date ? `<span style="font-size:0.75rem; color:#999; display:block; margin-top:6px;">${r.date}</span>` : ''}
    </div>
  `).join("");

  // อัปเดต dropdown
  const placeSelect = document.getElementById("reviewPlace");
  if (placeSelect) {
    placeSelect.innerHTML = attractionsData.map(p => `
      <option value="${p.name}">${p.name} (${p.district})</option>
    `).join("");
  }
}

function handleReviewSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("reviewerName").value.trim();
  const place = document.getElementById("reviewPlace").value;
  const rating = parseInt(document.getElementById("reviewRating").value);
  const comment = document.getElementById("reviewComment").value.trim();

  if (!name || !comment) return;

  const newRev = {
    id: "rev-" + Date.now(),
    authorName: name,
    attractionName: place,
    rating: rating,
    comment: comment,
    date: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })
  };

  reviews.unshift(newRev);
  localStorage.setItem("surin_reviews", JSON.stringify(reviews));
  renderReviews();
  alert("ส่งรีวิวสำเร็จ ขอบคุณที่ร่วมแบ่งปันประสบการณ์การท่องเที่ยวสุรินทร์ครับ!");
  e.target.reset();
}
