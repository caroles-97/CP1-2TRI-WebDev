import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { FaStar } from 'react-icons/fa'
import Loader from '../components/Loader.jsx'
import ErrorState from '../components/ErrorState.jsx'
import { getMovieDetails, getMovieCredits, POSTER_LARGE } from '../services/tmdb'

export default function TitleDetail() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [cast, setCast] = useState([])
  const [status, setStatus] = useState('loading')

  function loadMovie() {
    setStatus('loading')
    Promise.all([getMovieDetails(id), getMovieCredits(id)])
      .then(([movieData, creditsData]) => {
        setMovie(movieData)
        setCast(creditsData.slice(0, 8))
        setStatus('success')
      })
      .catch(() => setStatus('error'))
  }

  useEffect(() => {
    loadMovie()
  }, [id])

  if (status === 'loading') return <Loader label="Buscando detalhes do filme..." />
  if (status === 'error') {
    return <ErrorState message="Não foi possível carregar este filme." onRetry={loadMovie} />
  }

  const releaseYear = movie.release_date ? movie.release_date.slice(0, 4) : '—'
  const genreNames = movie.genres?.map((genre) => genre.name).join(', ') || '—'

  return (
    <section className="title-detail">
      <Link to="/" className="back-link">
        <FiArrowLeft /> Voltar para gêneros
      </Link>

      <div className="title-detail__layout">
        {movie.poster_path ? (
          <img
            className="title-detail__poster"
            src={`${POSTER_LARGE}${movie.poster_path}`}
            alt={movie.title}
          />
        ) : (
          <div className="title-detail__poster title-detail__poster-placeholder">Sem imagem</div>
        )}

        <div className="title-detail__info">
          <h1>
            {movie.title} <span className="title-detail__year">({releaseYear})</span>
          </h1>
          <p className="title-detail__rating">
            <FaStar /> {movie.vote_average ? movie.vote_average.toFixed(1) : '—'} / 10
          </p>
          <p className="title-detail__genres">{genreNames}</p>
          <p className="title-detail__overview">{movie.overview || 'Sinopse não disponível.'}</p>

          {cast.length > 0 && (
            <div className="title-detail__cast">
              <h2>Elenco principal</h2>
              <ul>
                {cast.map((actor) => (
                  <li key={actor.id}>{actor.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
