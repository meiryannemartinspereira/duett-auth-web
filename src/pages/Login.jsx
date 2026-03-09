import { useState } from "react"
import { useNavigate } from "react-router-dom"
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
          />
          {errors.email && <p style={{color:"red"}}>{errors.email}</p>}
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
          {loading ? "Entrando..." : "Entrar"}
        </button>

      </form>

      {error && <p>{error}</p>}

    </div>

  )
}

export default Login