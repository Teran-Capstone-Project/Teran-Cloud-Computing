import { handleValidation } from '../helpers/validation.helper.js'
import { createPredict, findPredictByUserId } from '../services/predict.service.js'
import { createPredictValidation } from '../validations/predict.validation.js'

export const getPredict = async (request, response) => {
  try {
    const { id } = request.user

    const predicts = await findPredictByUserId(id)

    if (!predicts) return response.status(404).json({ message: 'Predict not found' })

    return response.status(200).json({ message: 'get predict succesfully', predicts })
  } catch (error) {
    console.error('Internal server error:', error.message)
    return response.status(500).json({ message: error })
  }
}

export const postPredict = async (request, response) => {
  try {
    const { id } = request.user

    const validatedPredict = await handleValidation(request, response, createPredictValidation)

    if (!validatedPredict.success) return

    const predict = await createPredict(validatedPredict.data, id)

    return response.status(201).json({ message: 'Predict succesfully created', predict })
  } catch (error) {
    console.error('Internal server error:', error.message)
    return response.status(500).json({ message: error })
  }
}
