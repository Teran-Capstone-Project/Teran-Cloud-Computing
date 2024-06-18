import { Router } from 'express'
import { deleteReport, getReports, postReport } from '../controllers/report.controller.js'

export const ReportRouter = Router()

ReportRouter.get('/', getReports)
ReportRouter.post('/:id', postReport)
ReportRouter.delete('/:id', deleteReport)
