import { useEffect, useState } from "react";
import api from "../services/api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/all");
      console.log(res.data);

      setOrders(res.data.data);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to load orders");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>All Orders</h1>

      {orders.length === 0 ? (
        <h2>No Orders Found</h2>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid gray",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            <h3>Order ID: {order._id}</h3>

            <p>
              <strong>Customer:</strong> {order.user?.name}
            </p>

            <p>
              <strong>Email:</strong> {order.user?.email}
            </p>

            <h4>Products</h4>

            {order.products.map((item) => (
              <div key={item._id}>
                <p>
                  {item.product?.name} × {item.quantity}
                </p>
              </div>
            ))}

            <h3>Total: ₹{order.totalPrice}</h3>

            <h3>Status: {order.status}</h3>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminOrders;