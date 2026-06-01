
import  { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { user } = useContext(AuthContext);

  // User not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // User does not have required role
  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {
    return (
      <div className="p-4 text-red-500">
        Access Denied
      </div>
    );
  }

  // User is authenticated and authorized
  return <Outlet />;
};

export default ProtectedRoute;