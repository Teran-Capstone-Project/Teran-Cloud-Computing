import { handleValidation } from '../helpers/validation.helper.js'
import {
  createPost,
  findPostById,
  findPosts,
  findPostsByUserId,
  removePost,
  updatePost as updatePostById,
} from '../services/post.service.js'
import { createPostValidation } from '../validations/post.validation.js'

export const getPosts = async (request, response) => {
  try {
    const { user: id } = request.query

    if (id) {
      const posts = await findPostsByUserId(id)
      return response.status(200).json({ message: 'get posts succesfully', posts })
    }

    const posts = await findPosts()

    return response.status(200).json({ message: 'get posts succesfully', posts })
  } catch (error) {
    console.error('Internal server error:', error.message)
    return response.status(500).json({ message: error })
  }
}

export const getPost = async (request, response) => {
  try {
    const { id } = request.params

    const post = await findPostById(id)

    if (!post) return response.status(404).json({ message: 'Post not found' })

    return response.status(200).json({ message: 'get post succesfully', post })
  } catch (error) {
    console.error('Internal server error:', error.message)
    return response.status(500).json({ message: error })
  }
}

export const insertPost = async (request, response) => {
  try {
    const { id } = request.user

    const validatedPost = await handleValidation(request, response, createPostValidation)

    if (!validatedPost.success) return

    await createPost(validatedPost.data, id)

    return response.status(201).json({ message: 'Post succesfully created' })
  } catch (error) {
    console.error('Internal server error:', error.message)
    return response.status(500).json({ message: error })
  }
}

export const updatePost = async (request, response) => {
  try {
    const { id } = request.params

    const post = await findPostById(id)

    if (!post) return response.status(404).json({ message: 'Post not found' })

    const validatedPost = await handleValidation(request, response, createPostValidation)

    if (!validatedPost.success) return

    await updatePostById(validatedPost.data, id)

    return response.status(200).json({ message: 'post succesfully updated' })
  } catch (error) {
    console.error('Internal server error:', error.message)
    return response.status(500).json({ message: error })
  }
}

export const deletePost = async (request, response) => {
  try {
    const { id } = request.params

    const post = await findPostById(id)

    if (!post) return response.status(404).json({ message: 'Post not found' })

    await removePost(id)

    return response.status(200).json({ message: 'Post succesfully deleted' })
  } catch (error) {
    console.error('Internal server error:', error.message)
    return response.status(500).json({ message: error })
  }
}
