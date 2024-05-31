import { handleValidation } from '../helpers/validation.helper.js'
import { createComment, findCommentById, removeComment, updateComment } from '../services/comment.service.js'
import { createCommentValidation } from '../validations/comment.validation.js'

export const postComment = async (request, response) => {
  try {
    const validatedComment = await handleValidation(request, response, createCommentValidation)

    if (!validatedComment.success) return

    const { userId, postId } = request.body

    await createComment(validatedComment.data, userId, postId)

    return response.status(201).json({ message: 'comment successfully created' })
  } catch (error) {
    console.error('Internal server error:', error.message)
    return response.status(500).json({ message: error })
  }
}
export const putComment = async (request, response) => {
  try {
    const { id } = request.params
    const comment = await findCommentById(id)

    if (!comment) return response.status(404).json({ message: 'Comment not found' })

    const validatedComment = await handleValidation(request, response, createCommentValidation)

    if (!validatedComment.success) return

    await updateComment(validatedComment.data, id)

    return response.status(200).json({ message: 'Comment succesfully updated' })
  } catch (error) {
    console.error('Internal server error:', error.message)
    return response.status(500).json({ message: error })
  }
}
export const deleteComment = async (request, response) => {
  try {
    const { id } = request.params
    const comment = await findCommentById(id)

    if (!comment) return response.status(404).json({ message: 'Comment not found' })

    await removeComment(id)

    return response.status(200).json({ message: 'Comment succesfully deleted' })
  } catch (error) {
    console.error('Internal server error:', error.message)
    return response.status(500).json({ message: error })
  }
}
