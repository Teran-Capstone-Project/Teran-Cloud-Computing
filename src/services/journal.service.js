import { journalModel } from '../models/journal.model.js'
import { userModel } from '../models/user.model.js'

export const findJournal = async (id) => {
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
export const createJournal = async (validatedJournal, request) => {
  return await journalModel.create({
    title: validatedJournal.data.title,
    description: validatedJournal.data.description,
    user: request.body.id,
  })
}

export const updateJournal = async (validatedJournal, id) => {
  return await journalModel.findByIdAndUpdate(id, {
    title: validatedJournal.data.title,
    description: validatedJournal.data.description,
  })
}

export const removeJournal = async (id) => {
  return await journalModel.findByIdAndDelete(id)
}
