// [담당: 원영] 3. 카메라 — 템플릿에 따라 촬영 화면 비율이 달라요 (3-1, 3-2, 3-3)
//  - 전면/후면 전환, 3·2·1 카운트다운 후 촬영, 6컷이 차면 /select 로 자동 이동
//  - 카메라 접근: navigator.mediaDevices.getUserMedia (HTTPS 또는 localhost 에서만 동작)
//  - 캡처: utils/composeImage.js 의 captureFromVideo(video, template.cameraRatio)
import { useNavigate, Link } from 'react-router-dom'
import { usePhoto } from '../context/PhotoContext.jsx'
import { TOTAL_SHOTS } from '../constants/templates.js'
import { makeDummyPhoto } from '../utils/dummy.js'

export default function Camera() {
  const navigate = useNavigate()
  const { template, shots, addShot } = usePhoto()
  const taken = shots.filter(Boolean).length

  // 임시: 카메라 없이 가짜 사진으로 흐름 테스트 (실제 촬영 구현하면 지워요)
  const fillDummy = () => {
    for (let i = taken; i < TOTAL_SHOTS; i++) addShot(makeDummyPhoto(i))
    navigate('/select')
  }

  return (
    <div className="screen">
      <Link to="/template" className="btn">이전</Link>
      <h2>카메라 ({taken} / {TOTAL_SHOTS}컷)</h2>
      <p>
        {template.name} · 촬영 방향: {template.orientation === 'landscape' ? '가로' : '세로'} ·
        미리보기 비율: {template.cameraRatio.toFixed(2)}
      </p>
      <p>TODO: 카메라 미리보기, 전면/후면 전환, 3·2·1 촬영</p>
      <button className="btn btn-primary" onClick={fillDummy}>(임시) 6컷 채우고 다음으로</button>
    </div>
  )
}
