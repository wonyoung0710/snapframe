// [담당: 지은] 4. 사진 선택
// (막히면 원영에게: 한 번/두 번 클릭 구분 → 타이머)
//  - 한 번 클릭: 사진 확대 팝업(회전/닫기), 두 번 클릭: 바로 프레임에 넣기
//  - 프레임의 사진을 누르면 빠짐, 프레임 색상 선택, 다시 찍기(전체 초기화) / 나가기
import { Link, useNavigate } from 'react-router-dom'
import { usePhoto } from '../context/PhotoContext.jsx'
import FrameView from '../components/FrameView.jsx'
import ColorPicker from '../components/ColorPicker.jsx'

export default function PhotoSelect() {
  const navigate = useNavigate()
  const { template, shots, slots, frameColor, setFrameColor, placePhoto, removeFromSlot, resetShots } = usePhoto()

  // 칸마다 들어갈 사진 주소 (slots는 shots의 번호를 가지고 있음)
  const slotPhotos = slots.map((idx) => (idx == null ? null : shots[idx]))

  const retake = () => {
    resetShots()
    navigate('/camera')
  }

  return (
    <div className="screen">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button className="btn" onClick={retake}>재촬영</button>
        <Link to="/" className="btn">나가기</Link>
      </div>

      <FrameView template={template} photos={slotPhotos} color={frameColor} onSlotClick={removeFromSlot} />

      <div style={{ display: 'flex', gap: 10, overflowX: 'auto' }}>
        {shots.map((url, i) => (
          <button key={i} onClick={() => placePhoto(i)} style={{ flex: '0 0 30%', border: 'none', padding: 0 }}>
            {url ? <img src={url} alt={`${i + 1}번째 컷`} style={{ width: '100%' }} /> : `${i + 1}`}
          </button>
        ))}
      </div>

      <ColorPicker value={frameColor} onChange={setFrameColor} />
      <p>TODO: 한 번/두 번 클릭 구분, 확대·회전 팝업 (PhotoPreviewModal)</p>
      <Link to="/result" className="btn btn-primary" style={{ textAlign: 'center', lineHeight: '48px' }}>다음</Link>
    </div>
  )
}
