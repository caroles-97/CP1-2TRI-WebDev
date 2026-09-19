import { Link } from 'react-router-dom'
import { FiFilm } from 'react-icons/fi'

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__brand">
        <FiFilm />
        <span>Surf Time</span>
      </Link>
    </header>
  )
}
