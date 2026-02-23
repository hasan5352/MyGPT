import Dropdown from './Dropdown';
import './Thread.css'
import { useState, useEffect, useRef, useContext } from "react";
import DeleteModal from '../DeleteModal/DeleteModal';
import { MyContext } from '../MyContext';

export default function Thread({ thread }){
  const {currThreadId, changeThread} = useContext(MyContext);

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
    <div className={"thread" + (currThreadId === thread.id? ' highlight': '')}
      onClick={() => changeThread(thread.id)}
    > 
      <p className="title"> {thread.title} </p>
      <i className="fa-solid fa-ellipsis-v"  onClick={() => setDropdownOpen(true)} />
      
      {dropdownOpen && <Dropdown dropDownDltBtnRef={dropDownDltBtnRef} setDeleteModalOpen={setDeleteModalOpen} />}
      {deleteModalOpen && <DeleteModal thread={thread} setDeleteModalOpen={setDeleteModalOpen} dltModalRef={dltModalRef} />}
    </div>
  );
}