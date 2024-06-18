import { z } from 'zod'

export const createPredictValidation = async (payload) => {
  return await z
    .object({
      result: z.string(),
    })
    .required()
    .safeParseAsync(payload)
}
