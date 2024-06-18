import { reportModel } from '../models/report.model.js'
import { postModel } from '../models/post.model.js'
import { userModel } from '../models/user.model.js'

export const findReports = async () => {
  return await reportModel.find().populate({
    path: 'post',
    model: postModel,
    populate: {
      path: 'user',
      model: userModel,
      select: '-password',
    },
    options: {
      sort: {
        createdAt: -1,
      },
    },
  })
}

export const findReportById = async (id) => {
  return await reportModel.findById(id)
}

export const createReport = async (payload, id) => {
  return await reportModel.create({
    reason: payload.reason,
    post: id,
  })
}

export const removeReportById = async (id) => {
  const report = await reportModel.findById(id)

  await postModel.findByIdAndDelete(report.post)

  await reportModel.findByIdAndDelete(id)

  return report
}
