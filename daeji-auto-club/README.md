# 대지고등학교 자동차제작부 웹사이트

> 직접 설계하고, 제작하고, 주행합니다.

---

## 📁 파일 구조

```
daeji-auto-club/
├── index.html          ← 메인 페이지 (모든 섹션 포함)
├── css/
│   └── style.css       ← 전체 스타일시트
├── js/
│   └── main.js         ← 렌더링, 관리자, 애니메이션 로직
└── README.md
```

---

## 🚀 GitHub Pages 배포 방법

### 1단계: GitHub 레포지토리 생성

1. [github.com](https://github.com) 접속 → **New repository**
2. Repository 이름: `daeji-auto-club` (또는 원하는 이름)
3. **Public** 선택 (Pages 무료 사용 조건)
4. **Create repository** 클릭

### 2단계: 파일 업로드

**방법 A — 웹 업로드 (간단)**
1. 생성된 레포 페이지에서 **"uploading an existing file"** 클릭
2. `index.html`, `css/`, `js/` 폴더를 드래그&드롭
3. **Commit changes** 클릭

**방법 B — Git CLI (권장)**
```bash
git init
git add .
git commit -m "init: 대지 자동차제작부 웹사이트"
git branch -M main
git remote add origin https://github.com/[유저명]/daeji-auto-club.git
git push -u origin main
```

### 3단계: Pages 활성화

1. 레포 → **Settings** → **Pages** (왼쪽 사이드바)
2. Source: **Deploy from a branch**
3. Branch: `main` / `/ (root)` 선택
4. **Save** 클릭
5. 1~2분 후 `https://[유저명].github.io/daeji-auto-club/` 접속 확인

---

## ✏️ 콘텐츠 수정 방법

### 방법 1 — 관리자 페이지 사용 (권장)
웹사이트 오른쪽 상단 **"관리자"** 버튼 → 각 섹션 편집 → **저장하기**  
> 데이터는 브라우저 `localStorage`에 저장됩니다.

### 방법 2 — JS 직접 수정
`js/main.js` 파일의 `DEFAULT_DATA` 객체를 수정하면 기본값이 바뀝니다.

```js
// 예: 부원 추가
members: [
  { name: '홍길동', role: '부장', dept: '3학년', color: '#FF4D00' },
  // ...
]
```

### 방법 3 — 사진 추가
실제 사진을 넣으려면 `assets/` 폴더를 만들고 이미지를 추가한 후,
`js/main.js`의 `renderGallery()` 함수에서 `<img>` 태그를 사용하도록 수정하세요.

---

## 🎨 디자인 커스터마이징

`css/style.css` 최상단 `:root` 변수만 바꾸면 전체 테마가 변경됩니다:

```css
:root {
  --accent: #FF4D00;    /* 메인 강조색 변경 */
  --bg:     #FAFAF8;    /* 배경색 변경 */
  --dark:   #0F0E0C;    /* 다크 섹션 색상 변경 */
}
```

---

## 📌 포함된 섹션

| 섹션 | 설명 |
|------|------|
| Hero | 동아리명, 캐치프레이즈, 통계 카운터, 차량 카드 |
| About | 소개 텍스트, 핵심 가치 카드 |
| Activities | 6가지 활동 카드 (다크 배경) |
| Projects | 제작 차량 카드 3개 |
| Members | 부원 소개 그리드 |
| Gallery | 필터링 + 모달 팝업 갤러리 |
| History | 타임라인 + 수상 실적 |
| Announcements | 공지사항 목록 |
| **Admin** | 전체 콘텐츠 CRUD 관리자 패널 |
| Footer | 링크 + 연락처 |

---

## ⚙️ 기술 스택

- **HTML5** — 시맨틱 마크업
- **CSS3** — CSS Variables, Grid, Flexbox, 애니메이션
- **Vanilla JS** — 외부 라이브러리 없음, 순수 JS
- **localStorage** — 관리자 데이터 영속성
- **Google Fonts** — DM Sans + JetBrains Mono (CDN)

> 외부 의존성 없이 CDN 폰트만 사용하므로 GitHub Pages에서 완벽하게 동작합니다.

---

**대지고등학교 자동차제작부** | Built with passion & motor oil 🏎️
