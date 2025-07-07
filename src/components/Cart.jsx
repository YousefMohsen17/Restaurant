import { use } from "react";
import { CartContext } from "../store/cart-context.jsx";

export default function Cart({ mealIndex, meals }) {
  const { addToCart } = use(CartContext);
  function handleAddToCart() {
    addToCart(meals[mealIndex]);
  }
  return (
    <p className="meal-item-actions">
      <button className="button undefined" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </p>
  );
}
