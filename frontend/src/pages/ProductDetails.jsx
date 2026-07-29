import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function ProductDetails() {

    const { id } = useParams();

    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {

            const res = await API.get(`/products/${id}`);

            setProduct(res.data.data);

        } catch (error) {
            console.log(error);
        }
    };

    if (!product) {
        return <h2>Loading...</h2>;
    }

    return (
        <div
            style={{
                display: "flex",
                gap: "40px",
                padding: "40px"
            }}
        >
            <img
                src={product.image}
                alt={product.name}
                style={{
                    width: "350px",
                    borderRadius: "10px"
                }}
            />

            <div>

                <h1>{product.name}</h1>

                <h2>₹ {product.price}</h2>

                <p>
                    <strong>Brand:</strong> {product.brand}
                </p>

                <p>
                    <strong>Stock:</strong> {product.stock}
                </p>

                <p>
                    <strong>Rating:</strong> {product.rating}
                </p>

                <p>{product.description}</p>

                <button>Add To Cart</button>

                <button
                    style={{
                        marginLeft: "20px"
                    }}
                >
                    Add To Wishlist
                </button>

            </div>
        </div>
    );
}

export default ProductDetails;