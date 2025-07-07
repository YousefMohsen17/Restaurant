import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import { CartProvider } from "./store/cart-context.jsx";
function App() {
  return (
    <>
      <CartProvider>
        <Header />
        <Meals />
      </CartProvider>
    </>
  );
}

export default App;
