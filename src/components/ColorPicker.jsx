// [지은] 프레임 색상 선택 (원형 10개, 누르면 색이 바뀌게)
// [지은] 수정 (10/11): 시안(4-사진선택.png)처럼 선택된 색에 바깥 링 표시. 선택 로직(value/onChange)은 선배 코드 그대로
// [지은] 수정 (10/12): 시안처럼 위에 "프레임 색상" 제목과 현재 선택한 색 이름(검정 등) 추가
import { FRAME_COLORS } from '../constants/colors.js'

export default function ColorPicker({ value, onChange }) {
  // [지은] 추가: 지금 선택된 색 정보 (이름을 오른쪽에 보여주려고 찾아둠)
  const current = FRAME_COLORS.find((c) => c.hex === value)

  return (
    <div style={{ margin: '10px 0' }}>
      {/* [지은] 추가: 제목(왼쪽) + 선택한 색 이름(오른쪽) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
        <b style={{ fontSize: 16 }}>프레임 색상</b>
        <span style={{ fontSize: 14, color: 'var(--color-muted)' }}>{current?.name}</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {FRAME_COLORS.map((c) => {
          // [지은] 추가: 선택 여부를 변수로 만들어 아래에서 여러 번 사용
          const selected = value === c.hex

          return (
            <button
              key={c.hex}
              aria-label={`프레임 색상 ${c.name}`}
              aria-pressed={selected} // [지은] 추가: 선택 상태를 스크린리더에 알림
              onClick={() => onChange(c.hex)}
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
                background: c.hex,
                padding: 0, // [지은] 추가: 버튼 기본 여백 제거
                cursor: 'pointer', // [지은] 추가: 손가락 커서
                // [지은] 수정: 선택 여부와 상관없이 같은 얇은 테두리 (원래는 선택 시 3px)
                border: '1.5px solid var(--color-ink)',
                // [지은] 추가: 선택 시 틈 3px + 바깥 링 2px
                boxShadow: selected
                  ? '0 0 0 3px var(--color-paper), 0 0 0 5px var(--color-ink)'
                  : 'none',
              }}
            />
          )
        })}
      </div>
    </div>
  )
}