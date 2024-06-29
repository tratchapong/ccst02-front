export default function Modal({modal_id, children, onClose}) {
  return (
      <dialog id={modal_id} className="modal " onClose={onClose}>
        <div className="modal-box max-w-[800px] ">
          {children}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
  );
}
