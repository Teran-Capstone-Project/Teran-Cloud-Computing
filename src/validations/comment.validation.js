import { z } from 'zod'

export const createCommentValidation = async (payload) => {
  return await z
    .object({
      content: z.string(),
    })
    .required()
    .safeParseAsync(payload)
}
