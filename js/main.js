'use strict';

const STORAGE_KEYS = {
  draft: 'remnant-site-draft-v2',
  repo: 'remnant-site-repo-v2',
  adminOpen: 'remnant-site-admin-open'
};

const BRAND_NAME = '램넌트';
const CLUB_NAME = '램넌트 연구개발동아리';
const SCHOOL_NAME = '단국대학교부속소프트웨어고등학교';
const SCHOOL_SHORT = 'DKSH';
const ADMIN_PASSWORD = 'remnant2024';

const CATEGORY_LABELS = {
  work: '활동',
  team: '팀 작업',
  showcase: '발표'
};

const DEPARTMENT_LABELS = {
  game: '게임부',
  webapp: '웹앱부',
  hardware: '하드웨어부'
};

const TAB_LABELS = {
  copy: '기본 정보',
  projects: '프로젝트',
  departments: '부서',
  team: '부원',
  gallery: '갤러리',
  records: '기록',
  links: '연결',
  publish: '게시'
};

const FALLBACK_CONTENT = {
  site: {
    brandName: BRAND_NAME,
    teamName: CLUB_NAME,
    schoolName: SCHOOL_NAME,
    schoolShort: SCHOOL_SHORT,
    metaDescription: '단국대학교부속소프트웨어고등학교(DKSH) 램넌트 연구개발동아리',
    identityLabel: '동아리 정보',
    noticeLabel: '최근 안내',
    footerNote: '아이디어를 말로만 두지 않고, 직접 만들고 시험하고 발표합니다.'
  },
  hero: {
    eyebrow: 'DKSH 램넌트 연구개발동아리',
    title: '기획한 것을 실제로 구현해봅니다.',
    body: '램넌트 연구개발동아리는 단국대학교부속소프트웨어고등학교에서 아이디어를 기획하고, 만들고, 테스트하고, 발표까지 이어 가는 학생 동아리입니다.',
    primaryLabel: '최근 작업 보기',
    primaryTarget: 'projects',
    secondaryLabel: '부서 보기',
    secondaryTarget: 'departments'
  },
  stats: [
    { value: '', suffix: '명', label: '함께하는 인원' },
    { value: '', suffix: '건', label: '진행한 프로젝트' },
    { value: '', suffix: '건', label: '최근 공지' }
  ],
  intro: {
    eyebrow: '소개',
    title: '아이디어를 연구하고 직접 만들어봅니다.',
    body: '회의에서 나온 생각을 자료 조사로만 끝내지 않고, 시안과 프로토타입, 발표 자료, 실제 구현까지 이어 가며 동아리 안에서 함께 다뤄봅니다.',
    sideLabel: '운영 방식',
    sideTitle: '부서별로 만들고, 함께 점검합니다.',
    sideBody: '게임부, 웹앱부, 하드웨어부가 각자 맡은 주제를 진행하고 필요한 순간 같이 피드백합니다. 결과물은 기록으로 남겨 다음 작업의 출발점으로 삼습니다.',
    principles: [
      { title: '직접 구현합니다', body: '기획에서 끝내지 않고 화면, 코드, 회로, 플레이 테스트까지 손으로 옮겨 봅니다.' },
      { title: '과정을 남깁니다', body: '수정 기록과 발표 자료를 함께 정리해 다음 작업에 이어질 수 있게 남깁니다.' },
      { title: '현실적으로 다룹니다', body: '멋있어 보이는 말보다 지금 가능한 범위와 실제 결과를 더 또렷하게 적습니다.' }
    ]
  },
  departments: {
    eyebrow: '부서',
    title: '세 개의 부서로 움직입니다.',
    body: '게임부, 웹앱부, 하드웨어부가 각자 다른 방식으로 만들고 실험합니다. 필요한 순간에는 서로의 작업을 함께 검토합니다.',
    items: [
      {
        id: 'game',
        name: '게임부',
        summary: '기획한 규칙이 실제 플레이로 이어지는지 확인하는 부서입니다.',
        description: '게임의 콘셉트, 플레이 방식, 밸런스, 테스트 흐름을 함께 다룹니다. 짧은 프로토타입을 빠르게 만들고 직접 플레이하면서 수정합니다.',
        activity: '프로토타입 제작 · 플레이 테스트 · 기획 보드 정리'
      },
      {
        id: 'webapp',
        name: '웹앱부',
        summary: '아이디어를 웹 화면과 서비스 흐름으로 구현하는 부서입니다.',
        description: '정보 구조, 화면 설계, 프론트엔드 구현, 간단한 관리자 기능까지 맡아 실제로 동작하는 결과물을 만드는 데 집중합니다.',
        activity: '서비스 시안 · 웹 구현 · 관리자 화면 정리'
      },
      {
        id: 'hardware',
        name: '하드웨어부',
        summary: '센서와 부품을 직접 다루며 동작을 확인하는 부서입니다.',
        description: '아두이노와 각종 부품을 이용해 아이디어를 물리적인 결과물로 옮깁니다. 회로 연결과 테스트 과정을 반복하며 안정성을 확인합니다.',
        activity: '회로 구성 · 센서 테스트 · 동작 시연'
      }
    ]
  },
  projects: {
    eyebrow: '프로젝트',
    title: '최근에 다룬 작업',
    body: '어떤 아이디어를 어떤 방식으로 만들고 있는지 짧고 분명하게 정리했습니다.',
    items: [
      { id: 'project-pitch-board', year: '2026', status: '진행 중', title: '아이디어 피치 보드', summary: '팀별 아이디어를 한 장으로 정리해 발표와 피드백에 쓰는 보드 작업입니다.', detail: '문제 정의, 해결 방식, 예상 사용자, 발표 흐름이 한눈에 읽히도록 다듬고 있습니다.' },
      { id: 'project-school-service', year: '2025', status: '완료', title: '학교생활 서비스 시안', summary: '학교 안에서 불편한 흐름을 바탕으로 웹 서비스 화면과 사용 흐름을 정리한 프로젝트입니다.', detail: '아이디어 검토 후 화면 시안, 구현, 발표 자료까지 한 흐름으로 묶어 진행했습니다.' },
      { id: 'project-device-lab', year: '2025', status: '완료', title: '센서 실험 키트', summary: '하드웨어부에서 센서와 부품을 연결해 간단한 동작을 시험한 실험 프로젝트입니다.', detail: '회로 연결, 부품 선택, 반복 테스트를 통해 실제 시연 가능한 결과를 만드는 데 집중했습니다.' }
    ]
  },
  team: {
    eyebrow: '부원',
    title: '함께 연구하고 만드는 부원들',
    body: '각자 맡은 역할과 소속 부서를 함께 보여 주어, 동아리가 어떻게 움직이는지 한눈에 읽히도록 했습니다.',
    items: [
      { id: 'member-1', name: '김도윤', role: '기획', grade: '3학년', department: 'game', summary: '게임부에서 아이디어 방향을 잡고 발표 흐름과 기획 보드를 정리합니다.' },
      { id: 'member-2', name: '이서현', role: '프론트엔드', grade: '3학년', department: 'webapp', summary: '웹앱부에서 화면과 관리자 기능을 구현하고 동작을 점검합니다.' },
      { id: 'member-3', name: '박민재', role: '디자인', grade: '2학년', department: 'webapp', summary: '웹 시안과 발표 자료 비주얼을 맡아 화면 분위기를 정리합니다.' },
      { id: 'member-4', name: '최하린', role: '콘텐츠 정리', grade: '2학년', department: 'game', summary: '기획 설명, 공지, 발표용 문장을 다듬고 기록을 정리합니다.' },
      { id: 'member-5', name: '정현우', role: '하드웨어 제작', grade: '2학년', department: 'hardware', summary: '센서와 부품을 연결하고 동작 테스트를 반복하며 시연용 결과를 만듭니다.' },
      { id: 'member-6', name: '윤지호', role: '테스트', grade: '1학년', department: 'game', summary: '플레이 테스트와 피드백 정리를 맡아 규칙과 난이도를 함께 점검합니다.' }
    ]
  },
  gallery: {
    eyebrow: '갤러리',
    title: '활동 장면과 작업 기록',
    body: '회의, 제작, 테스트, 발표 준비처럼 동아리의 실제 움직임을 남기는 공간입니다.',
    items: [
      { id: 'gallery-1', title: '아이디어 회의', caption: '주제를 정하고 역할을 나누기 전, 방향을 같이 맞추는 시간입니다.', category: 'team', projectId: 'project-pitch-board', imageUrl: '', assetPath: '', featured: false },
      { id: 'gallery-2', title: '시안 점검', caption: '화면 구성과 문장을 같이 보면서 수정 포인트를 정리합니다.', category: 'work', projectId: 'project-school-service', imageUrl: '', assetPath: '', featured: true },
      { id: 'gallery-3', title: '중간 발표 준비', caption: '발표 순서와 자료 흐름을 마지막으로 확인하는 장면입니다.', category: 'showcase', projectId: 'project-pitch-board', imageUrl: '', assetPath: '', featured: false },
      { id: 'gallery-4', title: '센서 테스트', caption: '하드웨어부에서 부품 연결과 동작을 직접 확인하던 장면입니다.', category: 'work', projectId: 'project-device-lab', imageUrl: '', assetPath: '', featured: true }
    ]
  },
  history: {
    eyebrow: '기록',
    title: '동아리의 흐름',
    body: '무엇을 시작했고 어떻게 쌓였는지만 간단히 읽을 수 있게 정리했습니다.',
    items: [
      { id: 'history-1', year: '2023', title: '동아리 시작', description: '아이디어를 실제 작업으로 옮겨 보는 팀으로 첫 활동을 시작했습니다.' },
      { id: 'history-2', year: '2024', title: '첫 교내 발표 진행', description: '팀별 결과를 정리해 학교 안에서 직접 발표하고 피드백을 받았습니다.' },
      { id: 'history-3', year: '2026', title: '사이트와 기록 체계 정비', description: '카피, 구조, 관리자 흐름을 다시 손봐 운영 가능한 형태로 정리했습니다.' }
    ]
  },
  achievements: {
    eyebrow: '성과',
    title: '쌓아 온 결과',
    body: '대단해 보이기보다 실제로 해낸 일 중심으로 남겼습니다.',
    items: [
      { id: 'achievement-1', title: '교내 발표 운영', description: '아이디어와 결과를 학교 안에서 직접 설명하고 공유했습니다.', year: '2025' },
      { id: 'achievement-2', title: '서비스 시안 제작', description: '문제 정의부터 화면 시안, 발표 자료까지 한 흐름으로 정리했습니다.', year: '2025' },
      { id: 'achievement-3', title: '활동 기록 체계 정리', description: '사이트와 갤러리를 통해 작업과 공지를 꾸준히 남길 수 있게 했습니다.', year: '2026' }
    ]
  },
  notices: {
    eyebrow: '공지',
    title: '최근 안내',
    body: '필요한 내용만 빠르게 확인할 수 있게 정리했습니다.',
    items: [
      { id: 'notice-1', date: '2026.04.20', tag: '안내', title: '상반기 프로젝트 점검', summary: '팀별 진행 상황을 공유하고 다음 수정 항목을 정리합니다.' },
      { id: 'notice-2', date: '2026.04.12', tag: '모집', title: '신입 멤버 오리엔테이션', summary: '동아리 운영 방식과 기본 작업 흐름을 함께 안내합니다.' },
      { id: 'notice-3', date: '2026.04.01', tag: '업데이트', title: '사이트 정비 완료', summary: '카피, 섹션 구조, 관리자 흐름을 다시 손봤습니다.' }
    ]
  },
  contact: {
    eyebrow: '연결',
    title: '필요한 정보만 남겼습니다.',
    body: '학교 홈페이지, 대표 연락처, 운영 계정처럼 실제로 쓰는 연결만 둡니다.',
    items: [
      { id: 'contact-homepage', label: '학교 홈페이지', value: 'dankook.sen.hs.kr', href: 'http://dankook.sen.hs.kr', caption: '학교 공식 안내', visible: true, footerVisible: true },
      { id: 'contact-phone', label: '대표 전화', value: '02-2116-0115', href: 'tel:0221160115', caption: '학교 대표 번호', visible: true, footerVisible: false },
      { id: 'contact-instagram', label: 'Instagram', value: '', href: '', caption: '운영 계정을 연결하면 푸터와 연결 섹션에 함께 표시됩니다.', visible: false, footerVisible: true }
    ]
  },
  footer: {
    pagesLabel: 'Pages',
    connectLabel: 'Connect',
    accessLabel: 'Access',
    pages: [
      { label: '소개', target: 'about' },
      { label: '부서', target: 'departments' },
      { label: '프로젝트', target: 'projects' },
      { label: '부원', target: 'team' },
      { label: '갤러리', target: 'gallery' },
      { label: '공지', target: 'notices' }
    ]
  },
  admin: {
    github: {
      owner: '',
      repo: '',
      branch: 'main',
      contentPath: 'data/site-content.json',
      galleryDir: 'assets/gallery'
    }
  }
};

const state = {
  content: null,
  publishedContent: null,
  repoSettings: null,
  galleryFilter: '',
  galleryExpanded: {},
  galleryRandomIds: [],
  activeTab: 'copy',
  draftTimer: null,
  currentModal: null,
  revealObserver: null,
  pendingGalleryFiles: {},
  pendingGalleryPreviews: {},
  galleryMessages: {},
  gallerySaving: {}
};

const elements = {};

document.addEventListener('DOMContentLoaded', init);

async function init() {
  cacheElements();
  state.publishedContent = normalizeContent(await loadPublishedContent());
  state.content = loadDraftContent() || deepCopy(state.publishedContent);
  state.repoSettings = loadRepoSettings(state.content.admin?.github);

  bindGlobalEvents();
  renderAll();

  if (sessionStorage.getItem(STORAGE_KEYS.adminOpen) === '1') {
    openAdmin(false);
  }
}

async function loadPublishedContent() {
  try {
    const response = await fetch(`data/site-content.json?ts=${Date.now()}`, { cache: 'no-store' });
    if (!response.ok) throw new Error('failed');
    return await response.json();
  } catch (_) {
    return FALLBACK_CONTENT;
  }
}

function loadDraftContent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.draft);
    return raw ? normalizeContent(JSON.parse(raw)) : null;
  } catch (_) {
    return null;
  }
}

function loadRepoSettings(fallbackConfig) {
  const base = deepCopy(fallbackConfig || FALLBACK_CONTENT.admin.github);
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.repo);
    if (!raw) return { ...base, token: '' };
    return { ...base, ...JSON.parse(raw) };
  } catch (_) {
    return { ...base, token: '' };
  }
}

function cacheElements() {
  [
    'brandNameHeader', 'brandMetaHeader', 'footerBrandTitle', 'adminBrandTitle',
    'siteHeader', 'menuButton', 'mobileNav', 'heroEyebrow', 'heroTitle', 'heroBody',
    'heroPrimaryAction', 'heroSecondaryAction', 'heroStats', 'heroIdentity', 'heroLatestNotice',
    'heroIdentityLabel', 'heroLatestLabel',
    'introEyebrow', 'introTitle', 'introBody', 'introPrinciples', 'introSideLabel', 'introSideTitle',
    'introSideBody', 'departmentEyebrow', 'departmentTitle', 'departmentBody', 'departmentList',
    'projectEyebrow', 'projectTitle', 'projectBody', 'projectList', 'teamEyebrow',
    'teamTitle', 'teamBody', 'teamList', 'galleryEyebrow', 'galleryTitle', 'galleryBody',
    'galleryFilters', 'gallerySpotlightGrid', 'galleryProjectSummary', 'galleryGrid', 'galleryMore',
    'historyEyebrow', 'historyTitle', 'historyBody', 'timelineList',
    'achievementEyebrow', 'achievementTitle', 'achievementBody', 'achievementList', 'noticeEyebrow',
    'noticeTitle', 'noticeBody', 'noticeList', 'contactEyebrow', 'contactTitle', 'contactBody',
    'contactCards', 'footerNote', 'footerPagesLabel', 'footerConnectLabel', 'footerAccessLabel',
    'footerPageLinks', 'footerConnectLinks', 'adminEntryButton', 'loginModal', 'adminPassword',
    'loginFeedback', 'galleryModal', 'galleryModalImage', 'galleryModalCategory', 'galleryModalTitle',
    'galleryModalBody', 'adminShell', 'adminTabs', 'adminPanelTitle', 'adminPanelContent',
    'adminStatus', 'restorePublishedButton', 'adminCloseButton', 'toast'
  ].forEach((id) => {
    elements[id] = document.getElementById(id);
  });
}

function deepCopy(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizeContent(input) {
  const merged = mergeDeep(deepCopy(FALLBACK_CONTENT), input || {});
  merged.site.brandName = BRAND_NAME;
  merged.site.teamName = CLUB_NAME;
  merged.site.schoolName = SCHOOL_NAME;
  merged.site.schoolShort = SCHOOL_SHORT;
  merged.departments.items = (merged.departments.items || []).map((item) => ({
    id: item.id || uid('department'),
    name: item.name || '새 부서',
    summary: item.summary || '',
    description: item.description || '',
    activity: item.activity || ''
  }));
  merged.team.items = (merged.team.items || []).map((item) => ({
    id: item.id || uid('member'),
    name: item.name || '새 팀원',
    role: item.role || '역할',
    grade: item.grade || '학년',
    department: item.department || merged.departments.items[0]?.id || '',
    summary: item.summary || ''
  }));
  merged.gallery.items = (merged.gallery.items || []).map((item) => ({
    id: item.id || uid('gallery'),
    title: item.title || '새 활동 이미지',
    caption: item.caption || '',
    category: item.category || 'work',
    projectId: resolveGalleryProjectId(item.projectId, merged.projects.items, item.id),
    imageUrl: item.imageUrl || '',
    assetPath: item.assetPath || '',
    featured: Boolean(item.featured)
  }));
  if (!merged.footer.pages.some((item) => item.target === 'departments')) {
    merged.footer.pages.splice(1, 0, { label: '부서', target: 'departments' });
  }
  return merged;
}

function mergeDeep(base, source) {
  if (!source || typeof source !== 'object' || Array.isArray(source)) return base;

  Object.keys(source).forEach((key) => {
    const sourceValue = source[key];
    if (Array.isArray(sourceValue)) {
      base[key] = sourceValue;
      return;
    }
    if (sourceValue && typeof sourceValue === 'object') {
      base[key] = mergeDeep(base[key] || {}, sourceValue);
      return;
    }
    base[key] = sourceValue;
  });

  return base;
}

function bindGlobalEvents() {
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('hashchange', updateActiveLinks);

  document.addEventListener('click', handleDocumentClick);
  document.addEventListener('input', handleFieldInput);
  document.addEventListener('change', handleFieldInput);
  document.addEventListener('keydown', handleKeydown);

  [elements.loginModal, elements.galleryModal].forEach((modal) => {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeModal(modal.id);
    });
  });
}

function renderAll() {
  renderPublicContent();
  renderAdminTabs();
  renderAdminPanel();
  handleScroll();
}

function renderPublicContent() {
  renderSiteIdentity();
  renderHero();
  renderIntro();
  renderDepartments();
  renderProjects();
  renderTeam();
  renderGalleryFilters();
  renderGallery();
  renderHistory();
  renderAchievements();
  renderNotices();
  renderContact();
  renderFooter();
  setupRevealElements();
  updateActiveLinks();
}

function renderSiteIdentity() {
  const { site } = state.content;
  text(elements.brandNameHeader, `${site.brandName} | ${site.schoolShort}`);
  text(elements.brandMetaHeader, site.teamName);
  text(elements.footerBrandTitle, site.teamName);
  text(elements.adminBrandTitle, `${site.brandName} 운영 화면`);
}

function renderHero() {
  const { hero, site, notices, departments } = state.content;
  const latest = notices.items[0];
  const stats = buildHeroStats();

  text(elements.heroEyebrow, hero.eyebrow);
  text(elements.heroTitle, hero.title);
  text(elements.heroBody, hero.body);
  text(elements.heroPrimaryAction, hero.primaryLabel);
  elements.heroPrimaryAction.setAttribute('href', `#${hero.primaryTarget}`);
  elements.heroPrimaryAction.dataset.scrollTarget = hero.primaryTarget;
  text(elements.heroSecondaryAction, hero.secondaryLabel);
  elements.heroSecondaryAction.setAttribute('href', `#${hero.secondaryTarget}`);
  elements.heroSecondaryAction.dataset.scrollTarget = hero.secondaryTarget;
  text(elements.heroIdentityLabel, site.identityLabel);
  text(elements.heroLatestLabel, site.noticeLabel);

  elements.heroStats.innerHTML = stats.length
    ? stats.map((item) => `
      <article class="hero-stat" data-reveal-group="hero-stat">
        <strong>${escapeHtml(item.value)}<span>${escapeHtml(item.suffix)}</span></strong>
        <p>${escapeHtml(item.label)}</p>
      </article>
    `).join('')
    : `<div class="empty-state">표시할 지표가 없습니다.</div>`;

  elements.heroIdentity.innerHTML = `
    <div class="identity-row"><span>동아리</span><strong>${escapeHtml(site.teamName)}</strong></div>
    <div class="identity-row"><span>학교</span><strong>${escapeHtml(site.schoolName)}</strong></div>
    <div class="identity-row"><span>구성</span><strong>${escapeHtml(departments.items.map((item) => item.name).join(' · '))}</strong></div>
  `;

  elements.heroLatestNotice.innerHTML = latest
    ? `<span>${escapeHtml(latest.date)} · ${escapeHtml(latest.tag)}</span><strong>${escapeHtml(latest.title)}</strong><p>${escapeHtml(latest.summary)}</p>`
    : '<div class="empty-state">표시할 공지가 없습니다.</div>';

  document.title = `${site.brandName} | ${site.schoolShort}`;
  document.querySelector('meta[name="description"]').setAttribute('content', site.metaDescription);
  document.querySelector('meta[property="og:title"]').setAttribute('content', `${site.brandName} | ${site.schoolShort}`);
  document.querySelector('meta[property="og:description"]').setAttribute('content', site.metaDescription);
}

function renderIntro() {
  const { intro } = state.content;
  text(elements.introEyebrow, intro.eyebrow);
  text(elements.introTitle, intro.title);
  text(elements.introBody, intro.body);
  text(elements.introSideLabel, intro.sideLabel);
  text(elements.introSideTitle, intro.sideTitle);
  text(elements.introSideBody, intro.sideBody);

  elements.introPrinciples.innerHTML = intro.principles.length
    ? intro.principles.map((item) => `
      <article class="principle-item" data-reveal-group="intro-principle">
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.body)}</p>
      </article>
    `).join('')
    : '<div class="empty-state">운영 원칙이 아직 정리되지 않았습니다.</div>';
}

function renderProjects() {
  const { projects } = state.content;
  text(elements.projectEyebrow, projects.eyebrow);
  text(elements.projectTitle, projects.title);
  text(elements.projectBody, projects.body);

  elements.projectList.innerHTML = projects.items.length
    ? projects.items.map((item) => `
      <article class="project-item" data-reveal-group="project-item">
        <div class="project-year">${escapeHtml(item.year)}</div>
        <div>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.summary)}</p>
        </div>
        <div class="project-meta">
          <span class="status-badge ${item.status === '진행 중' ? 'is-live' : ''}">${escapeHtml(item.status)}</span>
          <p class="project-detail">${escapeHtml(item.detail)}</p>
        </div>
      </article>
    `).join('')
    : '<div class="empty-state">등록된 프로젝트가 없습니다.</div>';
}

function renderDepartments() {
  const { departments, team } = state.content;
  text(elements.departmentEyebrow, departments.eyebrow);
  text(elements.departmentTitle, departments.title);
  text(elements.departmentBody, departments.body);

  elements.departmentList.innerHTML = departments.items.length
    ? departments.items.map((item) => {
      const members = team.items.filter((member) => member.department === item.id);
      const count = String(members.length).padStart(2, '0');
      return `
        <article class="department-card" data-reveal-group="department-card">
          <div class="department-head">
            <div>
              <strong class="department-name">${escapeHtml(item.name)}</strong>
              <p class="department-summary">${escapeHtml(item.summary)}</p>
            </div>
            <span class="department-count">
              <span class="count">${escapeHtml(count)}</span>
              <span class="count-unit">명</span>
            </span>
          </div>
          <p class="department-body">${escapeHtml(item.description)}</p>
          <div class="department-meta">
            <span class="department-meta-label">주요 작업</span>
            <p>${escapeHtml(item.activity)}</p>
          </div>
          <div class="department-members">
            <span class="department-meta-label">함께하는 부원</span>
            <div class="department-member-list">
              ${members.length
                ? members.map((member) => `<span>${escapeHtml(member.name)} · ${escapeHtml(member.role)}</span>`).join('')
                : '<span class="department-member-empty">아직 배정된 인원이 없습니다. 곧 추가될 예정입니다.</span>'}
            </div>
          </div>
        </article>
      `;
    }).join('')
    : '<div class="empty-state">등록된 부서가 없습니다.</div>';
}

function renderTeam() {
  const { team } = state.content;
  text(elements.teamEyebrow, team.eyebrow);
  text(elements.teamTitle, team.title);
  text(elements.teamBody, team.body);

  elements.teamList.innerHTML = team.items.length
    ? team.items.map((item, index) => `
      <article class="team-item" data-reveal-group="team-item">
        <div class="team-index">${String(index + 1).padStart(2, '0')}</div>
        <div class="team-main">
          <div class="team-head">
            <h3>${escapeHtml(item.name)}</h3>
            <div class="team-grade">${escapeHtml(item.grade)}</div>
          </div>
          <div class="team-meta-row">
            <p class="team-role">${escapeHtml(item.role)}</p>
            <span class="team-department">${escapeHtml(departmentLabel(item.department))}</span>
          </div>
          <p class="team-summary">${escapeHtml(item.summary)}</p>
        </div>
      </article>
    `).join('')
    : '<div class="empty-state">등록된 팀원이 없습니다.</div>';
}

function renderGalleryFilters() {
  const projects = state.content.projects.items || [];
  if (!projects.some((item) => item.id === state.galleryFilter)) {
    state.galleryFilter = projects[0]?.id || '';
  }

  text(elements.galleryEyebrow, state.content.gallery.eyebrow);
  text(elements.galleryTitle, state.content.gallery.title);
  text(elements.galleryBody, state.content.gallery.body);

  elements.galleryFilters.innerHTML = projects.map((project) => `
    <button class="gallery-filter ${project.id === state.galleryFilter ? 'is-active' : ''}" data-gallery-filter="${escapeAttr(project.id)}">
      ${escapeHtml(project.title)}
    </button>
  `).join('');
}

function renderGallery() {
  renderGallerySpotlight();
  renderProjectGallery();
}

function renderGallerySpotlight() {
  const items = randomGalleryItems();
  elements.gallerySpotlightGrid.innerHTML = items.length
    ? items.map((item) => renderGalleryCard(item, 'gallery-spotlight')).join('')
    : '<div class="empty-state">표시할 랜덤 갤러리가 아직 없습니다.</div>';
}

function renderProjectGallery() {
  const project = selectedGalleryProject();
  const items = projectGalleryItems(project?.id);
  const limit = 6;
  const expanded = Boolean(state.galleryExpanded[project?.id || '']);
  const visibleItems = expanded ? items : items.slice(0, limit);

  text(
    elements.galleryProjectSummary,
    project
      ? `${project.title}와 연결된 기록 ${items.length}개를 모아 봅니다.`
      : '프로젝트를 먼저 등록하면 연결된 갤러리를 여기에서 볼 수 있습니다.'
  );

  elements.galleryGrid.innerHTML = visibleItems.length
    ? visibleItems.map((item) => renderGalleryCard(item, 'gallery-item')).join('')
    : '<div class="empty-state">이 프로젝트에 연결된 갤러리가 아직 없습니다.</div>';

  if (!project || items.length <= limit) {
    elements.galleryMore.innerHTML = '';
    return;
  }

  elements.galleryMore.innerHTML = `
    <button class="button button-secondary" data-gallery-more="${escapeAttr(project.id)}">
      ${expanded ? '접기' : '자세히 보기'}
    </button>
  `;
}

function renderGalleryCard(item, revealGroup) {
  const project = projectById(item.projectId);
  return `
    <article class="gallery-item" data-reveal-group="${escapeAttr(revealGroup)}">
      <button class="gallery-button" data-gallery-open="${escapeAttr(item.id)}">
        <div class="gallery-image ${item.featured ? 'is-featured' : ''}">
          ${item.imageUrl
            ? `<img src="${escapeAttr(item.imageUrl)}" alt="${escapeAttr(item.title)}">`
            : `<span>이미지를 등록하면 이 영역에 바로 반영됩니다.</span>`}
        </div>
        <div class="gallery-copy">
          <div class="gallery-tags">
            <span class="gallery-tag gallery-tag-project">${escapeHtml(project?.title || '연결 전')}</span>
            <span class="gallery-tag">${escapeHtml(categoryLabel(item.category))}</span>
          </div>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.caption)}</p>
        </div>
      </button>
    </article>
  `;
}

function renderHistory() {
  const { history } = state.content;
  text(elements.historyEyebrow, history.eyebrow);
  text(elements.historyTitle, history.title);
  text(elements.historyBody, history.body);

  elements.timelineList.innerHTML = history.items.length
    ? history.items.map((item) => `
      <article class="timeline-item" data-reveal-group="timeline-item">
        <span class="timeline-year">${escapeHtml(item.year)}</span>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.description)}</p>
      </article>
    `).join('')
    : '<div class="empty-state">등록된 기록이 없습니다.</div>';
}

function renderAchievements() {
  const { achievements } = state.content;
  text(elements.achievementEyebrow, achievements.eyebrow);
  text(elements.achievementTitle, achievements.title);
  text(elements.achievementBody, achievements.body);

  elements.achievementList.innerHTML = achievements.items.length
    ? achievements.items.map((item) => `
      <article class="achievement-item" data-reveal-group="achievement-item">
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.description)}</p>
        <strong>${escapeHtml(item.year)}</strong>
      </article>
    `).join('')
    : '<div class="empty-state">등록된 성과가 없습니다.</div>';
}

function renderNotices() {
  const { notices } = state.content;
  text(elements.noticeEyebrow, notices.eyebrow);
  text(elements.noticeTitle, notices.title);
  text(elements.noticeBody, notices.body);

  elements.noticeList.innerHTML = notices.items.length
    ? notices.items.map((item) => `
      <article class="notice-item" data-reveal-group="notice-item">
        <div class="notice-item-head">
          <span class="notice-date">${escapeHtml(item.date)}</span>
          <span class="notice-tag">${escapeHtml(item.tag)}</span>
        </div>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.summary)}</p>
      </article>
    `).join('')
    : '<div class="empty-state">등록된 공지가 없습니다.</div>';
}

function renderContact() {
  const { contact } = state.content;
  text(elements.contactEyebrow, contact.eyebrow);
  text(elements.contactTitle, contact.title);
  text(elements.contactBody, contact.body);

  const visibleItems = contact.items.filter((item) => item.visible && item.href);
  elements.contactCards.innerHTML = visibleItems.length
    ? visibleItems.map((item) => `
      <a class="contact-card" href="${escapeAttr(item.href)}" ${isExternal(item.href) ? 'target="_blank" rel="noreferrer"' : ''} data-reveal-group="contact-card">
        <div class="contact-card-meta">
          <p class="card-label">${escapeHtml(item.label)}</p>
          <strong>${escapeHtml(item.value)}</strong>
          <p>${escapeHtml(item.caption)}</p>
        </div>
        <span class="contact-card-value">바로가기</span>
      </a>
    `).join('')
    : '<div class="empty-state">표시할 연결 정보가 없습니다.</div>';
}

function renderFooter() {
  const { footer, contact, site } = state.content;
  text(elements.footerNote, site.footerNote);
  text(elements.footerPagesLabel, footer.pagesLabel);
  text(elements.footerConnectLabel, footer.connectLabel);
  text(elements.footerAccessLabel, footer.accessLabel);

  elements.footerPageLinks.innerHTML = footer.pages.map((item) => `
    <a href="#${escapeAttr(item.target)}" data-scroll-target="${escapeAttr(item.target)}">${escapeHtml(item.label)}</a>
  `).join('');

  const connectItems = contact.items.filter((item) => item.footerVisible && item.href);
  elements.footerConnectLinks.innerHTML = connectItems.length
    ? connectItems.map((item) => `
      <a href="${escapeAttr(item.href)}" ${isExternal(item.href) ? 'target="_blank" rel="noreferrer"' : ''}>${escapeHtml(item.label)}</a>
    `).join('')
    : '<span class="empty-state">표시할 외부 링크가 없습니다.</span>';
}

function buildHeroStats() {
  const { team, projects, notices } = state.content;
  const labels = state.content.stats || [];
  return [
    {
      value: String(team.items.length).padStart(2, '0'),
      suffix: '명',
      label: labels[0]?.label || '함께하는 인원'
    },
    {
      value: String(projects.items.length).padStart(2, '0'),
      suffix: '건',
      label: labels[1]?.label || '진행한 프로젝트'
    },
    {
      value: String(notices.items.length).padStart(2, '0'),
      suffix: '건',
      label: labels[2]?.label || '최근 공지'
    }
  ];
}

function setupRevealElements() {
  if (state.revealObserver) {
    state.revealObserver.disconnect();
  }

  const elementsToReveal = [
    ...document.querySelectorAll('.section-head, .hero-aside-card, .intro-side-card, [data-reveal-group]')
  ];

  const groupedCounts = new Map();
  elementsToReveal.forEach((node) => {
    const group = node.dataset.revealGroup || node.className;
    const index = groupedCounts.get(group) || 0;
    groupedCounts.set(group, index + 1);
    node.classList.add('reveal-on-scroll');
    node.style.setProperty('--reveal-delay', `${index * 0.05}s`);
  });

  state.revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      state.revealObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.16,
    rootMargin: '0px 0px -48px 0px'
  });

  elementsToReveal.forEach((node) => state.revealObserver.observe(node));
}

function renderAdminTabs() {
  const tabs = Object.entries(TAB_LABELS).map(([id, label]) => `
    <button class="admin-tab ${state.activeTab === id ? 'is-active' : ''}" data-admin-tab="${id}">
      <span>${escapeHtml(label)}</span>
      <span>→</span>
    </button>
  `).join('');
  elements.adminTabs.innerHTML = tabs;
}

function renderAdminPanel() {
  const titles = {
    copy: '기본 정보와 카피',
    projects: '프로젝트 목록',
    departments: '부서 구성',
    team: '부원 정보',
    gallery: '갤러리 관리',
    records: '기록, 성과, 공지',
    links: '연결 정보와 푸터',
    publish: 'GitHub 게시 설정'
  };

  text(elements.adminPanelTitle, titles[state.activeTab]);
  updateAdminStatus();

  const renderers = {
    copy: renderCopyAdmin,
    projects: renderProjectsAdmin,
    departments: renderDepartmentsAdmin,
    team: renderTeamAdmin,
    gallery: renderGalleryAdmin,
    records: renderRecordsAdmin,
    links: renderLinksAdmin,
    publish: renderPublishAdmin
  };

  elements.adminPanelContent.innerHTML = renderers[state.activeTab]();
}

function renderCopyAdmin() {
  const { site, hero, intro, departments, projects, team, gallery, history, achievements, notices, contact, footer } = state.content;
  return `
    <section class="admin-card">
      <h4>브랜드 기준</h4>
      <p>학교명과 약칭은 고정합니다. 잘못된 표기를 막기 위한 안전 장치입니다.</p>
      <div class="admin-grid">
        ${readonlyField('학교명', site.schoolName)}
        ${readonlyField('약칭', site.schoolShort)}
        ${readonlyField('동아리명', site.teamName)}
        ${readonlyField('브랜드명', site.brandName)}
        ${textField('메타 설명', 'site.metaDescription', site.metaDescription)}
        ${textField('정보 카드 라벨', 'site.identityLabel', site.identityLabel)}
        ${textField('최근 안내 라벨', 'site.noticeLabel', site.noticeLabel)}
      </div>
      ${textareaField('푸터 문장', 'site.footerNote', site.footerNote)}
    </section>

    <section class="admin-card">
      <h4>Hero</h4>
      <div class="admin-grid">
        ${textField('오버라인', 'hero.eyebrow', hero.eyebrow)}
        ${textField('주 버튼 라벨', 'hero.primaryLabel', hero.primaryLabel)}
        ${textField('보조 버튼 라벨', 'hero.secondaryLabel', hero.secondaryLabel)}
        ${textField('주 버튼 대상', 'hero.primaryTarget', hero.primaryTarget)}
        ${textField('보조 버튼 대상', 'hero.secondaryTarget', hero.secondaryTarget)}
      </div>
      ${textareaField('제목', 'hero.title', hero.title)}
      ${textareaField('설명', 'hero.body', hero.body)}
    </section>

    <section class="admin-card">
      <h4>섹션 제목</h4>
      <div class="admin-grid">
        ${textField('소개 오버라인', 'intro.eyebrow', intro.eyebrow)}
        ${textField('소개 제목', 'intro.title', intro.title)}
        ${textField('부서 오버라인', 'departments.eyebrow', departments.eyebrow)}
        ${textField('부서 제목', 'departments.title', departments.title)}
        ${textField('프로젝트 오버라인', 'projects.eyebrow', projects.eyebrow)}
        ${textField('프로젝트 제목', 'projects.title', projects.title)}
        ${textField('부원 오버라인', 'team.eyebrow', team.eyebrow)}
        ${textField('부원 제목', 'team.title', team.title)}
        ${textField('갤러리 오버라인', 'gallery.eyebrow', gallery.eyebrow)}
        ${textField('갤러리 제목', 'gallery.title', gallery.title)}
        ${textField('기록 오버라인', 'history.eyebrow', history.eyebrow)}
        ${textField('기록 제목', 'history.title', history.title)}
        ${textField('성과 오버라인', 'achievements.eyebrow', achievements.eyebrow)}
        ${textField('성과 제목', 'achievements.title', achievements.title)}
        ${textField('공지 오버라인', 'notices.eyebrow', notices.eyebrow)}
        ${textField('공지 제목', 'notices.title', notices.title)}
        ${textField('연결 오버라인', 'contact.eyebrow', contact.eyebrow)}
        ${textField('연결 제목', 'contact.title', contact.title)}
        ${textField('푸터 Pages 라벨', 'footer.pagesLabel', footer.pagesLabel)}
        ${textField('푸터 Connect 라벨', 'footer.connectLabel', footer.connectLabel)}
        ${textField('푸터 Access 라벨', 'footer.accessLabel', footer.accessLabel)}
      </div>
      ${textareaField('소개 본문', 'intro.body', intro.body)}
      ${textareaField('부서 본문', 'departments.body', departments.body)}
      ${textareaField('프로젝트 본문', 'projects.body', projects.body)}
      ${textareaField('부원 본문', 'team.body', team.body)}
      ${textareaField('갤러리 본문', 'gallery.body', gallery.body)}
      ${textareaField('기록 본문', 'history.body', history.body)}
      ${textareaField('성과 본문', 'achievements.body', achievements.body)}
      ${textareaField('공지 본문', 'notices.body', notices.body)}
      ${textareaField('연결 본문', 'contact.body', contact.body)}
      ${textField('운영 방식 라벨', 'intro.sideLabel', intro.sideLabel)}
      ${textField('운영 방식 제목', 'intro.sideTitle', intro.sideTitle)}
      ${textareaField('운영 방식 설명', 'intro.sideBody', intro.sideBody)}
    </section>

    <section class="admin-card">
      <div class="admin-row-head">
        <div>
          <h4>지표</h4>
          <p>숫자는 실제 데이터로 자동 계산되고, 여기서는 단위와 라벨만 조정합니다.</p>
        </div>
      </div>
      <div class="admin-grid">
        ${(state.content.stats || []).slice(0, 3).map((item, index) => `
          <article class="admin-row admin-row-static">
            <strong>${escapeHtml(item.label || `지표 ${index + 1}`)}</strong>
            <p class="field-note">부원, 프로젝트, 공지 데이터와 자동으로 연결됩니다.</p>
            ${textField('단위', `stats.${index}.suffix`, item.suffix)}
            ${textField('라벨', `stats.${index}.label`, item.label)}
          </article>
        `).join('')}
      </div>
    </section>

    <section class="admin-card">
      <div class="admin-row-head">
        <div>
          <h4>소개 원칙</h4>
          <p>소개 섹션의 짧은 원칙 문장을 편집합니다.</p>
        </div>
        <button class="button button-secondary" data-action="add-item" data-collection="intro.principles">원칙 추가</button>
      </div>
      <div class="admin-collection">
        ${renderCollection('intro.principles', state.content.intro.principles, (item, index) => `
          ${textField('제목', `intro.principles.${index}.title`, item.title)}
          ${textareaField('설명', `intro.principles.${index}.body`, item.body)}
        `)}
      </div>
    </section>
  `;
}

function renderProjectsAdmin() {
  return renderCollectionCard('프로젝트', '무엇을 하는 작업인지와 진행 상태를 함께 적습니다.', 'projects.items', state.content.projects.items, '프로젝트 추가', (item, index) => `
    <div class="admin-grid">
      ${textField('연도', `projects.items.${index}.year`, item.year)}
      ${textField('상태', `projects.items.${index}.status`, item.status)}
    </div>
    ${textField('제목', `projects.items.${index}.title`, item.title)}
    ${textareaField('요약', `projects.items.${index}.summary`, item.summary)}
    ${textareaField('상세 설명', `projects.items.${index}.detail`, item.detail)}
  `);
}

function renderDepartmentsAdmin() {
  return renderCollectionCard('부서', '세 부서의 소개 문구와 주요 작업을 관리합니다.', 'departments.items', state.content.departments.items, '부서 추가', (item, index) => `
    ${textField('부서명', `departments.items.${index}.name`, item.name)}
    ${textareaField('한 줄 소개', `departments.items.${index}.summary`, item.summary)}
    ${textareaField('설명', `departments.items.${index}.description`, item.description)}
    ${textField('주요 작업', `departments.items.${index}.activity`, item.activity)}
  `);
}

function renderTeamAdmin() {
  return renderCollectionCard('부원', '부원 이름과 주로 맡는 일을 정리합니다.', 'team.items', state.content.team.items, '부원 추가', (item, index) => `
    <div class="admin-grid">
      ${textField('이름', `team.items.${index}.name`, item.name)}
      ${textField('역할', `team.items.${index}.role`, item.role)}
      ${textField('학년', `team.items.${index}.grade`, item.grade)}
      ${selectField('소속 부서', `team.items.${index}.department`, item.department, state.content.departments.items.map((department) => ({
        value: department.id,
        label: department.name
      })))}
    </div>
    ${textareaField('설명', `team.items.${index}.summary`, item.summary)}
  `);
}

function renderGalleryAdmin() {
  return `
    <section class="admin-card">
      <h4>갤러리 저장 방식</h4>
      <p>각 항목 안에서 이미지 파일을 고르고 저장하면 GitHub 저장소로 바로 업로드됩니다. 링크를 따로 붙여넣는 흐름은 쓰지 않습니다.</p>
    </section>

    ${renderCollectionCard('갤러리 항목', '제목, 캡션, 분류, 이미지 파일을 한 곳에서 함께 관리합니다.', 'gallery.items', state.content.gallery.items, '갤러리 항목 추가', (item, index) => {
      const previewUrl = state.pendingGalleryPreviews[item.id] || item.imageUrl;
      const pendingFile = state.pendingGalleryFiles[item.id];
      const message = state.galleryMessages[item.id];
      const isSaving = Boolean(state.gallerySaving[item.id]);
      return `
        <div class="gallery-preview">
          ${previewUrl ? `<img src="${escapeAttr(previewUrl)}" alt="${escapeAttr(item.title)}">` : '<span>이미지 파일을 선택하면 이 영역에서 바로 확인할 수 있습니다.</span>'}
        </div>
        <div class="admin-grid">
          ${textField('제목', `gallery.items.${index}.title`, item.title)}
          ${selectField('연결 프로젝트', `gallery.items.${index}.projectId`, item.projectId, state.content.projects.items.map((project) => ({
            value: project.id,
            label: project.title
          })))}
          ${selectField('분류', `gallery.items.${index}.category`, item.category, [
            { value: 'work', label: '활동' },
            { value: 'team', label: '팀 작업' },
            { value: 'showcase', label: '발표' }
          ])}
          ${textField('캡션', `gallery.items.${index}.caption`, item.caption)}
          ${checkboxField('큰 이미지로 노출', `gallery.items.${index}.featured`, item.featured)}
        </div>
        <label class="upload-field">
          <span class="field-label">이미지 파일</span>
          <input class="field-input" type="file" accept="image/*" data-gallery-file="${escapeAttr(item.id)}">
        </label>
        <p class="field-note">${escapeHtml(
          pendingFile
            ? `${pendingFile.name} 파일을 선택했습니다. 저장하면 GitHub에 업로드됩니다.`
            : '새 이미지를 올리려면 파일을 고른 뒤 저장하세요. 이미지를 바꾸지 않으면 기존 파일을 그대로 유지합니다.'
        )}</p>
        ${message ? `<p class="field-feedback ${message.type === 'error' ? 'is-error' : ''}">${escapeHtml(message.text)}</p>` : ''}
        ${readonlyField('저장 경로', item.assetPath || '아직 없습니다.')}
        ${readonlyField('공개 주소', item.imageUrl || '아직 없습니다.')}
        <div class="admin-actions">
          <button class="button button-primary" data-action="save-gallery-item" data-item-id="${escapeAttr(item.id)}" ${isSaving ? 'disabled' : ''}>
            ${isSaving ? '저장 중...' : '항목 저장'}
          </button>
        </div>
      `;
    })}
  `;
}

function renderRecordsAdmin() {
  return `
    ${renderCollectionCard('연혁', '언제 어떤 흐름이 있었는지 시간 순서대로 정리합니다.', 'history.items', state.content.history.items, '연혁 추가', (item, index) => `
      <div class="admin-grid">
        ${textField('연도', `history.items.${index}.year`, item.year)}
        ${textField('제목', `history.items.${index}.title`, item.title)}
      </div>
      ${textareaField('설명', `history.items.${index}.description`, item.description)}
    `)}

    ${renderCollectionCard('성과', '실제로 해낸 일을 짧고 분명하게 적습니다.', 'achievements.items', state.content.achievements.items, '성과 추가', (item, index) => `
      <div class="admin-grid">
        ${textField('연도', `achievements.items.${index}.year`, item.year)}
        ${textField('제목', `achievements.items.${index}.title`, item.title)}
      </div>
      ${textareaField('설명', `achievements.items.${index}.description`, item.description)}
    `)}

    ${renderCollectionCard('공지', '운영 정보와 업데이트를 관리합니다.', 'notices.items', state.content.notices.items, '공지 추가', (item, index) => `
      <div class="admin-grid">
        ${textField('날짜', `notices.items.${index}.date`, item.date)}
        ${textField('태그', `notices.items.${index}.tag`, item.tag)}
      </div>
      ${textField('제목', `notices.items.${index}.title`, item.title)}
      ${textareaField('요약', `notices.items.${index}.summary`, item.summary)}
    `)}
  `;
}

function renderLinksAdmin() {
  return `
    <section class="admin-card">
      <h4>푸터 메뉴</h4>
      <p>푸터에서 바로 가는 섹션 이름과 순서를 관리합니다.</p>
      <div class="admin-actions">
        <button class="button button-secondary" data-action="add-item" data-collection="footer.pages">링크 추가</button>
      </div>
      <div class="admin-collection">
        ${renderCollection('footer.pages', state.content.footer.pages, (item, index) => `
          ${textField('라벨', `footer.pages.${index}.label`, item.label)}
          ${textField('섹션 ID', `footer.pages.${index}.target`, item.target)}
        `)}
      </div>
    </section>

    <section class="admin-card">
      <h4>연결 정보</h4>
      <p>학교 홈페이지, 대표 전화, Instagram 같은 실제 연결 정보를 관리합니다.</p>
      <div class="admin-actions">
        <button class="button button-secondary" data-action="add-item" data-collection="contact.items">연결 정보 추가</button>
      </div>
      <div class="admin-collection">
        ${renderCollection('contact.items', state.content.contact.items, (item, index) => `
          <div class="admin-grid">
            ${textField('라벨', `contact.items.${index}.label`, item.label)}
            ${textField('표시값', `contact.items.${index}.value`, item.value)}
            ${textField('링크', `contact.items.${index}.href`, item.href)}
          </div>
          ${textareaField('보조 설명', `contact.items.${index}.caption`, item.caption)}
          <div class="admin-grid">
            ${checkboxField('연결 섹션에 노출', `contact.items.${index}.visible`, item.visible)}
            ${checkboxField('푸터 Connect에 노출', `contact.items.${index}.footerVisible`, item.footerVisible)}
          </div>
        `)}
      </div>
    </section>
  `;
}

function renderPublishAdmin() {
  const repo = state.repoSettings;
  return `
    <section class="admin-card">
      <h4>게시 저장소</h4>
      <p>토큰은 이 브라우저에만 저장합니다. 게시를 누르면 콘텐츠 JSON과 갤러리 이미지가 같은 저장소 기준으로 반영됩니다.</p>
      <div class="admin-grid">
        ${textField('Owner', 'repo.owner', repo.owner, true)}
        ${textField('Repository', 'repo.repo', repo.repo, true)}
        ${textField('Branch', 'repo.branch', repo.branch, true)}
        ${textField('콘텐츠 경로', 'repo.contentPath', repo.contentPath, true)}
        ${textField('갤러리 폴더', 'repo.galleryDir', repo.galleryDir, true)}
        ${textField('GitHub Token', 'repo.token', repo.token, true, 'password')}
      </div>
      <div class="admin-actions">
        <button class="button button-secondary" data-action="save-repo">GitHub 설정 저장</button>
        <button class="button button-primary" data-action="publish-content">GitHub에 게시</button>
      </div>
    </section>

    <section class="admin-card">
      <h4>현재 상태</h4>
      <p>로컬 미리보기는 입력 즉시 저장됩니다. 게시 전까지는 이 브라우저에서만 유지됩니다.</p>
      <div class="empty-state">${escapeHtml(buildPublishStatusText())}</div>
    </section>
  `;
}

function renderCollectionCard(title, description, collectionPath, items, addLabel, bodyRenderer) {
  return `
    <section class="admin-card">
      <div class="admin-row-head">
        <div>
          <h4>${escapeHtml(title)}</h4>
          <p>${escapeHtml(description)}</p>
        </div>
        <button class="button button-secondary" data-action="add-item" data-collection="${escapeAttr(collectionPath)}">${escapeHtml(addLabel)}</button>
      </div>
      <div class="admin-collection">
        ${renderCollection(collectionPath, items, bodyRenderer)}
      </div>
    </section>
  `;
}

function renderCollection(collectionPath, items, bodyRenderer) {
  if (!items.length) {
    return '<div class="empty-state">아직 등록된 항목이 없습니다.</div>';
  }

  return items.map((item, index) => `
    <article class="admin-row">
      <div class="admin-row-head">
        <strong>${escapeHtml(item.title || item.name || item.label || `${collectionPath} ${index + 1}`)}</strong>
        <div class="gallery-order">
          <button class="button button-secondary" data-action="move-up" data-collection="${escapeAttr(collectionPath)}" data-index="${index}">위로</button>
          <button class="button button-secondary" data-action="move-down" data-collection="${escapeAttr(collectionPath)}" data-index="${index}">아래로</button>
          <button class="button button-danger" data-action="remove-item" data-collection="${escapeAttr(collectionPath)}" data-index="${index}">삭제</button>
        </div>
      </div>
      ${bodyRenderer(item, index)}
    </article>
  `).join('');
}

function textField(label, path, value, repoField = false, type = 'text') {
  const dataAttr = repoField ? `data-repo-field="${escapeAttr(path.split('.').pop())}"` : `data-path="${escapeAttr(path)}"`;
  return `
    <label>
      <span class="field-label">${escapeHtml(label)}</span>
      <input class="field-input" type="${type}" ${dataAttr} value="${escapeAttr(value || '')}">
    </label>
  `;
}

function textareaField(label, path, value) {
  return `
    <label>
      <span class="field-label">${escapeHtml(label)}</span>
      <textarea class="field-textarea" data-path="${escapeAttr(path)}">${escapeHtml(value || '')}</textarea>
    </label>
  `;
}

function selectField(label, path, value, options) {
  return `
    <label>
      <span class="field-label">${escapeHtml(label)}</span>
      <select class="field-select" data-path="${escapeAttr(path)}">
        ${options.map((option) => `
          <option value="${escapeAttr(option.value)}" ${option.value === value ? 'selected' : ''}>${escapeHtml(option.label)}</option>
        `).join('')}
      </select>
    </label>
  `;
}

function checkboxField(label, path, value) {
  return `
    <label class="field-check">
      <input type="checkbox" data-path="${escapeAttr(path)}" data-type="boolean" ${value ? 'checked' : ''}>
      <span>${escapeHtml(label)}</span>
    </label>
  `;
}

function readonlyField(label, value) {
  return `
    <label>
      <span class="field-label">${escapeHtml(label)}</span>
      <input class="field-input" value="${escapeAttr(value || '')}" readonly>
    </label>
  `;
}

function handleDocumentClick(event) {
  const target = event.target.closest('[data-scroll-target], [data-close-modal], [data-gallery-open], [data-gallery-filter], [data-admin-tab], [data-action], #menuButton, #adminEntryButton, #loginSubmitButton, #adminCloseButton, #restorePublishedButton');
  if (!target) return;

  if (target.id === 'menuButton') {
    toggleMobileMenu();
    return;
  }

  if (target.dataset.scrollTarget) {
    event.preventDefault();
    scrollToSection(target.dataset.scrollTarget);
    return;
  }

  if (target.id === 'adminEntryButton') {
    openLoginModal();
    return;
  }

  if (target.id === 'loginSubmitButton') {
    submitLogin();
    return;
  }

  if (target.id === 'adminCloseButton') {
    closeAdmin();
    return;
  }

  if (target.id === 'restorePublishedButton') {
    restorePublishedContent();
    return;
  }

  if (target.dataset.closeModal) {
    closeModal(target.dataset.closeModal);
    return;
  }

  if (target.dataset.galleryOpen) {
    openGalleryModal(target.dataset.galleryOpen);
    return;
  }

  if (target.dataset.galleryFilter) {
    state.galleryFilter = target.dataset.galleryFilter;
    renderGalleryFilters();
    renderGallery();
    setupRevealElements();
    return;
  }

  if (target.dataset.galleryMore) {
    const projectId = target.dataset.galleryMore;
    state.galleryExpanded[projectId] = !state.galleryExpanded[projectId];
    renderGallery();
    setupRevealElements();
    return;
  }

  if (target.dataset.adminTab) {
    state.activeTab = target.dataset.adminTab;
    renderAdminTabs();
    renderAdminPanel();
    return;
  }

  if (target.dataset.action) {
    handleAdminAction(target);
  }
}

function handleFieldInput(event) {
  const target = event.target;
  if (target.dataset.path) {
    const value = target.dataset.type === 'boolean' ? target.checked : target.value;
    setByPath(state.content, target.dataset.path, value);
    queueDraftSave();
    renderPublicContent();
    return;
  }

  if (target.dataset.galleryFile) {
    const [file] = target.files || [];
    setPendingGalleryFile(target.dataset.galleryFile, file || null);
    return;
  }

  if (target.dataset.repoField) {
    const value = target.value;
    state.repoSettings[target.dataset.repoField] = value;
    return;
  }
}

function handleKeydown(event) {
  if (event.key === 'Escape') {
    if (state.currentModal) {
      closeModal(state.currentModal);
    } else if (elements.adminShell.classList.contains('is-open')) {
      closeAdmin();
    }
  }

  if (event.key === 'Enter' && document.activeElement === elements.adminPassword) {
    submitLogin();
  }
}

function handleAdminAction(target) {
  const action = target.dataset.action;
  if (action === 'add-item') {
    const collection = getByPath(state.content, target.dataset.collection);
    collection.push(createNewItem(target.dataset.collection));
    queueDraftSave(true);
    renderAll();
    return;
  }

  if (action === 'remove-item') {
    removeCollectionItem(target.dataset.collection, Number(target.dataset.index));
    return;
  }

  if (action === 'move-up' || action === 'move-down') {
    moveCollectionItem(target.dataset.collection, Number(target.dataset.index), action === 'move-up' ? -1 : 1);
    return;
  }

  if (action === 'save-repo') {
    saveRepoSettings();
    return;
  }

  if (action === 'publish-content') {
    publishContentToGitHub();
    return;
  }

  if (action === 'save-gallery-item') {
    saveGalleryItem(target.dataset.itemId);
  }
}

function toggleMobileMenu() {
  const next = !elements.mobileNav.classList.contains('is-open');
  elements.mobileNav.classList.toggle('is-open', next);
  elements.menuButton.setAttribute('aria-expanded', String(next));
}

function scrollToSection(id) {
  const section = document.getElementById(id);
  if (!section) return;
  history.replaceState(null, '', `#${id}`);
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  elements.mobileNav.classList.remove('is-open');
  elements.menuButton.setAttribute('aria-expanded', 'false');
}

function handleScroll() {
  elements.siteHeader.classList.toggle('is-scrolled', window.scrollY > 8);
  updateActiveLinks();
}

function updateActiveLinks() {
  const current = detectCurrentSection();
  document.querySelectorAll('[data-scroll-target]').forEach((node) => {
    node.classList.toggle('is-active', node.dataset.scrollTarget === current);
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

function openLoginModal() {
  elements.adminPassword.value = '';
  elements.loginFeedback.textContent = '';
  openModal('loginModal');
  requestAnimationFrame(() => elements.adminPassword.focus());
}

function submitLogin() {
  if (elements.adminPassword.value !== ADMIN_PASSWORD) {
    elements.loginFeedback.textContent = '비밀번호가 맞지 않습니다.';
    return;
  }

  closeModal('loginModal');
  openAdmin(true);
}

function openAdmin(persistSession) {
  if (persistSession) {
    sessionStorage.setItem(STORAGE_KEYS.adminOpen, '1');
  }
  elements.adminShell.classList.add('is-open');
  elements.adminShell.setAttribute('aria-hidden', 'false');
  document.body.classList.add('is-locked');
  elements.adminPanelContent.scrollTop = 0;
}

function closeAdmin() {
  sessionStorage.removeItem(STORAGE_KEYS.adminOpen);
  elements.adminShell.classList.remove('is-open');
  elements.adminShell.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('is-locked');
}

function openModal(id) {
  state.currentModal = id;
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
  state.currentModal = null;
  if (!elements.adminShell.classList.contains('is-open')) {
    document.body.classList.remove('is-locked');
  }
}

function openGalleryModal(itemId) {
  const item = state.content.gallery.items.find((entry) => entry.id === itemId);
  if (!item) return;
  const project = projectById(item.projectId);

  elements.galleryModalImage.innerHTML = item.imageUrl
    ? `<img src="${escapeAttr(item.imageUrl)}" alt="${escapeAttr(item.title)}">`
    : '<div class="empty-state">이미지가 아직 등록되지 않았습니다.</div>';
  text(elements.galleryModalCategory, [project?.title, categoryLabel(item.category)].filter(Boolean).join(' · '));
  text(elements.galleryModalTitle, item.title);
  text(elements.galleryModalBody, item.caption);
  openModal('galleryModal');
}

function queueDraftSave(force) {
  clearTimeout(state.draftTimer);
  state.draftTimer = setTimeout(() => {
    localStorage.setItem(STORAGE_KEYS.draft, JSON.stringify(state.content));
    updateAdminStatus(force ? '이 브라우저에 변경 사항을 저장했습니다.' : '');
  }, force ? 0 : 220);
}

function restorePublishedContent() {
  resetPendingGalleryState();
  state.content = deepCopy(state.publishedContent);
  state.repoSettings = loadRepoSettings(state.content.admin?.github);
  localStorage.removeItem(STORAGE_KEYS.draft);
  renderAll();
  showToast('게시본으로 되돌렸습니다.');
}

function saveRepoSettings() {
  const safeConfig = {
    owner: state.repoSettings.owner.trim(),
    repo: state.repoSettings.repo.trim(),
    branch: state.repoSettings.branch.trim() || 'main',
    contentPath: state.repoSettings.contentPath.trim() || 'data/site-content.json',
    galleryDir: state.repoSettings.galleryDir.trim() || 'assets/gallery',
    token: state.repoSettings.token.trim()
  };

  state.repoSettings = safeConfig;
  state.content.admin.github = {
    owner: safeConfig.owner,
    repo: safeConfig.repo,
    branch: safeConfig.branch,
    contentPath: safeConfig.contentPath,
    galleryDir: safeConfig.galleryDir
  };

  localStorage.setItem(STORAGE_KEYS.repo, JSON.stringify(safeConfig));
  queueDraftSave(true);
  renderAdminPanel();
  showToast('GitHub 설정을 이 브라우저에 저장했습니다.');
}

function updateAdminStatus(overrideText) {
  if (overrideText) {
    text(elements.adminStatus, overrideText);
    return;
  }
  text(elements.adminStatus, buildPublishStatusText());
}

function buildPublishStatusText() {
  const hasDraft = Boolean(localStorage.getItem(STORAGE_KEYS.draft));
  const hasRepo = Boolean(state.repoSettings.owner && state.repoSettings.repo);
  if (!hasDraft && !hasRepo) return '게시 저장소가 아직 연결되지 않았습니다.';
  if (!hasDraft && hasRepo) return '게시본과 동일합니다. GitHub에 바로 게시할 수 있습니다.';
  if (hasDraft && !hasRepo) return '이 브라우저에만 저장된 미리보기가 있습니다. 게시 저장소를 연결하면 실제 반영이 가능합니다.';
  return '이 브라우저의 변경 사항이 게시본과 다릅니다. 준비가 되면 GitHub에 게시하세요.';
}

function getByPath(object, path) {
  return path.split('.').reduce((result, key) => result[key], object);
}

function setByPath(object, path, value) {
  const segments = path.split('.');
  const last = segments.pop();
  const target = segments.reduce((result, key) => result[key], object);
  target[last] = value;
}

function createNewItem(collectionPath) {
  const defaults = {
    stats: { value: '', suffix: '건', label: '새 지표' },
    'intro.principles': { title: '새 원칙', body: '운영 방식이나 기준을 적어 주세요.' },
    'departments.items': { id: uid('department'), name: '새 부서', summary: '부서 소개를 적어 주세요.', description: '이 부서가 어떤 작업을 하는지 적어 주세요.', activity: '주요 작업을 적어 주세요.' },
    'projects.items': { id: uid('project'), year: String(new Date().getFullYear()), status: '진행 중', title: '새 프로젝트', summary: '무엇을 하는 작업인지 짧게 적어 주세요.', detail: '배경이나 진행 상황을 한 줄 더 적어 주세요.' },
    'team.items': { id: uid('member'), name: '새 팀원', role: '역할', grade: '학년', department: 'webapp', summary: '주로 맡는 일을 적어 주세요.' },
    'gallery.items': { id: uid('gallery'), title: '새 활동 이미지', caption: '장면 설명을 적어 주세요.', category: 'work', projectId: state.content.projects.items[0]?.id || '', imageUrl: '', assetPath: '', featured: false },
    'history.items': { id: uid('history'), year: String(new Date().getFullYear()), title: '새 기록', description: '무엇이 있었는지 간단히 적어 주세요.' },
    'achievements.items': { id: uid('achievement'), year: String(new Date().getFullYear()), title: '새 결과', description: '실제로 해낸 일을 적어 주세요.' },
    'notices.items': { id: uid('notice'), date: todayString(), tag: '안내', title: '새 공지', summary: '공지 내용을 짧게 적어 주세요.' },
    'footer.pages': { label: '새 링크', target: 'about' },
    'contact.items': { id: uid('contact'), label: '새 연결', value: '', href: '', caption: '짧은 설명을 적어 주세요.', visible: true, footerVisible: false }
  };

  return deepCopy(defaults[collectionPath]);
}

function removeCollectionItem(collectionPath, index) {
  const collection = getByPath(state.content, collectionPath);
  const item = collection[index];

  if (collectionPath === 'departments.items' && item?.id) {
    state.content.team.items.forEach((member) => {
      if (member.department === item.id) {
        member.department = state.content.departments.items.find((department, departmentIndex) => departmentIndex !== index)?.id || '';
      }
    });
  }

  if (collectionPath === 'projects.items' && item?.id) {
    const fallbackProjectId = state.content.projects.items.find((project, projectIndex) => projectIndex !== index)?.id || '';
    state.content.gallery.items.forEach((galleryItem) => {
      if (galleryItem.projectId === item.id) {
        galleryItem.projectId = fallbackProjectId;
      }
    });
    if (state.galleryFilter === item.id) {
      state.galleryFilter = fallbackProjectId;
    }
  }

  if (collectionPath === 'gallery.items' && item?.id) {
    clearPendingGalleryState(item.id);
  }

  if (collectionPath === 'gallery.items' && item?.assetPath && state.repoSettings.token) {
    deleteGalleryAsset(item).catch((error) => showToast(error.message, true));
  } else if (collectionPath === 'gallery.items' && item?.assetPath && !state.repoSettings.token) {
    showToast('메타데이터만 제거했습니다. 저장소 파일까지 지우려면 GitHub 토큰을 연결해 주세요.');
  }

  collection.splice(index, 1);
  queueDraftSave(true);
  renderAll();
  showToast('항목을 삭제했습니다.');
}

function moveCollectionItem(collectionPath, index, direction) {
  const collection = getByPath(state.content, collectionPath);
  const nextIndex = index + direction;
  if (nextIndex < 0 || nextIndex >= collection.length) return;
  [collection[index], collection[nextIndex]] = [collection[nextIndex], collection[index]];
  queueDraftSave(true);
  renderAll();
}

function categoryLabel(category) {
  return CATEGORY_LABELS[category] || category || '기타';
}

function departmentLabel(department) {
  return DEPARTMENT_LABELS[department] || department || '미정';
}

function resolveGalleryProjectId(projectId, projects, itemId = '') {
  if (projects.some((project) => project.id === projectId)) {
    return projectId;
  }

  if (itemId === 'gallery-4') {
    return projects.find((project) => project.id === 'project-device-lab')?.id || projects[0]?.id || '';
  }

  if (itemId === 'gallery-2') {
    return projects.find((project) => project.id === 'project-school-service')?.id || projects[0]?.id || '';
  }

  return projects.find((project) => project.id === 'project-pitch-board')?.id || projects[0]?.id || '';
}

function projectById(projectId) {
  return state.content.projects.items.find((item) => item.id === projectId);
}

function selectedGalleryProject() {
  return projectById(state.galleryFilter) || state.content.projects.items[0] || null;
}

function projectGalleryItems(projectId) {
  return state.content.gallery.items.filter((item) => item.projectId === projectId);
}

function randomGalleryItems() {
  syncRandomGalleryIds();
  const itemsById = new Map(state.content.gallery.items.map((item) => [item.id, item]));
  return state.galleryRandomIds
    .map((itemId) => itemsById.get(itemId))
    .filter(Boolean);
}

function syncRandomGalleryIds() {
  const ids = state.content.gallery.items.map((item) => item.id);
  const validIds = state.galleryRandomIds.filter((itemId) => ids.includes(itemId));
  const desiredCount = Math.min(3, ids.length);

  if (validIds.length === desiredCount && desiredCount > 0) {
    state.galleryRandomIds = validIds;
    return;
  }

  state.galleryRandomIds = shuffle(ids).slice(0, desiredCount);
}

function shuffle(items) {
  const copied = [...items];
  for (let index = copied.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copied[index], copied[swapIndex]] = [copied[swapIndex], copied[index]];
  }
  return copied;
}

function uid(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

function todayString() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

function isExternal(href) {
  return /^https?:\/\//.test(href);
}

async function publishContentToGitHub() {
  if (!state.repoSettings.owner || !state.repoSettings.repo || !state.repoSettings.token) {
    showToast('GitHub owner, 저장소, 토큰을 먼저 입력해 주세요.', true);
    return;
  }

  try {
    const contentPath = state.repoSettings.contentPath || 'data/site-content.json';
    const payload = JSON.stringify(state.content, null, 2);
    await putGithubFile(contentPath, payload, `content: update site content (${new Date().toISOString()})`);
    state.publishedContent = deepCopy(state.content);
    localStorage.removeItem(STORAGE_KEYS.draft);
    renderAll();
    showToast('GitHub에 게시했습니다.');
  } catch (error) {
    showToast(error.message, true);
  }
}

function setPendingGalleryFile(itemId, file) {
  clearPendingGalleryState(itemId);

  if (!file) {
    renderAdminPanel();
    return;
  }

  state.pendingGalleryFiles[itemId] = file;
  state.pendingGalleryPreviews[itemId] = URL.createObjectURL(file);
  state.galleryMessages[itemId] = {
    type: 'info',
    text: `${file.name} 파일을 선택했습니다. 저장하면 GitHub에 업로드됩니다.`
  };
  renderAdminPanel();
}

function clearPendingGalleryState(itemId) {
  const previewUrl = state.pendingGalleryPreviews[itemId];
  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
  }
  delete state.pendingGalleryFiles[itemId];
  delete state.pendingGalleryPreviews[itemId];
  delete state.galleryMessages[itemId];
  delete state.gallerySaving[itemId];
}

function resetPendingGalleryState() {
  const itemIds = new Set([
    ...Object.keys(state.pendingGalleryFiles),
    ...Object.keys(state.pendingGalleryPreviews),
    ...Object.keys(state.galleryMessages),
    ...Object.keys(state.gallerySaving)
  ]);
  itemIds.forEach((itemId) => {
    clearPendingGalleryState(itemId);
  });
}

async function saveGalleryItem(itemId) {
  const item = state.content.gallery.items.find((entry) => entry.id === itemId);
  if (!item || state.gallerySaving[itemId]) return;

  const pendingFile = state.pendingGalleryFiles[itemId];
  state.gallerySaving[itemId] = true;
  state.galleryMessages[itemId] = pendingFile
    ? { type: 'info', text: '이미지를 GitHub에 업로드하는 중입니다.' }
    : { type: 'info', text: '항목을 저장하는 중입니다.' };
  renderAdminPanel();

  try {
    if (pendingFile) {
      const uploadResult = await uploadGalleryAsset(item, pendingFile);
      if (item.assetPath && item.assetPath !== uploadResult.path) {
        await deleteGalleryAssetIfPossible(item.assetPath);
      }
      item.assetPath = uploadResult.path;
      item.imageUrl = uploadResult.url;
    }

    queueDraftSave(true);
    state.galleryMessages[itemId] = {
      type: 'info',
      text: pendingFile ? '이미지를 업로드하고 항목을 저장했습니다.' : '항목을 저장했습니다.'
    };
    clearPendingGallerySelection(itemId);
    renderAll();
    showToast(pendingFile ? '이미지를 업로드하고 갤러리 항목을 저장했습니다.' : '갤러리 항목을 저장했습니다.');
  } catch (error) {
    state.galleryMessages[itemId] = {
      type: 'error',
      text: error.message
    };
    delete state.gallerySaving[itemId];
    renderAdminPanel();
    showToast(error.message, true);
  }
}

function clearPendingGallerySelection(itemId) {
  const previewUrl = state.pendingGalleryPreviews[itemId];
  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
  }
  delete state.pendingGalleryFiles[itemId];
  delete state.pendingGalleryPreviews[itemId];
  delete state.gallerySaving[itemId];
}

async function uploadGalleryAsset(item, file) {
  if (!state.repoSettings.owner || !state.repoSettings.repo || !state.repoSettings.token) {
    throw new Error('이미지를 저장하려면 GitHub owner, 저장소, 토큰을 먼저 입력해 주세요.');
  }

  const filename = `${item.id}-${Date.now()}-${slugify(file.name)}`;
  const path = `${state.repoSettings.galleryDir || 'assets/gallery'}/${filename}`;
  const base64 = await fileToBase64(file);
  await putGithubFile(path, base64, `gallery: upload ${filename}`, true);
  return {
    path,
    url: rawGithubUrl(path)
  };
}

async function deleteGalleryAssetIfPossible(path) {
  if (!path || !state.repoSettings.token) return;
  try {
    await deleteGithubFile(path, `gallery: remove ${path}`);
  } catch (error) {
    showToast(`이전 이미지 파일은 남겨 두었습니다: ${error.message}`, true);
  }
}

async function deleteGalleryAsset(item) {
  try {
    await deleteGithubFile(item.assetPath, `gallery: remove ${item.assetPath}`);
    showToast('저장소의 이미지 파일도 삭제했습니다.');
  } catch (error) {
    throw new Error(`이미지 파일 삭제에 실패했습니다: ${error.message}`);
  }
}

async function putGithubFile(path, content, message, isBase64Payload = false) {
  const existing = await getGithubContent(path).catch((error) => {
    if (error.status === 404) return null;
    throw error;
  });

  const body = {
    message,
    content: isBase64Payload ? content : utf8ToBase64(content),
    branch: state.repoSettings.branch || 'main'
  };

  if (existing?.sha) {
    body.sha = existing.sha;
  }

  await githubRequest(contentApiUrl(path), {
    method: 'PUT',
    body: JSON.stringify(body)
  });
}

async function deleteGithubFile(path, message) {
  const existing = await getGithubContent(path);
  await githubRequest(contentApiUrl(path), {
    method: 'DELETE',
    body: JSON.stringify({
      message,
      sha: existing.sha,
      branch: state.repoSettings.branch || 'main'
    })
  });
}

async function getGithubContent(path) {
  return githubRequest(`${contentApiUrl(path)}?ref=${encodeURIComponent(state.repoSettings.branch || 'main')}`);
}

async function githubRequest(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${state.repoSettings.token}`,
      'Content-Type': 'application/json',
      ...options.headers
    }
  });

  if (!response.ok) {
    const errorBody = await safeJson(response);
    const error = new Error(errorBody?.message || `GitHub 요청 실패 (${response.status})`);
    error.status = response.status;
    throw error;
  }

  return safeJson(response);
}

function contentApiUrl(path) {
  const encodedPath = path.split('/').map(encodeURIComponent).join('/');
  return `https://api.github.com/repos/${encodeURIComponent(state.repoSettings.owner)}/${encodeURIComponent(state.repoSettings.repo)}/contents/${encodedPath}`;
}

function rawGithubUrl(path) {
  return `https://raw.githubusercontent.com/${state.repoSettings.owner}/${state.repoSettings.repo}/${state.repoSettings.branch || 'main'}/${path}`;
}

function safeJson(response) {
  return response.text().then((text) => {
    if (!text) return null;
    try {
      return JSON.parse(text);
    } catch (_) {
      return { message: text };
    }
  });
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1]);
    reader.onerror = () => reject(new Error('이미지 읽기에 실패했습니다.'));
    reader.readAsDataURL(file);
  });
}

function utf8ToBase64(text) {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function slugify(filename) {
  return filename
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function stripExtension(filename) {
  return filename.replace(/\.[^/.]+$/, '');
}

function text(node, value) {
  if (node) node.textContent = value || '';
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, '&#96;');
}

function showToast(message, isError = false) {
  elements.toast.textContent = message;
  elements.toast.style.background = isError ? '#6e1f1f' : '#0f1525';
  elements.toast.classList.add('is-visible');
  clearTimeout(elements.toast._timer);
  elements.toast._timer = setTimeout(() => {
    elements.toast.classList.remove('is-visible');
  }, 2600);
}
