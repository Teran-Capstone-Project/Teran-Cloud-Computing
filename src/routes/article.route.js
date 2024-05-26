import { Router } from 'express'
import { deleteArticle, getArticles, getArticle, postArticle, putArticle } from '../controllers/article.controller.js'

export const ArticleRouter = Router()

ArticleRouter.get('/', getArticles)
ArticleRouter.get('/:id', getArticle)
ArticleRouter.post('/', postArticle)
ArticleRouter.put('/:id', putArticle)
ArticleRouter.delete('/:id', deleteArticle)
