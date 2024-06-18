import { handleValidation } from '../helpers/validation.helper.js'
import { createReport, findReportById, findReports, removeReportById } from '../services/report.service.js'
import { createReportValidation } from '../validations/report.validation.js'

export const getReports = async (_, response) => {
  try {
    const reports = await findReports()
    return response.status(200).json({ message: 'get reports succesfully', reports })
  } catch (error) {
    console.error('Internal server error:', error.message)
    return response.status(500).json({ message: error })
  }
}

export const postReport = async (request, response) => {
  try {
    const { id } = request.params
    const validatedReport = await handleValidation(request, response, createReportValidation)

    if (!validatedReport.success) return

    await createReport(validatedReport.data, id)

    return response.status(201).json({ message: 'Report succesfully created' })
  } catch (error) {
    console.error('Internal server error:', error.message)
    return response.status(500).json({ message: error })
  }
}
export const deleteReport = async (request, response) => {
  try {
    const { id } = request.params
    const report = await findReportById(id)
    if (!report) return response.status(404).json({ message: 'Report not found' })
    await removeReportById(id)
    return response.status(200).json({ message: 'Report succesfully deleted' })
  } catch (error) {
    console.error('Internal server error:', error.message)
    return response.status(500).json({ message: error })
  }
}
