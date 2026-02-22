import "./Sidebar.css";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../MyContext.jsx";
import {v1 as uuidv1} from "uuid";
import Thread from "./Thread.jsx";
import axios from "axios";

function Sidebar() {
    const {currThreadId, setNewChat, setPrompt, setReply, setCurrThreadId, setPrevChats} = useContext(MyContext);
    
    const {allThreads, setAllThreads} = useState(null);

    const getAllThreads = async () => {
        try {
            const response = await axios.get("/api/threads");
            const filteredData = response.body.threads.map(thread => ({
                threadId: thread.id, title: thread.title
            }));

            //console.log(filteredData);
            setAllThreads(filteredData);
        } catch(err) {
            console.log(err);
        }
    };

    useEffect(() => {getAllThreads();}, [currThreadId])


    const createNewChat = () => {
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrThreadId(uuidv1());
        setPrevChats([]);
    }

    const changeThread = async (newThreadId) => {
        setCurrThreadId(newThreadId);

        try {
            const response = await fetch(`http://localhost:8080/api/thread/${newThreadId}`);
            const res = await response.json();
            console.log(res);
            setPrevChats(res);
            setNewChat(false);
            setReply(null);
        } catch(err) {
            console.log(err);
        }
    }   

    return (
			<section className="sidebar">
				<button onClick={createNewChat}>
                    <img src="src/assets/blacklogo.png" alt="gpt logo" className="logo"></img>
                    New Chat
                    <span><i className="fa-solid fa-pen-to-square"></i></span>
				</button>


				<div className="history">
					<Thread thread={{threadId: 1, title: "Ship Wreck"}} k={0} setAllThreads={setAllThreads}
                        createNewChat={createNewChat} currThreadId={currThreadId}
                    />
					{/* {allThreads.map((thread, idx) => <Thread setAllThreads={setAllThreads} thread={thread} k={idx} />) } */}
				</div>

			</section>
    )
}

export default Sidebar;