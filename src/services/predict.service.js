import { predictModel } from '../models/predict.model.js'
import { userModel } from '../models/user.model.js'

export const findPredictByUserId = async (id) => {
  return await predictModel
    .find()
    .where({
      user: id,
    })
    .populate({
      path: 'user',
      model: userModel,
      select: '-password',
    })
    .sort({ createdAt: -1 })
}

export const findPredictById = async (id) => {
  return await predictModel.findById(id).populate({
    path: 'user',
    model: userModel,
    select: '-password',
  })
}
export const createPredict = async (payload, id) => {
  return await predictModel.create({
    result: payload.result,
    user: id,
  })
}
