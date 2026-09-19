import { useEffect, useState } from 'react'
import GenreRow from '../components/GenreRow.jsx'
import Loader from '../components/Loader.jsx'
import ErrorState from '../components/ErrorState.jsx'
import { getGenres, getMoviesByGenre } from '../services/tmdb'

// Gêneros em destaque na Home, na ordem em que as fileiras aparecem.
const HOME_GENRE_IDS = [28, 35, 27, 10749, 16, 878, 18, 12]

export default function Home() {
  const [genreRows, setGenreRows] = useState([])
  const [status, setStatus] = useState('loading')

  function loadHome() {
    setStatus('loading')
    getGenres()
      .then((genres) => {
        const homeGenres = HOME_GENRE_IDS.map((id) =>
          genres.find((genre) => genre.id === id),
        ).filter(Boolean)

        return Promise.all(
          homeGenres.map((genre) =>
            getMoviesByGenre(genre.id).then((movies) => ({
              genre,
              movies: movies.slice(0, 12),
            })),
          ),
        )
      })
      .then((rows) => {
        setGenreRows(rows)
        setStatus(rows.some((row) => row.movies.length) ? 'success' : 'empty')
      })
      .catch(() => setStatus('error'))
  }

  useEffect(() => {
    loadHome()
  }, [])

  return (
    <section>
      <h1>O que você quer assistir hoje?</h1>
      <p className="page-subtitle">Navegue pelos gêneros e descubra filmes para maratonar.</p>

      {status === 'loading' && <Loader label="Buscando filmes..." />}
      {status === 'error' && (
        <ErrorState message="Não foi possível carregar a Home." onRetry={loadHome} />
      )}
      {status === 'success' && (
        <div className="genre-row-list">
          {genreRows.map(({ genre, movies }) => (
            <GenreRow key={genre.id} genre={genre} movies={movies} />
          ))}
        </div>
      )}
    </section>
  )
}
