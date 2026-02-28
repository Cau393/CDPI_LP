export interface Prize {
  id: string
  label: string
  type?: string
  color: string
  textColor: string
}

const PRIZES_4: Prize[] = [
  { id: '1', label: 'E-book Digital Exclusive', color: '#0066cc', textColor: '#ffffff' },
  { id: '2', label: 'Desconto Especial em Cursos e Programas', color: '#f0f0f0', textColor: '#0066cc' },
  { id: '3', label: 'Presente CDPI Pharma', color: '#0066cc', textColor: '#ffffff' },
  { id: '4', label: 'Kit Premium CDPI Pharma', color: '#f0f0f0', textColor: '#0066cc' },
]

/** 8 segments: each prize twice in alternating order (0,1,2,3,0,1,2,3) */
export const WHEEL_SEGMENTS: Prize[] = [
  ...PRIZES_4,
  ...PRIZES_4,
]

export const PRIZE_LABEL_TO_INDEX: Record<string, number> = {
  'E-book Digital Exclusive': 0,
  'Desconto Especial em Cursos e Programas': 1,
  'Presente CDPI Pharma': 2,
  'Kit Premium CDPI Pharma': 3,
}

/** Maps prize label to segment indices (2 segments per prize for 8-segment wheel) */
export const PRIZE_LABEL_TO_SEGMENT_INDICES: Record<string, [number, number]> = {
  'E-book Digital Exclusive': [0, 4],
  'Desconto Especial em Cursos e Programas': [1, 5],
  'Presente CDPI Pharma': [2, 6],
  'Kit Premium CDPI Pharma': [3, 7],
}
