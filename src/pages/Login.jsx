import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import AuthService from "../services/authService"
import { validateLogin } from "../utils/validators"

function Login() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const [errors, setErrors] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const decodeJWT = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]))
    } catch {
      return null
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validateLogin(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      setLoading(true)
      setError(null)
      setErrors({})

      const userData = await AuthService.login(formData)
      const decoded = decodeJWT(userData.accessToken)

      if (decoded?.role === "ROLE_ADMIN") {
        navigate("/dashboard")
      } else {
        navigate("/home")
      }

    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else {
        setError("Erro ao fazer login")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={containerStyle}>
      <div style={formWrapperStyle}>
        <h1 style={titleStyle}>Login</h1>

        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={fieldStyle}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p style={errorStyle}>{errors.email}</p>}
          </div>

          <div style={fieldStyle}>
            <label>Senha</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p style={errorStyle}>{errors.password}</p>}
          </div>

          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? "Entrando..." : "Entrar"}
          </button>

          {error && <p style={errorStyle}>{error}</p>}
        </form>

        <p style={registerTextStyle}>
          Não tem uma conta? <Link to="/register">Registrar-se</Link>
        </p>
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

const formWrapperStyle = {
  background: "#fff",
  padding: "40px",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  width: "350px",
  textAlign: "center"
}

const titleStyle = {
  marginBottom: "24px"
}

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "16px"
}

const fieldStyle = {
  display: "flex",
  flexDirection: "column",
  textAlign: "left"
}

const buttonStyle = {
  padding: "12px",
  background: "#4f46e5",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
}

const errorStyle = {
  color: "red",
  fontSize: "14px",
  marginTop: "4px"
}

const registerTextStyle = {
  marginTop: "16px",
  fontSize: "14px"
}

export default Login