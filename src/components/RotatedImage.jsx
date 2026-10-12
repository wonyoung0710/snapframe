// [담당: 원영] 회전한 사진을 칸에 꽉 채워서(cover) 보여주는 공용 컴포넌트.
//  - 사진 선택 목록, 프레임 칸, 결과 미리보기에서 같이 사용
//
// props
//   src      : 사진 주소
//   rotation : 회전 각도 (0/90/180/270/-90 ...)
//   alt      : 대체 글자
import './RotatedImage.css'

export default function RotatedImage({ src, rotation = 0, alt = '', ...rest }) {
  const sideways = Math.abs(rotation / 90) % 2 === 1 // 90°, 270° 처럼 옆으로 누운 상태
  return (
    <span className="rot-box">
      <img
        className="rot-img"
        src={src}
        alt={alt}
        draggable={false}
        style={{
          width: sideways ? '100cqh' : '100cqw',
          height: sideways ? '100cqw' : '100cqh',
          transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        }}
        {...rest}
      />
    </span>
  )
}
