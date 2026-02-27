export interface Prize {
  id: string
  label: string
  type?: string
  color: string
  textColor: string
}

export const WHEEL_SEGMENTS: Prize[] = [
  { id: '1', label: 'E-book Digital Exclusive', color: '#0066cc', textColor: '#ffffff' },
  { id: '2', label: 'Desconto Especial em Cursos e Programas', color: '#f0f0f0', textColor: '#0066cc' },
  { id: '3', label: 'Presente CDPI Pharma', color: '#0066cc', textColor: '#ffffff' },
  { id: '4', label: 'Kit Premium CDPI Pharma', color: '#f0f0f0', textColor: '#0066cc' },
]

export const PRIZE_LABEL_TO_INDEX: Record<string, number> = {
  'E-book Digital Exclusive': 0,
  'Desconto Especial em Cursos e Programas': 1,
  'Presente CDPI Pharma': 2,
  'Kit Premium CDPI Pharma': 3,
}
