import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "../MyContext.jsx";
import Thread from "./Thread.jsx";
import axios from "axios";


function Sidebar() {
	axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
	const {createNewChat, allThreads, setAllThreads, currThreadId, navigateToAuthPage} = useContext(MyContext);

	const getAllThreads = async () => {
		try {
			const response = await axios.get("/api/threads");	// clear header - for testing
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
				<img src="src/assets/blacklogo.png" alt="gpt logo" className="logo"></img> New Chat
				<span><i className="fa-solid fa-pen-to-square"></i></span>
			</div>

			{allThreads?.map((thread, idx) => ( <Thread key={thread.id || idx} thread={thread} /> ))}
		</section>
	)
}

export default Sidebar;