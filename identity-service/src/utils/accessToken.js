import jwt from 'jsonwebtoken'

const JWT_ACCESS_SECRET_KEY = process.env.JWT_ACCESS_SECRET_KEY;
const JWT_ACCESS_TOKEN_EXPIRY = process.env.JWT_ACCESS_TOKEN_EXPIRY;

const generateAccessToken = (user) => {
  const payLoad = {
    id: user._id,
    userNameFromAcessToken: user.userName,
    userEmailFromAccessToken: user.userEmail
  }
  const token = jwt.sign(payLoad, JWT_ACCESS_SECRET_KEY , {
    expiresIn : JWT_ACCESS_TOKEN_EXPIRY
  })
  return token;
}

export default generateAccessToken ;