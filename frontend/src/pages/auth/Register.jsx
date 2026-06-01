import  { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiHome,
  FiLock,
  FiShield,
} from "react-icons/fi";

import { AuthContext } from "../../context/AuthContext";

export default function Register() {
  const [role, setRole] = useState(
    "NORMAL_USER"
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState({
    text: "",
    type: "",
  });

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    // Name Validation
    if (
      !form.name ||
      form.name.length < 20 ||
      form.name.length > 60
    ) {
      newErrors.name =
        "Name must be 20-60 characters.";
    }

    // Email Validation
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !form.email ||
      !emailRegex.test(form.email)
    ) {
      newErrors.email =
        "Invalid email address.";
    }

    // Address Validation
    if (
      (role === "NORMAL_USER" ||
        role ===
          "SYSTEM_ADMINISTRATOR") &&
      form.address.length > 400
    ) {
      newErrors.address =
        "Address cannot exceed 400 characters.";
    }

    // Password Validation
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;

    if (
      !form.password ||
      !passwordRegex.test(form.password)
    ) {
      newErrors.password =
        "Password must be 8-16 characters, include at least one uppercase letter and one special character.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const submit = async (e) => {
    e.preventDefault();

    setMsg({
      text: "",
      type: "",
    });

    if (!validate()) {
      return;
    }

    try {
      await register({
        ...form,
        role,
      });

      setMsg({
        text:
          "Registration successful! Redirecting to login...",
        type: "success",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setMsg({
        text:
          err.response?.data?.message ||
          "Signup failed",
        type: "error",
      });
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-md rounded-xl border bg-white p-6 shadow-lg">
      <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
        Register
      </h2>

      {msg.text && (
        <div
          className={`mb-4 rounded p-3 text-center font-medium ${
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
        className="space-y-4"
      >
        {/* Role Selector */}
        <div className="flex flex-col">
          <label className="mb-1 flex items-center gap-2 font-medium text-gray-900">
            <FiShield />
            Select Role
          </label>

          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
            className="w-full rounded-lg border p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="NORMAL_USER">
              Normal User
            </option>

            <option value="SYSTEM_ADMINISTRATOR">
              System Administrator
            </option>
          </select>
        </div>

        {/* Name */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 rounded-lg border p-2 focus-within:ring-2 focus-within:ring-black">
            <FiUser className="text-gray-500" />

            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="w-full outline-none text-gray-900"
              required
            />
          </div>

          {errors.name && (
            <p className="mt-1 text-sm text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 rounded-lg border p-2 focus-within:ring-2 focus-within:ring-black">
            <FiMail className="text-gray-500" />

            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="w-full outline-none text-gray-900"
              required
            />
          </div>

          {errors.email && (
            <p className="mt-1 text-sm text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        {/* Address */}
        {(role === "NORMAL_USER" ||
          role ===
            "SYSTEM_ADMINISTRATOR") && (
          <div className="flex flex-col">
            <div className="flex items-center gap-2 rounded-lg border p-2 focus-within:ring-2 focus-within:ring-black">
              <FiHome className="text-gray-500" />

              <input
                type="text"
                placeholder="Address"
                value={form.address}
                onChange={(e) =>
                  setForm({
                    ...form,
                    address:
                      e.target.value,
                  })
                }
                className="w-full outline-none text-gray-900"
                required
              />
            </div>

            {errors.address && (
              <p className="mt-1 text-sm text-red-600">
                {errors.address}
              </p>
            )}
          </div>
        )}

        {/* Password */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 rounded-lg border p-2 focus-within:ring-2 focus-within:ring-black">
            <FiLock className="text-gray-500" />

            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password:
                    e.target.value,
                })
              }
              className="w-full outline-none text-gray-900"
              required
            />
          </div>

          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-black py-3 font-semibold text-white transition hover:bg-gray-800"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}