import  { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";

import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState({
    text: "",
    type: "",
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !form.email ||
      !emailRegex.test(form.email)
    ) {
      newErrors.email =
        "Invalid email address";
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;

    if (
      !form.password ||
      !passwordRegex.test(form.password)
    ) {
      newErrors.password =
        "Password must be 8-16 chars, include 1 uppercase & 1 special char";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
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
      await login(form);

      setMsg({
        text: "Login successful! Redirecting...",
        type: "success",
      });

      setTimeout(() => {
        navigate("/profile");
      }, 1000);
    } catch (err) {
      setMsg({
        text:
          err.response?.data?.message ||
          "Login failed",
        type: "error",
      });
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-md rounded-xl border bg-white p-6 shadow-lg">
      <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
        Login
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
                  password: e.target.value,
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
          Login
        </button>
      </form>
    </div>
  );
}