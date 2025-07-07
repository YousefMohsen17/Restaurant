import { createPortal } from "react-dom";
import { useImperativeHandle, useRef, use } from "react";
import { CartContext } from "../store/cart-context.jsx";
import { updateOrders } from "../http.js";
import SuccessModal from "./SuccessModal.jsx";
export default function CheckoutModal({ ref, cartTotal }) {
  const modalElement = document.getElementById("modal-root");
  const { userCart } = use(CartContext);
  if (!modalElement) return null;
  const checkout = useRef();
  const success = useRef();
  useImperativeHandle(ref, () => ({
    open() {
      checkout.current.showModal();
    },
    close() {
      checkout.current.close();
    },
  }));
  async function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const userInfo = Object.fromEntries(fd.entries());
    success.current.open();
    checkout.current.close();
    await updateOrders({ items: userCart, customer: userInfo });
  }
  return createPortal(
    <>
      <dialog ref={checkout} className="modal ">
        <form onSubmit={handleSubmit}>
          <h2>Checkout</h2>
          <p>Total Amount: ${cartTotal}</p>
          <p className="control">
            <label htmlFor="name">Full Name</label>
            <input id="name" required type="text" name="name" />
          </p>
          <p className="control">
            <label htmlFor="email">E-Mail Address</label>
            <input id="email" required type="email" name="email" />
          </p>
          <p className="control">
            <label htmlFor="street">Street</label>
            <input id="street" required type="text" name="street" />
          </p>
          <div className="control-row">
            <p className="control">
              <label htmlFor="postal-code">Postal Code</label>
              <input id="postal-code" required type="text" name="postal-code" />
            </p>
            <p className="control">
              <label htmlFor="city">City</label>
              <input id="city" required type="text" name="city" />
            </p>
          </div>
          <p className="modal-actions">
            <button
              className="text-button undefined"
              type="button"
              onClick={() => checkout.current.close()}
            >
              Close
            </button>
            <button className="button undefined">Submit Order</button>
          </p>
        </form>
      </dialog>
      <SuccessModal ref={success} />
    </>,
    modalElement
  );
}
