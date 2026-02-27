import './Page3.css'

interface RewardProps {
  prizeCode: string
  onWhatsAppClick: () => void
}

export default function Reward({ prizeCode, onWhatsAppClick }: Readonly<RewardProps>) {
  return (
    <div className="page-container reward-page">
      <main className="main-content">
        <div className="page-logo">
          <img src="/logo.png" alt="Faculdade CDPI" className="logo-img" />
        </div>

        <div className="card reward-card">
          <h2 className="card-title">Etiqueta da premiação</h2>
          <div className="code-display">#{prizeCode || '000000'}</div>
          <button className="whatsapp-button" onClick={onWhatsAppClick}>
            <svg viewBox="0 0 24 24" className="whatsapp-icon" aria-hidden="true">
              <path
                fill="currentColor"
                d="M20.52 3.48A11.75 11.75 0 0 0 12 0C5.37 0 0 5.37 0 12a11.9 11.9 0 0 0 1.7 6.13L0 24l5.99-1.57A11.92 11.92 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52ZM12 22a10 10 0 0 1-5.1-1.4l-.36-.21-3.56.93.95-3.46-.23-.36A9.97 9.97 0 0 1 2 12C2 6.48 6.48 2 12 2c2.67 0 5.19 1.04 7.07 2.93A9.93 9.93 0 0 1 22 12c0 5.52-4.48 10-10 10Zm5.15-7.56c-.28-.14-1.66-.82-1.92-.91-.26-.09-.45-.14-.64.14-.19.28-.73.91-.9 1.1-.17.19-.34.21-.62.07-.28-.14-1.2-.44-2.29-1.41-.85-.75-1.42-1.68-1.58-1.96-.16-.28-.02-.43.12-.57.12-.12.28-.34.42-.51.14-.17.18-.28.28-.47.09-.19.05-.36-.02-.5-.07-.14-.64-1.54-.88-2.1-.23-.56-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.34-.26.28-1 1-.99 2.44 0 1.44 1.03 2.82 1.17 3.02.14.19 2.03 3.1 4.92 4.35.69.3 1.23.48 1.65.62.69.22 1.32.19 1.81.12.55-.08 1.66-.68 1.9-1.34.23-.66.23-1.23.16-1.34-.07-.12-.26-.19-.54-.33Z"
              />
            </svg>
            Entre em contato e retire seu prêmio
          </button>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <img src="/logo.png" alt="CDPI" className="footer-logo" />
          <div className="social-icons">
            <button type="button" className="social-icon" aria-label="Instagram">
              ig
            </button>
            <button type="button" className="social-icon" aria-label="Facebook">
              f
            </button>
            <button type="button" className="social-icon" aria-label="YouTube">
              yt
            </button>
            <button type="button" className="social-icon" aria-label="LinkedIn">
              in
            </button>
          </div>
          <p className="footer-text">
            O CDPI PHARMA é uma Instituição de Graduação e Pós-graduação, especializada em treinamentos e consultorias técnicas/científicas, focado em  profissionais e empresas do mercado industrial farmacêutico, sendo a empresa líder nesse segmento.
          </p>
        </div>
      </footer>
    </div>
  )
}
