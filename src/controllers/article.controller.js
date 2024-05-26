import { handleValidation } from '../helpers/validation.helper.js'
import {
  createArticle,
  findArticleById,
  findArticles,
  removeArticle,
  updateArticle,
} from '../services/article.service.js'
import { createArticleValidation } from '../validations/article.validation.js'

export const getArticles = async (_, response) => {
  try {
    const articles = await findArticles()

    return response.status(200).json({ message: 'get article succesfully', articles })
  } catch (error) {
    console.error('Internal server error:', error.message)
    return response.status(500).json({ message: error })
  }
}

export const getArticle = async (request, response) => {
  try {
    const { id } = request.params

    const article = await findArticleById(id)

    if (!article) return response.status(404).json({ message: 'Article not found' })

    return response.status(200).json({ message: 'get article succesfully', article })
  } catch (error) {
    console.error('Internal server error:', error.message)
    return response.status(500).json({ message: error })
  }
}

export const postArticle = async (request, response) => {
  try {
    const validatedArticle = await handleValidation(request, response, createArticleValidation)

    if (!validatedArticle.success) return

    await createArticle(validatedArticle, request)

    return response.status(200).json({ message: 'Article succesfully created' })
  } catch (error) {
    console.error('Internal server error:', error.message)
    return response.status(500).json({ message: error })
  }
}

export const putArticle = async (request, response) => {
  try {
    const { id } = request.params
    const article = await findArticleById(id)

    if (!article) return response.status(404).json({ message: 'Article not found' })

    const validatedArticle = await handleValidation(request, response, createArticleValidation)

    if (!validatedArticle.success) return

    await updateArticle(validatedArticle, id)

    return response.status(200).json({ message: 'article succesfully updated' })
  } catch (error) {
    console.error('Internal server error:', error.message)
    return response.status(500).json({ message: error })
  }
}

export const deleteArticle = async (request, response) => {
  try {
    const { id } = request.params

    const article = await findArticleById(id)

    if (!article) return response.status(404).json({ message: 'Article not found' })

    await removeArticle(id)

    return response.status(200).json({ message: 'Article succesfully deleted' })
  } catch (error) {
    console.error('Internal server error:', error.message)
    return response.status(500).json({ message: error })
  }
}
