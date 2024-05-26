import { articleModel } from '../models/article.model.js'
import { userModel } from '../models/user.model.js'
import { commentModel } from '../models/comment.model.js'

export const findArticles = async () => {
  return await articleModel
    .find()
    .populate({
      path: 'user',
      model: userModel,
      select: '-password',
    })
    .populate({
      path: 'comments',
      model: commentModel,
    })
}

export const findArticleById = async (id) => {
  return await articleModel
    .findById(id)
    .populate({
      path: 'user',
      model: userModel,
      select: '-password',
    })
    .populate({
      path: 'comments',
      model: commentModel,
    })
}

export const createArticle = async (validatedArticle, request) => {
  return await articleModel.create({
    title: validatedArticle.data.title,
    description: validatedArticle.data.description,
    user: request.body.id,
  })
}

export const updateArticle = async (validatedArticle, id) => {
  return await articleModel.updateOne(
    {
      _id: id,
    },
    {
      title: validatedArticle.data.title,
      description: validatedArticle.data.description,
    },
  )
}

export const removeArticle = async (id) => {
  return await articleModel.deleteOne({
    _id: id,
  })
}
