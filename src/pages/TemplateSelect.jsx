<<<<<<< HEAD
// [담당: 지은] 2. 템플릿 선택 — 3종 중 고르면 위 프레임이 바뀌고, "다음"을 누르면 카메라로
import { Link } from 'react-router-dom'
import { TEMPLATE_LIST } from '../constants/templates.js'
import { usePhoto } from '../context/PhotoContext.jsx'
import FrameView from '../components/FrameView.jsx'

export default function TemplateSelect() {
  const { template, selectTemplate } = usePhoto()

  return (
    <div className="screen">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link to="/" className="btn">이전</Link>
        <Link to="/camera" className="btn btn-primary">다음</Link>
      </div>
      <h2>프레임을 골라요</h2>
      <FrameView template={template} />
      <div style={{ display: 'flex', gap: 10 }}>
        {TEMPLATE_LIST.map((t) => (
          <button
            key={t.id}
            className="btn"
            onClick={() => selectTemplate(t.id)}
            style={{ flex: 1, fontWeight: template.id === t.id ? 900 : 500 }}
          >
            {t.name}
          </button>
        ))}
      </div>
      <p>TODO: 목업대로 꾸미기 (날짜는 프레임 오른쪽 아래)</p>
    </div>
  )
}
=======
import { useState } from 'react';
import './TemplateSelect.css';

const TEMPLATES = [
  { id: 'strip', name: '기본', desc: '세로형 4컷' },
  { id: 'grid-tall', name: '2×2', desc: '세로 직사각형' },
  { id: 'grid-square', name: '2×2', desc: '정사각 가로형' },
];

function TemplateSelect() {
  const [selected, setSelected] = useState('strip');

  return (
    <div className="ts">
      <div className="ts-header">
        <button className="ts-btn">‹ 이전</button>
        <button className="ts-btn ts-btn-primary">다음 ›</button>
      </div>

      <h1 className="ts-title">프레임을 골라요</h1>
      <p className="ts-sub">선택한 모양대로 사진이 들어가요</p>

      <div className="ts-preview">
        <div className={`ts-frame ts-frame-${selected}`}>
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="ts-cut">{n}</div>
          ))}
          <span className="ts-label">SnapFrame 2026.10.08</span>
        </div>
      </div>

      <div className="ts-options">
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            className={`ts-option ${selected === t.id ? 'is-selected' : ''}`}
            onClick={() => setSelected(t.id)}
          >
            <span className={`ts-icon ts-icon-${t.id}`}>
              <i /><i /><i /><i />
            </span>
            <span className="ts-option-name">{t.name}</span>
            <span className="ts-option-desc">{t.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default TemplateSelect;
>>>>>>> 719fb885e11a74fa4514fbc42bd9dfaabb4b23e4
