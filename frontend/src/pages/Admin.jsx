import { Link } from "react-router-dom";

function Admin() {
  return (
    <div style={{ padding: "20px" }}>

      <h1>Admin Panel</h1>

      <hr />

      <p>
        <Link to="/admin/dashboard">📊 Dashboard</Link>
      </p>

      <p>
        <Link to="/admin/products">📦 Products</Link>
      </p>

      <p>
        <Link to="/admin/orders">🛒 Orders</Link>
      </p>

      <p>
        <Link to="/admin/users">👥 Users</Link>
      </p>

    </div>
  );
}

export default Admin;