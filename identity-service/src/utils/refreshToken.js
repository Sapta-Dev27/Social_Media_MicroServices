import jwt from 'jsonwebtoken'

const JWT_REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY;
const JWT_REFRESH_TOKEN_EXPIRY = process.env.JWT_REFRESH_TOKEN_EXPIRY;


const generateRefreshToken = (user) => {
  const payLoad = {
    id: user._id,
    userNameFromRefreshToken: user.userName,
    userEmailFromRefreshToken: user.userEmail
  }
  const token = jwt.sign(payLoad, JWT_REFRESH_SECRET_KEY, {
    expiresIn: JWT_REFRESH_TOKEN_EXPIRY
  })
  return token;
}

export default generateRefreshToken;