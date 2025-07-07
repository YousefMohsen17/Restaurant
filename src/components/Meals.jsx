import Cart from "./Cart.jsx";
import getMeals from "../http.js";
import { useEffect, useState } from "react";
export default function Meals() {
  const [meals, setMeals] = useState("");
  const [error, setError] = useState();
  const [isFetching, setIsFetching] = useState();

  useEffect(() => {
    async function fetchMeals() {
      setIsFetching(true);
      try {
        const meals = await getMeals();
        setMeals(meals);
        setIsFetching(false);
      } catch (error) {
        setError(error.message || "Something went wrong!");
        setIsFetching(false);
      }
    }
    fetchMeals();
  }, []);

  return (
    <>
      {isFetching && <p className="loading center">Loading meals...</p>}
      {!isFetching && error && <p className="error">{error}</p>}
      <ul id="meals">
        {!isFetching &&
          meals &&
          meals.map((meal, index) => {
            return (
              <li className="meal-item" key={meal.id}>
                <article>
                  <img
                    alt="Mac &amp; Cheese"
                    src={`http://localhost:3000/${meal.image}`}
                  />
                  <div>
                    <h3>{meal.name}</h3>
                    <p className="meal-item-price">${meal.price}</p>
                    <p className="meal-item-description">{meal.description}</p>
                  </div>
                  <Cart mealIndex={index} meals={meals} />
                </article>
              </li>
            );
          })}
      </ul>
    </>
  );
}
