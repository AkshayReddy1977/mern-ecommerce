import { useEffect, useState } from "react";
import api from "../api";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  const changeRole = async (id, currentRole) => {
    try {
      await api.put(`/users/${id}/role`, {
        role: currentRole === "admin" ? "user" : "admin",
      });

      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Admin Users</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Role Action</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>

              <td>
                <button
                  onClick={() =>
                    changeRole(user._id, user.role)
                  }
                >
                  {user.role === "admin"
                    ? "Make User"
                    : "Make Admin"}
                </button>
              </td>

              <td>
                <button
                  onClick={() => deleteUser(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsers;