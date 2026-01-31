import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    trim: true
  },
  userEmail: {
    type: String,
    unique: true,
    trim: true
  },
  userPassword: {
    type: String,
    unique: true,
    trim: true
  }
}, {
  timestamps: true
}
)

const User = mongoose.model("User", userSchema)
export default User;