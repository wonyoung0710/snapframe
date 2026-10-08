// [담당: 지은] 5. 저장·내보내기
// (막히면 원영에게: 이미지 다운로드, 공유 API)
//  - 가운데 완성본, 아래 저장하기(다운로드) / 내보내기(공유) / 홈으로
//  - 완성본은 utils/composeImage.js 로  (원영 담당)
//  - 폰 갤러리 저장은 웹에서 직접 쓸 수 없어서 "다운로드" 또는 "공유창(navigator.share)"으로 대체
import { Link } from 'react-router-dom'
import { usePhoto } from '../context/PhotoContext.jsx'
import FrameView from '../components/FrameView.jsx'

export default function Result() {
  const { template, shots, slots, frameColor, resetAll } = usePhoto()
  const slotPhotos = slots.map((idx) => (idx == null ? null : shots[idx]))

  return (
    <div className="screen">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link to="/select" className="btn">이전</Link>
        <Link to="/" className="btn" onClick={resetAll}>나가기</Link>
      </div>
      <h2>완성!</h2>
      <FrameView template={template} photos={slotPhotos} color={frameColor} />
      <p>TODO: 합성 이미지 표시, 저장하기 / 내보내기</p>
      <div style={{ display: 'flex', gap: 10 }}>
        <button className="btn btn-primary" style={{ flex: 1 }}>저장하기</button>
        <button className="btn" style={{ flex: 1 }}>내보내기</button>
        <Link to="/" className="btn" onClick={resetAll} style={{ flex: 1, textAlign: 'center', lineHeight: '48px' }}>홈으로</Link>
      </div>
    </div>
  )
}
