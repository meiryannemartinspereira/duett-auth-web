import { useState } from "react"
import api from "../services/api"

function CreateAdminModal({ isOpen, onClose, refreshUsers }) {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    password: ""
  })

  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const createAdmin = async (e) => {

    e.preventDefault()

    try {

      const token = localStorage.getItem("accessToken")

      await api.post("/admin/users/admin", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setFormData({
        name: "",
        email: "",
        cpf: "",
        password: ""
      })

      refreshUsers()
      onClose()

    } catch (error) {

      console.error(error)
      alert("Erro ao criar admin")

    }
  }

  return (

    <div style={overlayStyle}>

      <div style={modalStyle}>

        <h2>Criar novo ADMIN</h2>

        <form onSubmit={createAdmin}>

          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="cpf"
            placeholder="CPF"
            value={formData.cpf}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Criar
          </button>

          <button type="button" onClick={onClose}>
            Cancelar
          </button>

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
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}

const modalStyle = {
  background: "white",
  padding: "24px",
  borderRadius: "8px",
  width: "400px"
}

export default CreateAdminModal