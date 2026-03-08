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

    const token = localStorage.getItem("accessToken")

    const response = await api.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  },

  changePassword: async (data) => {

    const token = localStorage.getItem("accessToken")

    const response = await api.post("/auth/change-password", data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  },

  logout: async () => {

    const token = localStorage.getItem("accessToken")

    try {

      await api.post("/auth/logout", {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

    } finally {

      localStorage.removeItem("accessToken")

    }

  }

}

export default AuthService