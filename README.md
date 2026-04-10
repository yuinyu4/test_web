# remnant @ DKSH — 포트폴리오 웹사이트

> 단국대학교부속소프트웨어고등학교 remnant 동아리 공식 포트폴리오

---

## 📁 파일 구조

```
remnant-site/
├── index.html           ← 메인 (전체 페이지 단일 파일)
├── css/
│   └── style.css        ← 전체 스타일
├── js/
│   └── main.js          ← 렌더링 + 관리자 + GitHub API 업로드
├── assets/
│   └── logo.png         ← remnant 로고 (업로드한 이미지)
└── README.md
```

---

## 🚀 GitHub Pages 배포

### 1단계 — 레포 생성
- GitHub → New repository → **Public** → `remnant-site` (또는 원하는 이름)

### 2단계 — 파일 업로드
```bash
# Git CLI 방법 (권장)
git init
git add .
git commit -m "init: remnant 포트폴리오 사이트"
git branch -M main
git remote add origin https://github.com/[유저명]/remnant-site.git
git push -u origin main
```
또는 GitHub 웹에서 파일 드래그&드롭

### 3단계 — Pages 활성화
- 레포 → Settings → Pages → Branch: `main` / `/ (root)` → Save
- 1~2분 후: `https://[유저명].github.io/remnant-site/`

---

## 🔒 관리자 페이지 접근

### 진입 방법 (2가지)
1. **네비게이션 바** 오른쪽 상단 → `관리자` 버튼
2. **푸터 하단** → 잘 안 보이는 `· · ·` 버튼 클릭

### 기본 비밀번호
```
remnant2024
```
변경하려면 `js/main.js` 최상단의 `ADMIN_PW` 값을 수정하세요:
```js
const ADMIN_PW = 'remnant2024'; // ← 여기 변경
```

---

## 📸 갤러리 이미지 업로드 (GitHub API)

### GitHub Token 발급 방법
1. GitHub.com → 우측 상단 프로필 → **Settings**
2. 좌측 하단 **Developer settings**
3. **Personal access tokens** → **Fine-grained tokens** → **Generate new token**
4. Repository 선택 후 **Contents** 권한: **Read and write** 체크
5. 생성된 `ghp_xxxx...` 토큰 복사

### 관리자 페이지에서 설정
1. 관리자 로그인 → **갤러리 & 사진** 탭
2. GitHub 설정 입력:
   - `GitHub Username`: 본인 GitHub 아이디
   - `Repository 이름`: 이 사이트가 있는 레포 이름
   - `Branch`: `main`
   - `업로드 폴더`: `gallery`
   - `Token`: 발급받은 Personal Access Token
3. **GitHub 설정 저장** 클릭
4. 이미지를 드래그하거나 클릭하여 업로드

### 업로드 원리
- 이미지 파일 → GitHub API로 레포의 `gallery/` 폴더에 업로드
- 업로드 후 GitHub raw URL (`raw.githubusercontent.com/...`)을 `<img src>`에 사용
- base64는 **API 전송용**으로만 사용, 실제 표시는 GitHub CDN URL 사용

---

## ✏️ 콘텐츠 수정

### 관리자 패널에서 수정 가능한 모든 항목
| 탭 | 수정 가능 항목 |
|---|---|
| 기본 정보 | 동아리 이름, 학교명, 캐치프레이즈, 소개글, Hero 통계 |
| 부원 관리 | 이름, 역할, 학년, 아바타 색상 추가/삭제 |
| 프로젝트 | 이름, 연도, 상태, 설명, 색상 추가/삭제 |
| 갤러리 & 사진 | GitHub 이미지 업로드, URL 직접 추가, 삭제 |
| 연혁 & 수상 | 타임라인 항목, 수상 내역 추가/수정/삭제 |
| 공지사항 | 공지 추가/수정/삭제 |

데이터는 브라우저 **localStorage**에 저장되므로, 같은 브라우저에서는 새로고침 후에도 유지됩니다.

---

## 🎨 디자인 커스터마이징

`css/style.css` 최상단 `:root` 변수만 변경하면 전체 테마가 바뀝니다:
```css
:root {
  --blue:      #0057FF;  /* remnant 브랜드 컬러 (로고와 동일) */
  --bg:        #F7F8FC;  /* 배경색 */
  --dark:      #0A0C14;  /* 다크 섹션 배경 */
}
```

---

## ⚙️ 기술 스택
- **HTML5 + CSS3 + Vanilla JS** — 외부 라이브러리 없음
- **Google Fonts**: Syne + Instrument Serif + JetBrains Mono
- **GitHub Contents API**: 이미지 업로드
- **localStorage**: 관리자 데이터 영속성

**remnant @ DKSH** | Turning fragments into futures ✦
