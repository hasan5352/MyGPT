import './HomePage.css';
import Sidebar from "../Sidebar/Sidebar.jsx";
import ChatWindow from "../ChatWindow/ChatWindow.jsx";
import {MyContext} from "../MyContext.jsx";
import { useState } from 'react';
import axios from 'axios';

export default function HomePage(){
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState('');
  const [prevChats, setPrevChats] = useState([]); //stores all chats of curr threads
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);

  function createNewChat(){
    setCurrThreadId(''); setNewChat(true);
    setPrompt(""); setReply(null); setPrevChats([]);
  }

  const changeThread = async (id) => {
      setCurrThreadId(id);
  
      try {
        const response = await axios.get(`/api/threads/${id}`);
        const body = response.data.body || {};
        const messages = body.messages || [];
        // messages are { role, content } objects
        setPrevChats(messages);
        setNewChat(false);
        setReply(null);
      } catch(err) {
        console.log(err);
      }
  }   

  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId,
    newChat, setNewChat,
    prevChats, setPrevChats,
    allThreads, setAllThreads,
    createNewChat,
    changeThread
  }; 

  return (
    <div className='home-page'>
      <MyContext.Provider value={providerValues}>
          <Sidebar></Sidebar>
          <ChatWindow></ChatWindow>
      </MyContext.Provider>
    </div>
  );
}