import { z } from 'zod'

export const createPostValidation = async (payload) => {
  return await z
    .object({
      description: z.string(),
      anonim: z.boolean(),
    })
    .required()
    .safeParseAsync(payload)
}
