import { journalModel } from '../models/journal.model.js'
import { userModel } from '../models/user.model.js'

export const findJournalsByUserId = async (id) => {
  return await journalModel
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

export const findJournalById = async (id) => {
  return await journalModel.findById(id).populate({
    path: 'user',
    model: userModel,
    select: '-password',
  })
}
export const createJournal = async (payload, id) => {
  return await journalModel.create({
    description: payload.description,
    user: id,
  })
}

export const updateJournal = async (payload, id) => {
  return await journalModel.findByIdAndUpdate(id, {
    description: payload.description,
  })
}

export const removeJournal = async (id) => {
  return await journalModel.findByIdAndDelete(id)
}
