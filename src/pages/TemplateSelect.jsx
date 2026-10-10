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
