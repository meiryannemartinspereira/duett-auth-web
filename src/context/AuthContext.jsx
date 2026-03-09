import { createContext, useState, useEffect } from "react"
import AuthService from "../services/authService"

export const AuthContext = createContext()

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null)

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token")

      if (token) {
        try {
          const userData = await AuthService.getCurrentUser()
          setUser(userData)
        } catch (error) {
          localStorage.removeItem("token")
        }
      }
    }

    loadUser()
  }, [])

  function login(userData, token) {
    localStorage.setItem("token", token)
    setUser(userData)
  }

  function logout() {
    localStorage.removeItem("token")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}