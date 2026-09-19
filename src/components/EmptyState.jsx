import { FiInbox } from 'react-icons/fi'

const EmptyState = ({ message = 'Nada encontrado por aqui.' }) => {
  return (
    <div className="state-message">
      <FiInbox />
      <p>{message}</p>
    </div>
  )
}

export default EmptyState
