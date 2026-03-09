import { Navigate, Outlet } from "react-router-dom"
import AuthService from "../services/authService"

function ProtectedRoute() {

  if (!AuthService.isAuthenticated()) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}

export default ProtectedRoute