import authService from '../services/authService';

const useAuth = () => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const role = localStorage.getItem('userRole');

  const logout = () => {
    authService.logout(); 
  };

  if (!token || !userId || !role) {
    return { user: null, logout }; 
  }

  return {
    user: {
      id: userId,
      token,
      role: role.toUpperCase(),
    },
    logout, 
  };
};

export default useAuth;
