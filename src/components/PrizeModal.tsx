import './PrizeModal.css'

interface PrizeModalProps {
  prizeLabel: string
  onClose: () => void
}

export default function PrizeModal({ prizeLabel, onClose }: Readonly<PrizeModalProps>) {
  return (
    <div className="modal-overlay">
      <button type="button" className="modal-backdrop" onClick={onClose} aria-label="Fechar" />
      <div className="modal-content">
        <div className="modal-header">
          <img src="/logo.png" alt="Faculdade CDPI" className="modal-logo" />
        </div>
        <div className="modal-body">
          <h2 className="modal-title">Você ganhou:</h2>
          <p className="modal-prize">{prizeLabel}</p>
        </div>
        <button className="modal-close-button" onClick={onClose}>
          Continuar
        </button>
      </div>
    </div>
  )
}
