import { Router } from 'express'
import { getPredict, postPredict } from '../controllers/predict.controller.js'

export const PredictRouter = Router()

PredictRouter.get('/', getPredict)
PredictRouter.post('/', postPredict)
