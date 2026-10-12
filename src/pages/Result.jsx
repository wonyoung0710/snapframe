// [담당: 지은] 5. 저장·내보내기
//   - 가운데 완성본, 아래 저장하기(다운로드) / 내보내기(공유) / 홈으로
//   - 완성본은 utils/composeImage.js 로 (원영 담당)
//   - 폰 갤러리 저장은 웹에서 직접 쓸 수 없어서 "다운로드" 또는 "공유창(navigator.share)"으로 대체
import { useEffect, useState } from 'react' // [지은] 합성 이미지/안내 문구 상태용
import { Link } from 'react-router-dom'
import { usePhoto } from '../context/PhotoContext.jsx'
import FrameView from '../components/FrameView.jsx'
import { composeImage } from '../utils/composeImage.js' // [지은] 완성본 만들기 (원영 구현 전에는 null 반환)
import * as storage from '../utils/storage.js' // [지은] 비어 있어도 에러 안 나게 통째로 import
import './Result.css'

// [지은] 오늘 날짜를 'YYYY.MM.DD'로 만들기 (composeImage에 넘길 날짜)
const getToday = () => {
  const d = new Date()
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}.${p(d.getMonth() + 1)}.${p(d.getDate())}`
}

export default function Result() {
  const { template, shots, slots, frameColor, rotations = [], resetAll } = usePhoto()
  const slotPhotos = slots.map((idx) => (idx == null ? null : shots[idx]))

  const [date] = useState(getToday)
  const [composed, setComposed] = useState(null) // [지은] 합성된 이미지 dataURL (없으면 null)
  const [message, setMessage] = useState('') // [지은] 저장/공유 결과 안내 문구

  // [지은] 화면에 들어오면 사진 4장 + 프레임을 합성해서 완성본 만들기
  useEffect(() => {
    if (slotPhotos.length === 0 || slotPhotos.some((p) => p == null)) return
    let cancelled = false
    const slotRotations = slots.map((idx) => (idx == null ? 0 : rotations[idx] ?? 0))
    composeImage({ template, photos: slotPhotos, rotations: slotRotations, frameColor, date })
      .then((url) => { if (!cancelled) setComposed(url) })
      .catch(() => { if (!cancelled) setComposed(null) })
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [template, shots, slots, frameColor, rotations, date])

  const fileName = `snapframe-${date.replaceAll('.', '')}.png`

  // [지은] dataURL을 파일로 다운로드
  const download = (url) => {
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    a.click()
  }

  // [지은] 저장하기: 다운로드 + (storage.js가 완성되면) 앱 안 갤러리에도 저장
  const handleSave = async () => {
    if (!composed) {
      setMessage('완성 이미지를 아직 만들 수 없어요 (합성 기능 준비 중)')
      return
    }
    download(composed)
    if (typeof storage.saveToGallery === 'function') {
      try {
        await storage.saveToGallery(composed)
        setMessage('다운로드했고 앱 갤러리에도 저장했어요!')
      } catch {
        setMessage('다운로드는 됐지만 앱 갤러리 저장에 실패했어요')
      }
    } else {
      setMessage('다운로드했어요!')
    }
  }

  // [지은] 내보내기: 공유창(navigator.share), 지원 안 하면 다운로드로 대체
  const handleShare = async () => {
    if (!composed) {
      setMessage('완성 이미지를 아직 만들 수 없어요 (합성 기능 준비 중)')
      return
    }
    try {
      const blob = await (await fetch(composed)).blob()
      const file = new File([blob], fileName, { type: 'image/png' })
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: 'SnapFrame' })
      } else {
        download(composed)
        setMessage('이 브라우저는 공유를 지원하지 않아 다운로드했어요')
      }
    } catch (e) {
      if (e.name !== 'AbortError') setMessage('공유에 실패했어요') // 사용자가 직접 닫은 건 무시
    }
  }

  return (
    <div className="screen result">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link to="/select" className="btn">이전</Link>
        <Link to="/" className="btn" onClick={resetAll}>나가기</Link>
      </div>
      <h2>완성!</h2>

      {/* [지은] 합성 이미지가 있으면 그걸, 없으면 프레임 미리보기를 대신 표시 */}
      {composed ? (
        <img className="result-image" src={composed} alt="완성된 네 컷 사진" />
      ) : (
        <FrameView template={template} photos={slotPhotos} rotations={slots.map((idx) => (idx == null ? 0 : rotations[idx] ?? 0))} color={frameColor} />
      )}

      <p className="result-note">{message || '저장하면 이미지 파일로 다운로드되고 앱 갤러리에도 저장돼요'}</p>

      <div style={{ display: 'flex', gap: 10 }}>
        <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleSave}>저장하기</button>
        <button className="btn" style={{ flex: 1 }} onClick={handleShare}>내보내기</button>
        <Link to="/" className="btn" onClick={resetAll} style={{ flex: 1, textAlign: 'center', lineHeight: '48px' }}>홈으로</Link>
      </div>
    </div>
  )
}