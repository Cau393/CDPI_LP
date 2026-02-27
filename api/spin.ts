import Chance from 'chance'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

type SpinRequest = { method?: string; body?: unknown }
type SpinResponse = {
  status: (code: number) => SpinResponse
  send: (body: string) => void
  json: (body: unknown) => void
}

const chance = new Chance()

const PRIZES = [
  'E-book Digital Exclusive',
  'Desconto Especial em Cursos e Programas',
  'Presente CDPI Pharma',
  'Kit Premium CDPI Pharma',
] as const

const WEIGHTS = [50, 35, 10, 5] as const

function generateCode(): string {
  return (Math.floor(100000 + Math.random() * 900000)).toString()
}

export default async function handler(req: SpinRequest, res: SpinResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed')

  try {
    const prize = chance.weighted([...PRIZES], [...WEIGHTS])
    const code = generateCode()

    return res.status(200).json({ success: true, prize, code })
  } catch (error) {
    console.error('Spin error:', error)
    return res.status(500).json({ error: 'Failed to spin' })
  }
}
