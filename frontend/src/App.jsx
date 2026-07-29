import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import AdminLayout from "./components/AdminLayout";

// User Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import OrderSuccess from "./pages/OrderSuccess";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AdminUsers from "./pages/AdminUsers";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* ========================= */}
        {/* User Routes */}
        {/* ========================= */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="/checkout" element={<Checkout />} />

        <Route path="/orders" element={<Orders />} />

        <Route path="/orders/:id" element={<OrderDetails />} />

        <Route path="/order-success" element={<OrderSuccess />} />

        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/profile" element={<Profile />} />

        {/* ========================= */}
        {/* Admin Routes */}
        {/* ========================= */}

        <Route path="/admin" element={<AdminLayout />}>

          <Route index element={<AdminDashboard />} />

          <Route path="dashboard" element={<AdminDashboard />} />

          <Route path="products" element={<AdminProducts />} />

          <Route path="orders" element={<AdminOrders />} />

          <Route path="users" element={<AdminUsers />} />

        </Route>

      </Routes>
    </>
  );
}

export default App;