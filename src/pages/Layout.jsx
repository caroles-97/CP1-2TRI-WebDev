import { Outlet } from 'react-router'
import Header from '../components/Header'

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <main className="layout__content">
        <Outlet />
        {/* Outlet é um espaço vazio que é preenchido pela rota filha atual */}
      </main>
    </div>
  )
}

export default Layout
