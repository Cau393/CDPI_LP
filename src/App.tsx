import { useState } from 'react'
import './App.css'
import Registration, { type FormData } from './pages/Registration.tsx'
import WheelGame from './pages/WheelGame.tsx'
import Reward from './pages/Reward.tsx'
import type { Prize } from './data/prizes'

export default function App() {
  const [currentPage, setCurrentPage] = useState<'registration' | 'wheel' | 'reward'>('registration')
  const [formData, setFormData] = useState<FormData | null>(null)
  const [prizeData, setPrizeData] = useState<{ prize: Prize | null; code: string }>({
    prize: null,
    code: '',
  })

  const handleFormSubmit = (data: FormData) => {
    setFormData(data)
    setCurrentPage('wheel')
  }

  const handlePrizeWon = async (prize: Prize, code: string) => {
    setPrizeData({ prize, code })
    setCurrentPage('reward')

    if (!formData) {
      console.error('Missing form data')
      return
    }

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          formacao: formData.formacao,
          area_atuacao: formData.area_atuacao,
          area_atuacao_outro: formData.area_atuacao_outro ?? null,
          interesse_formacao: formData.interesse_formacao,
          prize: prize.label,
          code,
        }),
      })

      if (!response.ok) {
        const result = await response.json()
        throw new Error(result.error ?? 'Falha ao enviar')
      }
    } catch (error) {
      console.error('Failed to submit:', error)
      alert('Erro ao salvar. Seu prêmio foi registrado localmente.')
    }
  }

  const handleWhatsAppClick = () => {
    const phoneNumber = '5562981624758'
    const message = `Olá, meu código é ${prizeData.code}. Gostaria de saber mais informações sobre o Folia Pharma do CDPI e retirar meu prêmio!.`
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <>
      {currentPage === 'registration' && <Registration onSubmit={handleFormSubmit} />}
      {currentPage === 'wheel' && <WheelGame onPrizeWon={handlePrizeWon} />}
      {currentPage === 'reward' && (
        <Reward prizeCode={prizeData.code} onWhatsAppClick={handleWhatsAppClick} />
      )}
    </>
  )
}
