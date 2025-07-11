import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useQuery from "../../hooks/useQuery";
import FullScreenLoader from "../../components/FullScreenLoader";

const UserList = () => {
  const navigate = useNavigate();

  const userQuery = useMemo(() => ({ method: "Get", path: "/users" }), []);
  const {
    data: {
      body: { data },
    },
    isLoading,
  } = useQuery(userQuery);

  return (
    <div className="content-wrapper mx-4 sm:mx-5">
      {isLoading && <FullScreenLoader />}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 mt-2 gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-primary">
          User List
        </h1>
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-4 w-full sm:w-auto justify-between sm:justify-start">
          <button
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded-md hover:from-blue-600 hover:to-indigo-700 transition duration-300 flex justify-center items-center"
            onClick={() => navigate("/users/add")}
          >
            Add User
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data?.users.map((user) => (
          <div
            key={user?.id}
            className="bg-white shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-lg transition duration-300"
          >
            <h2 className="text-lg font-semibold text-gray-800 truncate">
              {user?.name}
            </h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
            <p className="text-sm text-gray-500">📍 {user?.address}</p>
            <p className="text-sm font-medium text-blue-600 mt-1">
              Role: {user?.role}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Average Rating: {user?.avgRating ?? "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
