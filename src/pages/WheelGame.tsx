import { useState, useEffect } from 'react'
import PrizeWheel from '../components/PrizeWheel.tsx'
import PrizeModal from '../components/PrizeModal.tsx'
import type { Prize } from '../data/prizes'
import {
  WHEEL_SEGMENTS,
  PRIZE_LABEL_TO_INDEX,
  PRIZE_LABEL_TO_SEGMENT_INDICES,
} from '../data/prizes'
import './Page2.css'

const SPIN_STORAGE_KEY = 'wheel_has_spun'
const PRIZE_STORAGE_KEY = 'wheel_prize'
const CODE_STORAGE_KEY = 'wheel_code'

type WheelGameProps = Readonly<{
  onPrizeWon: (prize: Prize, code: string) => void
}>

export default function WheelGame({ onPrizeWon }: WheelGameProps) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [wonPrize, setWonPrize] = useState<Prize | null>(null)
  const [prizeCode, setPrizeCode] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [alreadySpun, setAlreadySpun] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem(SPIN_STORAGE_KEY)
    if (stored === 'true') {
      const prizeLabel = sessionStorage.getItem(PRIZE_STORAGE_KEY)
      const code = sessionStorage.getItem(CODE_STORAGE_KEY)
      if (prizeLabel && code) {
        const prize = WHEEL_SEGMENTS.find((p) => p.label === prizeLabel) ?? null
        if (prize) {
          setWonPrize(prize)
          setPrizeCode(code)
          setAlreadySpun(true)
          setShowModal(true)
        }
      }
    }
  }, [])

  const calculateRotation = (prizeLabel: string): number => {
    const indices = PRIZE_LABEL_TO_SEGMENT_INDICES[prizeLabel] ?? [0, 4]
    const winningIndex = indices[Math.floor(Math.random() * 2)]
    const segmentAngle = 360 / WHEEL_SEGMENTS.length
    const offset = segmentAngle / 2
    return 360 * 5 + (360 - (winningIndex * segmentAngle + offset))
  }

  const handleSpin = async () => {
    if (isSpinning || alreadySpun) return

    setIsSpinning(true)
    setWonPrize(null)
    setShowModal(false)

    try {
      const response = await fetch('/api/spin', { method: 'POST' })
      const result = await response.json()

      if (!response.ok) throw new Error(result.error ?? 'Falha ao girar')

      const { prize, code } = result
      const winningIndex = PRIZE_LABEL_TO_INDEX[prize] ?? 0
      const prizeObj = WHEEL_SEGMENTS[winningIndex]

      const targetRotation = calculateRotation(prize)
      setRotation(targetRotation)

      sessionStorage.setItem(SPIN_STORAGE_KEY, 'true')
      sessionStorage.setItem(PRIZE_STORAGE_KEY, prize)
      sessionStorage.setItem(CODE_STORAGE_KEY, code)

      setTimeout(() => {
        setWonPrize(prizeObj)
        setPrizeCode(code)
        setIsSpinning(false)
        setShowModal(true)
        setAlreadySpun(true)
      }, 4000)
    } catch (error) {
      console.error(error)
      setIsSpinning(false)
      alert('Erro ao conectar. Tente novamente.')
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    if (wonPrize) {
      onPrizeWon(wonPrize, prizeCode)
    }
  }

  return (
    <div className="page-container">
      <main className="main-content">
        <div className="page-logo">
          <img src="/logo.png" alt="Faculdade CDPI" className="logo-img" />
        </div>

        <PrizeWheel rotation={rotation} segments={WHEEL_SEGMENTS} />

        <button
          className="spin-button"
          onClick={handleSpin}
          disabled={isSpinning || alreadySpun}
        >
          {alreadySpun ? 'Prêmio já obtido' : 'Girar'}
        </button>

        <p className="result-text">
          {wonPrize ? (
            <>
              Parabéns! Você ganhou <strong>{wonPrize.label}</strong>
            </>
          ) : (
            ''
          )}
        </p>
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
            O CDPI PHARMA é uma Instituição de Graduação e Pós-graduação, especializada em
            treinamentos e consultorias técnicas/científicas, focado em profissionais e empresas do
            mercado industrial farmacêutico, sendo a empresa líder nesse segmento.
          </p>
        </div>
      </footer>

      {showModal && wonPrize && (
        <PrizeModal prizeLabel={wonPrize.label} onClose={handleCloseModal} />
      )}
    </div>
  )
}
