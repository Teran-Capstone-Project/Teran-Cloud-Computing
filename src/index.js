import cors from 'cors'
import express from 'express'
import 'dotenv/config.js'
import './utils/connection.js'
import { AuthRouter } from './routes/auth.route.js'

const port = process.env.PORT
const app = express()
app.use(express.json())
app.use(
  cors({
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    origin: ['*'],
  }),
)

app.get('/', (_, res) => res.json({ message: 'Hello world' }))
app.use('/auth', AuthRouter)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
