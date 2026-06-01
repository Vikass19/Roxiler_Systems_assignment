import  { useContext, useState } from "react";
import {
  FiUsers,
  FiShoppingBag,
  FiStar,
  FiLogOut,
} from "react-icons/fi";

import { AuthContext } from "../../context/AuthContext";
import useAdminData from "../../hooks/useAdmin";
import AddUser from "./AddUser";
import AddStore from "./AddStore";

export default function Dashboard() {
  const { logout } = useContext(AuthContext);

  const {
    stats,
    users,
    stores,
    loading,
    refresh,
  } = useAdminData();

  const [filter, setFilter] = useState({
    name: "",
    email: "",
    address: "",
    role: "",
  });

  const match = (text, value) =>
    text?.toLowerCase().includes(value.toLowerCase());

  const filteredUsers = users.filter(
    (user) =>
      match(user.name, filter.name) &&
      match(user.email, filter.email) &&
      match(user.address, filter.address) &&
      match(user.role, filter.role)
  );

  const filteredStores = stores.filter(
    (store) =>
      match(store.name, filter.name) &&
      match(store.email, filter.email) &&
      match(store.address, filter.address)
  );

  if (loading) {
    return (
      <p className="p-4 text-gray-700">
        Loading dashboard...
      </p>
    );
  }

  return (
    <div className="mx-auto mt-6 max-w-7xl space-y-6 px-4">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Admin Dashboard
        </h2>

        <button
          onClick={logout}
          className="flex items-center gap-2 rounded-lg bg-black px-5 py-2 font-semibold text-white transition hover:bg-gray-800"
        >
          <FiLogOut />
          Logout
        </button>
      </div>

      {/* Add User & Add Store */}
      <div className="grid gap-6 md:grid-cols-2">
        <AddUser onUserAdded={refresh} />
        <AddStore onStoreAdded={refresh} />
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <StatCard
          icon={<FiUsers size={28} />}
          label="Users"
          value={stats.users}
        />

        <StatCard
          icon={<FiShoppingBag size={28} />}
          label="Stores"
          value={stats.stores}
        />

        <StatCard
          icon={<FiStar size={28} />}
          label="Ratings"
          value={stats.ratings}
        />
      </div>

      {/* Filters */}
      <div>
        <h2 className="mb-3 text-xl font-bold text-gray-900">
          Filters
        </h2>

        <section className="grid grid-cols-1 gap-4 rounded border bg-gray-50 p-4 md:grid-cols-4">
          {["name", "email", "address", "role"].map(
            (field) => (
              <input
                key={field}
                type="text"
                placeholder={
                  field.charAt(0).toUpperCase() +
                  field.slice(1)
                }
                value={filter[field]}
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    [field]: e.target.value,
                  })
                }
                className="rounded border p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
              />
            )
          )}
        </section>
      </div>

      {/* Users Table */}
      <DataTable
        title="Users"
        headers={[
          "Name",
          "Email",
          "Address",
          "Role",
          "Rating",
        ]}
        rows={filteredUsers.map((user) => [
          user.name,
          user.email,
          user.address,
          user.role,
          user.role === "STORE_OWNER"
            ? user.rating || 0
            : "-",
        ])}
      />

      {/* Stores Table */}
      <DataTable
        title="Stores"
        headers={[
          "Name",
          "Email",
          "Address",
          "Rating",
        ]}
        rows={filteredStores.map((store) => [
          store.name,
          store.email,
          store.address,
          store.ratings?.length
            ? (
                store.ratings.reduce(
                  (total, rating) =>
                    total + rating.value,
                  0
                ) / store.ratings.length
              ).toFixed(1)
            : 0,
        ])}
      />
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 rounded-lg border bg-white p-5 shadow-md transition hover:shadow-xl">
      <div className="text-black">{icon}</div>

      <div>
        <p className="uppercase tracking-wide text-gray-500">
          {label}
        </p>

        <p className="text-3xl font-extrabold text-gray-900">
          {value}
        </p>
      </div>
    </div>
  );
}

function DataTable({ title, headers, rows }) {
  return (
    <section className="mt-6">
      <h3 className="mb-3 text-2xl font-bold text-gray-900">
        {title}
      </h3>

      <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
        <table className="min-w-full border-collapse text-left">
          <thead className="bg-gray-100">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="border px-4 py-3 text-gray-900"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="transition hover:bg-gray-50"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="border px-4 py-3 text-gray-900"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}