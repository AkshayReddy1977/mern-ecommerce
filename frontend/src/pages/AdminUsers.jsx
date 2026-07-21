import { useEffect, useState } from "react";
import api from "../services/api";

function AdminUsers() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {

        try {

            const res = await api.get("/users");

            setUsers(res.data.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (
        <div style={{ padding: "20px" }}>

            <h1>All Users</h1>

            {
                users.map((user) => (

                    <div
                        key={user._id}
                        style={{
                            border: "1px solid gray",
                            padding: "20px",
                            marginBottom: "20px"
                        }}
                    >

                        <h3>{user.name}</h3>

                        <p>{user.email}</p>

                        <p>Role: {user.role}</p>

                    </div>

                ))
            }

        </div>
    );
}

export default AdminUsers;