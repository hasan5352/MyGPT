import "./Sidebar.css";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../MyContext.jsx";
import Thread from "./Thread.jsx";
import axios from "axios";


function Sidebar() {
	axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
	const {createNewChat, allThreads, setAllThreads, currThreadId, setCurrThreadId, setNewChat, setPrompt, setReply, setPrevChats} = useContext(MyContext);
	

	const getAllThreads = async () => {
		try {
			const response = await axios.get("/api/threads");
			const threads = response.data.body.threads;
			setAllThreads(threads);
		} catch(err) {
			console.log(err);
		}
	};

	useEffect(() => {getAllThreads(); }, [])


	return (
		<section className="sidebar">
			<div className={"thread" + (currThreadId === ''? ' highlight': '')} onClick={createNewChat}>
				<img src="src/assets/blacklogo.png" alt="gpt logo" className="logo"></img>
					New Chat
				<span><i className="fa-solid fa-pen-to-square"></i></span>
			</div>

			{allThreads?.map((thread, idx) => (
				<Thread
					key={thread.id || idx}
					thread={thread}
					k={idx}
					setAllThreads={setAllThreads}
					createNewChat={createNewChat}
				/>
			))}
		</section>
	)
}

export default Sidebar;