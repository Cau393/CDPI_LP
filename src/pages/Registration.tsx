import { useState } from 'react'
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'
import { formatPhoneNumber, normalizeDigitsData, validatePhoneBR, validateEmail } from '../utils/formatters'
import './Page1.css'

export type FormData = {
  name: string
  phone: string
  email: string
  formacao: string
  area_atuacao: string
  area_atuacao_outro?: string
  interesse_formacao: string
}

type RegistrationProps = Readonly<{
  onSubmit: (data: FormData) => void
}>

const AREA_OPCOES = [
  'Analítico / Controle de Qualidade',
  'P&D / Farmacotécnico',
  'Produção',
  'Assuntos Regulatórios',
  'Garantia da Qualidade',
  'Outro',
] as const

const INTERESSE_OPCOES = ['Graduação', 'Pós-graduação', 'Cursos e Programas'] as const

export default function Registration({ onSubmit }: RegistrationProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    formacao: '',
    area_atuacao: '',
    area_atuacao_outro: '',
    interesse_formacao: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  const isValid =
    formData.name.trim().length > 0 &&
    validatePhoneBR(formData.phone) &&
    validateEmail(formData.email) &&
    (formData.formacao === 'Sim' || formData.formacao === 'Não') &&
    AREA_OPCOES.includes(formData.area_atuacao as (typeof AREA_OPCOES)[number]) &&
    (formData.area_atuacao !== 'Outro' || (formData.area_atuacao_outro?.trim().length ?? 0) > 0) &&
    INTERESSE_OPCOES.includes(formData.interesse_formacao as (typeof INTERESSE_OPCOES)[number])

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormData, string>> = {}
    if (!formData.name.trim()) next.name = 'Nome é obrigatório'
    if (!validatePhoneBR(formData.phone)) next.phone = 'Telefone inválido. Use (XX) XXXXX-XXXX'
    if (!validateEmail(formData.email)) next.email = 'E-mail inválido'
    if (formData.formacao !== 'Sim' && formData.formacao !== 'Não')
      next.formacao = 'Selecione uma opção'
    if (!AREA_OPCOES.includes(formData.area_atuacao as (typeof AREA_OPCOES)[number]))
      next.area_atuacao = 'Selecione uma área'
    if (formData.area_atuacao === 'Outro' && !formData.area_atuacao_outro?.trim())
      next.area_atuacao_outro = 'Informe a área'
    if (!INTERESSE_OPCOES.includes(formData.interesse_formacao as (typeof INTERESSE_OPCOES)[number]))
      next.interesse_formacao = 'Selecione uma opção'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validate()) return

    onSubmit({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: normalizeDigitsData(formData.phone),
      formacao: formData.formacao,
      area_atuacao: formData.area_atuacao,
      area_atuacao_outro: formData.area_atuacao === 'Outro' ? formData.area_atuacao_outro?.trim() : undefined,
      interesse_formacao: formData.interesse_formacao,
    })
  }

  return (
    <div className="page-container registration-page">
      <main className="main-content">
        <div className="page-logo">
          <img src="/logo.png" alt="Faculdade CDPI" className="logo-img" />
        </div>

        <div className="card">
          <h2 className="card-title">Dia da Aprendizagem – Brainfarma</h2>
          <form className="form-fields" onSubmit={handleSubmit}>
            <h3 className="card-label">Dados Pessoais</h3>
            <input
              className="input-field"
              type="text"
              placeholder="Nome completo"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
            {errors.name && <span className="form-error">{errors.name}</span>}
            <input
              className="input-field"
              type="tel"
              placeholder="Telefone com DDD"
              value={formatPhoneNumber(formData.phone)}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
            {errors.phone && <span className="form-error">{errors.phone}</span>}
            <input
              className="input-field"
              type="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
            {errors.email && <span className="form-error">{errors.email}</span>}

            <h2 className="card-label">Você possui graduação?</h2>
            <div className="radio-options">
              {['Sim', 'Não'].map((opt) => (
                <label key={opt} className="radio-label">
                  <input
                    type="radio"
                    name="formacao"
                    value={opt}
                    checked={formData.formacao === opt}
                    onChange={(e) => handleChange('formacao', e.target.value)}
                    className="radio-input"
                  />
                  <span className="radio-text">{opt}</span>
                </label>
              ))}
            </div>
            {errors.formacao && <span className="form-error">{errors.formacao}</span>}

            <h3 className="card-label">Área de Atuação na Indústria</h3>
            <div className="radio-options">
              {AREA_OPCOES.map((opt) => (
                <label key={opt} className="radio-label">
                  <input
                    type="radio"
                    name="area_atuacao"
                    value={opt}
                    checked={formData.area_atuacao === opt}
                    onChange={(e) => handleChange('area_atuacao', e.target.value)}
                    className="radio-input"
                  />
                  <span className="radio-text">{opt}</span>
                </label>
              ))}
            </div>
            {formData.area_atuacao === 'Outro' && (
              <input
                className="input-field"
                type="text"
                placeholder="Especifique a área"
                value={formData.area_atuacao_outro ?? ''}
                onChange={(e) => handleChange('area_atuacao_outro', e.target.value)}
              />
            )}
            {(errors.area_atuacao || errors.area_atuacao_outro) && (
              <span className="form-error">{errors.area_atuacao ?? errors.area_atuacao_outro}</span>
            )}

            <h3 className="card-label">Interesse em Formação</h3>
            <div className="radio-options">
              {INTERESSE_OPCOES.map((opt) => (
                <label key={opt} className="radio-label">
                  <input
                    type="radio"
                    name="interesse_formacao"
                    value={opt}
                    checked={formData.interesse_formacao === opt}
                    onChange={(e) => handleChange('interesse_formacao', e.target.value)}
                    className="radio-input"
                  />
                  <span className="radio-text">{opt}</span>
                </label>
              ))}
            </div>
            {errors.interesse_formacao && (
              <span className="form-error">{errors.interesse_formacao}</span>
            )}

            <section className="cta-section">
              <h3 className="cta-heading">Concorra a Prêmios Especiais</h3>
              <p className="cta-text">
                Após preencher seus dados, clique no botão abaixo para girar a roleta e descobrir
                seu prêmio.
              </p>
              <button className="submit-button" type="submit" disabled={!isValid}>
                GIRAR A ROLETA E DESCOBRIR MEU PRÊMIO
              </button>
            </section>
          </form>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <img src="/logo.png" alt="CDPI" className="footer-logo" />
          <div className="text-center md:text-right">
            <div className="flex justify-center md:justify-end space-x-3 mb-4">
              <a
                href="https://www.facebook.com/cdpipharma/"
                target="_blank"
                rel="noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/cdpipharma/"
                target="_blank"
                rel="noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/cdpi-pharma/"
                target="_blank"
                rel="noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com/@cdpimoving"
                target="_blank"
                rel="noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          <p className="footer-text">
            O CDPI PHARMA é uma Instituição de Graduação e Pós-graduação, especializada em
            treinamentos e consultorias técnicas/científicas, focado em profissionais e empresas do
            mercado industrial farmacêutico, sendo a empresa líder nesse segmento.
          </p>
        </div>
      </footer>
    </div>
  )
}
