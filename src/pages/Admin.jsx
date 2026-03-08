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

  if (loading) return <p>Carregando...</p>

  return (

    <div>

      <h1>Painel Administrativo</h1>

      <button onClick={() => setIsModalOpen(true)}>
        Criar Admin
      </button>

      <h2>Usuários cadastrados</h2>

      <table border="1">

        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>CPF</th>
            <th>Perfil</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>

          {users.map((user) => (

            <tr key={user.id}>

              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.cpf}</td>
              <td>{user.role}</td>

              <td>

                <button onClick={() => deleteUser(user.id)}>
                  Deletar
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <CreateAdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refreshUsers={fetchUsers}
      />

    </div>
  )
}

export default Admin