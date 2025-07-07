import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function removeFromCart(meal) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === meal.id);
      if (existing) {
        return prev.map((item) =>
          item.id === meal.id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      if (existing.quantity === 1) {
        return prev.filter((item) => item.id !== meal.id);
      }
    });
  }
  function addToCart(meal) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === meal.id);
      if (existing) {
        return prev.map((item) =>
          item.id === meal.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...meal, quantity: 1 }];
      }
    });
  }
  function clearCart() {
    setCart([]);
  }
  let CtxValue = {
    userCart: cart,
    addToCart: addToCart,
    removeFromCart: removeFromCart,
    clearCart: clearCart,
  };
  return (
    <CartContext.Provider value={CtxValue}>{children}</CartContext.Provider>
  );
}
