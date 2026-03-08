import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"

function Register() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    password: ""
  })

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      setLoading(true)
      setError(null)

      await api.post("/auth/register", formData)

      alert("Usuário cadastrado com sucesso!")

      navigate("/login")

    } catch (err) {

      console.error(err)

      if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else {
        setError("Erro ao cadastrar usuário")
      }

    } finally {
      setLoading(false)
    }
  }

  return (
    <div>

      <h1>Criar Conta</h1>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Nome</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>CPF</label>
          <input
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Senha</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>

      </form>

      {error && <p>{error}</p>}

    </div>
  )
}

export default Register