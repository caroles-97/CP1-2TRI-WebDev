import { useEffect, useState } from 'react'
import GenreCard from '../components/GenreCard.jsx'
import Loader from '../components/Loader.jsx'
import EmptyState from '../components/EmptyState.jsx'
import ErrorState from '../components/ErrorState.jsx'
import { getGenres } from '../services/tmdb'

export default function Home() {
  const [genres, setGenres] = useState([])
  const [status, setStatus] = useState('loading')

  function loadGenres() {
    setStatus('loading')
    getGenres()
      .then((data) => {
        setGenres(data)
        setStatus(data.length ? 'success' : 'empty')
      })
      .catch(() => setStatus('error'))
  }

  useEffect(() => {
    loadGenres()
  }, [])

  return (
    <section>
      <h1>O que você quer assistir hoje?</h1>
      <p className="page-subtitle">Escolha um gênero e explore filmes desse universo.</p>

      {status === 'loading' && <Loader label="Buscando gêneros..." />}
      {status === 'error' && (
        <ErrorState message="Não foi possível carregar os gêneros." onRetry={loadGenres} />
      )}
      {status === 'empty' && <EmptyState message="Nenhum gênero encontrado." />}
      {status === 'success' && (
        <div className="genre-grid">
          {genres.map((genre) => (
            <GenreCard key={genre.id} genre={genre} />
          ))}
        </div>
      )}
    </section>
  )
}
