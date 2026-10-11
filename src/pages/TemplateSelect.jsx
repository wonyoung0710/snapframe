// [담당: 지은] 2. 템플릿 선택 – 3종 중 고르면 위 프레임이 바뀌고, "다음"을 누르면 카메라로
import { Link } from 'react-router-dom'
import { TEMPLATE_LIST } from '../constants/templates.js'
import { usePhoto } from '../context/PhotoContext.jsx'
import FrameView from '../components/FrameView.jsx'
import './TemplateSelect.css'

// [지은] 추가: 카드 위 작은 아이콘의 크기 [가로, 세로] (시안을 보고 정한 값)
const ICON_SIZE = {
  basic: [35, 58],
  tall: [46, 62],
  square: [54, 54],
}

export default function TemplateSelect() {
  const { template, selectTemplate } = usePhoto()

  return (
    <div className="ts">
      <div className="ts-header">
        <Link to="/" className="ts-btn">‹ 이전</Link>
        <Link to="/camera" className="ts-btn ts-btn-primary">다음 ›</Link>
      </div>

      <h2 className="ts-title">프레임을 골라요</h2>
      <p className="ts-sub">선택한 모양대로 사진이 들어가요</p>

      <div className="ts-preview">
        <FrameView template={template} />
      </div>

      <div className="ts-options">
        {TEMPLATE_LIST.map((t) => {
          // [지은] 추가: '기본 세로형 4컷' → 제목 '기본', 설명 '세로형 4컷'
          const [title, ...rest] = t.name.split(' ')
          const [w, h] = ICON_SIZE[t.id] ?? [46, 58]

          return (
            <button
              key={t.id}
              className={`ts-option ${template.id === t.id ? 'is-selected' : ''}`}
              onClick={() => selectTemplate(t.id)}
            >
              <span
                className="ts-icon"
                style={{
                  width: w,
                  height: h,
                  gridTemplateColumns: `repeat(${t.cols}, 1fr)`,
                  gridTemplateRows: `repeat(${t.slots / t.cols}, 1fr)`,
                }}
              >
                {Array.from({ length: t.slots }).map((_, i) => (
                  <i key={i} />
                ))}
              </span>
              <span className="ts-option-name">{title}</span>
              <span className="ts-option-desc">{rest.join(' ')}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}