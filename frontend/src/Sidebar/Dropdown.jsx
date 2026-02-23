import './Dropdown.css';

export default function Dropdown({dropDownDltBtnRef, setDeleteModalOpen, style}) {
  return (
    <div className="dropdown" style={style}>
      <button ref={dropDownDltBtnRef} onClick={()=>{setDeleteModalOpen(true)}}> Delete </button>
    </div>
  );
}