import { createRoot } from "react-dom/client";

import Order from "./Order";
import PizzaOfTheDay from "./PizzaOfTheDay";
import Header from "./Header";
import { CartContext } from "./context";
import { useState } from "react";

const App = () => {
  const cartHook = useState([]);

  return (
    <CartContext.Provider value={cartHook}>
      <div>
        <Header />
        <Order />
        <PizzaOfTheDay />
      </div>
    </CartContext.Provider>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
