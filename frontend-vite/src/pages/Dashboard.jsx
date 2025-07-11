import { useContext } from "react";
import { GlobalContext } from "../contexts/AllContext";
import AdminDashboard from "./admin/AdminDashboard";
import UserDashboard from "./user/UserDashboard";
import StoreOwnerDashboard from "./owner/StoreOwnerDashboard";

const Dashboard = () => {
  const [state] = useContext(GlobalContext);
  const role = state?.user?.role;
  if (!role) return <Navigate to="/login" replace />;

  switch (role) {
    case "ADMIN":
      return <AdminDashboard />;
    case "USER":
      return <UserDashboard />;
    case "OWNER":
      return <StoreOwnerDashboard />;
    default:
      return <div>Unauthorized</div>;
  }
};

export default Dashboard;
