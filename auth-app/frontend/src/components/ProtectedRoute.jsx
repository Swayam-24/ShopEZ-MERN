import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    // If no token exists, redirect to login page!
    return <Navigate to="/" replace />;
  }

  // Otherwise, allow the user to view the component
  return children;
}

export default ProtectedRoute;
