// [담당: 지은] 프레임 그리기 (템플릿 선택, 사진 선택, 결과 화면에서 공용).
// [지은] 수정 (10/11): 목업의 프레임처럼 꾸밈 (회색 칸, 노란 그림자, 날짜 형식, 템플릿별 크기)
//
// props
//   template   : TEMPLATES 중 하나
//   photos     : 칸마다 들어갈 사진 주소 (비어 있으면 null)
//   color      : 프레임 색
//   onSlotClick: (칸 번호) => void  (선택 사항)
//   width      : [지은] 추가: 프레임 가로 크기(px). 안 주면 템플릿에 맞는 기본 크기
//   dashed     : [지은] 추가: true면 빈 칸을 점선으로 (사진 선택 화면용)
//   shadow     : [지은] 추가: false면 노란 그림자 없음 (갤러리용)
//   spread     : [지은] 추가: true면 글자와 날짜를 양끝으로 (결과 화면용)

// [지은] 추가: 템플릿별 기본 가로 크기 (칸 크기 + 여백으로 계산한 값, 시안 보고 조정)
const FRAME_WIDTH = { basic: 150, tall: 220, square: 240 }

export default function FrameView({
  template,
  photos = [],
  color = '#1B1A22',
  onSlotClick,
  width,
  dashed = false,
  shadow = true,
  spread = false,
}) {
  const slotCount = template.slots

  // [지은] 수정: 날짜를 2026.10.08 형식으로 (원래 toLocaleDateString 사용)
  const now = new Date()
  const date = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
  ].join('.')

  return (
    <div
      style={{
        background: color,
        padding: '12px 12px 22px',
        borderRadius: 6,
        // [지은] 수정: 원래 width: 220 고정
        width: width ?? FRAME_WIDTH[template.id] ?? 220,
        // [지은] 추가: 노란 그림자
        boxShadow: shadow ? '8px 8px 0 var(--color-brand)' : 'none',
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
              // [지은] 수정: 빈 칸은 회색, dashed일 때만 점선 (원래 항상 점선)
              border: photos[i] || !dashed ? 'none' : '2px dashed var(--color-paper)',
              background: photos[i] || dashed ? 'transparent' : 'var(--color-muted)',
              padding: 0,
              overflow: 'hidden',
            }}
          >
            {photos[i] ? (
              <img
                src={photos[i]}
                alt={`${i + 1}번 칸`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <span style={{ color: 'var(--color-paper)', fontSize: 18 }}>{i + 1}</span>
            )}
          </button>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          // [지은] 수정: 기본은 왼쪽으로 붙이고, spread일 때만 양끝 (원래 항상 양끝)
          justifyContent: spread ? 'space-between' : 'flex-start',
          gap: 6,
          color: 'var(--color-paper)',
          fontSize: 11,
          paddingTop: 8,
        }}
      >
        <span>SnapFrame</span>
        <span>{date}</span>
      </div>
    </div>
  )
}