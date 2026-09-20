require('dotenv').config()
const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ status: 'Nyota Funds v3 API running' })
})

app.post('/api/pay', async (req, res) => {
  const { phone, amount, reference, description } = req.body
  if (!phone || !amount || !reference) {
    return res.status(400).json({ success: false, message: 'Missing required fields' })
  }
  let p = phone.toString().replace(/\D/g, '')
  if (p.startsWith('0')) p = '254' + p.slice(1)
  if (!p.startsWith('254')) p = '254' + p
  try {
    const r = await axios.post(
      'https://api.paylorke.com/api/v1/merchants/payments/stk-push',
      { phone: p, amount: Number(amount), reference, channelId: process.env.PAYLOR_CHANNEL_ID, description: description || 'Nyota Funds Fee' },
      { headers: { 'Authorization': `Bearer ${process.env.PAYLOR_API_KEY}`, 'Content-Type': 'application/json' } }
    )
    const d = r.data
    if (d.success || d.status === 'success' || d.ResponseCode === '0') {
      return res.json({ success: true, message: 'STK Push sent!', reference, data: d })
    }
    return res.status(400).json({ success: false, message: d.message || 'Payment failed' })
  } catch (err) {
    console.error(err.response?.data || err.message)
    return res.status(500).json({ success: false, message: err.response?.data?.message || 'Service unavailable' })
  }
})

app.listen(PORT, () => console.log(`Nyota Funds v3 running on port ${PORT}`))
