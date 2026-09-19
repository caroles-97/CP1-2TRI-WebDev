import { Link } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'
import MovieCard from './MovieCard.jsx'

export default function GenreRow({ genre, movies }) {
  if (!movies.length) return null

  return (
    <section className="genre-row">
      <div className="genre-row__header">
        <h2>{genre.name}</h2>
        <Link
          to={`/genero/${genre.id}`}
          state={{ genreName: genre.name }}
          className="genre-row__see-all"
        >
          Ver tudo <FiChevronRight />
        </Link>
      </div>
      <div className="genre-row__track">
        {movies.map((movie) => (
          <div className="genre-row__item" key={movie.id}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </section>
  )
}
