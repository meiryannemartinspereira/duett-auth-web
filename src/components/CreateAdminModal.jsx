import { useState } from "react"
import api from "../services/api"
import { cpfMask } from "../utils/cpfMask"

function CreateAdminModal({ isOpen, onClose, refreshUsers }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    password: ""
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const validate = () => {
    const newErrors = {}

    if (formData.name.trim().length < 3) newErrors.name = "Nome deve ter pelo menos 3 caracteres"

    const emailRegex = /\S+@\S+\.\S+/
    if (!emailRegex.test(formData.email)) newErrors.email = "Email inválido"

    const cpfNumbersOnly = formData.cpf.replace(/\D/g, "")
    const cpfRegex = /^\d{11}$/
    if (!cpfRegex.test(cpfNumbersOnly)) newErrors.cpf = "CPF deve conter 11 números"

    if (formData.password.length < 6) newErrors.password = "Senha deve ter no mínimo 6 caracteres"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    let formattedValue = value
    if (name === "cpf") formattedValue = cpfMask(value)
    setFormData({
      ...formData,
      [name]: formattedValue
    })
    setErrors(prev => ({
      ...prev,
      [name]: ""
    }))
  }

  const createAdmin = async (e) => {
    e.preventDefault()
    if (!validate()) return

    try {
      setLoading(true)
      const token = localStorage.getItem("accessToken")
      await api.post("/admin/users/admin", {
        ...formData,
        cpf: formData.cpf.replace(/\D/g, "")
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setFormData({ name: "", email: "", cpf: "", password: "" })
      setErrors({})
      refreshUsers()
      onClose()
    } catch (error) {
      const apiMessage = error?.response?.data?.message
      if (apiMessage) {
        setErrors(prev => ({
          ...prev,
          email: apiMessage.includes("Email") ? apiMessage : prev.email,
          cpf: apiMessage.includes("CPF") ? apiMessage : prev.cpf
        }))
      } else {
        alert("Erro ao criar admin")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2 style={titleStyle}>Criar novo ADMIN</h2>
        <form onSubmit={createAdmin} style={formStyle}>
          <div style={fieldContainer}>
            <input
              style={inputStyle}
              type="text"
              name="name"
              placeholder="Nome"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span style={errorText}>{errors.name}</span>}
          </div>
          <div style={fieldContainer}>
            <input
              style={inputStyle}
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span style={errorText}>{errors.email}</span>}
          </div>
          <div style={fieldContainer}>
            <input
              style={inputStyle}
              type="text"
              name="cpf"
              placeholder="CPF (somente números)"
              value={formData.cpf}
              onChange={handleChange}
            />
            {errors.cpf && <span style={errorText}>{errors.cpf}</span>}
          </div>
          <div style={fieldContainer}>
            <input
              style={inputStyle}
              type="password"
              name="password"
              placeholder="Senha"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span style={errorText}>{errors.password}</span>}
          </div>
          <div style={buttonsContainer}>
            <button type="button" onClick={onClose} style={cancelButton}>Cancelar</button>
            <button type="submit" disabled={loading} style={createButton}>
              {loading ? "Criando..." : "Criar Admin"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999
}

const modalStyle = {
  background: "#fff",
  padding: "32px",
  borderRadius: "10px",
  width: "420px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
}

const titleStyle = {
  textAlign: "center",
  marginBottom: "24px"
}

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "16px"
}

const fieldContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "4px"
}

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "14px"
}

const errorText = {
  color: "#dc2626",
  fontSize: "12px"
}

const buttonsContainer = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "10px"
}

const cancelButton = {
  padding: "10px 16px",
  borderRadius: "6px",
  border: "none",
  background: "#9ca3af",
  color: "#fff",
  cursor: "pointer"
}

const createButton = {
  padding: "10px 16px",
  borderRadius: "6px",
  border: "none",
  background: "#2563eb",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "bold"
}

export default CreateAdminModal