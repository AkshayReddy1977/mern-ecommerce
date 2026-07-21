import { Link, Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <div style={{ width: "220px", background: "#222", color: "white", padding: "20px" }}>
        <h2>Admin Panel</h2>

        <p><Link to="/admin/dashboard" style={{ color: "white" }}>Dashboard</Link></p>
        <p><Link to="/admin/products" style={{ color: "white" }}>Products</Link></p>
        <p><Link to="/admin/orders" style={{ color: "white" }}>Orders</Link></p>
        <p><Link to="/admin/users" style={{ color: "white" }}>Users</Link></p>
      </div>

      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;