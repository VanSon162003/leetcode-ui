const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

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

  async getProblemBySlug(slug) {
    return this.request(`/problems/slug/${slug}`)
  }

  // Categories API
  async getCategories() {
    return this.request("/categories")
  }

  async getCategory(id) {
    return this.request(`/categories/${id}`)
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
    return this.request("/auth/profile")
  }

  async updateUserProfile(updates) {
    return this.request("/auth/profile", {
      method: "PUT",
      body: JSON.stringify(updates),
    })
  }

  async changePassword(passwordData) {
    return this.request("/auth/change-password", {
      method: "PUT",
      body: JSON.stringify(passwordData),
    })
  }

  // User Problems API
  async getUserProblems(userId, params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return this.request(`/user-problems/${userId}${queryString ? `?${queryString}` : ""}`)
  }

  async getUserProblem(userId, problemId) {
    return this.request(`/user-problems/${userId}/${problemId}`)
  }

  async startProblem(userId, problemId) {
    return this.request(`/user-problems/${userId}/${problemId}/start`, {
      method: "POST",
    })
  }

  async updateProblemProgress(userId, problemId, submissionResult) {
    return this.request(`/user-problems/${userId}/${problemId}/progress`, {
      method: "PUT",
      body: JSON.stringify(submissionResult),
    })
  }

  async getUserStats(userId) {
    return this.request(`/user-problems/${userId}/stats`)
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

  // Submission API
  async submitCode(submissionData) {
    return this.request("/submissions/", {
      method: "POST",
      body: JSON.stringify(submissionData),
    })
  }

  async validateCode(validationData) {
    return this.request("/submissions/validate", {
      method: "POST",
      body: JSON.stringify(validationData),
    })
  }

  async getSubmissionResult(token) {
    return this.request(`/submissions/${token}`)
  }

  async getSupportedLanguages() {
    return this.request("/submissions/languages")
  }

  async checkJudge0Health() {
    return this.request("/submissions/health/judge0")
  }
}

export const apiService = new ApiService()
export default apiService
