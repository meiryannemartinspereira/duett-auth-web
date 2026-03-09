import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthService from "../services/authService"

function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
      const data = await AuthService.getCurrentUser()
      setUser(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await AuthService.logout()
    navigate("/login")
  }

  const goToAdmin = () => {
    navigate("/admin")
  }

  if (loading) return <p style={loadingStyle}>Carregando...</p>

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Dashboard</h1>

        {user && (
          <div style={userInfoStyle}>
            <h2>Olá, {user.name} 👋</h2>
            <p>Email: {user.email}</p>
            <p>Perfil: {user.role}</p>
          </div>
        )}

        <div style={buttonGroupStyle}>
          <button style={adminButtonStyle} onClick={goToAdmin}>
            Painel Administrativo
          </button>
          <button style={logoutButtonStyle} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "#f5f5f5"
}

const cardStyle = {
  background: "#fff",
  padding: "40px",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  width: "400px",
  textAlign: "center"
}

const titleStyle = {
  marginBottom: "24px"
}

const userInfoStyle = {
  marginBottom: "32px",
  textAlign: "left"
}

const buttonGroupStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: "16px"
}

const adminButtonStyle = {
  flex: 1,
  padding: "12px",
  background: "#4f46e5",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
}

const logoutButtonStyle = {
  flex: 1,
  padding: "12px",
  background: "#e53e3e",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
}

const loadingStyle = {
  textAlign: "center",
  marginTop: "50px",
  fontSize: "18px"
}

export default Dashboard