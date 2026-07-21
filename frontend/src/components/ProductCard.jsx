import api from "../services/api";

function ProductCard({ product }) {

  const addToCart = async () => {

  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    navigate("/login");
    return;
  }

  try {

    await api.post("/cart", {
      product: product._id,
      quantity: 1
    });

    alert("Product Added to Cart");

  } catch (error) {

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      alert("Session expired. Please login again.");
      navigate("/login");
      return;
    }

    alert(error.response?.data?.message || "Something went wrong");
  }
};
  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "15px",
        marginBottom: "15px",
      }}
    >
      <h2>{product.name}</h2>

      <p>Brand: {product.brand}</p>

      <p>₹{product.price}</p>

      <button onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;