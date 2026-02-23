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
  const elipsesRef = useRef(null);
  const [dropdownStyle, setDropdownStyle] = useState({});

  function openDropdown(e) {
    const rect = elipsesRef.current.getBoundingClientRect();

    setDropdownStyle({ position: "fixed", top: rect.bottom + 4 + "px",   left: rect.left + "px" });

    setDropdownOpen(true);
  }

  
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
      onClick={(e) => { 
        if (elipsesRef.current && !elipsesRef.current.contains(e.target)) changeThread(thread.id)
      }}
    > 
      <p className="title"> {thread.title} </p>
      <i ref={elipsesRef} className="fa-solid fa-ellipsis-v"  onClick={openDropdown} />
      
      {dropdownOpen && <Dropdown dropDownDltBtnRef={dropDownDltBtnRef} setDeleteModalOpen={setDeleteModalOpen} style={dropdownStyle} />}
      {deleteModalOpen && <DeleteModal thread={thread} setDeleteModalOpen={setDeleteModalOpen} dltModalRef={dltModalRef} />}
    </div>
  );
}