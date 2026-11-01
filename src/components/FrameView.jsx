// [담당: 지은] 프레임 그리기 (템플릿 선택, 사진 선택, 결과 화면에서 공용).
// [지은] 수정 (10/11): 목업의 프레임처럼 꾸밈 (회색 칸, 노란 그림자, 템플릿별 크기)
// [지은] 수정 (10/11): 프레임 색이 밝으면 글자·점선을 진한 색으로 (흰색·노랑을 골라도 보이게)
// [지은] 수정 (10/11): 날짜를 date로 받을 수 있게 함 (안 주면 오늘). 글자·날짜 양끝 정렬은 선배 원래 코드로 되돌림
//
// props
//   template   : TEMPLATES 중 하나
//   photos     : 칸마다 들어갈 사진 주소 (비어 있으면 null)
//   color      : 프레임 색
//   onSlotClick: (칸 번호) => void  (선택 사항)
//   width      : [지은] 추가: 프레임 가로 크기(px). 안 주면 템플릿에 맞는 기본 크기
//   dashed     : [지은] 추가: true면 빈 칸을 점선으로 (사진 선택 화면용)
//   shadow     : [지은] 추가: false면 노란 그림자 없음 (갤러리용)
//   rotations  : [원영] 추가: 칸마다 사진 회전 각도 (안 주면 0도)
//   date       : [지은] 추가: '2026.10.06' 같은 글자. 안 주면 오늘 날짜 (완성된 사진은 완성한 날짜를 넘겨요)

import RotatedImage from './RotatedImage.jsx' // [원영] 회전한 사진을 칸에 맞춰 그림

// [지은] 추가: 템플릿별 기본 가로 크기 (칸 크기 + 여백으로 계산한 값, 시안 보고 조정)
const FRAME_WIDTH = { basic: 150, tall: 220, square: 240 }

// [지은] 추가: 색이 밝은지 판단 (사람 눈에 밝게 보이는 정도를 0~255로 계산)
function isLight(hex) {
  const n = parseInt(hex.slice(1), 16)
  const r = n >> 16
  const g = (n >> 8) & 255
  const b = n & 255
  return (r * 299 + g * 587 + b * 114) / 1000 > 150
}

// [지은] 수정: 오늘 날짜를 2026.10.08 형식 글자로 (원래 컴포넌트 안에서 toLocaleDateString 사용)
function todayText() {
  const now = new Date()
  return [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
  ].join('.')
}

export default function FrameView({
  template,
  photos = [],
  rotations = [], // [원영] 추가
  color = '#1B1A22',
  onSlotClick,
  width,
  dashed = false,
  shadow = true,
  date,
}) {
  const slotCount = template.slots

  // [지은] 추가: 프레임 색에 맞는 글자색 (밝은 프레임이면 진하게)
  const textColor = isLight(color) ? 'var(--color-ink)' : 'var(--color-paper)'

  // [지은] 추가: 받은 날짜가 있으면 그걸, 없으면 오늘
  const dateText = date ?? todayText()

  return (
    <div
      style={{
        background: color,
        padding: '12px 12px 38px',
        borderRadius: 6,
        // [지은] 수정: 원래 width: 220 고정
        width: width ?? FRAME_WIDTH[template.id] ?? 220,
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${template.cols}, 1fr)`,
          gap: 8,
        }}
      >
        {Array.from({ length: slotCount }).map((_, i) => (
          <button
            key={i}
            onClick={() => onSlotClick?.(i)}
            style={{
              aspectRatio: template.slotRatio,
              // [지은] 수정: 빈 칸은 회색, dashed일 때만 점선 (원래 항상 점선). 점선 색은 textColor
              border: photos[i] || !dashed ? 'none' : `2px dashed ${textColor}`,
              background: photos[i] || dashed ? 'transparent' : 'var(--color-muted)',
              padding: 0,
              overflow: 'hidden',
            }}
          >
            {photos[i] ? (
              <RotatedImage src={photos[i]} rotation={rotations[i] ?? 0} alt={`${i + 1}번 칸`} />
            ) : (
              // [지은] 수정: 칸 번호 색. 회색 칸 위에서는 항상 밝게, 점선(투명) 칸에서는 프레임 색에 맞춤
              <span style={{ color: dashed ? textColor : 'var(--color-paper)', fontSize: 18 }}>
                {i + 1}
              </span>
            )}
          </button>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between', // [지은] 원복: 선배 원래 코드 (SnapFrame 왼쪽, 날짜 오른쪽 끝)
          gap: 6,
          color: textColor, // [지은] 수정: 원래 항상 밝은 색
          fontSize: 11,
          paddingTop: 8,
        }}
      >
        <span>SnapFrame</span>
        <span>{dateText}</span>
      </div>
    </div>
  )
}