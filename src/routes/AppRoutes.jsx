import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import ChangePassword from "../pages/ChangePassword"
import Register from "../pages/Register"
import Dashboard from "../pages/Dashboard"
import ProtectedRoute from "../components/ProtectedRoute"
import Admin from "../pages/Admin"

function AppRoutes() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/home"
          element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
          } />
  
        <Route
          path="/change-password"
          element={
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
          } />
        
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  )
}

export default AppRoutes