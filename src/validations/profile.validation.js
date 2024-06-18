import { z } from 'zod'

export const updateProfileValidation = async (payload) => {
  return await z
    .object({
      name: z.string(),
    })
    .required()
    .safeParseAsync(payload)
}
