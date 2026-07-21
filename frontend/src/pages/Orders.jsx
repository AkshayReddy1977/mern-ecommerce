import { useEffect, useState } from "react";
import api from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <h2>No Orders Found</h2>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid gray",
              padding: "15px",
              marginBottom: "15px",
            }}
          >
            <h3>Order ID: {order._id}</h3>

            <p>Total: ₹{order.totalPrice}</p>

            <p>Status: {order.status}</p>

            <h4>Products</h4>

            {order.products.map((item, index) => (
              <div key={index}>
                <p>{item.product.name}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;