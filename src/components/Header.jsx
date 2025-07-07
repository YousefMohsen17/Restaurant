import foodImg from "../assets/logo.jpg";
import { CartContext } from "../store/cart-context.jsx";
import { useContext, useRef } from "react";
import CartModal from "./CartModal.jsx";
export default function Header() {
  const { userCart } = useContext(CartContext);
  const dialog = useRef();

  function showCart() {
    dialog.current.open();
  }
  return (
    <>
      <header id="main-header">
        <div id="title">
          <img src={foodImg} alt="Food Image" />
          <h1>ReactFood</h1>
        </div>

        <nav onClick={showCart}>
          <button className="text-button undefined">
            Cart (
            {userCart
              .map((item) => item.quantity)
              .reduce((total, quantity) => total + quantity, 0)}
            )
          </button>
        </nav>
      </header>
      <CartModal ref={dialog} />
    </>
  );
}
