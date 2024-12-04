import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginUser from "./pages/login";
import RegisterUser from "./pages/register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditUserForm from "./pages/edit";
import AddProperty from "./pages/addProperty";
import AdminDashboard from "./pages/adminDashboard.jsx";
import EditProperty from "./pages/editProperty.jsx";
import HomePage from "./pages/home.jsx";
import ManagerDashboard from "./pages/managerDashboard.jsx";
import ProtectedRoute from "./components/protectedRoute.jsx";
import UnauthorizedAccessPage from "./pages/unotharisedAccess.jsx";
<ToastContainer
  position="top-right"
  autoClose={5000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  toastStyle={{ backgroundColor: "#002839", color: "#f0f9f9" }} // Custom global style
/>;

function App() {
  return (
    <div>
      <Routes>
        {/* <Route path="/" element={<LoginUser />} /> */}
        <Route path="/login" element={<LoginUser />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/unauthorized" element={<UnauthorizedAccessPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute allowedRoles={["Admin", "User", "Manager"]}>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Manager"]}>
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/property/add"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AddProperty />
            </ProtectedRoute>
          }
        />
        <Route
          path="//admin/property/edit/:id"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Manager"]}>
              <EditProperty />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <EditUserForm />
            </ProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
