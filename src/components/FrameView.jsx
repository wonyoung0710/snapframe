// [담당: 지은] 프레임 그리기 (템플릿 선택, 사진 선택, 결과 화면에서 공용).
// 지금은 칸 틀만, 목업(캔버스)의 프레임처럼 꾸미기
//
// props
//   template   : TEMPLATES 중 하나
//   photos     : 칸마다 들어갈 사진 주소 (비어 있으면 null)
//   color      : 프레임 색
//   onSlotClick: (칸 번호) => void  (선택 사항)
export default function FrameView({ template, photos = [], color = '#1B1A22', onSlotClick }) {
  const slotCount = template.slots
  const date = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric', month: '2-digit', day: '2-digit',
  })

  return (
    <div style={{ background: color, padding: '12px 12px 22px', borderRadius: 6, width: 220 }}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${template.cols}, 1fr)`, gap: 8 }}>
        {Array.from({ length: slotCount }).map((_, i) => (
          <button
            key={i}
            onClick={() => onSlotClick?.(i)}
            style={{
              aspectRatio: template.slotRatio,
              border: photos[i] ? 'none' : '2px dashed #F4EFE6',
              background: 'transparent',
              padding: 0,
              overflow: 'hidden',
            }}
          >
            {photos[i] ? (
              <img src={photos[i]} alt={`${i + 1}번 칸`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span style={{ color: '#F4EFE6' }}>{i + 1}</span>
            )}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#F4EFE6', fontSize: 11, paddingTop: 8 }}>
        <span>SnapFrame</span>
        <span>{date}</span>
      </div>
    </div>
  )
}
