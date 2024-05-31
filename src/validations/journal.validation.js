import { z } from 'zod'

export const createJournalValidation = async (payload) => {
  return await z
    .object({
      description: z.string(),
    })
    .required()
    .safeParseAsync(payload)
}
