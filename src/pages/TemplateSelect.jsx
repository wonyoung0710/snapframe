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