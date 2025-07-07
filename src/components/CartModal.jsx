import { useImperativeHandle, useContext, useRef } from "react";
import { createPortal } from "react-dom";
import { CartContext } from "../store/cart-context";
import CheckoutModal from "./CheckoutModal.jsx";
export default function CartModal({ ref }) {
  const { userCart, addToCart, removeFromCart } = useContext(CartContext);
  let cartTotal = 0;
  const dialog = useRef();
  const checkout = useRef();
  useImperativeHandle(ref, () => ({
    open() {
      dialog.current.showModal();
    },
    close() {
      dialog.current.close();
    },
  }));
  const modalElement = document.getElementById("modal-root");
  if (!modalElement) return null;
  function closeModal() {
    dialog.current.close();
  }
  function handleCheckout() {
    dialog.current.close();
    checkout.current.open();
  }

  return createPortal(
    <>
      <dialog ref={dialog} className="modal cart">
        <h2>Your Cart</h2>
        <ul>
          {userCart.map((meal, index) => {
            cartTotal = userCart.reduce(
              (sum, item) => sum + item.quantity * item.price,
              0
            );
            return (
              <li className="cart-item" key={index}>
                <p>{`${meal.name} - ${meal.quantity} x $${meal.price}`}</p>
                <p className="cart-item-actions">
                  <button onClick={() => removeFromCart(meal)}>-</button>
                  <span>{meal.quantity}</span>
                  <button onClick={() => addToCart(meal)}>+</button>
                </p>
              </li>
            );
          })}
        </ul>
        <p className="cart-total">${cartTotal.toFixed(2)}</p>
        <p className="modal-actions">
          <button className="text-button undefined" onClick={closeModal}>
            Close
          </button>
          <button className="button undefined" onClick={handleCheckout}>
            Go to Checkout
          </button>
        </p>
      </dialog>
      <CheckoutModal ref={checkout} cartTotal={cartTotal} />
    </>,
    modalElement
  );
}
