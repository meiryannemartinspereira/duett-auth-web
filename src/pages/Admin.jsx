import { useEffect, useState } from "react"
import api from "../services/api"
import CreateAdminModal from "../components/CreateAdminModal"

function Admin() {

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {

    try {

      const token = localStorage.getItem("accessToken")

      const response = await api.get("/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setUsers(response.data)

    } catch (error) {

      console.error(error)
      alert("Erro ao buscar usuários")

    } finally {

      setLoading(false)

    }

  }

  const deleteUser = async (id) => {

    const confirmDelete = window.confirm("Deseja realmente deletar este usuário?")

    if (!confirmDelete) return

    try {

      const token = localStorage.getItem("accessToken")

      await api.delete(`/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setUsers(users.filter(user => user.id !== id))

    } catch (error) {

      console.error(error)
      alert("Erro ao deletar usuário")

    }

  }

  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Carregando usuários...</h2>
      </div>
    )
  }

  return (

    <div style={{ padding: "40px", maxWidth: "1100px", margin: "0 auto" }}>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>

        <h1>Painel Administrativo</h1>

        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            padding: "10px 18px",
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Adicionar usuário
        </button>

      </div>

      <div style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden"
      }}>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>

          <thead style={{ background: "#f4f4f4" }}>

            <tr>

              <th style={thStyle}>ID</th>
              <th style={thStyle}>Nome</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>CPF</th>
              <th style={thStyle}>Perfil</th>
              <th style={thStyle}>Ações</th>

            </tr>

          </thead>

          <tbody>

            {users.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                  Nenhum usuário encontrado
                </td>
              </tr>
            )}

            {users.map((user) => (

              <tr key={user.id} style={{ borderTop: "1px solid #eee" }}>

                <td style={tdStyle}>{user.id}</td>
                <td style={tdStyle}>{user.name}</td>
                <td style={tdStyle}>{user.email}</td>
                <td style={tdStyle}>{user.cpf}</td>
                <td style={tdStyle}>{user.role}</td>

                <td style={tdStyle}>

                  <button
                    onClick={() => deleteUser(user.id)}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#dc2626",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                  >
                    Deletar
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <CreateAdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refreshUsers={fetchUsers}
      />

    </div>

  )

}

const thStyle = {
  padding: "12px",
  textAlign: "left",
  fontWeight: "bold",
  fontSize: "14px"
}

const tdStyle = {
  padding: "12px",
  fontSize: "14px"
}

export default Admin