// [담당: 지은] 사진 한 번 클릭 → 크게 보기 팝업 (회전, 닫기, 배경 누르면 닫힘).
// (막히면 원영에게: 확대·회전 상태 관리)
// 목업의 "4. 사진 선택" 팝업을 참고
//
// props
//   url      : 보여줄 사진 주소
//   rotation : 회전 각도
//   onRotate : (90 | -90) => void
//   onClose  : () => void
import { useEffect } from 'react' // [지은] Esc 키로 닫기용
import './PhotoPreviewModal.css'

export default function PhotoPreviewModal({ url, rotation = 0, onRotate, onClose }) {
  // [지은] 키보드 Esc를 눌러도 팝업 닫기
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!url) return null

  return (
    // [지은] 배경(어두운 부분)을 누르면 닫힘, 안쪽 상자를 누르면 안 닫히게 stopPropagation
    <div className="pm-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="사진 크게 보기">
      <div className="pm-box" onClick={(e) => e.stopPropagation()}>
        <div className="pm-stage">
          <img
            className="pm-image"
            src={url}
            alt="확대한 사진"
            style={{ transform: `rotate(${rotation}deg)` }}
            draggable={false}
          />
        </div>
        <div className="pm-actions">
          <button className="btn" onClick={() => onRotate?.(-90)}>↺ 왼쪽</button>
          <button className="btn" onClick={() => onRotate?.(90)}>↻ 오른쪽</button>
          <button className="btn btn-primary" onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  )
}