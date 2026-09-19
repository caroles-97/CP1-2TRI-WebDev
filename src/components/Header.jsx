import { Link } from 'react-router'
import { FiFilm } from 'react-icons/fi'

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="header__brand">
        <FiFilm />
        <span>Surf Time</span>
      </Link>
    </header>
  )
}

export default Header
