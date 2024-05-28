import { handleValidation } from '../helpers/validation.helper.js'
import {
  createJournal,
  findJournalById,
  findJournal,
  removeJournal,
  updateJournal,
} from '../services/journal.service.js'
import { createJournalValidation } from '../validations/journal.validation.js'

export const getJournals = async (request, response) => {
  try {
    const { id } = request.body
    const journals = await findJournal(id)

    return response.status(200).json({ message: 'get journal succesfully', journals })
  } catch (error) {
    console.error('Internal server error:', error.message)
    return response.status(500).json({ message: error })
  }
}

export const getJournal = async (request, response) => {
  try {
    const { id } = request.params

    const journal = await findJournalById(id)

    if (!journal) return response.status(404).json({ message: 'Journal not found' })

    return response.status(200).json({ message: 'get journal succesfully', journal })
  } catch (error) {
    console.error('Internal server error:', error.message)
    return response.status(500).json({ message: error })
  }
}

export const postJournal = async (request, response) => {
  try {
    const validatedJournal = await handleValidation(request, response, createJournalValidation)

    if (!validatedJournal.success) return

    await createJournal(validatedJournal, request)

    return response.status(200).json({ message: 'Journal succesfully created' })
  } catch (error) {
    console.error('Internal server error:', error.message)
    return response.status(500).json({ message: error })
  }
}

export const putJournal = async (request, response) => {
  try {
    const { id } = request.params
    const journal = await findJournalById(id)

    if (!journal) return response.status(404).json({ message: 'Journal not found' })

    const validatedJournal = await handleValidation(request, response, createJournalValidation)

    if (!validatedJournal.success) return

    await updateJournal(validatedJournal, id)

    return response.status(200).json({ message: 'journal succesfully updated' })
  } catch (error) {
    console.error('Internal server error:', error.message)
    return response.status(500).json({ message: error })
  }
}

export const deleteJournal = async (request, response) => {
  try {
    const { id } = request.params

    const journal = await findJournalById(id)

    if (!journal) return response.status(404).json({ message: 'Journal not found' })

    await removeJournal(id)

    return response.status(200).json({ message: 'Journal succesfully deleted' })
  } catch (error) {
    console.error('Internal server error:', error.message)
    return response.status(500).json({ message: error })
  }
}
