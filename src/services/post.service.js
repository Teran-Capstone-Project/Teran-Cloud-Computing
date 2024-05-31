import { postModel } from '../models/post.model.js'
import { userModel } from '../models/user.model.js'
import { commentModel } from '../models/comment.model.js'

export const findPosts = async () => {
  return await postModel
    .find()
    .populate({
      path: 'user',
      model: userModel,
      select: '-password',
    })
    .populate({
      path: 'comments',
      model: commentModel,
      select: '-post',
      populate: {
        path: 'user',
        model: userModel,
        select: '-password',
      },
    })
    .sort({ createdAt: -1 })
}

export const findPostsByUserId = async (id) => {
  return await postModel
    .find({
      user: id,
    })
    .populate({
      path: 'user',
      model: userModel,
      select: '-password',
    })
    .populate({
      path: 'comments',
      model: commentModel,
      select: '-post',
      populate: {
        path: 'user',
        model: userModel,
        select: '-password',
      },
    })
}

export const findPostById = async (id) => {
  return await postModel
    .findById(id)
    .populate({
      path: 'user',
      model: userModel,
      select: '-password',
    })
    .populate({
      path: 'comments',
      model: commentModel,
      select: '-post',
      populate: {
        path: 'user',
        model: userModel,
        select: '-password',
      },
    })
}

export const createPost = async (payload, id) => {
  return await postModel.create({
    description: payload.description,
    anonim: payload.anonim,
    user: id,
  })
}

export const updatePost = async (payload, id) => {
  return await postModel.findByIdAndUpdate(id, {
    description: payload.description,
    anonim: payload.anonim,
  })
}

export const removePost = async (id) => {
  return await postModel.findByIdAndDelete(id)
}
