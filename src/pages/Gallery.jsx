// [지은] 6. 앱 갤러리 - 저장한 사진 모아보기 (2열)
//  - 나중 단계: utils/storage.js (IndexedDB)로 저장/불러오기
import { useEffect, useState } from 'react' // [지은] 목록 불러오기용
import { Link } from 'react-router-dom'
import * as storage from '../utils/storage.js' // [지은] 비어 있어도 에러 안 나게 통째로 import
import './Gallery.css' // [지은] 갤러리 스타일 추가

// [지은] storage.loadGallery가 아직 없으면 빈 목록으로 시작 (원영이 구현하면 자동 연결)
const canLoad = typeof storage.loadGallery === 'function'

export default function Gallery() {
  const [items, setItems] = useState(canLoad ? null : []) // null이면 불러오는 중

  // [지은] 화면에 들어오면 저장된 사진 목록 불러오기. 예상 모양: [{ id, url, date }]
  useEffect(() => {
    if (!canLoad) return
    let cancelled = false
    storage
      .loadGallery()
      .then((list) => { if (!cancelled) setItems(Array.isArray(list) ? list : []) })
      .catch(() => { if (!cancelled) setItems([]) })
    return () => { cancelled = true }
  }, [])

  return (
    <div className="screen gallery">
      {/* [지은] 헤더: 뒤로가기 + 제목 */}
      <header className="gallery-header">
        <Link to="/" className="btn gallery-back" aria-label="홈으로">‹</Link>
        <h2>내 갤러리</h2>
      </header>
      <p className="gallery-sub">이 브라우저에 저장된 사진만 보여요</p>

      {/* [지은] 불러오는 중 / 비어 있음 / 2열 목록 */}
      {items === null ? (
        <p className="gallery-empty">불러오는 중...</p>
      ) : items.length === 0 ? (
        <p className="gallery-empty">아직 저장된 사진이 없어요</p>
      ) : (
        <ul className="gallery-grid">
          {items.map((item) => (
            <li key={item.id ?? item.url} className="gallery-item">
              <img src={item.url} alt={`${item.date ?? ''} 네 컷 사진`} />
              <span>{item.date}</span>
            </li>
          ))}
        </ul>
      )}

      <Link to="/template" className="btn btn-primary gallery-new">새로 찍기</Link>
    </div>
  )
}