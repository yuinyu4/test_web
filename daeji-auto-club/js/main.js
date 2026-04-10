/* ============================================================
   대지고등학교 자동차제작부 — main.js
   All logic: data, render, admin CRUD, animations, interactions
   ============================================================ */

'use strict';

/* ──────────────────────────────────────────────
   1. DATA — Default dataset + localStorage sync
   ────────────────────────────────────────────── */
const STORAGE_KEY = 'djAutoClub_v2';

const CAR_COLORS = ['#1a1a1a', '#FF4D00', '#1A56DB', '#057A55', '#7E3AF2', '#E02424', '#B45309'];

const DEFAULT_DATA = {
  intro: '대지고등학교 자동차제작부는 2019년 창설 이래, 학생들이 직접 자동차를 설계하고 제작하며 공학적 사고와 팀워크를 기르는 동아리입니다. 단순한 모형이 아닌 실제로 주행 가능한 차량을 만들어내는 과정에서, 부원들은 기계공학, 전기공학, 디자인 등 다양한 분야의 지식을 통합적으로 습득합니다.',

  members: [
    { name: '김민준', role: '부장',      dept: '3학년', color: '#FF4D00' },
    { name: '이서연', role: '설계팀장',  dept: '3학년', color: '#1A56DB' },
    { name: '박지훈', role: '전기팀장',  dept: '3학년', color: '#057A55' },
    { name: '최수아', role: '디자인팀장',dept: '2학년', color: '#7E3AF2' },
    { name: '정도윤', role: '데이터분석',dept: '2학년', color: '#E02424' },
    { name: '강하은', role: '제작팀원',  dept: '2학년', color: '#FF8A4C' },
    { name: '임재원', role: '제작팀원',  dept: '1학년', color: '#1A56DB' },
    { name: '한소윤', role: '설계팀원',  dept: '1학년', color: '#057A55' },
  ],

  projects: [
    {
      name: 'DJ-6 하이브리드', year: '2024', tag: '진행중',
      desc: '하이브리드 파워트레인과 에너지 회생 제동 시스템을 탑재한 차세대 모델. 현재 섀시 설계 완료, 전기 시스템 개발 중.',
      color: '#1a1a1a',
    },
    {
      name: 'DJ-4 레이서', year: '2023', tag: '완성',
      desc: '경량 모노코크 차체와 고성능 전기모터를 장착한 대회용 레이싱 카. 전국대회 준우승 달성.',
      color: '#FF4D00',
    },
    {
      name: 'DJ-2 전기차', year: '2021', tag: '완성',
      desc: '납축전지 기반 소형 전기차. 최대속도 65 km/h, 1회 충전 주행거리 40 km.',
      color: '#1A56DB',
    },
  ],

  gallery: [
    { id: 1, title: 'DJ-4 완성 기념',   desc: '2023년 전국대회 출전 직전 완성된 DJ-4의 모습', tag: '차량', cat: 'car',   bg: '#1a1a1a', large: true },
    { id: 2, title: '용접 작업',         desc: '차체 프레임 용접 작업 현장',                     tag: '제작', cat: 'car',   bg: '#FF4D00', large: false },
    { id: 3, title: '전국대회 현장',     desc: '2023 전국학생자동차제작대회 참가',               tag: '행사', cat: 'event', bg: '#1A56DB', large: false },
    { id: 4, title: '배선 작업',         desc: '전기 시스템 배선 작업',                           tag: '제작', cat: 'car',   bg: '#333',    large: false },
    { id: 5, title: '시상식',            desc: '준우승 트로피 수상 현장',                         tag: '행사', cat: 'event', bg: '#7E3AF2', large: false },
    { id: 6, title: '동아리 단체사진',   desc: '2023년 하반기 전체 부원 단체사진',               tag: '행사', cat: 'event', bg: '#057A55', large: false },
    { id: 7, title: '도장 작업',         desc: 'DJ-4 차체 도장 작업',                             tag: '제작', cat: 'car',   bg: '#E02424', large: false },
    { id: 8, title: '지도교사 특강',     desc: '전기차 시스템 심화 강의',                         tag: '행사', cat: 'event', bg: '#555',    large: false },
  ],

  announcements: [
    { date: '2024.12.01', title: 'DJ-6 킥오프 미팅 안내',   desc: '2025년 대회 출전 차량 DJ-6 프로젝트 킥오프 미팅을 실시합니다. 전 부원 필참.', badge: 'new' },
    { date: '2024.11.20', title: '2025년 부원 모집 공고',    desc: '내년도 1학년 신입 부원을 모집합니다. 자동차와 기계에 관심 있는 학생이라면 누구나 지원 가능합니다!', badge: 'new' },
    { date: '2024.10.15', title: '전국대회 결과 보고',        desc: '2024 전국학생자동차제작대회에서 DJ-5가 기술혁신상을 수상했습니다. 고생한 모든 부원에게 감사드립니다.', badge: 'info' },
  ],

  achievements: [
    { icon: '🥈', name: '전국학생자동차제작대회 준우승', year: '2023', org: '한국자동차공학회' },
    { icon: '🏅', name: '기술혁신상 수상',               year: '2024', org: '한국자동차공학회' },
    { icon: '🎖️', name: '지역 우수동아리 선정',          year: '2022', org: '인천광역시교육청' },
    { icon: '⭐', name: '기술상 수상',                   year: '2021', org: '전국학생자동차제작대회' },
    { icon: '🏆', name: '교내 최우수동아리',              year: '2023', org: '대지고등학교' },
  ],
};

/* ── Load / Save ── */
function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(DEFAULT_DATA));
  } catch (_) {
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
}

function saveData() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(DATA)); } catch (_) {}
}

let DATA = loadData();

/* ──────────────────────────────────────────────
   2. SVG HELPERS
   ────────────────────────────────────────────── */
function carSVG(accentColor = '#FF4D00', scale = 1) {
  const w = 300 * scale, h = 160 * scale;
  return `
  <svg viewBox="0 0 300 160" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:${w}px;max-width:100%">
    <!-- Body -->
    <path d="M38 110 L38 90 Q40 76 54 72 L104 56 Q120 50 150 49 Q180 48 210 52 L258 65 Q272 70 274 84 L278 110" fill="rgba(255,255,255,.12)"/>
    <!-- Roof -->
    <path d="M94 72 Q114 52 148 49 Q172 47 200 53 L228 66 L210 74 Z" fill="rgba(255,255,255,.08)"/>
    <!-- Underbody -->
    <path d="M38 110 Q40 118 50 120 L252 120 Q262 118 278 110 Z" fill="rgba(0,0,0,.2)"/>
    <!-- Wheels -->
    <circle cx="88"  cy="110" r="22" fill="rgba(0,0,0,.6)" stroke="rgba(255,255,255,.25)" stroke-width="1.5"/>
    <circle cx="88"  cy="110" r="14" fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.15)" stroke-width="1"/>
    <circle cx="88"  cy="110" r="5"  fill="${accentColor}"/>
    <circle cx="228" cy="110" r="22" fill="rgba(0,0,0,.6)" stroke="rgba(255,255,255,.25)" stroke-width="1.5"/>
    <circle cx="228" cy="110" r="14" fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.15)" stroke-width="1"/>
    <circle cx="228" cy="110" r="5"  fill="${accentColor}"/>
    <!-- Spokes -->
    <line x1="88" y1="93" x2="88" y2="127"  stroke="rgba(255,255,255,.3)" stroke-width="1.5"/>
    <line x1="71" y1="110" x2="105" y2="110" stroke="rgba(255,255,255,.3)" stroke-width="1.5"/>
    <line x1="228" y1="93" x2="228" y2="127"  stroke="rgba(255,255,255,.3)" stroke-width="1.5"/>
    <line x1="211" y1="110" x2="245" y2="110" stroke="rgba(255,255,255,.3)" stroke-width="1.5"/>
    <!-- Headlight -->
    <path d="M40 93 Q46 86 58 84 L68 89 L56 98 Z" fill="rgba(255,253,220,.85)"/>
    <!-- Taillight -->
    <path d="M266 86 L276 90 L270 102 L262 96 Z" fill="${accentColor}" opacity=".85"/>
    <!-- Accent stripe -->
    <path d="M56 101 L250 101" stroke="${accentColor}" stroke-width="1.5" opacity=".45"/>
    <!-- Ground shadow -->
    <ellipse cx="158" cy="136" rx="120" ry="7" fill="rgba(0,0,0,.18)"/>
  </svg>`;
}

function photoIcon(size = 40) {
  return `
  <svg width="${size}" height="${size}" viewBox="0 0 40 40" fill="none" opacity=".38">
    <rect x="4" y="8" width="32" height="24" rx="3" stroke="white" stroke-width="2"/>
    <circle cx="14" cy="18" r="4" stroke="white" stroke-width="1.5"/>
    <path d="M4 28 l10-8 6 5 6-4 10 7" stroke="white" stroke-width="1.5"/>
  </svg>`;
}

/* ──────────────────────────────────────────────
   3. NAVIGATION
   ────────────────────────────────────────────── */
function initNav() {
  const nav    = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const mobile = document.getElementById('mobileMenu');

  // Scroll effects
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
    updateActiveLink();
  }, { passive: true });

  // Hamburger toggle
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobile.classList.toggle('open');
  });

  // Close mobile menu when link clicked
  document.querySelectorAll('.nav-link[data-target]').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      mobile.classList.remove('open');
      smoothScrollTo(link.dataset.target);
    });
  });
}

function smoothScrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const SECTION_LINKS = {
  home: '홈', about: '소개', activities: '활동',
  projects: '프로젝트', gallery: '갤러리',
  history: '연혁', announcements: '공지',
};

function updateActiveLink() {
  const sections = Object.keys(SECTION_LINKS);
  let current = 'home';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 120) current = id;
  });
  document.querySelectorAll('.nav-link[data-target]').forEach(link => {
    link.classList.toggle('active', link.dataset.target === current);
  });
}

/* ──────────────────────────────────────────────
   4. REVEAL ANIMATION (IntersectionObserver)
   ────────────────────────────────────────────── */
let revealObserver;

function initReveal() {
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

function observeNewReveal() {
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => revealObserver.observe(el));
}

/* ──────────────────────────────────────────────
   5. STAT COUNTER ANIMATION
   ────────────────────────────────────────────── */
function initCounters() {
  const statsEl = document.querySelector('.hero-stats');
  if (!statsEl) return;

  const counterObserver = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    counterObserver.disconnect();

    document.querySelectorAll('[data-target]').forEach(el => {
      const target  = parseInt(el.dataset.target);
      const supEl   = el.querySelector('.stat-sup');
      const suffix  = supEl ? supEl.outerHTML : '';
      let current   = 0;
      const steps   = 40;
      const inc     = target / steps;

      const timer = setInterval(() => {
        current = Math.min(current + inc, target);
        el.innerHTML = Math.floor(current) + suffix;
        if (current >= target) clearInterval(timer);
      }, 28);
    });
  }, { threshold: 0.4 });

  counterObserver.observe(statsEl);
}

/* ──────────────────────────────────────────────
   6. RENDER — PROJECTS
   ────────────────────────────────────────────── */
function renderProjects() {
  const grid = document.getElementById('projectGrid');
  if (!grid) return;

  grid.innerHTML = DATA.projects.map((p, i) => `
    <div class="proj-card reveal" style="transition-delay:${i * 0.1}s">
      <div class="proj-img" style="background:${p.color || CAR_COLORS[i % CAR_COLORS.length]}">
        ${carSVG(p.color === '#FF4D00' ? '#fff' : '#FF4D00')}
      </div>
      <div class="proj-meta">
        <span class="tag ${p.tag === '진행중' ? 'accent-tag' : ''}">${p.tag}</span>
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="proj-footer">
          <span class="proj-year">${p.year}</span>
          <span class="proj-link">자세히 보기 →</span>
        </div>
      </div>
    </div>
  `).join('');

  observeNewReveal();
}

/* ──────────────────────────────────────────────
   7. RENDER — MEMBERS
   ────────────────────────────────────────────── */
function renderMembers() {
  const grid = document.getElementById('membersGrid');
  if (!grid) return;

  grid.innerHTML = DATA.members.map((m, i) => `
    <div class="member-card reveal" style="transition-delay:${i * 0.07}s">
      <div class="member-avatar" style="background:${m.color || CAR_COLORS[i % CAR_COLORS.length]}">${m.name[0]}</div>
      <h4>${m.name}</h4>
      <div class="role">${m.role}</div>
      <div class="dept">${m.dept}</div>
    </div>
  `).join('');

  observeNewReveal();
}

/* ──────────────────────────────────────────────
   8. RENDER — GALLERY
   ────────────────────────────────────────────── */
let currentCat = 'all';

function renderGallery(cat = 'all') {
  currentCat = cat;
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  const items = cat === 'all' ? DATA.gallery : DATA.gallery.filter(g => g.cat === cat);

  grid.innerHTML = items.map((g, i) => {
    const isLarge = g.large && cat === 'all';
    const minH    = isLarge ? '374px' : '180px';
    return `
      <div class="gallery-item${isLarge ? ' large' : ''} reveal" style="transition-delay:${i * 0.05}s" data-id="${g.id}">
        <div class="gallery-img" style="background:${g.bg};min-height:${minH}">
          ${photoIcon(isLarge ? 56 : 36)}
        </div>
        <div class="gallery-overlay"><span>${g.title}</span></div>
      </div>`;
  }).join('');

  // Attach click handlers
  grid.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => openGalleryModal(parseInt(item.dataset.id)));
  });

  observeNewReveal();
}

function filterGallery(cat, btn) {
  document.querySelectorAll('.gallery-filter .tag').forEach(t => t.classList.remove('accent-tag'));
  btn.classList.add('accent-tag');
  renderGallery(cat);
}

/* ──────────────────────────────────────────────
   9. GALLERY MODAL
   ────────────────────────────────────────────── */
function openGalleryModal(id) {
  const g = DATA.gallery.find(x => x.id === id);
  if (!g) return;

  document.getElementById('modalImg').style.background = g.bg;
  document.getElementById('modalImg').innerHTML = photoIcon(60);
  document.getElementById('modalTag').textContent   = g.tag;
  document.getElementById('modalTitle').textContent = g.title;
  document.getElementById('modalDesc').textContent  = g.desc;

  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function initModal() {
  const overlay = document.getElementById('modal-overlay');
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

/* ──────────────────────────────────────────────
   10. RENDER — ANNOUNCEMENTS
   ────────────────────────────────────────────── */
function renderAnnouncements() {
  const list = document.getElementById('annList');
  if (!list) return;

  list.innerHTML = DATA.announcements.map((a, i) => `
    <div class="ann-item reveal" style="transition-delay:${i * 0.1}s">
      <div class="ann-date">${a.date}</div>
      <div class="ann-content">
        <h4>${a.title}</h4>
        <p>${a.desc}</p>
      </div>
      <span class="ann-badge badge-${a.badge}">${a.badge === 'new' ? 'NEW' : a.badge === 'info' ? '공지' : '완료'}</span>
    </div>
  `).join('');

  observeNewReveal();
}

/* ──────────────────────────────────────────────
   11. RENDER — ACHIEVEMENTS
   ────────────────────────────────────────────── */
function renderAchievements() {
  const list = document.getElementById('achieveList');
  if (!list) return;

  list.innerHTML = DATA.achievements.map((a, i) => `
    <div class="achieve-card reveal" style="transition-delay:${i * 0.1}s">
      <div class="achieve-icon">${a.icon}</div>
      <div>
        <h4>${a.name}</h4>
        <p>${a.org}</p>
        <span class="achieve-year">${a.year}</span>
      </div>
    </div>
  `).join('');

  observeNewReveal();
}

/* ──────────────────────────────────────────────
   12. TOAST NOTIFICATION
   ────────────────────────────────────────────── */
let toastTimer = null;

function showToast(msg) {
  const toast    = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  toastMsg.textContent = msg;
  toast.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

/* ──────────────────────────────────────────────
   13. ADMIN PANEL
   ────────────────────────────────────────────── */
let currentPanel = 'intro';

function initAdmin() {
  document.querySelectorAll('.admin-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.admin-nav-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentPanel = btn.dataset.panel;
      renderAdminPanel(currentPanel);
    });
  });

  // Render default panel
  renderAdminPanel('intro');
}

function renderAdminPanel(panel) {
  const container = document.getElementById('adminPanel');
  if (!container) return;

  const renderers = { intro, members, projects, gallery, announcements };
  container.innerHTML = (renderers[panel] || renderers.intro)();
  bindAdminEvents(panel);
}

/* ── Panel templates ── */
function intro() {
  return `
    <div class="panel-title">동아리 소개 편집</div>
    <div class="panel-desc">메인 페이지 및 소개 페이지에 표시되는 동아리 소개 텍스트를 편집합니다.</div>
    <div class="form-group">
      <label class="form-label">소개 텍스트</label>
      <textarea class="form-textarea" id="f-intro" style="min-height:160px">${DATA.intro}</textarea>
    </div>
    <button class="save-btn" id="btn-save-intro">
      <svg viewBox="0 0 14 14" fill="none"><path d="M2 7l4 4 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      저장하기
    </button>`;
}

function members() {
  const rows = DATA.members.map((m, i) => `
    <div class="member-row" data-idx="${i}">
      <div class="mem-avatar-mini" style="background:${m.color || CAR_COLORS[i % CAR_COLORS.length]}">${m.name[0]}</div>
      <input value="${m.name}"  data-field="name"  data-idx="${i}" placeholder="이름">
      <input value="${m.role}"  data-field="role"  data-idx="${i}" placeholder="역할" data-type="role">
      <input value="${m.dept}"  data-field="dept"  data-idx="${i}" placeholder="학년" data-type="dept">
      <button class="del-btn mem-del" data-idx="${i}" title="삭제">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 1l8 8M9 1L1 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      </button>
    </div>`).join('');

  return `
    <div class="panel-title">부원 관리</div>
    <div class="panel-desc">부원 목록을 추가, 수정, 삭제합니다. 변경 후 저장 버튼을 눌러주세요.</div>
    <div class="member-rows" id="memberRows">${rows}</div>
    <button class="add-row-btn" id="btn-add-member" style="margin-bottom:24px">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v10M2 7h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      부원 추가
    </button>
    <br>
    <button class="save-btn" id="btn-save-members">
      <svg viewBox="0 0 14 14" fill="none"><path d="M2 7l4 4 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      저장하기
    </button>`;
}

function projects() {
  const blocks = DATA.projects.map((p, i) => `
    <div style="margin-bottom:24px;padding:20px;background:var(--bg);border:1px solid var(--border);border-radius:var(--radius-md)">
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">프로젝트명</label>
          <input class="form-input" data-proj="${i}" data-field="name" value="${p.name}">
        </div>
        <div class="form-group">
          <label class="form-label">연도</label>
          <input class="form-input" data-proj="${i}" data-field="year" value="${p.year}">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">상태 태그</label>
          <input class="form-input" data-proj="${i}" data-field="tag" value="${p.tag}">
        </div>
        <div class="form-group">
          <label class="form-label">카드 색상</label>
          <input type="color" class="form-input" data-proj="${i}" data-field="color" value="${p.color || '#1a1a1a'}" style="height:44px;padding:4px">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">설명</label>
        <textarea class="form-textarea" data-proj="${i}" data-field="desc">${p.desc}</textarea>
      </div>
    </div>`).join('');

  return `
    <div class="panel-title">프로젝트 관리</div>
    <div class="panel-desc">각 프로젝트의 이름, 연도, 상태, 설명을 수정합니다.</div>
    ${blocks}
    <button class="save-btn" id="btn-save-projects">
      <svg viewBox="0 0 14 14" fill="none"><path d="M2 7l4 4 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      저장하기
    </button>`;
}

function gallery() {
  const thumbs = DATA.gallery.map(g => `
    <div class="gallery-admin-item" data-gid="${g.id}">
      <div class="g-item-inner" style="background:${g.bg}">${g.title}</div>
      <div class="g-del-overlay"><span>삭제</span></div>
    </div>`).join('');

  return `
    <div class="panel-title">갤러리 관리</div>
    <div class="panel-desc">갤러리 항목을 추가하거나 클릭하여 삭제합니다.</div>
    <div class="gallery-admin-grid" id="galleryAdminGrid">${thumbs}</div>
    <div class="add-gallery-form">
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">제목</label>
          <input class="form-input" id="g-title" placeholder="사진 제목">
        </div>
        <div class="form-group">
          <label class="form-label">카테고리</label>
          <select class="form-select" id="g-cat">
            <option value="car">차량</option>
            <option value="event">행사</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">설명</label>
          <input class="form-input" id="g-desc" placeholder="사진 설명">
        </div>
        <div class="form-group">
          <label class="form-label">배경색</label>
          <input type="color" class="form-input" id="g-color" value="#333333" style="height:44px;padding:4px">
        </div>
      </div>
      <button class="add-row-btn" id="btn-add-gallery">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v10M2 7h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        갤러리 항목 추가
      </button>
    </div>`;
}

function announcements() {
  const blocks = DATA.announcements.map((a, i) => `
    <div style="margin-bottom:14px;padding:16px 20px;background:var(--bg);border:1px solid var(--border);border-radius:var(--radius-md)">
      <div class="form-row">
        <div class="form-group" style="margin:0 0 10px">
          <label class="form-label">날짜</label>
          <input class="form-input" data-ann="${i}" data-field="date" value="${a.date}">
        </div>
        <div class="form-group" style="margin:0 0 10px">
          <label class="form-label">뱃지 타입</label>
          <select class="form-select" data-ann="${i}" data-field="badge">
            <option value="new"  ${a.badge === 'new'  ? 'selected' : ''}>NEW</option>
            <option value="info" ${a.badge === 'info' ? 'selected' : ''}>공지</option>
            <option value="done" ${a.badge === 'done' ? 'selected' : ''}>완료</option>
          </select>
        </div>
      </div>
      <div class="form-group" style="margin:0 0 10px">
        <label class="form-label">제목</label>
        <input class="form-input" data-ann="${i}" data-field="title" value="${a.title}">
      </div>
      <div class="form-group" style="margin:0 0 10px">
        <label class="form-label">내용</label>
        <textarea class="form-textarea" data-ann="${i}" data-field="desc" style="min-height:60px">${a.desc}</textarea>
      </div>
      <button class="del-btn ann-del" data-idx="${i}" style="width:auto;padding:6px 14px;border-radius:6px;font-size:.78rem">삭제</button>
    </div>`).join('');

  return `
    <div class="panel-title">공지사항 관리</div>
    <div class="panel-desc">공지사항을 추가, 수정, 삭제합니다. 저장 버튼을 눌러야 반영됩니다.</div>
    <div id="annBlocks">${blocks}</div>
    <button class="add-row-btn" id="btn-add-ann" style="margin-bottom:20px">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v10M2 7h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      공지 추가
    </button><br><br>
    <button class="save-btn" id="btn-save-ann">
      <svg viewBox="0 0 14 14" fill="none"><path d="M2 7l4 4 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      저장하기
    </button>`;
}

/* ── Bind admin events after rendering ── */
function bindAdminEvents(panel) {
  const p = document.getElementById('adminPanel');

  if (panel === 'intro') {
    p.querySelector('#btn-save-intro').addEventListener('click', () => {
      DATA.intro = p.querySelector('#f-intro').value;
      saveData();
      showToast('동아리 소개가 저장되었습니다!');
    });
  }

  if (panel === 'members') {
    // Live edit: update DATA on input change
    p.addEventListener('input', e => {
      const el = e.target;
      const idx = el.dataset.idx;
      if (idx === undefined) return;
      DATA.members[idx][el.dataset.field] = el.value;
    });

    p.addEventListener('click', e => {
      // Delete member
      if (e.target.closest('.mem-del')) {
        const idx = parseInt(e.target.closest('.mem-del').dataset.idx);
        DATA.members.splice(idx, 1);
        renderAdminPanel('members');
        return;
      }
      // Save
      if (e.target.id === 'btn-save-members' || e.target.closest('#btn-save-members')) {
        saveData(); renderMembers(); showToast('부원 목록이 저장되었습니다!');
      }
      // Add member
      if (e.target.id === 'btn-add-member' || e.target.closest('#btn-add-member')) {
        DATA.members.push({ name: '새 부원', role: '역할', dept: '학년', color: CAR_COLORS[Math.floor(Math.random() * CAR_COLORS.length)] });
        renderAdminPanel('members');
      }
    });
  }

  if (panel === 'projects') {
    p.addEventListener('input', e => {
      const el = e.target;
      if (el.dataset.proj === undefined) return;
      DATA.projects[el.dataset.proj][el.dataset.field] = el.value;
    });
    p.querySelector('#btn-save-projects').addEventListener('click', () => {
      saveData(); renderProjects(); showToast('프로젝트가 저장되었습니다!');
    });
  }

  if (panel === 'gallery') {
    // Delete gallery items
    p.querySelectorAll('.g-del-overlay').forEach(overlay => {
      overlay.addEventListener('click', () => {
        const id = parseInt(overlay.closest('.gallery-admin-item').dataset.gid);
        DATA.gallery = DATA.gallery.filter(g => g.id !== id);
        saveData();
        renderGallery(currentCat);
        renderAdminPanel('gallery');
        showToast('항목이 삭제되었습니다.');
      });
    });

    p.querySelector('#btn-add-gallery').addEventListener('click', () => {
      const title = p.querySelector('#g-title').value.trim() || '새 사진';
      const desc  = p.querySelector('#g-desc').value.trim() || '';
      const cat   = p.querySelector('#g-cat').value;
      const bg    = p.querySelector('#g-color').value;
      const newId = Math.max(0, ...DATA.gallery.map(g => g.id)) + 1;
      DATA.gallery.push({ id: newId, title, desc, tag: cat === 'car' ? '차량' : '행사', cat, bg, large: false });
      saveData();
      renderGallery(currentCat);
      renderAdminPanel('gallery');
      showToast('갤러리에 추가되었습니다!');
    });
  }

  if (panel === 'announcements') {
    p.addEventListener('input', e => {
      const el = e.target;
      if (el.dataset.ann === undefined) return;
      DATA.announcements[el.dataset.ann][el.dataset.field] = el.value;
    });
    p.addEventListener('click', e => {
      if (e.target.closest('.ann-del')) {
        const idx = parseInt(e.target.closest('.ann-del').dataset.idx);
        DATA.announcements.splice(idx, 1);
        renderAdminPanel('announcements');
        return;
      }
      if (e.target.id === 'btn-add-ann' || e.target.closest('#btn-add-ann')) {
        const today = new Date().toLocaleDateString('ko-KR').replace(/\. /g, '.').replace('.', '');
        DATA.announcements.unshift({ date: today, title: '새 공지사항', desc: '내용을 입력하세요.', badge: 'new' });
        renderAdminPanel('announcements');
      }
      if (e.target.id === 'btn-save-ann' || e.target.closest('#btn-save-ann')) {
        saveData(); renderAnnouncements(); showToast('공지사항이 저장되었습니다!');
      }
    });
  }
}

/* ──────────────────────────────────────────────
   14. INIT (DOMContentLoaded)
   ────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initReveal();
  initCounters();
  initModal();

  renderProjects();
  renderMembers();
  renderGallery('all');
  renderAnnouncements();
  renderAchievements();
  initAdmin();

  // Set default active filter button
  const defaultFilter = document.getElementById('filter-all');
  if (defaultFilter) defaultFilter.classList.add('accent-tag');
});
