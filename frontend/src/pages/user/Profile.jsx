import  { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../api/apis";

import AdminDashboard from "../Admin/Dashboard";
import OwnerDashboard from "../Owner/OwnerDashboard";
import UserStoreList from "../user/StoreList";

import {
  FiUser,
  FiMail,
  FiLock,
  FiShield,
} from "react-icons/fi";

export default function Profile() {
  const { user } = useContext(AuthContext);

  const [password, setPassword] =
    useState("");

  const [msg, setMsg] = useState("");
  const [error, setError] =
    useState("");

  const changePassword = async () => {
    setMsg("");
    setError("");

    if (!password) {
      return setError(
        "Password cannot be empty"
      );
    }

    try {
      await api.put(
        "/auth/users/password",
        { password }
      );

      setMsg(
        "Password updated successfully"
      );

      setPassword("");
    } catch (e) {
      setError(
        e.response?.data?.message ||
          "Failed to update password. Try again."
      );
    }
  };

  const renderDashboard = () => {
    switch (user?.role) {
      case "SYSTEM_ADMINISTRATOR":
        return <AdminDashboard />;

      case "STORE_OWNER":
        return <OwnerDashboard />;

      case "NORMAL_USER":
        return <UserStoreList />;

      default:
        return (
          <div className="rounded border bg-white p-4 text-gray-500 shadow-sm">
            No dashboard available
          </div>
        );
    }
  };

  return (
    <div className="mx-auto mt-6 max-w-4xl space-y-6">
      {/* User Info */}
      <div className="flex flex-col space-y-3 rounded-lg border bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          Profile
        </h2>

        <div className="flex items-center space-x-2 text-gray-800">
          <FiUser className="text-gray-600" />

          <span>
            <strong>Name:</strong>{" "}
            {user?.name}
          </span>
        </div>

        <div className="flex items-center space-x-2 text-gray-800">
          <FiMail className="text-gray-600" />

          <span>
            <strong>Email:</strong>{" "}
            {user?.email}
          </span>
        </div>

        <div className="flex items-center space-x-2 text-gray-800">
          <FiShield className="text-gray-600" />

          <span>
            <strong>Role:</strong>{" "}
            {user?.role}
          </span>
        </div>
      </div>

      {/* Dashboard */}
      {renderDashboard()}

      {/* Change Password */}
      <div className="max-w-sm space-y-3 rounded-lg border bg-white p-6 shadow-md">
        <h3 className="mb-2 flex items-center space-x-2 font-semibold text-gray-900">
          <FiLock className="text-gray-600" />
          <span>Change Password</span>
        </h3>

        {msg && (
          <div className="text-green-600">
            {msg}
          </div>
        )}

        {error && (
          <div className="text-red-600">
            {error}
          </div>
        )}

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />

        <button
          onClick={changePassword}
          className="w-full rounded-lg bg-black px-4 py-2 text-white transition hover:bg-gray-800"
        >
          Change Password
        </button>
      </div>
    </div>
  );
}