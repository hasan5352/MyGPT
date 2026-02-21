import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import asyncHandler from './asyncHandler.js';
import User from '../models/User.js';

dotenv.config()

export const jwtAuthMiddleware = asyncHandler(async (req, res, next) => {
  const error = Error('Unauthorized');
  error.statusCode = 401;

  const authHeader = req.headers.authorization;
  if (!authHeader) throw error;
  
  const token = authHeader.split(' ')[1];
  if (!token) throw error;

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    
    if (!await User.findByPk(req.user.id)) throw Error("User does not exist.");
    next();
  } catch(err){
    console.log('Invalid JWT Error in AuthMiddleware: ', err);
    throw error;
  }
})

export function generateToken(userData){
  return jwt.sign(userData, process.env.JWT_SECRET)
}
