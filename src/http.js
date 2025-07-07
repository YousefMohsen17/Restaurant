export default async function getMeals() {
  const response = await fetch("http://localhost:3000/meals");
  if (!response.ok) {
    throw new Error("Failed to fetch meals");
  }
  const data = await response.json();
  return data;
}
export async function updateOrders({ items, customer }) {
  const response = await fetch("http://localhost:3000/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ order: { items, customer } }),
  });
  if (!response.ok) {
    throw new Error("Failed to update orders");
  }
  const data = await response.json();
  console.log(data.message);
  return data;
}
