import { FiAlertTriangle } from 'react-icons/fi'

export default function ErrorState({ message = 'Algo deu errado.', onRetry }) {
  return (
    <div className="state-message state-message--error">
      <FiAlertTriangle />
      <p>{message}</p>
      {onRetry && (
        <button type="button" onClick={onRetry}>
          Tentar novamente
        </button>
      )}
    </div>
  )
}
