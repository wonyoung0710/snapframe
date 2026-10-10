import './Home.css';

const CUT_COLORS = ['#FFD74F', '#FF9B85', '#A0D3C5', '#B8B0EE'];

function Home() {
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

      <div className="home-frame">
        {CUT_COLORS.map((color) => (
          <div key={color} className="home-cut" style={{ background: color }} />
        ))}
        <span className="home-frame-label">SnapFrame 2026.10.06</span>
      </div>

      <div className="home-buttons">
        <button className="btn btn-primary">📷 사진 찍기</button>
        <button className="btn btn-outline">갤러리</button>
      </div>
      <p className="home-note">사진은 서버로 전송되지 않고 내 기기에서만 처리돼요</p>
    </div>
  );
}

export default Home;