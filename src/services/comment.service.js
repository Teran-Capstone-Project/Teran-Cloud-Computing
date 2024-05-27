import { articleModel } from '../models/article.model.js'
import { commentModel } from '../models/comment.model.js'
import { userModel } from '../models/user.model.js'

export const createComment = async (validatedComment, userId, articleId) => {
  const comment = await commentModel.create({
    user: userId,
    article: articleId,
    content: validatedComment.data.content,
  })
  await articleModel.findByIdAndUpdate(articleId, {
    $push: {
      comments: comment._id,
    },
  })
  return comment
}

export const findCommentById = async (id) => {
  return await commentModel.findById(id).populate({
    path: 'user',
    model: userModel,
    select: '-password',
  })
}

export const updateComment = async (validatedComment, id) => {
  return await commentModel.findByIdAndUpdate(
    id,
    {
      content: validatedComment.data.content,
    },
    {
      new: true,
    },
  )
}

export const removeComment = async (id) => {
  const comment = await commentModel.findByIdAndDelete(id)
  if (comment) {
    await articleModel.findByIdAndUpdate(comment.article, {
      $pull: {
        comments: id,
      },
    })
  }
  return comment
}
