import { useNavigate } from "react-router-dom";
import useMutation from "../../hooks/useMutation";
import { useState } from "react";
import { showNotification } from "../../utils/toast";
import FullScreenLoader from "../../components/FullScreenLoader";

const AddStore = () => {
  const { mutate, isLoading } = useMutation();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [details, setDetails] = useState({
    name: "",
    email: "",
    address: "",
  });

  const validate = () => {
    let formErrors = {};
    if (!details.name) formErrors.name = "Name is required";
    if (!details.email) formErrors.email = "Email ID is required";
    if (!details.address) formErrors.address = "Address is required";
    setErrors(formErrors);
    return formErrors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) return;

    const data = await mutate({
      method: "POST",
      path: "/stores",
      options: {
        headers: { "content-type": "application/json" },
        body: JSON.stringify(details),
      },
    });

    if (data.ok) {
      showNotification("success", data.body.data.msg);
      navigate("/stores");
    } else showNotification("error", data.body.error);
  };

  return (
    <div className="content-wrapper mx-4 sm:mx-5">
      {isLoading && <FullScreenLoader />}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 mt-2 gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-primary">
          Add Store
        </h1>
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-4 w-full sm:w-auto justify-between sm:justify-start">
          <button
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded-md hover:from-blue-600 hover:to-indigo-700 transition duration-300 flex justify-center items-center"
            onClick={() => navigate("/stores")}
          >
            Cancel
          </button>
        </div>
      </div>
      <div className="border w-full p-4 rounded-xl mb-4">
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

          <button
            type="submit"
            className="w-full mt-4 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 py-3 text-sm font-semibold text-white shadow-md transition-all hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStore;
