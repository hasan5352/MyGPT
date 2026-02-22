import express from 'express';
import Thread from '../models/Thread.js'
import Message from '../models/Message.js'
import getAIResponse from '../utils/ai.js';
import asyncHandler from '../utils/asyncHandler.js';
import sendJson from '../utils/response.js';

const router = express.Router();

router.get('/', asyncHandler( async (req, res)=>{
  const threads = await Thread.findAll({where:{userId: req.user.id}, attributes:['id', 'title']});
  sendJson(res, "Threads retreival successful.", {threads});
}));

router.post('/', asyncHandler( async (req, res)=>{
  const message = req.body.message;
  if (!message || !message.trim()) {
    const error = Error('Message must not be empty');
    error.code = 400;
    throw error;
  }

  const title = await getAIResponse(`Ans in very short without formatting. very short 1-3 word title for :  ${message}`);
  const aiResponse = await getAIResponse(message);
  const thread = await Thread.create({userId: req.user.id, title})
  
  const msgs = [
    {role: 'user', content: message, threadId: thread.id},
    {role: 'robot', content: aiResponse, threadId: thread.id}
  ]
  
  await Message.bulkCreate(msgs)

  sendJson(res, "AI response generation successful", {aiResponse, title, threadId: thread.id})
}));

router.post('/:threadId', asyncHandler( async (req, res)=>{
  const id = req.params.threadId;

  if (!await Thread.findByPk(id)) {
    const error = new Error(`Thread ${id} does not exist.`);
    error.code  = 404;
    throw error;
  }

  const message = req.body.message;

  if (!message || !message.trim()) {
    const error = Error('Message must not be empty');
    error.code = 400;
    throw error;
  }

  const aiResponse = await getAIResponse(message);
  const msgs = [
    {role: 'user', content: message, threadId: id},
    {role: 'robot', content: aiResponse, threadId: id}
  ]
  
  await Message.bulkCreate(msgs)
  sendJson(res, "AI response successfully generated", { aiResponse });
}));

router.get('/:threadId', asyncHandler( async (req, res)=>{
  const id = req.params.threadId;
  const thread = await Thread.findByPk(id, {attributes: ['title']});

  if (!thread) {
    const error = new Error(`Thread ${id} does not exist.`);
    error.code  = 404;
    throw error;
  }

  const messages = await Message.findAll({ where: {threadId: id}, attributes:['role', 'content'] })
  sendJson(res, `Thread successfully retreived.`, {title: thread.title, messages});
}));

router.delete('/:threadId', asyncHandler( async (req, res)=>{
  const id = req.params.threadId;

  if (!await Thread.findByPk(id)) {
    const error = new Error(`Thread id ${id} does not exist.`);
    error.code  = 404;
    throw error;
  }

  await Message.destroy({ where: {threadId: id}});
  await Thread.destroy({ where: {id: id}});

  sendJson(res, `Thread ${id} successfully deleted.`, {});
}));




export default router;