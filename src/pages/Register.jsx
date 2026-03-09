import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthService from "../services/authService"
import { cpfMask } from "../utils/cpfMask"
import { validateRegister } from "../utils/validators"

function Register() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    password: ""
  })

  const [errors, setErrors] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    let { name, value } = e.target
    if (name === "cpf") value = cpfMask(value)
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validateRegister(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      setLoading(true)
      setError(null)
      setErrors({})

      const payload = {
        ...formData,
        cpf: formData.cpf.replace(/\D/g, "")
      }

      await AuthService.register(payload)
      navigate("/login")
    } catch (err) {
      if (err.response?.data?.message) setError(err.response.data.message)
      else setError("Erro ao cadastrar usuário")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={containerStyle}>
      <div style={formWrapperStyle}>
        <h1 style={titleStyle}>Criar Conta</h1>

        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={fieldStyle}>
            <label>Nome</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p style={errorStyle}>{errors.name}</p>}
          </div>

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
            <label>CPF</label>
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
            />
            {errors.cpf && <p style={errorStyle}>{errors.cpf}</p>}
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
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>

          {error && <p style={errorStyle}>{error}</p>}
        </form>

        <p style={registerTextStyle}>
          Já tem uma conta? <a href="/login">Entrar</a>
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

export default Register