import { useEffect, useState } from 'react'
import { useParams, useLocation, Link } from 'react-router'
import { FiArrowLeft } from 'react-icons/fi'
import MovieCard from '../components/MovieCard'
import Loader from '../components/Loader'
import EmptyState from '../components/EmptyState'
import ErrorState from '../components/ErrorState'
import { getMoviesByGenre } from '../services/tmdb'

const GenreResults = () => {
  const { id } = useParams()
  const location = useLocation()
  const [movies, setMovies] = useState([])
  const [status, setStatus] = useState('loading')

  const loadMovies = () => {
    setStatus('loading')
    getMoviesByGenre(id)
      .then((data) => {
        setMovies(data)
        setStatus(data.length ? 'success' : 'empty')
      })
      .catch(() => setStatus('error'))
  }

  useEffect(() => {
    loadMovies()
  }, [id])

  const genreName = location.state?.genreName ?? 'Gênero'

  return (
    <section>
      <Link to="/" className="back-link">
        <FiArrowLeft /> Voltar para gêneros
      </Link>
      <h1>{genreName}</h1>

      {status === 'loading' && <Loader label="Buscando filmes..." />}
      {status === 'error' && (
        <ErrorState
          message="Não foi possível carregar os filmes deste gênero."
          onRetry={loadMovies}
        />
      )}
      {status === 'empty' && <EmptyState message="Nenhum filme encontrado para este gênero." />}
      {status === 'success' && (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  )
}

export default GenreResults
