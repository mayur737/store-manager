import { useState } from "react";
import useMutation from "../hooks/useMutation";
import { showNotification } from "../utils/toast";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation();
  const [errors, setErrors] = useState({});
  const [details, setDetails] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });

  const validate = () => {
    let formErrors = {};
    if (!details.email) formErrors.email = "Email ID is required";
    if (!details.password) formErrors.password = "Password is required";
    if (!details.address) formErrors.address = "Address is required";
    if (!details.name) formErrors.name = "Name is required";
    setErrors(formErrors);
    return formErrors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) return;

    const {
      ok,
      body: { msg, error },
    } = await mutate({
      method: "POST",
      path: "/auth/register",
      options: {
        headers: { "content-type": "application/json" },
        body: JSON.stringify(details),
      },
    });

    if (ok) {
      showNotification("success", msg);
      navigate("/");
    } else showNotification("error", error);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 to-blue-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome
        </h2>
        <p className="text-sm text-center text-gray-500 mb-2">
          Please Register to continue.
        </p>
        <form onSubmit={onSubmit} className="space-y-2">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={details.name}
              onChange={(e) => {
                setDetails((prev) => ({ ...prev, name: e.target.value }));
                if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
              }}
              placeholder="Enter Your Name"
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email ID
            </label>
            <input
              type="email"
              id="email"
              value={details.email}
              onChange={(e) => {
                setDetails((prev) => ({ ...prev, email: e.target.value }));
                if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
              }}
              placeholder="Enter Your Email ID"
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <textarea
              id="address"
              value={details.address}
              onChange={(e) => {
                setDetails((prev) => ({ ...prev, address: e.target.value }));
                if (errors.address)
                  setErrors((prev) => ({ ...prev, address: "" }));
              }}
              placeholder="Enter full address"
              rows={2}
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
            />
            {errors.address && (
              <p className="mt-1 text-xs text-red-500">{errors.address}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={details.password}
              onChange={(e) => {
                setDetails((prev) => ({ ...prev, password: e.target.value }));
                if (errors.password)
                  setErrors((prev) => ({ ...prev, password: "" }));
              }}
              placeholder="********"
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full mt-4 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 py-3 text-sm font-semibold text-white shadow-md transition-all hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
          <div className="flex justify-center gap-4 items-center">
            Already have an account?
            <a
              href="/"
              className="text-sm font-medium text-indigo-600 hover:underline"
            >
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
