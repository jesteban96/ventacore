import { create } from "zustand";
import axios from "axios";
import API_URL from "../config/api";

const useAuthStore = create((set) => ({
  token: localStorage.getItem("token") || null,

  login: async (username, password) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { username, password });
      localStorage.setItem("token", res.data.access_token);
      set({ token: res.data.access_token });
      return true; // Login exitoso
    } catch (error) {
      console.error("Error en el login:", error.response?.data);
      return false; // Login fallido
    }
  },

  logout: () => { 
    localStorage.removeItem("token");
    set({ token: null });
  },
}));

export default useAuthStore;
