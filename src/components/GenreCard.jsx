import { Link } from 'react-router-dom'

const GENRE_COLORS = [
  '#1DB954', '#E13300', '#8C1932', '#477D95', '#7358FF', '#509BF5',
  '#E91429', '#BA5D07', '#0D73EC', '#148A08', '#E8115B', '#B49BC8',
]

function colorForGenre(id) {
  return GENRE_COLORS[id % GENRE_COLORS.length]
}

export default function GenreCard({ genre, onSelect }) {
  return (
    <Link
      to={`/genero/${genre.id}`}
      state={{ genreName: genre.name }}
      className="genre-card"
      style={{ backgroundColor: colorForGenre(genre.id) }}
      onClick={() => onSelect?.(genre)}
    >
      <span>{genre.name}</span>
    </Link>
  )
}
