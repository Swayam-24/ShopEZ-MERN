import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("loggedInUser");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-box" style={{ textAlign: "center" }}>
        <h1 style={{ marginTop: "0", fontSize: "2rem" }}>Welcome {userName || "User"}!</h1>
        <p style={{ color: "#555" }}>You have successfully logged in.</p>
        <button 
          onClick={handleLogout} 
          style={{ width: "100%", padding: "12px", borderRadius: "10px", marginTop: "20px", border: "none", backgroundColor: "blue", color: "white", cursor: "pointer", fontSize: "16px" }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;
