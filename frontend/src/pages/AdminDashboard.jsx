import { useEffect, useState } from "react";
import api from "../services/api";

function AdminDashboard() {
  const [dashboard, setDashboard] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/admin/dashboard");
      console.log(res.data);

      setDashboard(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      <h2>Total Products: {dashboard.totalProducts}</h2>
      <h2>Total Users: {dashboard.totalUsers}</h2>
      <h2>Total Orders: {dashboard.totalOrders}</h2>
      <h2>Total Revenue: ₹{dashboard.totalRevenue}</h2>
    </div>
  );
}

export default AdminDashboard;