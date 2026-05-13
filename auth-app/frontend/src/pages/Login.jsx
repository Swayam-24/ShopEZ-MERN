import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("Customer");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const strongPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!strongPassword.test(password)) {
      setErrorMsg(
        "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return;
    }

    setErrorMsg(""); // Clear previous errors

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL_AUTH}/auth/login`, { // Auth backend port
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, userType }),
      });
      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem("token", data.jwtToken);
        localStorage.setItem("loggedInUser", data.name || data.email);
        localStorage.setItem("userId", data.userId);
        
        // Show success animation instead of alert
        setLoginSuccess(true);
        
        // Delay redirection for the "rotating ribbon" feel
        setTimeout(() => {
          const userName = data.name || data.email;
          const targetUrl = userType === "Admin" 
            ? import.meta.env.VITE_ADMIN_FRONTEND_URL 
            : import.meta.env.VITE_SHOP_FRONTEND_URL;
          const portalName = userType === "Admin" ? "Admin Portal" : "Dashboard";
          
          console.log(`Redirecting to ${portalName} at ${targetUrl}`);
          window.location.href = `${targetUrl}?userId=${data.userId}&user=${encodeURIComponent(userName)}`;
        }, 2500);
      } else {
        setErrorMsg(data.message || "Incorrect password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMsg("Something went wrong");
    }
  };

  return (
    <div className="login-container">
      {loginSuccess && (
        <div className="success-overlay">
          <div className="ribbon-container">
            <div className="pink-ribbon"></div>
            <span className="ribbon-sparkle">✨</span>
          </div>
          <p className="success-text">Welcome to ShopEz!</p>
          <p className="redirecting-text" style={{ fontSize: '0.9rem', color: '#888', marginTop: '8px' }}>
            Navigating to your dashboard...
          </p>
        </div>
      )}

      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {errorMsg && <p className="error-message" style={{ color: "red", textAlign: "center", marginBottom: "10px" }}>{errorMsg}</p>}

        <div className="input-group">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
            <p className="forgot-password">
  <Link to="/forgot-password">Forgot Password?</Link>
              </p> <br/>
        
        <div className="input-group">
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            required
          >
            <option value="Customer">Customer</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <button type="submit">Login</button>

        <p className="sign-up-text">
          Don't have an account?
          <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;