import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function Checkout() {
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("India");

  const [paymentMethod, setPaymentMethod] = useState("Mock Payment");

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleCheckout = async () => {
    try {
      const res = await api.post("/payment/checkout", {
        shippingAddress: {
          address,
          city,
          postalCode,
          country,
        },
        paymentMethod,
        totalPrice,
      });

      alert(res.data.message);

      navigate("/orders");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Checkout Failed");
    }
  };
  const fetchCart = async () => {
  try {
    const res = await api.get("/cart");

    setCartItems(res.data.data);

    const total = res.data.data.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);

    setTotalPrice(total);

  } catch (err) {
    console.log(err);
  }
};
useEffect(() => {
  fetchCart();
}, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Checkout</h1>

      <input
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Postal Code"
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <br /><br />
      <br /><br />

      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option>Mock Payment</option>
        <option>Cash On Delivery</option>
      </select>

      <br /><br />
      <h2>Order Summary</h2>

{cartItems.map((item) => (
  <div key={item._id}>
    <p>
      {item.product.name} × {item.quantity}
    </p>
  </div>
))}

<h3>Total: ₹{totalPrice}</h3>
      <button onClick={handleCheckout}>
        Place Order
      </button>
    </div>
  );
}

export default Checkout;