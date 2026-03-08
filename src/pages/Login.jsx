import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthService from "../services/authService"

function Login() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
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

      await AuthService.login(formData)

      navigate("/dashboard")

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

    <div>

      <h1>Login</h1>

      <form onSubmit={handleSubmit}>

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
          {loading ? "Entrando..." : "Entrar"}
        </button>

      </form>

      {error && <p>{error}</p>}

    </div>

  )
}

export default Login