import mongoose from 'mongoose'

const predictSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    result: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

export const predictModel = mongoose.model('Predict', predictSchema)
