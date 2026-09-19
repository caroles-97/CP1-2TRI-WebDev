import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import GenreResults from './pages/GenreResults.jsx'
import TitleDetail from './pages/TitleDetail.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="genero/:id" element={<GenreResults />} />
        <Route path="titulo/:id" element={<TitleDetail />} />
      </Route>
    </Routes>
  )
}
