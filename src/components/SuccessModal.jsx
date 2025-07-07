import { useContext, useRef, useImperativeHandle } from "react";
import { CartContext } from "../store/cart-context.jsx";
export default function SuccessModal({ ref }) {
  const success = useRef();
  let { clearCart } = useContext(CartContext);
  useImperativeHandle(ref, () => ({
    open() {
      success.current.showModal();
    },
    close() {
      success.current.close();
    },
  }));
  function handleOk() {
    success.current.close();
    clearCart();
  }
  return (
    <dialog className="modal " ref={success}>
      <h2>Success!</h2>
      <p>Your order was submitted successfully.</p>
      <p>
        We will get back to you with more details via email within the next few
        minutes.
      </p>
      <p className="modal-actions">
        <button className="button undefined" onClick={handleOk}>
          Okay
        </button>
      </p>
    </dialog>
  );
}
