import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ContextProvider } from "./contexts/GlobalContext";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import Register from "./pages/Register";
import DeAuth from "./components/auth/Deauth";
import Auth from "./components/auth/Auth";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/common/NotFound";
import DashboardLayout from "./layout/DashboardLayout";
import UserList from "./pages/admin/UserList";
import StoreList from "./pages/admin/StoreList";
import AddUser from "./pages/admin/AddUser";
import AddStore from "./pages/admin/AddStore";

export default function App() {
  return (
    <Router>
      <ContextProvider>
        <Routes>
          <Route element={<DeAuth />}>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<Auth />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/users/add" element={<AddUser />} />
              <Route path="/stores" element={<StoreList />} />
              <Route path="/stores/add" element={<AddStore />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </ContextProvider>
    </Router>
  );
}
