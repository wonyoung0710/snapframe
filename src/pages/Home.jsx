// [지은] 1. 홈 — 로고, 가운데 4컷 이미지, 아래 "사진 찍기 / 갤러리" 버튼
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="screen">
      <h1 style={{ fontFamily: 'var(--font-title)', textAlign: 'center' }}>SnapFrame</h1>
      <p>홈 화면 (TODO: 목업대로 꾸미기)</p>
      <div style={{ display: 'flex', gap: 12 }}>
        <Link to="/template" className="btn btn-primary" style={{ flex: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>사진 찍기</Link>
        <Link to="/gallery" className="btn" style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>갤러리</Link>
      </div>
    </div>
  )
}
