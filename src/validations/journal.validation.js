import { z } from 'zod'

export const createJournalValidation = async (payload) => {
  return await z
    .object({
      title: z.string(),
      description: z.string(),
    })
    .required()
    .safeParseAsync(payload)
}
