export default function Modal({modal_id, children}) {
  return (
      <dialog id={modal_id} className="modal ">
        <div className="modal-box max-w-[800px] ">
          {children}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
  );
}
