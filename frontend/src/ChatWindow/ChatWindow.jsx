import "./ChatWindow.css";
import Chat from "../Chat.jsx";
import { MyContext } from "../MyContext.jsx";
import { useContext, useState, useEffect, useRef } from "react";
import {ScaleLoader} from "react-spinners";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function ChatWindow() {
    const {prompt, setPrompt, reply, setReply, currThreadId, setPrevChats, setNewChat, setAllThreads, setCurrThreadId} = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
		const logoutBtnRef = useRef(null);

    const getReply = async () => {
        if (!prompt || !prompt.trim()) return;
        setLoading(true);
        setNewChat(false);

        try {
            let res;
            if (!currThreadId) {
                // create new thread
                res = await axios.post('/api/threads', { message: prompt });
                const body = res.data.body || {};
                const aiResponse = body.aiResponse;
                const threadId = body.threadId;
                const title = body.title;
                // update UI
                setReply(aiResponse);
                setCurrThreadId(threadId);
                setPrevChats([
                    { role: 'user', content: prompt },
                    { role: 'robot', content: aiResponse }
                ]);
                // prepend new thread to list
                setAllThreads(prev => [{ id: threadId, title }, ...(prev || [])]);
            } else {
                // post to existing thread
                res = await axios.post(`/api/threads/${currThreadId}`, { message: prompt });
                const body = res.data.body || {};
                const aiResponse = body.aiResponse;
                setReply(aiResponse);
                // append to current prevChats via effect that listens to reply
            }
        } catch(err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    //Append new chat to prevChats
    useEffect(() => {
			const removeDropDown = (e) => {
				if (logoutBtnRef.current && !logoutBtnRef.current.contains(e.target)) setDropdownOpen(false)
			};
			document.addEventListener('mousedown', removeDropDown);

			if(prompt && reply) {
				setPrevChats(prevChats => (
					[...prevChats, {
						role: "user",
						content: prompt
					},{
						role: "assistant",
						content: reply
					}]
				));
			}

			setPrompt("");
			return () => {document.removeEventListener('mousedown', removeDropDown)}
    }, [reply]);


    const handleProfileClick = () => {setDropdownOpen(!dropdownOpen);}

    return (
        <div className="chatWindow">
					<div className="navbar">
						<span>MyGPT <i className="fa-solid fa-chevron-down"></i></span>
						<div className="userIconDiv">
							<span className="userIcon" onClick={handleProfileClick}><i className="fa-solid fa-user"></i></span>
						</div>
					</div>

					{ dropdownOpen && 
						<div className="dropDown">
							<div className="dropDownItem" ref={logoutBtnRef} onClick={()=>{setDropdownOpen(false); navigate('/auth')}}>
								<i className="fa-solid fa-arrow-right-from-bracket"></i> Log out
							</div>
						</div>
					}

					<Chat></Chat>
					<ScaleLoader color="#fff" loading={loading} />
					
					<div className="chatInput">
							<div className="inputBox">
									<input placeholder="Ask anything" value={prompt}
											onChange={(e) => setPrompt(e.target.value)}
											onKeyDown={(e) => e.key === 'Enter'? getReply() : ''}
									/>
									<div id="submit" onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
							</div>

							<p className="info"> MyGPT can make mistakes. Check important information. </p>
					</div>
        </div>
    )
}

export default ChatWindow;