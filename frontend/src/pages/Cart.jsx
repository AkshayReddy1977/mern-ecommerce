import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");

      setCart(res.data.data);

      let sum = 0;

      res.data.data.forEach((item) => {
        sum += item.product.price * item.quantity;
      });

      setTotal(sum);
    } catch (error) {
      console.log(error);
    }
  };

  const increaseQty = async (id, qty) => {
    try {
      await API.put(`/cart/${id}`, {
        quantity: qty + 1,
      });

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseQty = async (id, qty) => {
    if (qty === 1) return;

    try {
      await API.put(`/cart/${id}`, {
        quantity: qty - 1,
      });

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (id) => {
    try {
      await API.delete(`/cart/${id}`);

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Cart</h1>

      {cart.length === 0 ? (
        <h2>Cart is Empty</h2>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item._id}
              style={{
                border: "1px solid gray",
                padding: "15px",
                marginBottom: "20px",
              }}
            >
              <img
                src={item.product.image}
                width="120"
                alt={item.product.name}
              />

              <h3>{item.product.name}</h3>

              <h4>₹{item.product.price}</h4>

              <p>Quantity : {item.quantity}</p>

              <button
                onClick={() =>
                  decreaseQty(item._id, item.quantity)
                }
              >
                -
              </button>

              <button
                onClick={() =>
                  increaseQty(item._id, item.quantity)
                }
              >
                +
              </button>

              <button
                onClick={() => removeItem(item._id)}
              >
                Remove
              </button>
            </div>
          ))}

          <h2>Total : ₹{total}</h2>

          <Link to="/checkout">
            <button>Proceed To Checkout</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Cart;