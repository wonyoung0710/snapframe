// [담당: 원영] 화면 이동(라우터) 연결. 팀원은 수정하지 말고 필요하면 원영에게 요청해요.
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import TemplateSelect from './pages/TemplateSelect.jsx'
import Camera from './pages/Camera.jsx'
import PhotoSelect from './pages/PhotoSelect.jsx'
import Result from './pages/Result.jsx'
import Gallery from './pages/Gallery.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/template" element={<TemplateSelect />} />
      <Route path="/camera" element={<Camera />} />
      <Route path="/select" element={<PhotoSelect />} />
      <Route path="/result" element={<Result />} />
      <Route path="/gallery" element={<Gallery />} />
    </Routes>
  )
}
