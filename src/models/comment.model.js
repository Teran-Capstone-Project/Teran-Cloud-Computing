import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Article',
      required: true,
    },
    content: {
      type: String,
      required: [true, 'Comment is required'],
    },
  },
  { timestamps: true },
)

export const commentModel = mongoose.model('Comment', commentSchema)
