import { useNavigate } from "react-router-dom"
import AuthService from "../services/authService"
import jwt_decode from "jwt-decode"

function NavBar() {
  const navigate = useNavigate()
  const token = localStorage.getItem("accessToken")
  let role = null
  if (token) {
    const decoded = jwt_decode(token)
    role = decoded.role
  }

  const handleLogout = async () => {
    await AuthService.logout()
    navigate("/login")
  }

  const goToChangePassword = () => navigate("/change-password")
  const goToAdminPanel = () => navigate("/admin")

  return (
    <nav style={navStyle}>
      {role === "ROLE_ADMIN" && (
        <button onClick={goToAdminPanel} style={buttonStyle}>
          Painel Admin
        </button>
      )}
      <button onClick={goToChangePassword} style={buttonStyle}>
        Alterar Senha
      </button>
      <button onClick={handleLogout} style={buttonStyle}>
        Logout
      </button>
    </nav>
  )
}

const navStyle = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "16px",
  padding: "16px",
  background: "#f5f5f5",
  borderBottom: "1px solid #ddd"
}

const buttonStyle = {
  padding: "8px 16px",
  background: "#4f46e5",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
}

export default NavBar