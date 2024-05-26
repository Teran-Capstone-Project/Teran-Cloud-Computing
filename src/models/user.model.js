import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'psikolog'],
      default: 'user',
      required: true,
    },
  },
  { timestamps: true },
)

const userModel = mongoose.model('User', userSchema)
export default userModel
