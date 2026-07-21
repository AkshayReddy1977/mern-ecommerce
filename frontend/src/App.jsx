import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import AdminLayout from "./components/AdminLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";

import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AdminUsers from "./pages/AdminUsers";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>

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