import { z } from 'zod'

export const createArticleValidation = async (payload) => {
  return await z
    .object({
      title: z.string(),
      description: z.string(),
    })
    .required()
    .safeParseAsync(payload)
}
