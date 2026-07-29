import { useEffect, useState } from "react";
import api from "../api";

function AdminDashboard() {
  const [dashboard, setDashboard] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    recentOrders: [],
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/admin/dashboard");
      setDashboard(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 250px)",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div style={{ border: "1px solid gray", padding: "15px" }}>
          <h2>Total Users</h2>
          <h1>{dashboard.totalUsers}</h1>
        </div>

        <div style={{ border: "1px solid gray", padding: "15px" }}>
          <h2>Total Products</h2>
          <h1>{dashboard.totalProducts}</h1>
        </div>

        <div style={{ border: "1px solid gray", padding: "15px" }}>
          <h2>Total Orders</h2>
          <h1>{dashboard.totalOrders}</h1>
        </div>

        <div style={{ border: "1px solid gray", padding: "15px" }}>
          <h2>Total Revenue</h2>
          <h1>₹{dashboard.totalRevenue}</h1>
        </div>
      </div>

      <br />

      <h2>Recent Orders</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {dashboard.recentOrders.map((order) => (
            <tr key={order._id}>
              <td>{order.user?.name}</td>
              <td>₹{order.totalPrice}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;