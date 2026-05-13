import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function ChangePassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const otp = location.state?.otp || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Prevent unauthorized access 
    if (!email || !otp) {
      navigate("/forgot-password");
    }
  }, [email, otp, navigate]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (newPassword !== confirmPassword) {
      setErrorMsg("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL_AUTH}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await response.json();
      if (data.success) {
        alert("Password reset successful! You may now login.");
        navigate("/");
      } else {
        setErrorMsg(data.message || "Failed to reset password. Token may be expired.");
      }
    } catch (err) {
      setErrorMsg("Something went wrong connecting to the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Change Password</h2>
        <p style={{ textAlign: "center", color: "#666", marginBottom: "20px", fontSize: "14px" }}>
          Valid OTP confirmed for <strong>{email}</strong>. Entering new credentials.
        </p>

        {errorMsg && <p className="error-message" style={{ color: "red", textAlign: "center", marginBottom: "10px" }}>{errorMsg}</p>}

        <form onSubmit={handleResetPassword}>
          <div className="input-group password-container">
            <input 
              type={showNewPassword ? "text" : "password"} 
              placeholder="Enter New Password" 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
              required 
              minLength={8} 
            />
            <span
              className="eye-icon"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="input-group password-container">
            <input 
              type={showConfirmPassword ? "text" : "password"} 
              placeholder="Confirm New Password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
              minLength={8} 
            />
            <span
              className="eye-icon"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" disabled={loading || !newPassword || !confirmPassword}>
            {loading ? "Updating..." : "Save Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
