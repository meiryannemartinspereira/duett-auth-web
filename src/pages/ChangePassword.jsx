import { useState } from "react"
import AuthService from "../services/authService"
import { validateChangePassword } from "../utils/validators"

function ChangePassword() {

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    const validationErrors = validateChangePassword(formData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {

      setLoading(true)
      setError(null)
      setErrors({})

      await AuthService.changePassword(formData)

      alert("Senha alterada com sucesso")

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
      })

    } catch (err) {

      if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else {
        setError("Erro ao alterar senha")
      }

    } finally {
      setLoading(false)
    }

  }

  return (

    <div style={containerStyle}>

      <div style={cardStyle}>

        <h1 style={titleStyle}>Alterar Senha</h1>

        <form onSubmit={handleSubmit} style={formStyle}>

          <div style={inputGroup}>
            <label style={labelStyle}>Senha atual</label>
            <input
              style={inputStyle}
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
            />
            {errors.currentPassword && <p style={errorText}>{errors.currentPassword}</p>}
          </div>

          <div style={inputGroup}>
            <label style={labelStyle}>Nova senha</label>
            <input
              style={inputStyle}
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
            {errors.newPassword && <p style={errorText}>{errors.newPassword}</p>}
          </div>

          <div style={inputGroup}>
            <label style={labelStyle}>Confirmar nova senha</label>
            <input
              style={inputStyle}
              type="password"
              name="confirmNewPassword"
              value={formData.confirmNewPassword}
              onChange={handleChange}
            />
            {errors.confirmNewPassword && <p style={errorText}>{errors.confirmNewPassword}</p>}
          </div>

          <button style={buttonStyle} type="submit" disabled={loading}>
            {loading ? "Alterando..." : "Alterar senha"}
          </button>

        </form>

        {error && <p style={errorText}>{error}</p>}

      </div>

    </div>

  )
}

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "80vh"
}

const cardStyle = {
  background: "#ffffff",
  padding: "40px",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  width: "400px"
}

const titleStyle = {
  marginBottom: "24px",
  textAlign: "center"
}

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "18px"
}

const inputGroup = {
  display: "flex",
  flexDirection: "column"
}

const labelStyle = {
  marginBottom: "6px",
  fontWeight: "500"
}

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #d1d5db",
  fontSize: "14px"
}

const buttonStyle = {
  marginTop: "10px",
  padding: "12px",
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "500"
}

const errorText = {
  color: "#ef4444",
  fontSize: "13px",
  marginTop: "4px"
}

export default ChangePassword