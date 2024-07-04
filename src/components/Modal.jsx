/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

function Modal({ modal_id, children, onClose}) {
  return (
    <dialog id={modal_id} className="modal" onClose={onClose}>
      <div className="modal-box max-w-[800px]">
        {children}
        {/* <button className="btn" onClick={()=>{document.getElementById(modal_id).close()}}>close</button> */}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default Modal;
