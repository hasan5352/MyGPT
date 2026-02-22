import './Dropdown.css';

export default function Dropdown({dropDownDltBtnRef, setDeleteModalOpen}) {
  return (
    <div className="dropdown">
      <button> Rename </button>
      <button ref={dropDownDltBtnRef} onClick={()=>{setDeleteModalOpen(true)}}> Delete </button>
    </div>
  );
}