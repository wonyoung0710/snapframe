// [담당: 지은] 4. 사진 선택
// (막히면 원영에게: 한 번/두 번 클릭 구분 → 타이머)
// - 한 번 클릭: 사진 확대 팝업(회전/닫기), 두 번 클릭: 바로 프레임에 넣기
// - 프레임의 사진을 누르면 빠짐, 프레임 색상 선택, 다시 찍기(전체 초기화) / 나가기
import { useEffect, useRef, useState } from 'react' // [지은] useEffect, useRef, useState 추가
import { Link, useNavigate } from 'react-router-dom'
import { usePhoto } from '../context/PhotoContext.jsx'
import FrameView from '../components/FrameView.jsx'
import ColorPicker from '../components/ColorPicker.jsx'
import './PhotoSelect.css' // [지은] 사진 선택 화면 스타일 추가

// [지은] 이 시간(ms) 안에 같은 사진을 또 누르면 두 번 클릭으로 처리
const DOUBLE_CLICK_MS = 250

export default function PhotoSelect() {
  const navigate = useNavigate()
  const { template, shots, slots, frameColor, setFrameColor, placePhoto, removeFromSlot, resetShots } = usePhoto()

  // 칸마다 들어갈 사진 주소 (slots는 shots의 번호를 가지고 있음)
  const slotPhotos = slots.map((idx) => (idx == null ? null : shots[idx]))

  // [지은] 칸 수, 채운 칸 수, 다 찼는지, 이미 넣은 컷인지 계산
  const total = slots.length
  const filledCount = slots.filter((idx) => idx != null).length
  const isFull = total > 0 && filledCount >= total
  const isPlaced = (i) => slots.includes(i)

  // [지은] 한 번/두 번 클릭 구분용 타이머와 확대 팝업 상태
  const clickTimer = useRef(null)
  const lastClicked = useRef(null)
  const [previewIdx, setPreviewIdx] = useState(null) // 확대 중인 컷 번호 (null이면 닫힘)
  const [rotation, setRotation] = useState(0)

  // [지은] 화면을 나갈 때 남은 타이머 정리
  useEffect(() => () => clearTimeout(clickTimer.current), [])

  // [지은] 한 번 클릭 = 확대 팝업, 두 번 클릭 = 프레임에 바로 넣기
  const handleShotClick = (i) => {
    // 같은 사진을 시간 안에 또 눌렀다 → 두 번 클릭
    if (clickTimer.current && lastClicked.current === i) {
      clearTimeout(clickTimer.current)
      clickTimer.current = null
      lastClicked.current = null
      if (!isPlaced(i) && !isFull) placePhoto(i)
      return
    }
    // 첫 클릭: 잠깐 기다렸다가 두 번째 클릭이 없으면 한 번 클릭으로 처리
    clearTimeout(clickTimer.current)
    lastClicked.current = i
    clickTimer.current = setTimeout(() => {
      clickTimer.current = null
      lastClicked.current = null
      setRotation(0)
      setPreviewIdx(i)
    }, DOUBLE_CLICK_MS)
  }

  // [지은] 팝업 닫기 / 팝업에서 프레임에 넣기
  const closePreview = () => setPreviewIdx(null)

  const placeFromPreview = () => {
    if (previewIdx != null && !isPlaced(previewIdx) && !isFull) placePhoto(previewIdx)
    closePreview()
  }

  const retake = () => {
    resetShots()
    navigate('/camera')
  }

  return (
    <div className="screen select">
      {/* [지은] 헤더: 재촬영 / 진행 상황(n/총 칸 수) / 나가기 */}
      <header className="select-header">
        <button className="btn" onClick={retake}>↻ 재촬영</button>
        <span className="select-title">사진 선택 {filledCount}/{total}</span>
        <Link to="/" className="btn">나가기 ✕</Link>
      </header>

      <FrameView template={template} photos={slotPhotos} color={frameColor} onSlotClick={removeFromSlot} />

      {/* [지은] 클릭 방법 안내 문구 */}
      <p className="select-hint">
        <b>한 번 클릭</b> 사진 확인 · <b>두 번 클릭</b> 바로 선택
      </p>

      {/* [지은] 찍은 컷 목록: 번호 뱃지, 이미 넣은 컷은 흐리게 */}
      <div className="shot-strip">
        {shots.map((url, i) => (
          <button
            key={i}
            className={`shot${isPlaced(i) ? ' shot-placed' : ''}`}
            onClick={() => handleShotClick(i)}
          >
            <span className="shot-badge">{i + 1}</span>
            <img src={url} alt={`${i + 1}번째 컷`} draggable={false} />
          </button>
        ))}
      </div>
      <p className="select-sub">
        {shots.length === 0 ? '찍은 사진이 없어요. 재촬영을 눌러주세요' : `좌우로 넘겨 찍은 ${shots.length}컷 확인`}
      </p>

      <ColorPicker value={frameColor} onChange={setFrameColor} />

      {/* [지은] 칸을 다 채워야 다음으로 이동 가능 */}
      <button
        className="btn btn-primary select-next"
        disabled={!isFull}
        onClick={() => navigate('/result')}
      >
        다음 ›
      </button>

      {/* [지은] 임시 확대 팝업(회전/넣기/닫기). TODO: PhotoPreviewModal.jsx 완성되면 교체 */}
      {previewIdx != null && (
        <div className="preview-overlay" onClick={closePreview}>
          <div className="preview-box" onClick={(e) => e.stopPropagation()}>
            <img
              src={shots[previewIdx]}
              alt={`${previewIdx + 1}번째 컷 확대`}
              style={{ transform: `rotate(${rotation}deg)` }}
            />
            <div className="preview-actions">
              <button className="btn" onClick={() => setRotation((r) => (r + 90) % 360)}>⟳ 회전</button>
              <button className="btn btn-primary" disabled={isPlaced(previewIdx) || isFull} onClick={placeFromPreview}>
                {isPlaced(previewIdx) ? '이미 선택됨' : '프레임에 넣기'}
              </button>
              <button className="btn" onClick={closePreview}>닫기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}