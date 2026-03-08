import { useState } from "react"
import AuthService from "../services/authService"

function ChangePassword() {

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

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

      await AuthService.changePassword(formData)

      alert("Senha alterada com sucesso")

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
      })

    } catch (err) {

      if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else {
        setError("Erro ao alterar senha")
      }

    } finally {
      setLoading(false)
    }

  }

  return (

    <div>

      <h1>Alterar Senha</h1>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Senha atual</label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Nova senha</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Confirmar nova senha</label>
          <input
            type="password"
            name="confirmNewPassword"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Alterando..." : "Alterar senha"}
        </button>

      </form>

      {error && <p>{error}</p>}

    </div>

  )
}

export default ChangePassword