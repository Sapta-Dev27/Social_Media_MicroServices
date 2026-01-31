import mongoose from 'mongoose'


const connectToDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    if (connect) {
      console.log('Database connection is successfull')
    }
  }
  catch (error) {
    console.log(' Error in connecting to Database :', error)
  }
}

export default connectToDb