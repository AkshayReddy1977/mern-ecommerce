import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

function OrderDetails() {

    const { id } = useParams();

    const [order, setOrder] = useState(null);

    useEffect(() => {
        fetchOrder();
    }, []);

    const fetchOrder = async () => {
        try {

            const res = await api.get(`/orders/${id}`);

            setOrder(res.data.data);

        } catch (err) {

            console.log(err);

        }
    };

    if (!order) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>

            <h1>Order Details</h1>

            <h3>Customer</h3>

            <p>{order.user.name}</p>

            <p>{order.user.email}</p>

            <hr />

            <h3>Products</h3>

            {order.orderItems.map(item => (

                <div key={item._id}>

                    <h4>{item.product.name}</h4>

                    <p>Quantity : {item.quantity}</p>

                    <p>Price : ₹{item.price}</p>

                    <hr />

                </div>

            ))}

            <h3>Payment</h3>

            <p>{order.paymentStatus}</p>

            <h3>Status</h3>

            <p>{order.orderStatus}</p>

        </div>
    );

}

export default OrderDetails;