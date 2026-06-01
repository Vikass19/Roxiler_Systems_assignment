import  { useState } from "react";
import { FiUserPlus } from "react-icons/fi";
import { createUser } from "../../api/apis";

export default function AddUser({ onUserAdded }) {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "Normal User",
  });

  const [msg, setMsg] = useState({
    text: "",
    type: "",
  });

  const roleMap = {
    "Normal User": "NORMAL_USER",
    "Store Owner": "STORE_OWNER",
    Admin: "SYSTEM_ADMINISTRATOR",
  };

  const handleAddUser = async () => {
    try {
      const payload = {
        ...newUser,
        role: roleMap[newUser.role] || newUser.role,
      };

      await createUser(payload);

      setMsg({
        text: "User added successfully!",
        type: "success",
      });

      setNewUser({
        name: "",
        email: "",
        password: "",
        address: "",
        role: "Normal User",
      });

      if (onUserAdded) {
        onUserAdded();
      }
    } catch (err) {
      console.error(
        "Add user error:",
        err.response?.data || err.message
      );

      setMsg({
        text:
          err.response?.data?.message ||
          "Failed to add user",
        type: "error",
      });
    }
  };

  return (
    <section className="space-y-4 rounded-lg border bg-white p-6 shadow-md">
      <div className="mb-2 flex items-center gap-2">
        <FiUserPlus
          size={22}
          className="text-black"
        />

        <h3 className="text-lg font-semibold text-gray-900">
          Add New User
        </h3>
      </div>

      {msg.text && (
        <div
          className={`rounded p-3 ${
            msg.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {msg.text}
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
        {["name", "email", "password", "address"].map(
          (field) => (
            <input
              key={field}
              type={
                field === "password"
                  ? "password"
                  : "text"
              }
              placeholder={
                field.charAt(0).toUpperCase() +
                field.slice(1)
              }
              value={newUser[field]}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  [field]: e.target.value,
                })
              }
              className="rounded border p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
            />
          )
        )}

        <select
          value={newUser.role}
          onChange={(e) =>
            setNewUser({
              ...newUser,
              role: e.target.value,
            })
          }
          className="rounded border p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="Normal User">
            Normal User
          </option>
          <option value="Store Owner">
            Store Owner
          </option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      <button
        onClick={handleAddUser}
        className="flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2 font-semibold text-white transition hover:bg-gray-800"
      >
        <FiUserPlus />
        Add User
      </button>
    </section>
  );
}