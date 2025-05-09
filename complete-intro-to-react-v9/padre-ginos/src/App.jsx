import { createRoot } from "react-dom/client";

import Pizza from "./Pizza";

const App = () => {
  return (
    <div>
      <h1>Padre Gino's - Order Now</h1>
      <Pizza
        name="Pepperoni"
        description="Pepperoni, mozzarella cheese, and tomato sauce"
        image="/public/pizzas/pepperoni.webp"
      />
      <Pizza
        name="Hawaiian"
        description="Ham, pineapple, and mozzarella cheese"
        image="/public/pizzas/hawaiian.webp"
      />
      <Pizza
        name="Americano"
        description="Sausage, pepperoni, and mozzarella cheese"
        image="/public/pizzas/big_meat.webp"
      />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
