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

    if (name === "cpf") {
      value = cpfMask(value)
    }

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

      await AuthService.register(formData)

      navigate("/login")

    } catch (err) {

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
          />
          {errors.name && <p style={{color:"red"}}>{errors.name}</p>}
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p style={{color:"red"}}>{errors.email}</p>}
        </div>

        <div>
          <label>CPF</label>
          <input
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
          />
          {errors.cpf && <p style={{color:"red"}}>{errors.cpf}</p>}
        </div>

        <div>
          <label>Senha</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p style={{color:"red"}}>{errors.password}</p>}
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