import { useEffect, useState } from "react";
import api from "../services/api";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");
      setCartItems(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const removeItem = async (id) => {
    try {

        await api.delete(`/cart/${id}`);

        fetchCart();

    } catch (error) {
        console.log(error);
    }
};
const placeOrder = async () => {
  try {

    await api.post("/orders");

    alert("Order Placed Successfully");

    fetchCart();

  } catch (error) {

    console.log(error);

    alert(error.response?.data?.message);

  }
};

  let total = 0;

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Cart</h1>

      {cartItems.length === 0 ? (
        <h2>Cart is Empty</h2>
      ) : (
        cartItems.map((item) => {
          total += item.product.price * item.quantity;

          return (
            <div
              key={item._id}
              style={{
                border: "1px solid gray",
                padding: "15px",
                marginBottom: "15px",
              }}
            >
              <h2>{item.product.name}</h2>

              <p>Brand : {item.product.brand}</p>

              <p>Price : ₹{item.product.price}</p>

              <p>Quantity : {item.quantity}</p>

              <p>
                Total :
                ₹{item.product.price * item.quantity}
              </p>
              <button onClick={() => removeItem(item._id)}>
                Remove
              </button>
              <button onClick={placeOrder}>
                Place Order
              </button>
            </div>
          );
        })
      )}

      <hr />

      <h2>Grand Total : ₹{total}</h2>
    </div>
  );
}

export default Cart;
