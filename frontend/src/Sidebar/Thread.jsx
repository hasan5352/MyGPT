import Dropdown from './Dropdown';
import './Thread.css'
import { useState, useEffect, useRef } from "react";
import DeleteModal from '../DeleteModal/DeleteModal';

export default function Thread({thread, k, setAllThreads, currThreadId, createNewChat}){
  // (thread.threadId === currThreadId ? "highlighted": " ")
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const dropDownDltBtnRef = useRef(null);
  const dltModalRef = useRef(null);
  
  useEffect(() => {
    function removeDropdownAndModal(e) {
      setDropdownOpen(false);
      if (e.target === dropDownDltBtnRef.current) setDeleteModalOpen(true);
      if (dltModalRef.current && !dltModalRef.current.contains(e.target)) setDeleteModalOpen(false);
    };
    document.addEventListener("mousedown", removeDropdownAndModal);
    return () => { document.removeEventListener("mousedown", removeDropdownAndModal); };
  }, []);

  return (
    <div key={k} className={"thread"} // onClick={(e) => changeThread(thread.threadId)}
    > 
      
      <p className="title"> {thread.title} </p>

      <i className="fa-solid fa-ellipsis-v"  onClick={() => setDropdownOpen(true)} />
      
      {dropdownOpen && <Dropdown dropDownDltBtnRef={dropDownDltBtnRef} setDeleteModalOpen={setDeleteModalOpen} />}

      {deleteModalOpen &&
        <DeleteModal thread={thread} setAllThreads={setAllThreads} setDeleteModalOpen={setDeleteModalOpen}
          createNewChat={createNewChat} currThreadId={currThreadId} dltModalRef={dltModalRef}
        />
      }
    </div>
  );
}