import mongoose from 'mongoose'

const reportSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

export const reportModel = mongoose.model('Report', reportSchema)
