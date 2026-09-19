import { FiLoader } from 'react-icons/fi'

const Loader = ({ label = 'Carregando...' }) => {
  return (
    <div className="state-message" role="status">
      <FiLoader className="spin" />
      <p>{label}</p>
    </div>
  )
}

export default Loader
