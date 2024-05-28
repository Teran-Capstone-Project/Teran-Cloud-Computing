import { Router } from 'express'
import {
  deleteJournal,
  getJournals,
  getJournal,
  postJournal,
  putJournal,
} from '../controllers/journal.controller.js'

export const JournalRouter = Router()

JournalRouter.get('/', getJournals)
JournalRouter.get('/:id', getJournal)
JournalRouter.post('/', postJournal)
JournalRouter.put('/:id', putJournal)
JournalRouter.delete('/:id', deleteJournal)
