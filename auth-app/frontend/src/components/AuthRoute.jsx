import { Navigate } from "react-router-dom";

function AuthRoute({ children }) {
  const token = localStorage.getItem("token");

  // if (token) {
  //   // If the user is already logged in, they shouldn't see the Login/Signup page!
  //   return <Navigate to="/home" replace />;
  // }

  // Otherwise, allow the user to view the auth pages
  return children;
}

export default AuthRoute;
