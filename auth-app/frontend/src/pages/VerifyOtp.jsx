import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL_AUTH}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      if (data.success) {
        navigate("/change-password", { state: { email, otp } });
      } else {
        setErrorMsg(data.message || "Invalid or Expired OTP.");
      }
    } catch (err) {
      setErrorMsg("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setErrorMsg("");
    setMessage("");
    setResendLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL_AUTH}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.success) {
        setMessage("A new OTP has been sent to your email!");
      } else {
        setErrorMsg(data.message || "Failed to resend OTP.");
      }
    } catch (err) {
      setErrorMsg("Something went wrong");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Verify OTP</h2>
        <p style={{ textAlign: "center", color: "#666", marginBottom: "20px", fontSize: "14px" }}>
          Sent to <strong>{email}</strong>
        </p>

        {errorMsg && <p className="error-message" style={{ color: "red", textAlign: "center", marginBottom: "10px" }}>{errorMsg}</p>}
        {message && <p className="success-message" style={{ color: "green", textAlign: "center", marginBottom: "10px" }}>{message}</p>}

        <form onSubmit={handleVerifyOtp}>
          <div className="input-group">
            <input type="text" placeholder="Enter 4-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required maxLength={4} />
          </div>

          <button type="submit" disabled={loading || !otp}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "15px" }}>
          <button 
            type="button" 
            onClick={handleResendOtp} 
            disabled={resendLoading}
            style={{
              background: "transparent",
              color: "#007BFF",
              border: "none",
              textDecoration: "underline",
              padding: "0",
              cursor: resendLoading ? "default" : "pointer"
            }}
          >
            {resendLoading ? "Resending..." : "Didn't receive an email? Resend OTP"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default VerifyOtp;
