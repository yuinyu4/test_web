'use strict';

const STORAGE_KEY = 'remnant-site-service-v2';
const SESSION_KEY = 'remnant-site-admin-session';
const ADMIN_PASSWORD = 'remnant2024';
const MEMBER_COLORS = ['#0b6b4b', '#d95f2a', '#3558d8', '#6b46c1', '#ad343e', '#00838f'];

function uid() {
  return `id-${Math.random().toString(36).slice(2, 10)}-${Date.now().toString(36)}`;
}

const DEFAULT_DATA = {
  brand: {
    clubName: 'remnant',
    schoolName: '대구국제고등학교',
    schoolShort: 'DKSH',
    headline: '조각을 모아, 다음 장면을 만든다.',
    subheadline: '학생 작업물을 전시로 끝내지 않고, 실제 서비스처럼 읽히고 작동하도록 설계하는 창작·개발 동아리입니다.',
    heroCardText: '브랜드 메시지, 인터랙션, 정보 구조를 함께 다뤄서 결과물이 더 선명하게 기억되도록 만듭니다.',
    aboutHeadline: '학생 수준의 아이디어를 제품 수준의 경험으로.',
    intro: 'remnant는 디자인, 개발, 스토리텔링이 만나는 창작 팀입니다. 한 번 보는 사이트가 아니라, 다시 들어와도 구조가 편하고 메시지가 선명한 경험을 지향합니다.',
    footerSummary: '디자인은 더 선명하게, 기능은 더 안정적으로. remnant는 학생 작업물을 서비스 수준의 경험으로 끌어올립니다.'
  },
  heroSignals: [
    { label: 'Visual Contrast', value: '메시지는 짧게, 강조는 강하게.' },
    { label: 'Interaction', value: 'hover, scroll, modal, routing을 자연스럽게 연결.' },
    { label: 'Content System', value: '관리자 수정이 프론트에 즉시 반영되는 구조.' }
  ],
  stats: [
    { value: '24', suffix: '+', label: 'active members' },
    { value: '11', suffix: '', label: 'projects launched' },
    { value: '06', suffix: '', label: 'awards & showcases' }
  ],
  principles: [
    { title: 'High Contrast', body: '핵심 메시지는 한 번에 읽히고, 보조 설명은 부담 없이 따라오도록 대비를 설계합니다.' },
    { title: 'Clear Hierarchy', body: '제목, 강조, 보조 텍스트의 역할을 분리해 페이지가 훨씬 또렷하게 느껴지게 합니다.' },
    { title: 'Interaction First', body: '클릭 가능한 요소는 움직임과 피드백으로 명확히 표현해 망설임 없이 사용할 수 있게 합니다.' },
    { title: 'Editable System', body: '관리자에서 바꾼 정보가 즉시 저장되고 프론트 전체에 연결되도록 구조를 통일합니다.' }
  ],
  projects: [
    { id: uid(), year: '2026', status: '진행중', title: 'Mosaic Archive', description: '학교 안의 장면과 감정을 기록해 인터랙티브 아카이브로 재구성하는 프로젝트입니다.', linkLabel: '상세 보기' },
    { id: uid(), year: '2025', status: '완료', title: 'Afterglow Stories', description: '졸업생 인터뷰를 스토리 기반 전시와 디지털 콘텐츠로 연결한 기록 프로젝트입니다.', linkLabel: '전시 요약' },
    { id: uid(), year: '2024', status: '완료', title: 'Fragment Lab', description: '남겨진 아이디어 조각을 시각 실험과 웹 프로토타입으로 확장한 실험형 프로젝트입니다.', linkLabel: '결과물 보기' }
  ],
  members: [
    { id: uid(), name: '김도윤', role: 'Lead Designer', dept: '3학년', note: '브랜드 구조와 인터페이스 시스템 설계', color: '#0b6b4b' },
    { id: uid(), name: '이서현', role: 'Frontend Developer', dept: '3학년', note: '인터랙션과 관리자 연결 구현', color: '#d95f2a' },
    { id: uid(), name: '박민재', role: 'Visual Director', dept: '2학년', note: '그래픽 톤과 전시 비주얼 총괄', color: '#3558d8' },
    { id: uid(), name: '최하린', role: 'Content Editor', dept: '2학년', note: '문장 밀도와 메시지 정제 담당', color: '#6b46c1' }
  ],
  gallery: [
    { id: uid(), title: '2026 Showcase', description: '메인 전시 공간에서 진행한 결과 발표.', category: 'showcase', tag: 'Showcase', image: '', color: '#0b6b4b', large: true },
    { id: uid(), title: 'Workshop Sprint', description: '짧은 시간 안에 구조를 실험한 제작 스프린트.', category: 'work', tag: 'Workshop', image: '', color: '#d95f2a', large: false },
    { id: uid(), title: 'Team Review', description: 'UI와 메시지 구조를 함께 리뷰한 세션.', category: 'team', tag: 'Team', image: '', color: '#3558d8', large: false },
    { id: uid(), title: 'Prototype Board', description: '아이디어를 서비스 플로우로 구체화한 보드.', category: 'work', tag: 'Build', image: '', color: '#6b46c1', large: true }
  ],
  history: [
    { id: uid(), year: '2023', title: '동아리 시작', description: '창작과 개발을 한 팀으로 묶는 작은 실험에서 출발했습니다.' },
    { id: uid(), year: '2024', title: '첫 전시 운영', description: '오프라인 전시와 디지털 소개 페이지를 함께 운영하기 시작했습니다.' },
    { id: uid(), year: '2025', title: '사이트 리뉴얼', description: '정보 구조와 인터랙션을 다시 설계하며 서비스 수준 완성도를 목표로 개편했습니다.' }
  ],
  achievements: [
    { id: uid(), title: '교내 우수 프로젝트 선정', org: 'DKSH Creative Showcase', year: '2025' },
    { id: uid(), title: '브랜드 경험 우수 사례 발표', org: 'Student Design Forum', year: '2025' },
    { id: uid(), title: '협업 프로젝트 전시 운영', org: 'School Open Studio', year: '2024' }
  ],
  notices: [
    { id: uid(), date: '2026.04.20', title: '상반기 프로젝트 리뷰 데이', description: '팀별 프로토타입 진행 상황을 발표하고 피드백을 받는 세션입니다.', type: 'NEW' },
    { id: uid(), date: '2026.04.12', title: '신입 멤버 온보딩', description: '디자인 시스템과 관리자 사용법을 함께 안내합니다.', type: 'INFO' },
    { id: uid(), date: '2026.04.01', title: '사이트 구조 개편 완료', description: '콘텐츠 관리 구조와 인터랙션 개선이 반영되었습니다.', type: 'DONE' }
  ],
  contact: {
    description: '인스타그램, 이메일, 전화번호, 소개 링크까지 모든 연락 수단을 실제 클릭 가능한 링크로 연결했습니다.',
    links: [
      { id: uid(), label: 'Instagram', value: '@remnant.dksh', href: 'https://instagram.com/', helper: '활동 사진과 공지 확인' },
      { id: uid(), label: 'Email', value: 'remnant@dksh.school', href: 'mailto:remnant@dksh.school', helper: '제안 및 협업 문의' },
      { id: uid(), label: 'Phone', value: '010-1234-5678', href: 'tel:01012345678', helper: '빠른 연락' }
    ]
  }
};

const ADMIN_TABS = [
  { id: 'brand', label: '브랜드' },
  { id: 'projects', label: '프로젝트' },
  { id: 'members', label: '부원' },
  { id: 'gallery', label: '갤러리' },
  { id: 'history', label: '연혁/성과' },
  { id: 'notices', label: '공지' },
  { id: 'contact', label: '연락처' }
];

const GALLERY_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'showcase', label: 'Showcase' },
  { id: 'work', label: 'Work' },
  { id: 'team', label: 'Team' }
];

let state = loadState();
let currentGalleryFilter = 'all';
let currentAdminTab = 'brand';
let toastTimer = null;
let revealObserver = null;
const els = {};

document.addEventListener('DOMContentLoaded', () => {
  cacheElements();
  setupObservers();
  bindGlobalEvents();
  renderAll();

  if (sessionStorage.getItem(SESSION_KEY) === 'open') {
    openAdmin();
  }
});

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULT_DATA);
    return hydrateState(JSON.parse(raw));
  } catch (_) {
    return structuredClone(DEFAULT_DATA);
  }
}

function hydrateState(saved) {
  const base = structuredClone(DEFAULT_DATA);
  const next = {
    ...base,
    ...saved,
    brand: { ...base.brand, ...(saved.brand || {}) },
    contact: {
      ...base.contact,
      ...(saved.contact || {}),
      links: Array.isArray(saved.contact?.links) ? saved.contact.links : base.contact.links
    }
  };

  next.heroSignals = Array.isArray(saved.heroSignals) && saved.heroSignals.length ? saved.heroSignals : base.heroSignals;
  next.stats = Array.isArray(saved.stats) && saved.stats.length ? saved.stats : base.stats;
  next.principles = Array.isArray(saved.principles) && saved.principles.length ? saved.principles : base.principles;
  next.projects = Array.isArray(saved.projects) && saved.projects.length ? saved.projects : base.projects;
  next.members = Array.isArray(saved.members) && saved.members.length ? saved.members : base.members;
  next.gallery = Array.isArray(saved.gallery) && saved.gallery.length ? saved.gallery : base.gallery;
  next.history = Array.isArray(saved.history) && saved.history.length ? saved.history : base.history;
  next.achievements = Array.isArray(saved.achievements) && saved.achievements.length ? saved.achievements : base.achievements;
  next.notices = Array.isArray(saved.notices) && saved.notices.length ? saved.notices : base.notices;
  return next;
}

function saveState(message) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  renderAll();
  if (message) showToast(message);
}

function cacheElements() {
  [
    'siteHeader', 'mobileNav', 'mobileMenuButton', 'adminEntry', 'mobileAdminEntry', 'contactAdminButton',
    'footerAdminButton', 'footerShortcutHint', 'heroTitle', 'heroSubtitle', 'heroCardText', 'heroStats',
    'heroSignals', 'aboutIntro', 'aboutHeadline', 'principlesGrid', 'projectList', 'memberStack',
    'galleryFilters', 'galleryGrid', 'timelineList', 'achievementGrid', 'noticeList', 'contactDescription',
    'contactLinks', 'footerSchool', 'footerSummary', 'loginModal', 'adminPassword', 'loginError',
    'loginSubmit', 'galleryModal', 'galleryModalMedia', 'galleryModalTag', 'galleryModalTitle',
    'galleryModalDescription', 'adminShell', 'adminTabs', 'adminPanelTitle', 'adminPanelBody',
    'adminCloseButton', 'logoutButton', 'exportButton', 'toast'
  ].forEach((id) => {
    els[id] = document.getElementById(id);
  });
}

function setupObservers() {
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  observeReveals();
}

function observeReveals() {
  document.querySelectorAll('.reveal').forEach((node) => {
    if (!node.classList.contains('is-visible')) {
      revealObserver.observe(node);
    }
  });
}

function bindGlobalEvents() {
  document.querySelectorAll('[data-nav-target]').forEach((node) => {
    node.addEventListener('click', () => navigateTo(node.dataset.navTarget));
  });

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('hashchange', syncActiveNavFromHash);

  els.mobileMenuButton.addEventListener('click', toggleMobileMenu);
  [els.adminEntry, els.mobileAdminEntry, els.contactAdminButton, els.footerAdminButton].forEach((button) => {
    button.addEventListener('click', openLoginModal);
  });
  els.footerShortcutHint.addEventListener('click', openLoginModal);

  els.loginSubmit.addEventListener('click', submitLogin);
  els.adminPassword.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') submitLogin();
  });

  document.querySelectorAll('[data-close-modal]').forEach((button) => {
    button.addEventListener('click', () => closeModal(button.dataset.closeModal));
  });

  [els.loginModal, els.galleryModal].forEach((modal) => {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeModal(modal.id);
    });
  });

  els.adminCloseButton.addEventListener('click', closeAdmin);
  els.logoutButton.addEventListener('click', () => {
    sessionStorage.removeItem(SESSION_KEY);
    closeAdmin();
    showToast('관리자 로그아웃 완료');
  });
  els.exportButton.addEventListener('click', exportData);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal('loginModal');
      closeModal('galleryModal');
      if (els.adminShell.classList.contains('is-open')) closeAdmin();
    }

    if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'a') {
      event.preventDefault();
      openLoginModal();
    }
  });

  syncActiveNavFromHash();
  handleScroll();
}

function renderAll() {
  renderBrand();
  renderHeroStats();
  renderHeroSignals();
  renderPrinciples();
  renderProjects();
  renderMembers();
  renderGalleryFilters();
  renderGallery();
  renderHistory();
  renderAchievements();
  renderNotices();
  renderContact();
  renderFooter();
  renderAdminTabs();
  renderAdminPanel();
  observeReveals();
  syncActiveNavFromHash();
}

function renderBrand() {
  const { brand } = state;
  els.heroTitle.innerHTML = withAccent(brand.headline);
  els.heroSubtitle.textContent = brand.subheadline;
  els.heroCardText.textContent = brand.heroCardText;
  els.aboutIntro.textContent = brand.intro;
  els.aboutHeadline.textContent = brand.aboutHeadline;
  document.title = `${brand.clubName} @ ${brand.schoolShort}`;
}

function withAccent(text) {
  const [first, ...rest] = text.split(',');
  if (rest.length === 0) {
    const words = text.split(' ');
    const target = words.pop() || '';
    return `${words.join(' ')} <em>${target}</em>`.trim();
  }
  return `${first}, <em>${rest.join(',').trim()}</em>`;
}

function renderHeroStats() {
  els.heroStats.innerHTML = state.stats.map((item) => `
    <article class="stat-card reveal">
      <strong>${escapeHtml(item.value)}<span>${escapeHtml(item.suffix)}</span></strong>
      <p>${escapeHtml(item.label)}</p>
    </article>
  `).join('');
}

function renderHeroSignals() {
  els.heroSignals.innerHTML = state.heroSignals.map((item) => `
    <div class="signal-item">
      <strong>${escapeHtml(item.label)}</strong>
      <span>${escapeHtml(item.value)}</span>
    </div>
  `).join('');
}

function renderPrinciples() {
  els.principlesGrid.innerHTML = state.principles.map((item, index) => `
    <article class="principle-card reveal">
      <span>${String(index + 1).padStart(2, '0')}</span>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.body)}</p>
    </article>
  `).join('');
}

function renderProjects() {
  els.projectList.innerHTML = state.projects.map((project) => `
    <article class="project-item reveal">
      <div class="project-year">${escapeHtml(project.year)}</div>
      <div class="project-copy">
        <h3>${escapeHtml(project.title)}</h3>
        <p>${escapeHtml(project.description)}</p>
      </div>
      <div class="project-meta">
        <span class="badge ${project.status === '진행중' ? 'is-active' : ''}">${escapeHtml(project.status)}</span>
        <span class="project-link">${escapeHtml(project.linkLabel || '자세히 보기')}</span>
      </div>
    </article>
  `).join('');
}

function renderMembers() {
  els.memberStack.innerHTML = state.members.map((member) => `
    <article class="member-row reveal">
      <div class="member-avatar" style="background:${escapeAttribute(member.color || MEMBER_COLORS[0])}">
        ${escapeHtml(member.name.slice(0, 1))}
      </div>
      <div class="member-copy">
        <strong>${escapeHtml(member.name)}</strong>
        <p>${escapeHtml(member.role)} · ${escapeHtml(member.note)}</p>
      </div>
      <div class="member-meta">${escapeHtml(member.dept)}</div>
    </article>
  `).join('');
}

function renderGalleryFilters() {
  els.galleryFilters.innerHTML = GALLERY_FILTERS.map((filter) => `
    <button class="filter-chip ${filter.id === currentGalleryFilter ? 'is-active' : ''}" data-gallery-filter="${filter.id}">
      ${escapeHtml(filter.label)}
    </button>
  `).join('');

  els.galleryFilters.querySelectorAll('[data-gallery-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      currentGalleryFilter = button.dataset.galleryFilter;
      renderGalleryFilters();
      renderGallery();
    });
  });
}

function renderGallery() {
  const items = currentGalleryFilter === 'all'
    ? state.gallery
    : state.gallery.filter((item) => item.category === currentGalleryFilter);

  els.galleryGrid.innerHTML = items.map((item) => `
    <article class="gallery-card reveal">
      <button type="button" data-gallery-id="${item.id}">
        <div class="gallery-media ${item.large ? 'is-large' : ''}" style="background:${escapeAttribute(item.color || '#1b251e')}">
          ${item.image
            ? `<img src="${escapeAttribute(item.image)}" alt="${escapeAttribute(item.title)}" loading="lazy">`
            : `<div class="gallery-placeholder">${escapeHtml(item.title)}</div>`}
        </div>
        <div class="gallery-item-meta">
          <div>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.description)}</p>
          </div>
          <span class="badge">${escapeHtml(item.tag)}</span>
        </div>
      </button>
    </article>
  `).join('');

  els.galleryGrid.querySelectorAll('[data-gallery-id]').forEach((button) => {
    button.addEventListener('click', () => openGalleryModal(button.dataset.galleryId));
  });
}

function renderHistory() {
  els.timelineList.innerHTML = state.history.map((item) => `
    <article class="timeline-item reveal">
      <span>${escapeHtml(item.year)}</span>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.description)}</p>
    </article>
  `).join('');
}

function renderAchievements() {
  els.achievementGrid.innerHTML = state.achievements.map((item) => `
    <article class="achievement-card reveal">
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.org)}</p>
      <span>${escapeHtml(item.year)}</span>
    </article>
  `).join('');
}

function renderNotices() {
  els.noticeList.innerHTML = state.notices.map((item) => `
    <article class="notice-card reveal">
      <div class="notice-meta">
        <span>${escapeHtml(item.date)}</span>
        <span>${escapeHtml(item.type)}</span>
      </div>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.description)}</p>
    </article>
  `).join('');
}

function renderContact() {
  els.contactDescription.textContent = state.contact.description;
  els.contactLinks.innerHTML = state.contact.links.map((item) => `
    <a class="contact-link" href="${escapeAttribute(item.href)}" target="${item.href.startsWith('http') ? '_blank' : '_self'}" rel="noreferrer">
      <div>
        <strong>${escapeHtml(item.label)}</strong>
        <span>${escapeHtml(item.helper)}</span>
      </div>
      <em>${escapeHtml(item.value)}</em>
    </a>
  `).join('');
}

function renderFooter() {
  els.footerSchool.textContent = state.brand.schoolName;
  els.footerSummary.textContent = state.brand.footerSummary;
}

function renderAdminTabs() {
  els.adminTabs.innerHTML = ADMIN_TABS.map((tab) => `
    <button class="admin-tab ${tab.id === currentAdminTab ? 'is-active' : ''}" data-admin-tab="${tab.id}">
      <span>${escapeHtml(tab.label)}</span>
      <span>→</span>
    </button>
  `).join('');

  els.adminTabs.querySelectorAll('[data-admin-tab]').forEach((button) => {
    button.addEventListener('click', () => {
      currentAdminTab = button.dataset.adminTab;
      renderAdminTabs();
      renderAdminPanel();
    });
  });
}

function renderAdminPanel() {
  const titles = {
    brand: '브랜드와 메인 메시지',
    projects: '프로젝트 CRUD',
    members: '부원 CRUD',
    gallery: '갤러리 CRUD',
    history: '연혁 및 성과 CRUD',
    notices: '공지 CRUD',
    contact: '연락처 관리'
  };

  els.adminPanelTitle.textContent = titles[currentAdminTab];

  const panelMap = {
    brand: renderBrandAdmin,
    projects: renderProjectsAdmin,
    members: renderMembersAdmin,
    gallery: renderGalleryAdmin,
    history: renderHistoryAdmin,
    notices: renderNoticeAdmin,
    contact: renderContactAdmin
  };

  panelMap[currentAdminTab]();
}

function renderCollectionRow(id, namespace, index, content) {
  return `
    <article class="admin-row" data-row-id="${id}" data-namespace="${namespace}" data-index="${index}">
      <div class="admin-row-head">
        <div class="admin-row-title">${escapeHtml(`${namespace.toUpperCase()} ${index + 1}`)}</div>
        <button class="button button-danger" data-delete-row="${namespace}" data-index="${index}">삭제</button>
      </div>
      ${content}
    </article>
  `;
}

function renderBrandAdmin() {
  els.adminPanelBody.innerHTML = `
    <section class="admin-card">
      <h4>브랜드 텍스트</h4>
      <p>Hero 메시지, 소개 문구, 푸터 문구를 여기에서 수정합니다.</p>
      <div class="admin-list">
        <label><span class="field-label">Headline</span><input class="field-input" id="brandHeadline" value="${escapeAttribute(state.brand.headline)}"></label>
        <label><span class="field-label">Subheadline</span><textarea class="field-textarea" id="brandSubheadline">${escapeHtml(state.brand.subheadline)}</textarea></label>
        <label><span class="field-label">Hero Card</span><textarea class="field-textarea" id="brandHeroCard">${escapeHtml(state.brand.heroCardText)}</textarea></label>
        <label><span class="field-label">About Headline</span><input class="field-input" id="brandAboutHeadline" value="${escapeAttribute(state.brand.aboutHeadline)}"></label>
        <label><span class="field-label">Intro</span><textarea class="field-textarea" id="brandIntro">${escapeHtml(state.brand.intro)}</textarea></label>
        <label><span class="field-label">Footer Summary</span><textarea class="field-textarea" id="brandFooter">${escapeHtml(state.brand.footerSummary)}</textarea></label>
      </div>
      <div class="admin-form-actions">
        <button class="button button-primary" id="saveBrand">저장</button>
      </div>
    </section>
  `;

  document.getElementById('saveBrand').addEventListener('click', () => {
    state.brand.headline = document.getElementById('brandHeadline').value.trim();
    state.brand.subheadline = document.getElementById('brandSubheadline').value.trim();
    state.brand.heroCardText = document.getElementById('brandHeroCard').value.trim();
    state.brand.aboutHeadline = document.getElementById('brandAboutHeadline').value.trim();
    state.brand.intro = document.getElementById('brandIntro').value.trim();
    state.brand.footerSummary = document.getElementById('brandFooter').value.trim();
    saveState('브랜드 정보 저장 완료');
  });
}

function renderProjectsAdmin() {
  els.adminPanelBody.innerHTML = `
    <section class="admin-card">
      <h4>프로젝트 목록</h4>
      <p>Create, Update, Delete가 모두 가능하며 저장 즉시 반영됩니다.</p>
      <div class="admin-list">
        ${state.projects.map((item, index) => renderCollectionRow(item.id, 'project', index, `
          <div class="field-grid">
            <label><span class="field-label">Year</span><input class="field-input" data-field="year" value="${escapeAttribute(item.year)}"></label>
            <label><span class="field-label">Status</span><input class="field-input" data-field="status" value="${escapeAttribute(item.status)}"></label>
          </div>
          <label><span class="field-label">Title</span><input class="field-input" data-field="title" value="${escapeAttribute(item.title)}"></label>
          <label><span class="field-label">Description</span><textarea class="field-textarea" data-field="description">${escapeHtml(item.description)}</textarea></label>
          <label><span class="field-label">Link Label</span><input class="field-input" data-field="linkLabel" value="${escapeAttribute(item.linkLabel || '')}"></label>
        `)).join('')}
      </div>
      <div class="admin-form-actions">
        <button class="button button-secondary" id="addProject">프로젝트 추가</button>
        <button class="button button-primary" id="saveProjects">저장</button>
      </div>
    </section>
  `;

  bindCollectionAdmin('project', state.projects, {
    add: () => state.projects.push({ id: uid(), year: String(new Date().getFullYear()), status: '진행중', title: '새 프로젝트', description: '설명을 입력하세요.', linkLabel: '자세히 보기' }),
    saveMessage: '프로젝트 저장 완료'
  });
}

function renderMembersAdmin() {
  els.adminPanelBody.innerHTML = `
    <section class="admin-card">
      <h4>부원 목록</h4>
      <p>역할, 학년, 설명, 컬러를 관리합니다.</p>
      <div class="admin-list">
        ${state.members.map((item, index) => renderCollectionRow(item.id, 'member', index, `
          <div class="field-grid">
            <label><span class="field-label">Name</span><input class="field-input" data-field="name" value="${escapeAttribute(item.name)}"></label>
            <label><span class="field-label">Role</span><input class="field-input" data-field="role" value="${escapeAttribute(item.role)}"></label>
          </div>
          <div class="field-grid">
            <label><span class="field-label">Dept</span><input class="field-input" data-field="dept" value="${escapeAttribute(item.dept)}"></label>
            <label><span class="field-label">Color</span><input class="field-input" data-field="color" value="${escapeAttribute(item.color)}"></label>
          </div>
          <label><span class="field-label">Note</span><textarea class="field-textarea" data-field="note">${escapeHtml(item.note)}</textarea></label>
        `)).join('')}
      </div>
      <div class="admin-form-actions">
        <button class="button button-secondary" id="addMember">부원 추가</button>
        <button class="button button-primary" id="saveMembers">저장</button>
      </div>
    </section>
  `;

  bindCollectionAdmin('member', state.members, {
    add: () => state.members.push({ id: uid(), name: '새 부원', role: 'Role', dept: '1학년', note: '설명을 입력하세요.', color: MEMBER_COLORS[state.members.length % MEMBER_COLORS.length] }),
    saveMessage: '부원 저장 완료'
  });
}

function renderGalleryAdmin() {
  els.adminPanelBody.innerHTML = `
    <section class="admin-card">
      <h4>갤러리 관리</h4>
      <p>이미지 URL, 카테고리, 강조 크기를 함께 관리합니다.</p>
      <div class="admin-list">
        ${state.gallery.map((item, index) => renderCollectionRow(item.id, 'gallery', index, `
          <div class="field-grid">
            <label><span class="field-label">Title</span><input class="field-input" data-field="title" value="${escapeAttribute(item.title)}"></label>
            <label><span class="field-label">Tag</span><input class="field-input" data-field="tag" value="${escapeAttribute(item.tag)}"></label>
          </div>
          <div class="field-grid">
            <label><span class="field-label">Category</span><input class="field-input" data-field="category" value="${escapeAttribute(item.category)}"></label>
            <label><span class="field-label">Color</span><input class="field-input" data-field="color" value="${escapeAttribute(item.color)}"></label>
          </div>
          <label><span class="field-label">Image URL</span><input class="field-input" data-field="image" value="${escapeAttribute(item.image || '')}"></label>
          <label><span class="field-label">Description</span><textarea class="field-textarea" data-field="description">${escapeHtml(item.description)}</textarea></label>
          <label><span class="field-label">Large Layout</span><select class="field-select" data-field="large"><option value="false" ${item.large ? '' : 'selected'}>false</option><option value="true" ${item.large ? 'selected' : ''}>true</option></select></label>
        `)).join('')}
      </div>
      <div class="admin-form-actions">
        <button class="button button-secondary" id="addGallery">갤러리 추가</button>
        <button class="button button-primary" id="saveGallery">저장</button>
      </div>
    </section>
  `;

  bindCollectionAdmin('gallery', state.gallery, {
    add: () => state.gallery.push({ id: uid(), title: '새 장면', description: '설명을 입력하세요.', category: 'work', tag: 'Work', image: '', color: '#0b6b4b', large: false }),
    transform: (field, value) => field === 'large' ? value === 'true' : value,
    saveMessage: '갤러리 저장 완료'
  });
}

function renderHistoryAdmin() {
  els.adminPanelBody.innerHTML = `
    <section class="admin-card">
      <h4>연혁</h4>
      <div class="admin-list">
        ${state.history.map((item, index) => renderCollectionRow(item.id, 'history', index, `
          <div class="field-grid">
            <label><span class="field-label">Year</span><input class="field-input" data-field="year" value="${escapeAttribute(item.year)}"></label>
            <label><span class="field-label">Title</span><input class="field-input" data-field="title" value="${escapeAttribute(item.title)}"></label>
          </div>
          <label><span class="field-label">Description</span><textarea class="field-textarea" data-field="description">${escapeHtml(item.description)}</textarea></label>
        `)).join('')}
      </div>
      <div class="admin-form-actions">
        <button class="button button-secondary" id="addHistory">연혁 추가</button>
        <button class="button button-primary" id="saveHistory">연혁 저장</button>
      </div>
    </section>
    <section class="admin-card">
      <h4>성과</h4>
      <div class="admin-list">
        ${state.achievements.map((item, index) => renderCollectionRow(item.id, 'achievement', index, `
          <div class="field-grid">
            <label><span class="field-label">Title</span><input class="field-input" data-field="title" value="${escapeAttribute(item.title)}"></label>
            <label><span class="field-label">Year</span><input class="field-input" data-field="year" value="${escapeAttribute(item.year)}"></label>
          </div>
          <label><span class="field-label">Organization</span><input class="field-input" data-field="org" value="${escapeAttribute(item.org)}"></label>
        `)).join('')}
      </div>
      <div class="admin-form-actions">
        <button class="button button-secondary" id="addAchievement">성과 추가</button>
        <button class="button button-primary" id="saveAchievements">성과 저장</button>
      </div>
    </section>
  `;

  bindCollectionAdmin('history', state.history, {
    addButtonId: 'addHistory',
    saveButtonId: 'saveHistory',
    add: () => state.history.push({ id: uid(), year: String(new Date().getFullYear()), title: '새 연혁', description: '설명을 입력하세요.' }),
    saveMessage: '연혁 저장 완료'
  });

  bindCollectionAdmin('achievement', state.achievements, {
    addButtonId: 'addAchievement',
    saveButtonId: 'saveAchievements',
    add: () => state.achievements.push({ id: uid(), title: '새 성과', org: '기관명', year: String(new Date().getFullYear()) }),
    saveMessage: '성과 저장 완료'
  });
}

function renderNoticeAdmin() {
  els.adminPanelBody.innerHTML = `
    <section class="admin-card">
      <h4>공지</h4>
      <p>날짜, 유형, 제목, 설명을 수정합니다.</p>
      <div class="admin-list">
        ${state.notices.map((item, index) => renderCollectionRow(item.id, 'notice', index, `
          <div class="field-grid">
            <label><span class="field-label">Date</span><input class="field-input" data-field="date" value="${escapeAttribute(item.date)}"></label>
            <label><span class="field-label">Type</span><input class="field-input" data-field="type" value="${escapeAttribute(item.type)}"></label>
          </div>
          <label><span class="field-label">Title</span><input class="field-input" data-field="title" value="${escapeAttribute(item.title)}"></label>
          <label><span class="field-label">Description</span><textarea class="field-textarea" data-field="description">${escapeHtml(item.description)}</textarea></label>
        `)).join('')}
      </div>
      <div class="admin-form-actions">
        <button class="button button-secondary" id="addNotice">공지 추가</button>
        <button class="button button-primary" id="saveNotices">저장</button>
      </div>
    </section>
  `;

  bindCollectionAdmin('notice', state.notices, {
    add: () => state.notices.unshift({ id: uid(), date: todayString(), title: '새 공지', description: '설명을 입력하세요.', type: 'NEW' }),
    saveMessage: '공지 저장 완료'
  });
}

function renderContactAdmin() {
  els.adminPanelBody.innerHTML = `
    <section class="admin-card">
      <h4>연락처 설명</h4>
      <label><span class="field-label">Description</span><textarea class="field-textarea" id="contactDescriptionInput">${escapeHtml(state.contact.description)}</textarea></label>
      <div class="admin-form-actions">
        <button class="button button-primary" id="saveContactDescription">설명 저장</button>
      </div>
    </section>
    <section class="admin-card">
      <h4>연락 링크</h4>
      <div class="admin-list">
        ${state.contact.links.map((item, index) => renderCollectionRow(item.id, 'contact', index, `
          <div class="field-grid">
            <label><span class="field-label">Label</span><input class="field-input" data-field="label" value="${escapeAttribute(item.label)}"></label>
            <label><span class="field-label">Value</span><input class="field-input" data-field="value" value="${escapeAttribute(item.value)}"></label>
          </div>
          <label><span class="field-label">Href</span><input class="field-input" data-field="href" value="${escapeAttribute(item.href)}"></label>
          <label><span class="field-label">Helper</span><input class="field-input" data-field="helper" value="${escapeAttribute(item.helper)}"></label>
        `)).join('')}
      </div>
      <div class="admin-form-actions">
        <button class="button button-secondary" id="addContact">링크 추가</button>
        <button class="button button-primary" id="saveContacts">저장</button>
      </div>
    </section>
  `;

  document.getElementById('saveContactDescription').addEventListener('click', () => {
    state.contact.description = document.getElementById('contactDescriptionInput').value.trim();
    saveState('연락처 설명 저장 완료');
  });

  bindCollectionAdmin('contact', state.contact.links, {
    addButtonId: 'addContact',
    saveButtonId: 'saveContacts',
    add: () => state.contact.links.push({ id: uid(), label: 'New Link', value: 'label', href: 'https://example.com', helper: '설명을 입력하세요.' }),
    saveMessage: '연락처 링크 저장 완료'
  });
}

function bindCollectionAdmin(namespace, collection, config) {
  const addButtonId = config.addButtonId || `add${capitalize(namespace)}`;
  const saveButtonId = config.saveButtonId || `save${capitalize(namespace)}s`;
  const addButton = document.getElementById(addButtonId);
  const saveButton = document.getElementById(saveButtonId);

  addButton.addEventListener('click', () => {
    config.add();
    renderAdminPanel();
  });

  els.adminPanelBody.querySelectorAll(`[data-namespace="${namespace}"]`).forEach((row) => {
    row.querySelectorAll('[data-field]').forEach((input) => {
      input.addEventListener('input', () => {
        const index = Number(row.dataset.index);
        const field = input.dataset.field;
        const raw = input.value;
        collection[index][field] = config.transform ? config.transform(field, raw) : raw;
      });
    });
  });

  els.adminPanelBody.querySelectorAll(`[data-delete-row="${namespace}"]`).forEach((button) => {
    button.addEventListener('click', () => {
      collection.splice(Number(button.dataset.index), 1);
      renderAdminPanel();
    });
  });

  saveButton.addEventListener('click', () => {
    saveState(config.saveMessage);
  });
}

function openLoginModal() {
  els.loginError.textContent = '';
  els.adminPassword.value = '';
  openModal('loginModal');
  requestAnimationFrame(() => els.adminPassword.focus());
}

function submitLogin() {
  if (els.adminPassword.value !== ADMIN_PASSWORD) {
    els.loginError.textContent = '비밀번호가 올바르지 않습니다.';
    return;
  }

  sessionStorage.setItem(SESSION_KEY, 'open');
  closeModal('loginModal');
  openAdmin();
  showToast('관리자 로그인 성공');
}

function openAdmin() {
  els.adminShell.classList.add('is-open');
  els.adminShell.setAttribute('aria-hidden', 'false');
  document.body.classList.add('is-locked');
}

function closeAdmin() {
  els.adminShell.classList.remove('is-open');
  els.adminShell.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('is-locked');
}

function openGalleryModal(id) {
  const item = state.gallery.find((entry) => entry.id === id);
  if (!item) return;

  els.galleryModalMedia.innerHTML = item.image
    ? `<img src="${escapeAttribute(item.image)}" alt="${escapeAttribute(item.title)}">`
    : `<div class="gallery-media is-large" style="background:${escapeAttribute(item.color || '#1b251e')}"><div class="gallery-placeholder">${escapeHtml(item.title)}</div></div>`;
  els.galleryModalTag.textContent = item.tag;
  els.galleryModalTitle.textContent = item.title;
  els.galleryModalDescription.textContent = item.description;
  openModal('galleryModal');
}

function openModal(id) {
  const modal = document.getElementById(id);
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('is-locked');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  if (!els.adminShell.classList.contains('is-open')) {
    document.body.classList.remove('is-locked');
  }
}

function toggleMobileMenu() {
  const next = !els.mobileNav.classList.contains('is-open');
  els.mobileNav.classList.toggle('is-open', next);
  els.mobileMenuButton.setAttribute('aria-expanded', String(next));
}

function navigateTo(targetId) {
  const section = document.getElementById(targetId);
  if (!section) return;

  history.replaceState(null, '', `#${targetId}`);
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  els.mobileNav.classList.remove('is-open');
  els.mobileMenuButton.setAttribute('aria-expanded', 'false');
  syncActiveNavFromHash();
}

function syncActiveNavFromHash() {
  const hash = window.location.hash.replace('#', '') || detectCurrentSection();
  document.querySelectorAll('[data-nav-target]').forEach((node) => {
    node.classList.toggle('is-active', node.dataset.navTarget === hash);
  });
}

function detectCurrentSection() {
  const sections = [...document.querySelectorAll('.section-anchor')];
  for (let index = sections.length - 1; index >= 0; index -= 1) {
    if (window.scrollY + 120 >= sections[index].offsetTop) {
      return sections[index].id;
    }
  }
  return 'home';
}

function handleScroll() {
  els.siteHeader.classList.toggle('is-scrolled', window.scrollY > 8);
  syncActiveNavFromHash();
}

function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `remnant-site-data-${todayString().replace(/\./g, '-')}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
  showToast('데이터 JSON 내보내기 완료');
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => els.toast.classList.remove('is-visible'), 2400);
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/`/g, '&#96;');
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function todayString() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}
