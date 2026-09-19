import { Link } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'
import { POSTER_SMALL } from '../services/tmdb'

export default function MovieCard({ movie }) {
  return (
    <Link to={`/titulo/${movie.id}`} className="movie-card">
      <div className="movie-card__poster">
        {movie.poster_path ? (
          <img src={`${POSTER_SMALL}${movie.poster_path}`} alt={movie.title} loading="lazy" />
        ) : (
          <div className="movie-card__poster-placeholder">Sem imagem</div>
        )}
        <span className="movie-card__rating">
          <FaStar /> {movie.vote_average ? movie.vote_average.toFixed(1) : '—'}
        </span>
      </div>
      <p className="movie-card__title">{movie.title}</p>
    </Link>
  )
}
