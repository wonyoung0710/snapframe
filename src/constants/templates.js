// [원영] 템플릿 3종 정보. 카메라/사진 선택/결과 화면이 모두 이 값을 같이 사용
// slotRatio   : 프레임 한 칸의 가로/세로 비율 (사진을 이 비율로 잘라 넣어요)
// cameraRatio : 카메라 미리보기 화면의 가로/세로 비율
// orientation : 촬영할 때 폰 방향 안내 ('landscape' 가로 | 'portrait' 세로)
export const TEMPLATES = {
  basic: {
    id: 'basic',
    name: '기본 세로형 4컷',
    cols: 1,
    slots: 4,
    slotRatio: 126 / 72,
    cameraRatio: 126 / 72,
    orientation: 'landscape',
  },
  tall: {
    id: 'tall',
    name: '2×2 세로 직사각형',
    cols: 2,
    slots: 4,
    slotRatio: 94 / 118,
    cameraRatio: 94 / 118,
    orientation: 'portrait',
  },
  square: {
    id: 'square',
    name: '2×2 정사각 가로형',
    cols: 2,
    slots: 4,
    slotRatio: 104 / 88,
    cameraRatio: 1, // 정사각형 화면으로 찍고, 칸 비율로 잘라요
    orientation: 'portrait',
  },
}

export const TEMPLATE_LIST = Object.values(TEMPLATES)

export const TOTAL_SHOTS = 6 // 한 번에 찍는 컷 수
