// [지은] 6. 앱 갤러리 — 저장한 사진 모아보기 (2열)
//  - 나중 단계: utils/storage.js (IndexedDB)로 저장/불러오기
import { Link } from 'react-router-dom'

export default function Gallery() {
  return (
    <div className="screen">
      <Link to="/" className="btn">홈으로</Link>
      <h2>내 갤러리</h2>
      <p>이 브라우저에 저장된 사진만 보여요</p>
      <p>TODO: 저장된 사진 목록 (나중에 구현)</p>
      <Link to="/template" className="btn btn-primary" style={{ textAlign: 'center', lineHeight: '48px' }}>새로 찍기</Link>
    </div>
  )
}
