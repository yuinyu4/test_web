/* ============================================================
   remnant @ DKSH — main.js
   Features:
   - GitHub API 이미지 업로드 (base64 인코딩은 API 전송용, 실제 URL로 표시)
   - 비밀번호 보호 관리자 페이지
   - 전체 콘텐츠 CRUD (localStorage 기반)
   ============================================================ */
'use strict';

/* ──────────────────────────────────────────────
   STORAGE & DATA
   ────────────────────────────────────────────── */
const STORAGE_KEY = 'remnant_dksh_v1';
const ADMIN_PW    = 'remnant2024'; // 변경 가능

const MEMBER_COLORS = ['#0057FF','#7C3AED','#059669','#DC2626','#D97706','#0891B2','#BE185D'];

const DEFAULT = {
  clubName:    'remnant',
  schoolName:  '단국대학교부속소프트웨어고등학교',
  schoolShort: 'DKSH',
  catchphrase: '우리는 남겨진 것들로 새로운 것을 만든다',
  subphrase:   'Turning fragments into futures — remnant is a creative & tech club at DKSH.',
  intro:       'remnant는 단국대학교부속소프트웨어고등학교(DKSH)의 창작·개발 동아리입니다. 디자인, 개발, 음악, 아트 등 다양한 분야의 학생들이 모여 서로의 재능을 연결하고, 잊혀질 뻔한 아이디어를 작품으로 완성합니다. "남은 것들"에서 새로운 가능성을 찾는 것이 저희의 철학입니다.',
  github: {
    owner: '',
    repo:  '',
    token: '',
    branch: 'main',
    folder: 'gallery',
  },
  stats: [
    { val: '23', sup: '명', label: '현재 부원' },
    { val: '8',  sup: '+', label: '완성 프로젝트' },
    { val: '3',  sup: '회', label: '수상 실적' },
  ],
  members: [
    { name: '이준혁', role: '동아리장',  dept: '3학년', color: '#0057FF' },
    { name: '박서윤', role: '개발팀장',  dept: '3학년', color: '#7C3AED' },
    { name: '김도현', role: '디자인팀장',dept: '2학년', color: '#059669' },
    { name: '최지은', role: '기획팀장',  dept: '2학년', color: '#DC2626' },
    { name: '정민재', role: '개발팀원',  dept: '2학년', color: '#D97706' },
    { name: '오하린', role: '디자인팀원',dept: '1학년', color: '#0891B2' },
    { name: '신유찬', role: '개발팀원',  dept: '1학년', color: '#BE185D' },
    { name: '한채원', role: '기획팀원',  dept: '1학년', color: '#0057FF' },
  ],
  projects: [
    { name: 'Mosaic',   year: '2024', tag: '진행중', desc: 'DKSH 학생들의 일상과 감정을 수집해 하나의 디지털 모자이크 작품으로 구성하는 인터랙티브 웹 프로젝트.', color: '#0057FF' },
    { name: 'Afterglow',year: '2023', tag: '완성',   desc: '졸업생들의 이야기를 담은 인터뷰 기반 뉴스레터 & 웹진. 디자인·글쓰기·개발 협업 결과물.', color: '#0A0C14' },
    { name: 'Fragment',  year: '2023', tag: '완성',   desc: '버려진 코드 조각과 미완성 스케치를 재조합해 새로운 예술 작품을 만드는 제너레이티브 아트 프로젝트.', color: '#7C3AED' },
  ],
  gallery: [
    { id: 1, title: 'remnant 전시회 2024',  desc: '학교 로비에서 진행한 첫 번째 자체 전시회', tag: '전시', cat: 'exhibit', url: '', color: '#0057FF', large: true },
    { id: 2, title: 'Mosaic 작업 현장',     desc: '프로젝트 Mosaic 제작 과정', tag: '제작', cat: 'work',    url: '', color: '#0A0C14', large: false },
    { id: 3, title: '팀 워크샵',            desc: '2024 상반기 팀 역량 강화 워크샵', tag: '행사', cat: 'event',   url: '', color: '#7C3AED', large: false },
    { id: 4, title: 'Afterglow 출판',      desc: '웹진 Afterglow 인쇄 출판 기념', tag: '행사', cat: 'event',   url: '', color: '#059669', large: false },
    { id: 5, title: '동아리 단체사진',      desc: '2024년 2학기 전체 부원', tag: '행사', cat: 'event',   url: '', color: '#DC2626', large: false },
    { id: 6, title: 'Fragment 아트워크',   desc: '제너레이티브 아트 최종 결과물', tag: '작품', cat: 'work',    url: '', color: '#D97706', large: false },
    { id: 7, title: '해커톤 참가',         desc: '2023 학생 해커톤 참가 현장', tag: '행사', cat: 'event',   url: '', color: '#0891B2', large: false },
    { id: 8, title: '디자인 스프린트',     desc: '3일간의 디자인 스프린트 결과물', tag: '작품', cat: 'work',    url: '', color: '#BE185D', large: false },
  ],
  history: [
    { year: '2022', title: '동아리 창설',            desc: '5명의 창립 멤버로 DKSH 최초의 크리에이티브 동아리 remnant가 설립되었습니다.' },
    { year: '2022', title: '첫 번째 프로젝트 착수',  desc: '"Fragment" 제너레이티브 아트 프로젝트를 시작, 연말 교내 발표를 진행했습니다.' },
    { year: '2023', title: 'Afterglow 웹진 창간',   desc: '졸업생 인터뷰 기반 웹진 Afterglow를 창간, 디지털·인쇄 동시 출판했습니다.' },
    { year: '2023', title: '학생 해커톤 입상',       desc: '전국 학생 해커톤에서 최우수 디자인상을 수상했습니다.' },
    { year: '2024', title: '첫 자체 전시회 개최',   desc: '학교 로비에서 "remnant 전시회 2024"를 개최, 300명 이상이 방문했습니다.' },
    { year: '2024', title: 'Mosaic 프로젝트 착수',  desc: 'DKSH 학생 전체가 참여하는 대규모 인터랙티브 웹 프로젝트를 시작했습니다.' },
  ],
  achievements: [
    { icon: '🏆', name: '전국 학생 해커톤 최우수 디자인상', year: '2023', org: '한국창의재단' },
    { icon: '🥈', name: '교내 창작 경진대회 최우수상',      year: '2024', org: 'DKSH' },
    { icon: '🎖️', name: '우수 동아리 선정',                 year: '2023', org: '단국대학교부속소프트웨어고등학교' },
  ],
  announcements: [
    { date: '2024.12.01', title: 'Mosaic 스프린트 미팅 안내',  desc: '12월 두 번째 주 토요일, Mosaic 최종 스프린트 미팅이 예정되어 있습니다. 전 부원 필참.', badge: 'new' },
    { date: '2024.11.15', title: '2025년 신입 부원 모집',       desc: '내년도 신입 부원을 모집합니다. 개발·디자인·기획 모든 분야 환영합니다!', badge: 'new' },
    { date: '2024.10.20', title: '해커톤 결과 보고',            desc: '2024 전국 학생 해커톤에서 프로젝트 Mosaic이 특별상을 수상했습니다.', badge: 'info' },
  ],
};

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return JSON.parse(JSON.stringify(DEFAULT));
    // Deep merge to handle new fields added to DEFAULT
    return Object.assign(JSON.parse(JSON.stringify(DEFAULT)), JSON.parse(raw));
  } catch(_) { return JSON.parse(JSON.stringify(DEFAULT)); }
}
function saveData() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(DATA)); } catch(_) {}
}
let DATA = loadData();

/* ──────────────────────────────────────────────
   NAV
   ────────────────────────────────────────────── */
function initNav() {
  const nav    = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const mobile = document.getElementById('mobileMenu');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
    updateActiveNav();
  }, { passive: true });

  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobile.classList.toggle('open');
  });

  document.querySelectorAll('.nav-link[data-section]').forEach(l => {
    l.addEventListener('click', () => {
      scrollTo(l.dataset.section);
      burger.classList.remove('open');
      mobile.classList.remove('open');
    });
  });
}

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function updateActiveNav() {
  const ids = ['home','about','projects','members','gallery','history','announcements'];
  let cur = 'home';
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 120) cur = id;
  });
  document.querySelectorAll('.nav-link[data-section]').forEach(l => {
    l.classList.toggle('active', l.dataset.section === cur);
  });
}

/* ──────────────────────────────────────────────
   REVEAL
   ────────────────────────────────────────────── */
let revealObs;
function initReveal() {
  revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.07, rootMargin: '0px 0px -36px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
}
function reObserve() {
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => revealObs.observe(el));
}

/* ──────────────────────────────────────────────
   COUNTER ANIMATION
   ────────────────────────────────────────────── */
function initCounters() {
  const statsEl = document.querySelector('.hero-stats');
  if (!statsEl) return;
  const obs = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    obs.disconnect();
    document.querySelectorAll('[data-target]').forEach(el => {
      const target = parseInt(el.dataset.target);
      const supEl  = el.querySelector('.sup');
      const suffix = supEl ? supEl.outerHTML : '';
      let cur = 0;
      const timer = setInterval(() => {
        cur = Math.min(cur + target / 40, target);
        el.innerHTML = Math.floor(cur) + suffix;
        if (cur >= target) clearInterval(timer);
      }, 28);
    });
  }, { threshold: 0.4 });
  obs.observe(statsEl);
}

/* ──────────────────────────────────────────────
   RENDER — dynamic hero stats
   ────────────────────────────────────────────── */
function renderHeroStats() {
  const el = document.getElementById('heroStats');
  if (!el) return;
  el.innerHTML = DATA.stats.map(s => `
    <div class="stat-item">
      <div class="stat-num" data-target="${s.val}">${s.val}<span class="sup">${s.sup}</span></div>
      <div class="stat-lbl">${s.label}</div>
    </div>
  `).join('');
}

function renderHeroText() {
  const cn = document.getElementById('heroCatchphrase');
  const sn = document.getElementById('heroSub');
  if (cn) cn.textContent = DATA.catchphrase;
  if (sn) sn.textContent = DATA.subphrase;
}

/* ──────────────────────────────────────────────
   RENDER — PROJECTS
   ────────────────────────────────────────────── */
function renderProjects() {
  const grid = document.getElementById('projGrid');
  if (!grid) return;
  grid.innerHTML = DATA.projects.map((p, i) => `
    <div class="proj-card reveal" style="transition-delay:${i*.1}s">
      <div class="proj-img" style="background:${p.color}">
        <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:65%">
          <rect x="20" y="20" width="160" height="80" rx="12" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.15)" stroke-width="1.5"/>
          <rect x="36" y="36" width="60" height="8" rx="4" fill="rgba(255,255,255,.25)"/>
          <rect x="36" y="52" width="128" height="5" rx="2.5" fill="rgba(255,255,255,.12)"/>
          <rect x="36" y="63" width="100" height="5" rx="2.5" fill="rgba(255,255,255,.12)"/>
          <rect x="36" y="74" width="80"  height="5" rx="2.5" fill="rgba(255,255,255,.12)"/>
          <circle cx="150" cy="40" r="12" fill="rgba(255,255,255,.14)" stroke="rgba(255,255,255,.2)" stroke-width="1"/>
        </svg>
      </div>
      <div class="proj-meta">
        <span class="tag${p.tag==='진행중'?' blue':''}">${p.tag}</span>
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="proj-footer">
          <span class="proj-year">${p.year}</span>
          <span class="proj-link">자세히 →</span>
        </div>
      </div>
    </div>
  `).join('');
  reObserve();
}

/* ──────────────────────────────────────────────
   RENDER — MEMBERS
   ────────────────────────────────────────────── */
function renderMembers() {
  const grid = document.getElementById('membersGrid');
  if (!grid) return;
  grid.innerHTML = DATA.members.map((m, i) => `
    <div class="member-card reveal" style="transition-delay:${i*.07}s">
      <div class="member-av" style="background:${m.color||MEMBER_COLORS[i%MEMBER_COLORS.length]}">${m.name[0]}</div>
      <h4>${m.name}</h4>
      <div class="role">${m.role}</div>
      <div class="dept">${m.dept}</div>
    </div>
  `).join('');
  reObserve();
}

/* ──────────────────────────────────────────────
   RENDER — GALLERY
   ────────────────────────────────────────────── */
let currentCat = 'all';

function renderGallery(cat = 'all') {
  currentCat = cat;
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;
  const items = cat === 'all' ? DATA.gallery : DATA.gallery.filter(g => g.cat === cat);

  grid.innerHTML = items.map((g, i) => {
    const isLarge = g.large && cat === 'all';
    return `
      <div class="g-item${isLarge ? ' large' : ''} reveal" style="transition-delay:${i*.05}s" data-id="${g.id}">
        <div class="g-img" style="background:${g.color||'#333'}">
          ${g.url
            ? `<img src="${g.url}" alt="${g.title}" loading="lazy">`
            : placeholderSVG()
          }
        </div>
        <div class="g-overlay"><span>${g.title}</span></div>
      </div>`;
  }).join('');

  grid.querySelectorAll('.g-item').forEach(item => {
    item.addEventListener('click', () => openGalleryModal(parseInt(item.dataset.id)));
  });
  reObserve();
}

function placeholderSVG() {
  return `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" opacity=".35">
    <rect x="3" y="6" width="30" height="24" rx="3" stroke="white" stroke-width="1.8"/>
    <circle cx="12" cy="16" r="3.5" stroke="white" stroke-width="1.5"/>
    <path d="M3 26 l9-7 5 4.5 5-3.5 9 6" stroke="white" stroke-width="1.5"/>
  </svg>`;
}

function filterGallery(cat, btn) {
  document.querySelectorAll('.gallery-filter .tag').forEach(t => t.classList.remove('blue'));
  btn.classList.add('blue');
  renderGallery(cat);
}

/* Gallery Modal */
function openGalleryModal(id) {
  const g = DATA.gallery.find(x => x.id === id);
  if (!g) return;
  const imgEl   = document.getElementById('gmImg');
  const titleEl = document.getElementById('gmTitle');
  const descEl  = document.getElementById('gmDesc');
  const tagEl   = document.getElementById('gmTag');

  if (g.url) {
    imgEl.innerHTML = `<img src="${g.url}" alt="${g.title}" style="width:100%;max-height:380px;object-fit:cover">`;
  } else {
    imgEl.innerHTML = `<div style="width:100%;height:220px;background:${g.color||'#333'};display:flex;align-items:center;justify-content:center">${placeholderSVG()}</div>`;
  }
  tagEl.textContent   = g.tag;
  titleEl.textContent = g.title;
  descEl.textContent  = g.desc;
  document.getElementById('gallery-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeGalleryModal() {
  document.getElementById('gallery-modal').classList.remove('open');
  document.body.style.overflow = '';
}

/* ──────────────────────────────────────────────
   RENDER — HISTORY
   ────────────────────────────────────────────── */
function renderHistory() {
  const tl = document.getElementById('timeline');
  if (!tl) return;
  tl.innerHTML = DATA.history.map(h => `
    <div class="tl-item">
      <div class="tl-year">${h.year}</div>
      <div class="tl-title">${h.title}</div>
      <div class="tl-desc">${h.desc}</div>
    </div>
  `).join('');
}

function renderAchievements() {
  const el = document.getElementById('achieveList');
  if (!el) return;
  el.innerHTML = DATA.achievements.map((a, i) => `
    <div class="achieve-card reveal" style="transition-delay:${i*.1}s">
      <div class="ach-icon">${a.icon}</div>
      <div>
        <h4>${a.name}</h4>
        <p>${a.org}</p>
        <span class="ach-year">${a.year}</span>
      </div>
    </div>
  `).join('');
  reObserve();
}

/* ──────────────────────────────────────────────
   RENDER — ANNOUNCEMENTS
   ────────────────────────────────────────────── */
function renderAnnouncements() {
  const el = document.getElementById('annList');
  if (!el) return;
  el.innerHTML = DATA.announcements.map((a, i) => `
    <div class="ann-item reveal" style="transition-delay:${i*.1}s">
      <div class="ann-date">${a.date}</div>
      <div class="ann-content">
        <h4>${a.title}</h4>
        <p>${a.desc}</p>
      </div>
      <span class="ann-badge badge-${a.badge}">${{new:'NEW',info:'공지',done:'완료'}[a.badge]||'공지'}</span>
    </div>
  `).join('');
  reObserve();
}

/* ──────────────────────────────────────────────
   TOAST
   ────────────────────────────────────────────── */
let toastTimer;
function toast(msg, isError = false) {
  const el  = document.getElementById('toast');
  const msg_el = document.getElementById('toastMsg');
  const icon   = el.querySelector('.toast-icon');
  msg_el.textContent = msg;
  icon.style.background = isError ? '#DC2626' : 'var(--blue)';
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 3000);
}

/* ──────────────────────────────────────────────
   PASSWORD GATE
   ────────────────────────────────────────────── */
function openPwModal() {
  document.getElementById('pw-modal').classList.add('open');
  setTimeout(() => document.getElementById('pwInput').focus(), 100);
}
function closePwModal() {
  document.getElementById('pw-modal').classList.remove('open');
  document.getElementById('pwInput').value = '';
  document.getElementById('pwError').classList.remove('show');
}
function submitPw() {
  const val = document.getElementById('pwInput').value;
  if (val === ADMIN_PW) {
    closePwModal();
    openAdmin();
  } else {
    document.getElementById('pwError').classList.add('show');
    document.getElementById('pwInput').value = '';
    document.getElementById('pwInput').focus();
  }
}

function initPwModal() {
  document.getElementById('pwInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') submitPw();
    if (e.key === 'Escape') closePwModal();
  });
  document.getElementById('pw-modal').addEventListener('click', e => {
    if (e.target === document.getElementById('pw-modal')) closePwModal();
  });
}

/* ──────────────────────────────────────────────
   ADMIN PAGE
   ────────────────────────────────────────────── */
let currentAdminPanel = 'basic';

function openAdmin() {
  document.getElementById('admin-page').classList.add('open');
  document.body.style.overflow = 'hidden';
  renderAdminPanel('basic');
}
function closeAdmin() {
  document.getElementById('admin-page').classList.remove('open');
  document.body.style.overflow = '';
}

function switchAdminPanel(panel, btn) {
  document.querySelectorAll('.asb-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentAdminPanel = panel;
  renderAdminPanel(panel);
}

function renderAdminPanel(panel) {
  const el = document.getElementById('adminPanel');
  if (!el) return;
  const panels = { basic, members, projects, gallery, history, achievements, announcements };
  el.innerHTML = (panels[panel] || panels.basic)();
  bindAdminPanel(panel);
}

/* ── Panel templates ── */
function basic() {
  return `
    <div class="panel-h">기본 정보</div>
    <div class="panel-desc">동아리 이름, 학교명, 캐치프레이즈 등 핵심 정보를 수정합니다.</div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">동아리 이름</label>
        <input class="form-input" id="f-clubName" value="${DATA.clubName}">
      </div>
      <div class="form-group">
        <label class="form-label">학교 약칭</label>
        <input class="form-input" id="f-schoolShort" value="${DATA.schoolShort}">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">학교명 (전체)</label>
      <input class="form-input" id="f-schoolName" value="${DATA.schoolName}">
    </div>
    <div class="form-group">
      <label class="form-label">캐치프레이즈 (Hero 메인 문구)</label>
      <input class="form-input" id="f-catchphrase" value="${DATA.catchphrase}">
    </div>
    <div class="form-group">
      <label class="form-label">서브 문구 (영문)</label>
      <input class="form-input" id="f-subphrase" value="${DATA.subphrase}">
    </div>
    <div class="form-group">
      <label class="form-label">동아리 소개 (About 섹션)</label>
      <textarea class="form-textarea" id="f-intro" style="min-height:120px">${DATA.intro}</textarea>
    </div>
    <div style="margin-bottom:24px">
      <div class="panel-h" style="font-size:1rem;margin-bottom:14px">Hero 통계 수치</div>
      ${DATA.stats.map((s, i) => `
        <div class="form-row" style="margin-bottom:10px">
          <div class="form-group" style="margin:0">
            <label class="form-label">값 #${i+1}</label>
            <input class="form-input stat-val" data-idx="${i}" value="${s.val}">
          </div>
          <div class="form-group" style="margin:0">
            <label class="form-label">단위</label>
            <input class="form-input stat-sup" data-idx="${i}" value="${s.sup}">
          </div>
          <div class="form-group" style="margin:0">
            <label class="form-label">라벨</label>
            <input class="form-input stat-lbl" data-idx="${i}" value="${s.label}">
          </div>
        </div>
      `).join('')}
    </div>
    <button class="save-btn" id="btn-save-basic">
      <svg viewBox="0 0 13 13" fill="none"><path d="M2 6.5l4 4 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
      저장하기
    </button>`;
}

function members() {
  const rows = DATA.members.map((m, i) => `
    <div class="mem-row" data-idx="${i}">
      <div class="mem-av-mini" style="background:${m.color||MEMBER_COLORS[i%MEMBER_COLORS.length]}">${m.name[0]}</div>
      <input value="${m.name}"  data-field="name"  data-idx="${i}" placeholder="이름">
      <input value="${m.role}"  data-field="role"  data-idx="${i}" placeholder="역할" class="sm">
      <input value="${m.dept}"  data-field="dept"  data-idx="${i}" placeholder="학년" class="sm">
      <input type="color" value="${m.color||'#0057FF'}" data-field="color" data-idx="${i}" style="width:34px;height:28px;padding:2px;border:1px solid var(--border);border-radius:6px;background:none;cursor:pointer;flex-shrink:0">
      <button class="del-btn mem-del" data-idx="${i}">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 1l8 8M9 1L1 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      </button>
    </div>`).join('');
  return `
    <div class="panel-h">부원 관리</div>
    <div class="panel-desc">부원 목록을 추가, 수정, 삭제합니다.</div>
    <div class="mem-rows" id="memRows">${rows}</div>
    <button class="add-row-btn" id="btn-add-mem" style="margin-bottom:22px">
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v11M1 6.5h11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
      부원 추가
    </button><br>
    <button class="save-btn" id="btn-save-mem">
      <svg viewBox="0 0 13 13" fill="none"><path d="M2 6.5l4 4 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
      저장하기
    </button>`;
}

function projects() {
  return `
    <div class="panel-h">프로젝트 관리</div>
    <div class="panel-desc">프로젝트 카드의 내용을 수정합니다.</div>
    ${DATA.projects.map((p, i) => `
      <div style="margin-bottom:22px;padding:18px;background:var(--bg);border:1px solid var(--border);border-radius:var(--r-md)">
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
            <input type="color" class="form-input" data-proj="${i}" data-field="color" value="${p.color||'#0057FF'}" style="height:42px;padding:4px">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">설명</label>
          <textarea class="form-textarea" data-proj="${i}" data-field="desc">${p.desc}</textarea>
        </div>
        <button class="del-btn proj-del" data-idx="${i}" style="width:auto;padding:6px 12px;border-radius:6px;font-size:.78rem;gap:5px;display:inline-flex;align-items:center">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 1l8 8M9 1L1 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          삭제
        </button>
      </div>`).join('')}
    <button class="add-row-btn" id="btn-add-proj" style="margin-bottom:18px">
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v11M1 6.5h11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
      프로젝트 추가
    </button><br>
    <button class="save-btn" id="btn-save-proj">
      <svg viewBox="0 0 13 13" fill="none"><path d="M2 6.5l4 4 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
      저장하기
    </button>`;
}

function gallery() {
  const ghReady = DATA.github.owner && DATA.github.repo && DATA.github.token;
  return `
    <div class="panel-h">갤러리 관리</div>
    <div class="panel-desc">이미지를 GitHub 레포지토리에 업로드하고 갤러리를 관리합니다.</div>

    <!-- GitHub 설정 -->
    <div style="margin-bottom:20px;padding:16px 18px;background:var(--bg);border:1px solid var(--border);border-radius:var(--r-md)">
      <div style="font-size:.88rem;font-weight:700;margin-bottom:12px;display:flex;align-items:center;gap:8px">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4 11.5 11.5 0 013 .4c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
        GitHub 업로드 설정
        <span style="font-size:.68rem;font-family:var(--font-mono);padding:2px 7px;border-radius:100px;background:${ghReady?'var(--blue-light)':'#FEF3C7'};color:${ghReady?'var(--blue)':'#D97706'}">${ghReady?'연결됨':'미설정'}</span>
      </div>
      <div class="form-row">
        <div class="form-group" style="margin:0 0 10px">
          <label class="form-label">GitHub Username (owner)</label>
          <input class="form-input" id="gh-owner" value="${DATA.github.owner}" placeholder="예: johndoe">
        </div>
        <div class="form-group" style="margin:0 0 10px">
          <label class="form-label">Repository 이름</label>
          <input class="form-input" id="gh-repo" value="${DATA.github.repo}" placeholder="예: remnant-site">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group" style="margin:0 0 10px">
          <label class="form-label">Branch</label>
          <input class="form-input" id="gh-branch" value="${DATA.github.branch}" placeholder="main">
        </div>
        <div class="form-group" style="margin:0 0 10px">
          <label class="form-label">업로드 폴더</label>
          <input class="form-input" id="gh-folder" value="${DATA.github.folder}" placeholder="gallery">
        </div>
      </div>
      <div class="form-group" style="margin:0 0 10px">
        <label class="form-label">GitHub Personal Access Token</label>
        <input class="form-input" id="gh-token" type="password" value="${DATA.github.token}" placeholder="ghp_xxxxxxxxxxxx">
      </div>
      <p style="font-size:.72rem;color:var(--text3);font-family:var(--font-mono);line-height:1.5;margin-bottom:10px">
        Token 발급: GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens<br>
        필요 권한: Contents (Read &amp; write)
      </p>
      <button class="save-btn" id="btn-save-gh" style="background:var(--dark)">GitHub 설정 저장</button>
    </div>

    <!-- 업로드 -->
    <div class="upload-zone" id="uploadZone">
      <label class="upload-zone-label" for="fileInput">
        <div class="upload-icon">📁</div>
        <p>클릭하거나 이미지를 드래그하여 업로드<br><span style="color:var(--blue);font-weight:700">GitHub에 직접 업로드</span>됩니다</p>
        <div class="hint">JPG, PNG, GIF, WEBP · 최대 10MB</div>
      </label>
      <input type="file" id="fileInput" accept="image/*" multiple>
    </div>
    <div class="upload-progress" id="uploadProgress">
      <div class="progress-text" id="progressText">업로드 중...</div>
      <div class="progress-bar-wrap"><div class="progress-bar" id="progressBar"></div></div>
    </div>

    <!-- 갤러리 아이템 목록 -->
    <div style="margin-top:18px">
      <div style="font-size:.85rem;font-weight:700;margin-bottom:10px">현재 갤러리 항목 (${DATA.gallery.length}개)</div>
      <div class="g-admin-grid" id="gAdminGrid">
        ${DATA.gallery.map(g => `
          <div class="g-admin-item" data-gid="${g.id}">
            ${g.url
              ? `<img class="g-admin-thumb" src="${g.url}" alt="${g.title}">`
              : `<div style="width:100%;height:100%;min-height:70px;background:${g.color||'#333'};display:flex;align-items:center;justify-content:center;font-size:.65rem;color:rgba(255,255,255,.6);font-family:var(--font-mono);text-align:center;padding:4px">${g.title}</div>`
            }
            <div class="g-admin-del" data-gid="${g.id}"><span>삭제</span></div>
          </div>`).join('')}
      </div>
    </div>

    <!-- 수동 추가 (URL 직접 입력) -->
    <div style="padding:16px 18px;border:1px solid var(--border);border-radius:var(--r-md);background:var(--bg)">
      <div style="font-size:.85rem;font-weight:700;margin-bottom:12px">항목 수동 추가 (이미지 URL 직접 입력)</div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">제목</label><input class="form-input" id="g-title" placeholder="사진 제목"></div>
        <div class="form-group">
          <label class="form-label">카테고리</label>
          <select class="form-select" id="g-cat">
            <option value="exhibit">전시</option>
            <option value="work">제작</option>
            <option value="event">행사</option>
          </select>
        </div>
      </div>
      <div class="form-group"><label class="form-label">이미지 URL (GitHub raw URL 또는 외부 URL)</label><input class="form-input" id="g-url" placeholder="https://raw.githubusercontent.com/..."></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">설명</label><input class="form-input" id="g-desc" placeholder="사진 설명"></div>
        <div class="form-group"><label class="form-label">플레이스홀더 색상 (이미지 없을 때)</label><input type="color" class="form-input" id="g-color" value="#0057FF" style="height:42px;padding:4px"></div>
      </div>
      <label style="display:flex;align-items:center;gap:8px;margin-bottom:12px;font-size:.82rem;cursor:pointer">
        <input type="checkbox" id="g-large"> 큰 카드로 표시 (2×2)
      </label>
      <button class="add-row-btn" id="btn-add-gallery">
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v11M1 6.5h11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
        항목 추가
      </button>
    </div>`;
}

function history() {
  return `
    <div class="panel-h">연혁 & 수상 실적</div>
    <div class="panel-desc">타임라인과 수상 내역을 관리합니다.</div>

    <div style="font-weight:700;font-size:.95rem;margin-bottom:12px">연혁</div>
    <div id="historyRows">
      ${DATA.history.map((h, i) => `
        <div style="display:flex;gap:10px;align-items:flex-start;margin-bottom:10px;padding:12px 14px;background:var(--bg);border:1px solid var(--border);border-radius:var(--r-sm)">
          <input class="form-input" style="width:80px;flex:none" data-hist="${i}" data-field="year" value="${h.year}">
          <input class="form-input" data-hist="${i}" data-field="title" value="${h.title}">
          <input class="form-input" data-hist="${i}" data-field="desc" value="${h.desc}" placeholder="설명">
          <button class="del-btn hist-del" data-idx="${i}" style="flex-shrink:0">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 1l8 8M9 1L1 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          </button>
        </div>`).join('')}
    </div>
    <button class="add-row-btn" id="btn-add-hist" style="margin-bottom:22px">
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v11M1 6.5h11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
      연혁 추가
    </button><br>

    <div style="font-weight:700;font-size:.95rem;margin:20px 0 12px">수상 실적</div>
    <div id="achRows">
      ${DATA.achievements.map((a, i) => `
        <div style="display:flex;gap:10px;align-items:center;margin-bottom:10px;padding:12px 14px;background:var(--bg);border:1px solid var(--border);border-radius:var(--r-sm)">
          <input class="form-input" style="width:56px;flex:none;text-align:center" data-ach="${i}" data-field="icon" value="${a.icon}">
          <input class="form-input" data-ach="${i}" data-field="name" value="${a.name}">
          <input class="form-input" style="width:80px;flex:none" data-ach="${i}" data-field="year" value="${a.year}">
          <input class="form-input" data-ach="${i}" data-field="org" value="${a.org}" placeholder="기관">
          <button class="del-btn ach-del" data-idx="${i}" style="flex-shrink:0">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 1l8 8M9 1L1 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          </button>
        </div>`).join('')}
    </div>
    <button class="add-row-btn" id="btn-add-ach" style="margin-bottom:22px">
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v11M1 6.5h11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
      수상 추가
    </button><br>
    <button class="save-btn" id="btn-save-hist">
      <svg viewBox="0 0 13 13" fill="none"><path d="M2 6.5l4 4 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
      저장하기
    </button>`;
}

function announcements() {
  return `
    <div class="panel-h">공지사항</div>
    <div class="panel-desc">공지사항을 추가, 수정, 삭제합니다.</div>
    <div id="annBlocks">
      ${DATA.announcements.map((a, i) => `
        <div style="margin-bottom:14px;padding:16px 18px;background:var(--bg);border:1px solid var(--border);border-radius:var(--r-md)">
          <div class="form-row">
            <div class="form-group" style="margin:0 0 10px">
              <label class="form-label">날짜</label>
              <input class="form-input" data-ann="${i}" data-field="date" value="${a.date}">
            </div>
            <div class="form-group" style="margin:0 0 10px">
              <label class="form-label">뱃지</label>
              <select class="form-select" data-ann="${i}" data-field="badge">
                <option value="new"  ${a.badge==='new' ?'selected':''}>NEW</option>
                <option value="info" ${a.badge==='info'?'selected':''}>공지</option>
                <option value="done" ${a.badge==='done'?'selected':''}>완료</option>
              </select>
            </div>
          </div>
          <div class="form-group" style="margin:0 0 10px">
            <label class="form-label">제목</label>
            <input class="form-input" data-ann="${i}" data-field="title" value="${a.title}">
          </div>
          <div class="form-group" style="margin:0 0 10px">
            <label class="form-label">내용</label>
            <textarea class="form-textarea" data-ann="${i}" data-field="desc" style="min-height:56px">${a.desc}</textarea>
          </div>
          <button class="del-btn ann-del" data-idx="${i}" style="width:auto;padding:5px 12px;border-radius:6px;font-size:.75rem">삭제</button>
        </div>`).join('')}
    </div>
    <button class="add-row-btn" id="btn-add-ann" style="margin-bottom:16px">
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v11M1 6.5h11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
      공지 추가
    </button><br><br>
    <button class="save-btn" id="btn-save-ann">
      <svg viewBox="0 0 13 13" fill="none"><path d="M2 6.5l4 4 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
      저장하기
    </button>`;
}

/* ── Bind events per panel ── */
function bindAdminPanel(panel) {
  const el = document.getElementById('adminPanel');

  if (panel === 'basic') {
    el.addEventListener('input', e => {
      const t = e.target;
      if (t.id === 'f-clubName')    DATA.clubName    = t.value;
      if (t.id === 'f-schoolShort') DATA.schoolShort = t.value;
      if (t.id === 'f-schoolName')  DATA.schoolName  = t.value;
      if (t.id === 'f-catchphrase') DATA.catchphrase = t.value;
      if (t.id === 'f-subphrase')   DATA.subphrase   = t.value;
      if (t.id === 'f-intro')       DATA.intro       = t.value;
      if (t.classList.contains('stat-val')) DATA.stats[t.dataset.idx].val = t.value;
      if (t.classList.contains('stat-sup')) DATA.stats[t.dataset.idx].sup = t.value;
      if (t.classList.contains('stat-lbl')) DATA.stats[t.dataset.idx].label = t.value;
    });
    el.querySelector('#btn-save-basic').addEventListener('click', () => {
      saveData(); renderHeroText(); renderHeroStats(); initCounters();
      toast('기본 정보가 저장되었습니다!');
    });
  }

  if (panel === 'members') {
    el.addEventListener('input', e => {
      const t = e.target;
      if (t.dataset.idx !== undefined && t.dataset.field)
        DATA.members[t.dataset.idx][t.dataset.field] = t.value;
    });
    el.addEventListener('click', e => {
      if (e.target.closest('.mem-del')) {
        DATA.members.splice(parseInt(e.target.closest('.mem-del').dataset.idx), 1);
        renderAdminPanel('members'); return;
      }
      if (e.target.closest('#btn-add-mem')) {
        DATA.members.push({ name: '새 부원', role: '역할', dept: '학년', color: MEMBER_COLORS[Math.floor(Math.random()*MEMBER_COLORS.length)] });
        renderAdminPanel('members'); return;
      }
      if (e.target.closest('#btn-save-mem')) {
        saveData(); renderMembers(); toast('부원 목록이 저장되었습니다!');
      }
    });
  }

  if (panel === 'projects') {
    el.addEventListener('input', e => {
      const t = e.target;
      if (t.dataset.proj !== undefined) DATA.projects[t.dataset.proj][t.dataset.field] = t.value;
    });
    el.addEventListener('click', e => {
      if (e.target.closest('.proj-del')) {
        DATA.projects.splice(parseInt(e.target.closest('.proj-del').dataset.idx), 1);
        renderAdminPanel('projects'); return;
      }
      if (e.target.closest('#btn-add-proj')) {
        DATA.projects.push({ name: '새 프로젝트', year: new Date().getFullYear().toString(), tag: '진행중', desc: '프로젝트 설명을 입력하세요.', color: '#0057FF' });
        renderAdminPanel('projects'); return;
      }
      if (e.target.closest('#btn-save-proj')) {
        saveData(); renderProjects(); toast('프로젝트가 저장되었습니다!');
      }
    });
  }

  if (panel === 'gallery') {
    // GitHub config save
    el.querySelector('#btn-save-gh').addEventListener('click', () => {
      DATA.github.owner  = el.querySelector('#gh-owner').value.trim();
      DATA.github.repo   = el.querySelector('#gh-repo').value.trim();
      DATA.github.token  = el.querySelector('#gh-token').value.trim();
      DATA.github.branch = el.querySelector('#gh-branch').value.trim() || 'main';
      DATA.github.folder = el.querySelector('#gh-folder').value.trim() || 'gallery';
      saveData();
      renderAdminPanel('gallery');
      toast('GitHub 설정이 저장되었습니다!');
    });

    // File upload
    const fileInput  = el.querySelector('#fileInput');
    const uploadZone = el.querySelector('#uploadZone');

    uploadZone.addEventListener('dragover', e => { e.preventDefault(); uploadZone.style.borderColor = 'var(--blue)'; });
    uploadZone.addEventListener('dragleave', () => { uploadZone.style.borderColor = ''; });
    uploadZone.addEventListener('drop', e => {
      e.preventDefault(); uploadZone.style.borderColor = '';
      handleFiles([...e.dataTransfer.files]);
    });
    fileInput.addEventListener('change', () => handleFiles([...fileInput.files]));

    // Delete gallery items
    el.querySelectorAll('.g-admin-del').forEach(d => {
      d.addEventListener('click', () => {
        const id = parseInt(d.dataset.gid);
        DATA.gallery = DATA.gallery.filter(g => g.id !== id);
        saveData(); renderGallery(currentCat); renderAdminPanel('gallery');
        toast('삭제되었습니다.');
      });
    });

    // Manual add
    el.querySelector('#btn-add-gallery').addEventListener('click', () => {
      const title = el.querySelector('#g-title').value.trim() || '새 사진';
      const cat   = el.querySelector('#g-cat').value;
      const url   = el.querySelector('#g-url').value.trim();
      const desc  = el.querySelector('#g-desc').value.trim();
      const color = el.querySelector('#g-color').value;
      const large = el.querySelector('#g-large').checked;
      const tags  = { exhibit:'전시', work:'제작', event:'행사' };
      const newId = Math.max(0, ...DATA.gallery.map(g => g.id)) + 1;
      DATA.gallery.push({ id: newId, title, desc, tag: tags[cat]||'행사', cat, url, color, large });
      saveData(); renderGallery(currentCat); renderAdminPanel('gallery');
      toast('갤러리에 추가되었습니다!');
    });
  }

  if (panel === 'history') {
    el.addEventListener('input', e => {
      const t = e.target;
      if (t.dataset.hist !== undefined) DATA.history[t.dataset.hist][t.dataset.field] = t.value;
      if (t.dataset.ach  !== undefined) DATA.achievements[t.dataset.ach][t.dataset.field] = t.value;
    });
    el.addEventListener('click', e => {
      if (e.target.closest('.hist-del')) {
        DATA.history.splice(parseInt(e.target.closest('.hist-del').dataset.idx), 1);
        renderAdminPanel('history'); return;
      }
      if (e.target.closest('.ach-del')) {
        DATA.achievements.splice(parseInt(e.target.closest('.ach-del').dataset.idx), 1);
        renderAdminPanel('history'); return;
      }
      if (e.target.closest('#btn-add-hist')) {
        DATA.history.push({ year: new Date().getFullYear().toString(), title: '새 연혁', desc: '내용을 입력하세요.' });
        renderAdminPanel('history'); return;
      }
      if (e.target.closest('#btn-add-ach')) {
        DATA.achievements.push({ icon: '🏅', name: '수상명', year: new Date().getFullYear().toString(), org: '기관명' });
        renderAdminPanel('history'); return;
      }
      if (e.target.closest('#btn-save-hist')) {
        saveData(); renderHistory(); renderAchievements();
        toast('연혁 & 수상 실적이 저장되었습니다!');
      }
    });
  }

  if (panel === 'announcements') {
    el.addEventListener('input', e => {
      const t = e.target;
      if (t.dataset.ann !== undefined) DATA.announcements[t.dataset.ann][t.dataset.field] = t.value;
    });
    el.addEventListener('click', e => {
      if (e.target.closest('.ann-del')) {
        DATA.announcements.splice(parseInt(e.target.closest('.ann-del').dataset.idx), 1);
        renderAdminPanel('announcements'); return;
      }
      if (e.target.closest('#btn-add-ann')) {
        const today = new Date().toLocaleDateString('ko-KR').replace(/\. /g,'.').slice(0,-1);
        DATA.announcements.unshift({ date: today, title: '새 공지사항', desc: '내용을 입력하세요.', badge: 'new' });
        renderAdminPanel('announcements'); return;
      }
      if (e.target.closest('#btn-save-ann')) {
        saveData(); renderAnnouncements(); toast('공지사항이 저장되었습니다!');
      }
    });
  }
}

/* ──────────────────────────────────────────────
   GITHUB API IMAGE UPLOAD
   ────────────────────────────────────────────── */
async function handleFiles(files) {
  const { owner, repo, token, branch, folder } = DATA.github;
  if (!owner || !repo || !token) {
    toast('먼저 GitHub 설정을 입력하고 저장하세요.', true); return;
  }

  const validFiles = files.filter(f => f.type.startsWith('image/') && f.size < 10 * 1024 * 1024);
  if (!validFiles.length) { toast('유효한 이미지 파일이 없습니다.', true); return; }

  const progress    = document.getElementById('uploadProgress');
  const progressBar = document.getElementById('progressBar');
  const progressTxt = document.getElementById('progressText');
  progress.classList.add('show');

  for (let i = 0; i < validFiles.length; i++) {
    const file = validFiles[i];
    progressTxt.textContent = `업로드 중 ${i+1}/${validFiles.length}: ${file.name}`;
    progressBar.style.width = `${((i) / validFiles.length) * 100}%`;

    try {
      // Read file as base64 (only used for GitHub API transmission, not displayed directly)
      const b64 = await fileToBase64(file);
      const filename  = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
      const ghPath    = `${folder}/${filename}`;
      const apiUrl    = `https://api.github.com/repos/${owner}/${repo}/contents/${ghPath}`;

      // GitHub Contents API PUT
      const resp = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/vnd.github+json',
        },
        body: JSON.stringify({
          message: `Upload gallery image: ${filename}`,
          content: b64,          // GitHub API requires base64 content for file uploads
          branch: branch || 'main',
        }),
      });

      if (!resp.ok) {
        const err = await resp.json();
        throw new Error(err.message || `HTTP ${resp.status}`);
      }

      const data = await resp.json();
      // Use raw GitHub URL (not base64 — actual CDN URL)
      const rawUrl = data.content.download_url;

      // Add to gallery
      const newId = Math.max(0, ...DATA.gallery.map(g => g.id)) + 1;
      DATA.gallery.push({
        id: newId,
        title: file.name.replace(/\.[^.]+$/, '').replace(/_/g, ' '),
        desc: `${file.name}`,
        tag: '제작', cat: 'work',
        url: rawUrl,   // ← actual GitHub raw URL, not base64
        color: '#0057FF',
        large: false,
      });
      saveData();

    } catch(err) {
      toast(`업로드 실패: ${err.message}`, true);
      console.error(err);
    }
  }

  progressBar.style.width = '100%';
  progressTxt.textContent = `${validFiles.length}개 업로드 완료!`;
  setTimeout(() => progress.classList.remove('show'), 2500);

  renderGallery(currentCat);
  renderAdminPanel('gallery');
  toast(`${validFiles.length}개 이미지가 업로드되었습니다!`);
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = () => resolve(reader.result.split(',')[1]); // strip data:... prefix
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* ──────────────────────────────────────────────
   INIT
   ────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  DATA = loadData();

  initNav();
  initReveal();
  initCounters();
  initPwModal();

  // Render all sections
  renderHeroText();
  renderHeroStats();
  renderProjects();
  renderMembers();
  renderGallery('all');
  renderHistory();
  renderAchievements();
  renderAnnouncements();

  // Gallery filter default
  const fAll = document.getElementById('filter-all');
  if (fAll) fAll.classList.add('blue');

  // Gallery modal
  document.getElementById('gallery-modal').addEventListener('click', e => {
    if (e.target === document.getElementById('gallery-modal')) closeGalleryModal();
  });
  document.getElementById('gm-close').addEventListener('click', closeGalleryModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeGalleryModal();
      closePwModal();
    }
  });

  // Admin close
  document.getElementById('admin-close').addEventListener('click', () => {
    closeAdmin();
    // Re-render everything in case admin made changes
    renderHeroText(); renderHeroStats();
    renderProjects(); renderMembers();
    renderGallery(currentCat); renderHistory();
    renderAchievements(); renderAnnouncements();
    reObserve();
  });
});
