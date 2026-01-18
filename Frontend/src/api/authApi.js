import axios from "./axios"; // axios instance with baseURL and token

// 🔹 Signup API
export const signup = async (userData) => {
  try {
    const response = await axios.post("/auth/signup", userData);
    if (response.data?.token) {
      localStorage.setItem("token", response.data.token); // save token
    }
    return response.data;
  } catch (error) {
    console.error("Signup error:", error.response?.data || error.message);
    throw error;
  }
};

// 🔐 Login API
export const login = async (credentials) => {
  try {
    const response = await axios.post("/auth/login", credentials);
    if (response.data?.token) {
      localStorage.setItem("token", response.data.token); // save token
    }
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

// 👤 Get Current User Profile
export const getProfile = async () => {
  try {
    const response = await axios.get("/users/profile");
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error.response?.data || error.message);
    throw error;
  }
};

// ✏️ Update User Profile
export const updateProfile = async (profileData) => {
  try {
    const response = await axios.put("/users/profile", profileData);
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error.response?.data || error.message);
    throw error;
  }
};

// 🚪 Logout (frontend only)
export const logout = () => {
  localStorage.removeItem("token");
};
