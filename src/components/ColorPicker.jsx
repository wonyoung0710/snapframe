// [지은] 프레임 색상 선택 (원형 10개, 누르면 색이 바뀌게)
import { FRAME_COLORS } from '../constants/colors.js'

export default function ColorPicker({ value, onChange }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {FRAME_COLORS.map((c) => (
        <button
          key={c.hex}
          aria-label={`프레임 색상 ${c.name}`}
          onClick={() => onChange(c.hex)}
          style={{
            width: 28, height: 28, borderRadius: 14, background: c.hex,
            border: value === c.hex ? '3px solid #1B1A22' : '1.5px solid #1B1A22',
          }}
        />
      ))}
    </div>
  )
}
