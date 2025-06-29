import api from './api';
import { jwtDecode } from 'jwt-decode';
import clientService from './clientService'; 

const register = (userData) => {
  return api.post('/auth/register', userData);
};

const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);

    const token = response.data?.token;
    if (!token) {
      throw new Error("Token alınamadı.");
    }

    const decoded = jwtDecode(token);
    const userId = decoded.userId;
    const userRole = decoded.userRole;

    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('userRole', userRole);

    if (userRole === 'CLIENT') {
      try {
        const clientRes = await clientService.getClientByUserId(userId);
        const clientId = clientRes.data.id;
        localStorage.setItem('clientId', clientId);
      } catch (e) {
        console.error("Client bilgisi alınamadı:", e);
      }
    }


    return { token, userId, userRole };

  } catch (error) {
    console.error("Login sırasında hata:", error);
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('userRole');
  localStorage.removeItem('clientId'); 
};

const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const userRole = localStorage.getItem('userRole');

  if (!token || !userId || !userRole) return null;

  return {
    token,
    userId,
    role: userRole,
  };
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default authService;
