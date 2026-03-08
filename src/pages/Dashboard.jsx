import { useEffect, useState } from "react"
import api from "../services/api"

function Dashboard() {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {

    try {

      const token = localStorage.getItem("accessToken")

      const response = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setUser(response.data)

    } catch (error) {

      console.error("Erro ao buscar usuário:", error)

    } finally {
      setLoading(false)
    }
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

    </div>

  )
}

export default Dashboard