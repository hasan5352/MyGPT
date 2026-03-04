import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "../MyContext.jsx";
import Thread from "./Thread.jsx";
import axios from "axios";
import logo from '../assets/helix-logo.jpg';

function Sidebar() {
	// set axios auth header globally from stored token (will be overridden if Sidebar also sets it)
	axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;

	const {createNewChat, allThreads, setAllThreads, currThreadId, navigateToAuthPage} = useContext(MyContext);

	const getAllThreads = async () => {
		try {
			const response = await axios.get("/api/threads");
			const threads = response.data.body.threads;
			setAllThreads(threads);
		} catch(err) {
			console.log(err);
			if (err.status == 401) navigateToAuthPage();
		}
	};

	useEffect(() => {getAllThreads(); }, [])


	return (
		<section className="sidebar">
			
			<div className={"thread" + (currThreadId === ''? ' highlight': '')} onClick={createNewChat}>
				<img src={logo} alt="gpt logo" className="logo"></img> New Chat
				<span><i className="fa-solid fa-pen-to-square"></i></span>
			</div>

			<div className="thread-library">
				{allThreads?.map((thread, idx) => ( <Thread key={thread.id || idx} thread={thread} /> ))}
			</div>
		</section>
	)
}

export default Sidebar;