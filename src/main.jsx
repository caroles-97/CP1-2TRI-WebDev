import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// importando rotas
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'

import './index.css'
import App from './App.jsx'
import GenreResults from './pages/GenreResults.jsx'
import TitleDetail from './pages/TitleDetail.jsx'
import Layout from './pages/Layout.jsx'

// função que recebe array de objetos de rota
const router = createBrowserRouter([
  {
    // toda vez que acessar a barra / . Aqui reutilizamos o Layout (Header fixo)
    path: '/',
    element: <Layout />,
    // Layout abre, e os filhos (children) são renderizados dentro do <Outlet />
    children: [
      { index: true, element: <App /> },
      { path: '/genero/:id', element: <GenreResults /> },
      { path: '/titulo/:id', element: <TitleDetail /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
