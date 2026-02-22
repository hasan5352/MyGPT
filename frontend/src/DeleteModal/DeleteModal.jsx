import './DeleteModal.css';
import axios from 'axios';

export default function DeleteModal({thread, setAllThreads, currThreadId, createNewChat, dltModalRef, setDeleteModalOpen}) {
  async function deleteThread() {
    try{
      const response = await axios.delete(`/api/threads/${thread.id}`);
      console.log(response);
      
      if (!response.ok && response.message.lower() == 'unauthorized') {
        // redirect to login page
      }
      // refresh sidebar
      setAllThreads(prev => prev.filter(thrd => thrd.id !== thread.id));
      // if(thread.id === currThreadId) createNewChat();

    } catch (err) {
      console.log(err);
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