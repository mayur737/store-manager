import { useMemo } from "react";
import useQuery from "../../hooks/useQuery";
import FullScreenLoader from "../../components/FullScreenLoader";

const AdminDashboard = () => {
  const userQuery = useMemo(
    () => ({ method: "Get", path: "/users/stats" }),
    []
  );
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
          Dashboard
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold text-gray-800 truncate">
            Total Users :{" "}
            <span className="text-lg font-medium text-blue-600 mt-1">
              {data?.userCount}
            </span>
          </h2>
        </div>
        <div className="bg-white shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold text-gray-800 truncate">
            Total Stores :{" "}
            <span className="text-lg font-medium text-blue-600 mt-1">
              {data?.storeCount}
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
