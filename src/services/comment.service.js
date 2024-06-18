import { postModel } from '../models/post.model.js'
import { commentModel } from '../models/comment.model.js'
import { userModel } from '../models/user.model.js'

export const createComment = async (payload, userId, postId) => {
  const comment = await commentModel.create({
    user: userId,
    post: postId,
    content: payload.content,
  })
  await postModel.findByIdAndUpdate(postId, {
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

export const updateComment = async (payload, id) => {
  return await commentModel.findByIdAndUpdate(
    id,
    {
      content: payload.content,
    },
    {
      new: true,
    },
  )
}

export const removeComment = async (id) => {
  const comment = await commentModel.findByIdAndDelete(id)
  if (comment) {
    await postModel.findByIdAndUpdate(comment.post, {
      $pull: {
        comments: id,
      },
    })
  }
  return comment
}
