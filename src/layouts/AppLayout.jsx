import { Outlet, useNavigate } from "react-router-dom"
import AuthService from "../services/authService"

function AppLayout() {

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await AuthService.logout()
    } finally {
      navigate("/login")
    }
  }

  return (
    <div>

      <nav style={navStyle}>
        <div style={buttonGroup}>
          <button style={navButton} onClick={() => navigate("/change-password")}>
            Change Password
          </button>

          <button style={logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div style={contentStyle}>
        <Outlet />
      </div>

    </div>
  )
}

const navStyle = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  padding: "16px 32px",
  background: "#ffffff",
  borderBottom: "1px solid #e5e7eb"
}

const buttonGroup = {
  display: "flex",
  gap: "12px"
}

const navButton = {
  padding: "10px 18px",
  background: "#2563eb",
  color: "#ffffff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "500"
}

const logoutButton = {
  padding: "10px 18px",
  background: "#ef4444",
  color: "#ffffff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "500"
}

const contentStyle = {
  padding: "40px",
  background: "#f9fafb",
  minHeight: "calc(100vh - 70px)"
}

export default AppLayout