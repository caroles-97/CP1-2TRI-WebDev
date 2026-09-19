const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

export const POSTER_SMALL = 'https://image.tmdb.org/t/p/w342'
export const POSTER_LARGE = 'https://image.tmdb.org/t/p/w500'

async function fetchTMDB(path, params = {}) {
  const url = new URL(`${BASE_URL}${path}`)
  url.searchParams.set('api_key', API_KEY)
  url.searchParams.set('language', 'pt-BR')
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value))

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Falha ao consultar a API do TMDB (${response.status})`)
  }
  return response.json()
}

export function getGenres() {
  return fetchTMDB('/genre/movie/list').then((data) => data.genres)
}

export function getMoviesByGenre(genreId) {
  return fetchTMDB('/discover/movie', {
    with_genres: genreId,
    sort_by: 'popularity.desc',
  }).then((data) => data.results)
}

export function getMovieDetails(movieId) {
  return fetchTMDB(`/movie/${movieId}`)
}

export function getMovieCredits(movieId) {
  return fetchTMDB(`/movie/${movieId}/credits`).then((data) => data.cast)
}
