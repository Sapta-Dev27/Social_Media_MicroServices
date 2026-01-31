import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import generateAccessToken from "../utils/accessToken.js";
import generateRefreshToken from "../utils/refreshToken.js";
import bcrypt from "bcryptjs";

const userLogin = async (req,res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email or password does not exist'
      })
    }
    const findUser = await User.findOne({
      userEmail: email
    })
    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: 'User does not exist with given email !!'
      })
    }
    const checkPass = await bcrypt.compare(password, findUser.userPassword);
    if (!checkPass) {
      return res.status(403).json({
        success: false,
        message: 'Password is wrong. Pls check the password !!'
      })
    }
    const accessToken = generateAccessToken(findUser);
    const refreshToken = generateRefreshToken(findUser);

    return res.status(200).json({
      success: true,
      message: 'User logged in successfully !!',
      data: findUser,
      accessToken: accessToken,
      refreshToken: refreshToken
    })
  }
  catch (error) {
    console.log('Error in logging to USER', error)
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
}

export default userLogin;