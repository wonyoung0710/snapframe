// 카메라 없이 화면을 테스트할 때 쓰는 가짜 사진 (색 블록 이미지).
const COLORS = ['#FFD84D', '#FF9C85', '#9ED3C6', '#B9B4F0', '#F6B26B', '#8FC1E3']

export function makeDummyPhoto(i) {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">` +
    `<rect width="400" height="300" fill="${COLORS[i % COLORS.length]}"/>` +
    `<text x="200" y="170" font-size="90" text-anchor="middle" fill="#1B1A22">${i + 1}</text></svg>`
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg)
}
