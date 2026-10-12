// [담당: 원영 / 어려운 부분] canvas로 프레임 + 사진 4장을 합쳐 최종 이미지를 만들어요.
//
// 입력
//   template   : TEMPLATES 중 하나 (cols, slotRatio 사용)
//   photos     : 칸 순서대로 정리된 사진 주소 배열 (길이 4)
//   rotations  : photos와 같은 순서의 회전 각도 (0/90/180/270...)
//   frameColor : 프레임 배경색
//   date       : 'YYYY.MM.DD' 문자열 (프레임 오른쪽 아래에 그려요)
// 출력
//   Promise<string> : 완성된 이미지의 dataURL (png)
//
// TODO
//  1) canvas 크기 정하기 (템플릿별 칸 크기 + 여백 + 아래쪽 로고/날짜 영역)
//  2) 사진을 칸 비율(slotRatio)로 가운데 잘라서(cover) 그리기, 회전 반영
//  3) 로고(SnapFrame)와 날짜 그리기
//  4) canvas.toDataURL('image/png') 반환
export async function composeImage({ template, photos, rotations, frameColor, date }) {
  console.warn('composeImage는 아직 구현되지 않았어요', { template, photos, rotations, frameColor, date })
  return null
}

// 영상(video)에서 한 장 캡처: 칸 비율(ratio = 가로/세로)에 맞게 가운데를 잘라요.
// mirror가 true면 좌우를 뒤집어요 (전면 카메라는 미리보기가 거울처럼 보이니까, 찍힌 사진도 똑같이 맞춰요)
// 용량을 줄이려고 JPEG(품질 0.92)로 만들어요. 6장을 메모리에 들고 있어야 해서 PNG보다 훨씬 가벼워요.
export function captureFromVideo(video, ratio, mirror = false) {
  const vw = video.videoWidth
  const vh = video.videoHeight
  let sw = vw
  let sh = vw / ratio
  if (sh > vh) {
    sh = vh
    sw = vh * ratio
  }
  const sx = (vw - sw) / 2
  const sy = (vh - sh) / 2
  const canvas = document.createElement('canvas')
  canvas.width = sw
  canvas.height = sh
  const ctx = canvas.getContext('2d')
  if (mirror) {
    ctx.translate(canvas.width, 0)
    ctx.scale(-1, 1)
  }
  ctx.drawImage(video, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height)
  return canvas.toDataURL('image/jpeg', 0.92)
}
