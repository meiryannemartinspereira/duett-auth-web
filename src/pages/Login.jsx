import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()

    try {
      const response = await api.post("/auth/authenticate", {
        email,
        password
      })

      localStorage.setItem("accessToken", response.data.accessToken)
      localStorage.setItem("refreshToken", response.data.refreshToken)

      navigate("/dashboard")

    } catch (error) {
      console.error("LOGIN ERROR:", error)
    }
  }

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit">Login</button>

      </form>
    </div>
  )
}

export default Login