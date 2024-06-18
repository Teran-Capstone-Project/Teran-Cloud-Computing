import mongoose from 'mongoose'

mongoose
  .connect(String(process.env.DATABASE_URL))
  .then(() => {
    console.log('Connection succesfully')
  })
  .catch((error) => {
    console.log('Connection failed', error.message)
  })
