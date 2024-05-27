import { Router } from 'express'
import { deleteComment, postComment, putComment } from '../controllers/comment.controller.js'

export const CommentRouter = Router()

CommentRouter.post('/', postComment)
CommentRouter.put('/:id', putComment)
CommentRouter.delete('/:id', deleteComment)
