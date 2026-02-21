import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import Thread from '../models/Thread.js';
import Message from '../models/Message.js';
import sendJson from '../utils/response.js';
import asyncHandler from '../utils/asyncHandler.js';

const router = express.Router();

router.delete('/', asyncHandler( async (req, res)=>{
  const userId = req.user.id;
  const user = await User.findByPk(userId, {attributes: ['password']});
  
  if (!req.body.password || !(await bcrypt.compare(req.body.password, user.password))){
    const error = Error('Invalid Credentials');
    error.statusCode = 401;
    throw error;
  }

  const threads = await Thread.findAll({where: {userId}, attributes: ['id']});

  for(const thread of threads){
    await Message.destroy({where: {threadId: thread.id}})
  }

  await Thread.destroy({where: {userId}})
  await User.destroy({where: {id: userId}});

  sendJson(res, "User Sucessfully Deleted.", {}, true, 200)
  res.clearCookie('token')
}));

export default router;