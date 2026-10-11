// [담당: 지은] 4. 사진 선택
// (막히면 원영에게: 한 번/두 번 클릭 구분 → 타이머)
// - 한 번 클릭: 사진 확대 팝업(회전/닫기), 두 번 클릭: 바로 프레임에 넣기
// - 프레임의 사진을 누르면 빠짐, 프레임 색상 선택, 다시 찍기(전체 초기화) / 나가기
import { useEffect, useRef, useState } from 'react' // [지은] useEffect, useRef, useState 추가
import { Link, useNavigate } from 'react-router-dom'
import { usePhoto } from '../context/PhotoContext.jsx'
import FrameView from '../components/FrameView.jsx'
import ColorPicker from '../components/ColorPicker.jsx'
import PhotoPreviewModal from '../components/PhotoPreviewModal.jsx' // [지은] 수정: 임시 팝업 → 확대 팝업 컴포넌트
import './PhotoSelect.css' // [지은] 사진 선택 화면 스타일 추가

// [지은] 이 시간(ms) 안에 같은 사진을 또 누르면 두 번 클릭으로 처리
const DOUBLE_CLICK_MS = 250

export default function PhotoSelect() {
  const navigate = useNavigate()
  // [지은] 수정: 회전값(rotations)과 회전 함수(rotateShot)를 context에서 가져옴
  const { template, shots, slots, rotations, frameColor, setFrameColor, placePhoto, removeFromSlot, rotateShot, resetShots } = usePhoto()

  // 칸마다 들어갈 사진 주소 (slots는 shots의 번호를 가지고 있음)
  const slotPhotos = slots.map((idx) => (idx == null ? null : shots[idx]))

  // [지은] 칸 수, 채운 칸 수, 다 찼는지, 이미 넣은 컷인지 계산
  const total = slots.length
  const filledCount = slots.filter((idx) => idx != null).length
  const isFull = total > 0 && filledCount >= total
  const isPlaced = (i) => slots.includes(i)
  const takenCount = shots.filter(Boolean).length // [지은] 수정: 실제로 찍은 컷 수 (shots에는 빈 칸이 null로 들어 있음)

  // [지은] 한 번/두 번 클릭 구분용 타이머와 확대 팝업 상태
  const clickTimer = useRef(null)
  const lastClicked = useRef(null)
  const [previewIdx, setPreviewIdx] = useState(null) // 확대 중인 컷 번호 (null이면 닫힘)

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
      setPreviewIdx(i)
    }, DOUBLE_CLICK_MS)
  }

  // [지은] 팝업 닫기
  const closePreview = () => setPreviewIdx(null)

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
        {shots.map((url, i) =>
          url ? ( // [지은] 수정: 안 찍은 칸(null)은 그리지 않음
            <button
              key={i}
              className={`shot${isPlaced(i) ? ' shot-placed' : ''}`}
              onClick={() => handleShotClick(i)}
            >
              <span className="shot-badge">{i + 1}</span>
              <img src={url} alt={`${i + 1}번째 컷`} draggable={false} />
            </button>
          ) : null
        )}
      </div>
      <p className="select-sub">
        {takenCount === 0 ? '찍은 사진이 없어요. 재촬영을 눌러주세요' : `좌우로 넘겨 찍은 ${takenCount}컷 확인`}
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

      {/* [지은] 수정: 확대 팝업(회전/닫기). 회전값은 context에 저장되어 합성 이미지에 반영됨 */}
      {previewIdx != null && (
        <PhotoPreviewModal
          url={shots[previewIdx]}
          rotation={rotations[previewIdx] ?? 0}
          onRotate={(delta) => rotateShot(previewIdx, delta)}
          onClose={closePreview}
        />
      )}
    </div>
  )
}