import  { useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { createStore } from "../../api/apis";

export default function AddStore({ onStoreAdded }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    ownerId: "",
  });

  const [msg, setMsg] = useState({
    text: "",
    type: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMsg({
      text: "",
      type: "",
    });

    try {
      await createStore(form);

      setMsg({
        text: "Store added successfully!",
        type: "success",
      });

      setForm({
        name: "",
        email: "",
        address: "",
        ownerId: "",
      });

      if (onStoreAdded) {
        onStoreAdded();
      }
    } catch (err) {
      setMsg({
        text:
          err.response?.data?.message ||
          "Failed to add store",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-4 rounded-lg border bg-white p-6 shadow-md">
      <div className="mb-2 flex items-center gap-2">
        <FiShoppingBag
          size={22}
          className="text-black"
        />

        <h3 className="text-lg font-semibold text-gray-900">
          Add New Store
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

      <form
        onSubmit={submit}
        className="grid grid-cols-1 gap-3 md:grid-cols-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Store Name"
          value={form.name}
          onChange={handleChange}
          required
          className="rounded border p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <input
          type="email"
          name="email"
          placeholder="Store Email"
          value={form.email}
          onChange={handleChange}
          required
          className="rounded border p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
          className="rounded border p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <input
          type="text"
          name="ownerId"
          placeholder="Owner ID"
          value={form.ownerId}
          onChange={handleChange}
          required
          className="rounded border p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <button
          type="submit"
          disabled={loading}
          className="col-span-1 mt-2 flex items-center justify-center gap-2 rounded-lg bg-black py-2 font-semibold text-white transition hover:bg-gray-800 md:col-span-4"
        >
          <FiShoppingBag />
          {loading ? "Adding..." : "Add Store"}
        </button>
      </form>
    </section>
  );
}