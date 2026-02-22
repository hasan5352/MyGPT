import './HomePage.css';
import Sidebar from "../Sidebar/Sidebar.jsx";
import ChatWindow from "../ChatWindow/ChatWindow.jsx";
import {MyContext} from "../MyContext.jsx";
import { useState } from 'react';
import {v1 as uuidv1} from "uuid";

export default function HomePage(){
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]); //stores all chats of curr threads
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);

  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId,
    newChat, setNewChat,
    prevChats, setPrevChats,
    allThreads, setAllThreads
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