import { z } from 'zod'

export const createReportValidation = async (payload) => {
  return await z
    .object({
      reason: z.string(),
    })
    .required()
    .safeParseAsync(payload)
}
