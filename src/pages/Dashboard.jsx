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
            <h2 style={welcomeStyle}>Olá, {user.name} 👋</h2>
            <p style={infoText}>Email: {user.email}</p>
            <p style={infoText}>Perfil: {user.role}</p>
          </div>
        )}

        {user?.role === "ADMIN" && (
          <div style={buttonGroupStyle}>
            <button style={adminButtonStyle} onClick={goToAdmin}>
              Painel Administrativo
            </button>
          </div>
        )}

      </div>

    </div>
  )
}

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "40px"
}

const cardStyle = {
  background: "#ffffff",
  padding: "40px",
  borderRadius: "10px",
  boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
  width: "420px"
}

const titleStyle = {
  marginBottom: "24px",
  textAlign: "center"
}

const welcomeStyle = {
  marginBottom: "12px"
}

const userInfoStyle = {
  marginBottom: "30px"
}

const infoText = {
  color: "#4b5563",
  fontSize: "14px"
}

const buttonGroupStyle = {
  display: "flex",
  marginTop: "20px"
}

const adminButtonStyle = {
  width: "100%",
  padding: "12px",
  background: "#2563eb",
  color: "#ffffff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "500"
}

const loadingStyle = {
  textAlign: "center",
  marginTop: "50px",
  fontSize: "18px"
}

export default Dashboard