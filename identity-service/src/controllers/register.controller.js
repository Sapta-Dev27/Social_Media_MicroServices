import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import generateAccessToken from '../utils/accessToken.js'
import generateRefreshToken from '../utils/refreshToken.js'
import bycrypt from 'bcryptjs'

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email or Name or Password is missing'
      })
    }
    const checkUser = await User.findOne({
      $or: [
        {
          userName: name
        }, {
          userEmail: email
        }
      ]
    })
    if (checkUser) {
      console.log('User already exists');
      return res.status(409).json({
        success: false,
        message: 'User already exists !!'
      })
    }
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(  password,  salt);

    const createUser = await User.create({
      userEmail: email,
      userName: name,
      userPassword: hashedPassword
    })

    const accessToken = generateAccessToken(createUser);
    const refreshToken = generateRefreshToken(createUser);

    if (createUser) {
      console.log('User is created successfully :')
      return res.status(201).json({
        success: true,
        message: 'User is created successfully',
        data: createUser,
        accessToken: accessToken,
        refreshToken: refreshToken
      })
    }
  }
  catch (error) {
    console.log('Error in register : ', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
}

export default registerUser;