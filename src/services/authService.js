import api from "./api"

const AuthService = {

  login: async (data) => {
    const response = await api.post("/auth/authenticate", data)
    localStorage.setItem("accessToken", response.data.accessToken)
    return response.data
  },

  register: async (data) => {
    const response = await api.post("/auth/register", data)
    return response.data
  },

  getCurrentUser: async () => {
    const response = await api.get("/auth/me")
    return response.data
  },

  changePassword: async (data) => {
    const response = await api.post("/auth/change-password", data)
    return response.data
  },

  logout: async () => {
    try {
      await api.post("/auth/logout")
    } finally {
      localStorage.removeItem("accessToken")
    }
  },

  getToken: () => {
    return localStorage.getItem("accessToken")
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("accessToken")
  }

}

export default AuthService