import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

console.log(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL)
console.log(process.env.GOOGLE_PRIVATE_KEY)
console.log(process.env.GOOGLE_SHEET_ID)

type SubmitRequest = {
  method?: string
  body: {
    name: string
    email: string
    phone: string
    formacao: string
    area_atuacao: string
    area_atuacao_outro?: string | null
    interesse_formacao: string
    prize: string
    code: string
  }
}

type SubmitResponse = {
  status: (code: number) => SubmitResponse
  send: (body: string) => void
  json: (body: unknown) => void
}

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
  key: process.env.GOOGLE_PRIVATE_KEY!.replaceAll(String.raw`\n`, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})

export default async function handler(req: SubmitRequest, res: SubmitResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed')

  const { name, email, phone, formacao, area_atuacao, area_atuacao_outro, interesse_formacao, prize, code } = req.body

  if (!name || !email || !phone || !formacao || !area_atuacao || !interesse_formacao || !prize || !code) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID!, serviceAccountAuth)
    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[0]

    await sheet.addRow({
      Data: new Date().toLocaleString('pt-BR'),
      Nome: name,
      Telefone: phone,
      Email: email,
      PossuiFormacao: formacao,
      AreaAtuacao: area_atuacao,
      AreaAtuacaoOutro: area_atuacao_outro ?? '',
      InteresseFormacao: interesse_formacao,
      Premio: prize,
      Codigo: code,
    })

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Submit error:', error)
    return res.status(500).json({ error: 'Failed to submit' })
  }
}
