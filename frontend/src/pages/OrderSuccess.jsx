import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>🎉 Order Placed Successfully!</h1>

      <p>
        Thank you for shopping with us.
      </p>

      <Link to="/orders">
        <button>View My Orders</button>
      </Link>

      <br /><br />

      <Link to="/">
        <button>Continue Shopping</button>
      </Link>
    </div>
  );
}

export default OrderSuccess;