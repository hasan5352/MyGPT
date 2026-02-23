import './DeleteModal.css';
import axios from 'axios';
import { MyContext } from '../MyContext';
import { useContext } from 'react';

export default function DeleteModal({thread, dltModalRef, setDeleteModalOpen}) {
  const {currThreadId, createNewChat, setAllThreads, navigateToAuthPage} = useContext(MyContext);

  async function deleteThread() {
    try{
      const response = await axios.delete(`/api/threads/${thread.id}`);
      console.log(response);
      
      // refresh sidebar
      if(thread.id === currThreadId) createNewChat();
      setAllThreads(prev => (prev.filter(thrd => thrd.id !== thread.id)));
    } catch (err) {
      console.log(err);
      if (err.status == 401) navigateToAuthPage();
    }
  }
  
  return (
    <div className="delete-modal" ref={dltModalRef} onClick={(e)=> {e.stopPropagation()}}>
      <h2>Delete Chat?</h2>
      <p>This will delete <b>{thread.title}</b>.</p>
      <div>
        <button className="cancel-btn" onClick={()=>{setDeleteModalOpen(false)}}> Cancel </button>
        <button className="delete-btn" onClick={() => {deleteThread(); setDeleteModalOpen(false)}} >Delete</button>
      </div>
    </div>
  );
}