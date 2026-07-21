import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px",
        background: "#333",
        color: "white",
      }}
    >
      <h2>E-Commerce</h2>

      <div>
        <Link
          to="/"
          style={{ color: "white", marginRight: "15px" }}
        >
          Home
        </Link>

        <Link
          to="/cart"
          style={{ color: "white", marginRight: "15px" }}
        >
          Cart
        </Link>

        <Link
          to="/orders"
          style={{ color: "white", marginRight: "15px" }}
        >
          Orders
        </Link>

        <Link to="/login" style={{ color: "white",marginRight: "15px" }}>
          Login
        </Link>
        <Link to="/admin" style={{ color: "white" }}
        >Admin</Link>
      </div>
    </nav>
  );
}

export default Navbar;