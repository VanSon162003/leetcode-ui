const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api"

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }

    // Add auth token if available
    const token = localStorage.getItem("authToken")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("API request failed:", error)
      throw error
    }
  }

  // Problems API
  async getProblems(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return this.request(`/problems${queryString ? `?${queryString}` : ""}`)
  }

  async getProblem(id) {
    return this.request(`/problems/${id}`)
  }

  async updateProblemStatus(id, status) {
    return this.request(`/problems/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    })
  }

  // Courses API
  async getCourses() {
    return this.request("/courses")
  }

  async enrollInCourse(courseId) {
    return this.request(`/courses/${courseId}/enroll`, {
      method: "POST",
    })
  }

  // User API
  async getUserProfile() {
    return this.request("/user/profile")
  }

  async updateUserProfile(updates) {
    return this.request("/user/profile", {
      method: "PATCH",
      body: JSON.stringify(updates),
    })
  }

  async updateUserPreferences(preferences) {
    return this.request("/user/preferences", {
      method: "PATCH",
      body: JSON.stringify(preferences),
    })
  }

  // Authentication API
  async login(credentials) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })
  }

  async register(userData) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  }

  async logout() {
    return this.request("/auth/logout", {
      method: "POST",
    })
  }
}

export const apiService = new ApiService()
export default apiService
