import { FiInbox } from 'react-icons/fi'

export default function EmptyState({ message = 'Nada encontrado por aqui.' }) {
  return (
    <div className="state-message">
      <FiInbox />
      <p>{message}</p>
    </div>
  )
}
