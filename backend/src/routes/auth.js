import express from 'express';
import { generateToken, jwtAuthMiddleware } from '../utils/auth.js';
import User from '../models/User.js';
import sendJson from '../utils/response.js';
import asyncHandler from '../utils/asyncHandler.js';
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'


dotenv.config()
const router = express.Router();

router.post('/signup', asyncHandler(async (req, res)=>{
  const { email, password } = req.body;

  if (await User.findOne({where: {email}})) {
    const error = Error('Account already exists.');
    error.statusCode = 401;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({email, password: hashedPassword});

  const token = generateToken({id: user.id});
  
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.IsProduction === 'true',
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60
  });

  return sendJson(res, "Signup successful", {token}, true, 200);    // remove token in prod
}));


router.post('/login', asyncHandler(async (req, res)=>{
  const { email, password } = req.body;
  const user = await User.findOne({where: {email}})

  if (!user || !await bcrypt.compare(password, user.password)) {
    const error = Error('Invalid Credentials');
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken({id: user.id});

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.IsProduction === 'true',
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60
  });

  return sendJson(res, "Login successful", {token}, true, 200);    // remove token in prod
}));

router.post('/verify', jwtAuthMiddleware, asyncHandler(async (req, res)=>{
  sendJson(res, "User verified", {}, true, 200)
}));

export default router;