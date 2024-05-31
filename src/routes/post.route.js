import { Router } from 'express'
import { deletePost, getPost, getPosts, insertPost, updatePost } from '../controllers/post.controller.js'

export const PostRouter = Router()

PostRouter.get('/', getPosts)
PostRouter.get('/:id', getPost)
PostRouter.post('/', insertPost)
PostRouter.put('/:id', updatePost)
PostRouter.delete('/:id', deletePost)
