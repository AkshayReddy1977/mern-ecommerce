import { useEffect, useState } from "react";
import api from "../services/api";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [keyword]);

  const fetchProducts = async () => {
    try {
      const res = await api.get(`/products?keyword=${keyword}`);
      setProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>

      <div style={{ padding: "20px" }}>
        <input
    type="text"
    placeholder="Search products..."
    value={keyword}
    onChange={(e) => setKeyword(e.target.value)}
    style={{
        padding: "10px",
        width: "300px",
        marginBottom: "20px"
    }}
/>
        <h1>Our Products</h1>
      
        {products.length === 0 ? (
          <h2>No Products Found</h2>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))
        )}
      </div>

      <Footer />
    </>
  );
}

export default Home;