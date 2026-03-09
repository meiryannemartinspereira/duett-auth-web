import { useState } from "react"
import AuthService from "../services/authService"
import { validateChangePassword } from "../utils/validators"

function ChangePassword() {

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  })

  const [errors, setErrors] = useState({})
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

    const validationErrors = validateChangePassword(formData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {

      setLoading(true)
      setError(null)
      setErrors({})

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
          />
          {errors.currentPassword && <p style={{color:"red"}}>{errors.currentPassword}</p>}
        </div>

        <div>
          <label>Nova senha</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />
          {errors.newPassword && <p style={{color:"red"}}>{errors.newPassword}</p>}
        </div>

        <div>
          <label>Confirmar nova senha</label>
          <input
            type="password"
            name="confirmNewPassword"
            value={formData.confirmNewPassword}
            onChange={handleChange}
          />
          {errors.confirmNewPassword && <p style={{color:"red"}}>{errors.confirmNewPassword}</p>}
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