import express from 'express'
import 'dotenv/config.js'

const app = express()
const port = process.env.PORT

app.get('/', (_, res) => res.json({ message: 'Hello world' }))

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
