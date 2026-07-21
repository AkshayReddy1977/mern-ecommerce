import { useEffect, useState } from "react";
import api from "../services/api";

function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({
        name: "",
        brand: "",
        price: "",
        stock: ""
});
const addProduct = async () => {

    try {

        await api.post("/products", form);

        alert("Product Added Successfully");

        setForm({
            name: "",
            brand: "",
            price: "",
            stock: ""
        });

        fetchProducts();

    } catch (error) {

        alert(error.response?.data?.message || "Something went wrong");

    }
};
const editProduct = (product) => {

    setEditingId(product._id);

    setForm({
        name: product.name,
        brand: product.brand,
        price: product.price,
        stock: product.stock
    });

};
const updateProduct = async () => {

    try {

        await api.put(`/products/${editingId}`, form);

        alert("Product Updated Successfully");

        setEditingId(null);

        setForm({
            name: "",
            brand: "",
            price: "",
            stock: ""
        });

        fetchProducts();

    } catch (error) {

        alert(error.response?.data?.message || "Something went wrong");

    }

};
const deleteProduct = async (id) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {

        await api.delete(`/products/${id}`);

        alert("Product Deleted Successfully");

        fetchProducts();

    } catch (error) {

        alert(error.response?.data?.message || "Delete Failed");

    }
};
return(
    <>
    <h2>Add Product</h2>

<input
    type="text"
    placeholder="Product Name"
    value={form.name}
    onChange={(e) =>
        setForm({
            ...form,
            name: e.target.value
        })
    }
/>

<br /><br />

<input
    type="text"
    placeholder="Brand"
    value={form.brand}
    onChange={(e) =>
        setForm({
            ...form,
            brand: e.target.value
        })
    }
/>

<br /><br />

<input
    type="number"
    placeholder="Price"
    value={form.price}
    onChange={(e) =>
        setForm({
            ...form,
            price: e.target.value
        })
    }
/>

<br /><br />

<input
    type="number"
    placeholder="Stock"
    value={form.stock}
    onChange={(e) =>
        setForm({
            ...form,
            stock: e.target.value
        })
    }
/>
{
    editingId ? (
        <button onClick={updateProduct}>
            Update Product
        </button>
    ) : (
        <button onClick={addProduct}>
            Add Product
        </button>
    )
}
<button onClick={() => editProduct(product)}>
    Edit
</button><button
    onClick={() => deleteProduct(product._id)}
>Delete
</button>


<br /><br />
</>
);

}

export default AdminProducts;