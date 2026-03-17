# SoE! GitHub Pages 버전

이 폴더를 그대로 GitHub 저장소 루트에 올리면 된다.

## 포함 파일
- `index.html` : 메인 페이지
- `style.css` : 스타일
- `script.js` : 스크롤/영상/메뉴 동작
- `site-config.js` : 유튜브 링크 수정 파일
- `assets/` : 1~14번 mp4, jpg 포스터

## 유튜브 링크 바꾸는 법
`site-config.js`에서 원하는 링크로 바꿔라.

예시:
```js
window.SOE_CONFIG = {
  globalYoutube: "https://www.youtube.com/@yourchannel",
  links: {
    film: "https://youtu.be/xxxx",
    animation1: "https://youtu.be/yyyy"
  }
};
```

## GitHub Pages 배포
1. GitHub에서 새 repository 생성
2. 이 폴더 안 파일 전부 업로드
3. Repository > Settings > Pages
4. Build and deployment에서 `Deploy from a branch` 선택
5. Branch를 `main` / `/root` 로 지정
6. 저장 후 1~3분 기다리기
7. 발급된 링크 접속

## 수정 포인트
- 상단 메뉴 텍스트: `index.html`
- 영상 순서/섹션 구조: `index.html`
- 색감/간격/배경: `style.css`
- 버튼 링크: `site-config.js`
