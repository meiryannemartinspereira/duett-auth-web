import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthService from "../services/authService"

function Dashboard() {

  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {

    try {

      const data = await AuthService.getCurrentUser()

      setUser(data)

    } catch (error) {

      console.error(error)

    } finally {
      setLoading(false)
    }

  }

  const handleLogout = async () => {

    await AuthService.logout()

    navigate("/login")
  }

  if (loading) return <p>Carregando...</p>

  return (

    <div>

      <h1>Dashboard</h1>

      {user && (

        <div>

          <h2>Olá, {user.name} 👋</h2>

          <p>Email: {user.email}</p>

          <p>Perfil: {user.role}</p>

        </div>

      )}

      <button onClick={handleLogout}>
        Logout
      </button>

    </div>

  )
}

export default Dashboard