// [지은] 1. 홈 – 로고, 가운데 4컷 이미지, 아래 "사진 찍기 / 갤러리" 버튼
import { Link } from 'react-router-dom'
import frameImg from '../assets/home-frame.png'
import './Home.css'

export default function Home() {
  return (
    <div className="home">
      <h1 className="home-logo">SnapFrame</h1>

      <h2 className="home-title">
        네 컷을<br />바로 찍자
      </h2>
      <p className="home-desc">
        브라우저에서 바로 찍고, 프레임에 담아 저장해요.<br />
        셀카도 후면 카메라도 OK.
      </p>

      <div className="home-hero">
        <img className="home-frame" src={frameImg} alt="네 컷 사진 프레임 예시" />
      </div>

      <div className="home-buttons">
        <Link to="/template" className="home-btn home-btn-primary">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
            <circle cx="12" cy="13" r="3.5" />
          </svg>
          사진 찍기
        </Link>
        <Link to="/gallery" className="home-btn home-btn-outline">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
          </svg>
          갤러리
        </Link>
      </div>

      <p className="home-note">사진은 서버로 전송되지 않고 내 기기에서만 처리돼요</p>
    </div>
  )
}