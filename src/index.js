import cors from 'cors'
import express from 'express'
import 'dotenv/config.js'
import './utils/connection.js'
import { AuthRouter } from './routes/auth.route.js'
import { PostRouter } from './routes/post.route.js'
import { CommentRouter } from './routes/comment.route.js'
import { JournalRouter } from './routes/journal.route.js'
import { verifyToken } from './middleware/verifyToken.middleware.js'

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
app.use('/posts', verifyToken, PostRouter)
app.use('/comments', verifyToken, CommentRouter)
app.use('/journals', verifyToken, JournalRouter)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
