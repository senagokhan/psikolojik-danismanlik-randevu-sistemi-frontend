import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getMockPopularTherapists = () => [
  {
    id: 1,
    fullName: 'Uzm. Psk. Ayşe Yılmaz',
    specialization: 'Aile Danışmanlığı',
    experience: '10 yıl',
    description: 'Çift terapisi ve aile içi iletişim konularında uzman.',
    image: require('../assets/images/therapist1.png'),
  },
  {
    id: 2,
    fullName: 'Uzm. Psk. Selin Kaya',
    specialization: 'Çocuk ve Ergen Psikolojisi',
    experience: '8 yıl',
    description: 'Çocuklarda davranış bozuklukları ve ergenlik sorunları.',
    image: require('../assets/images/therapist2.png'),
  },
  {
    id: 3,
    fullName: 'Uzm. Psk. Mehmet Demir',
    specialization: 'Bireysel Terapi',
    experience: '12 yıl',
    description: 'Kaygı, stres ve kişisel gelişim alanlarında destek.',
    image: require('../assets/images/therapist3.png'),
  },
  {
    id: 4,
    fullName: 'Uzm. Psk. Alper Aksoy',
    specialization: 'Çift ve Aile Terapisi',
    experience: '9 yıl',
    description: 'Aile içi iletişim ve evlilik danışmanlığı.',
    image: require('../assets/images/therapist4.png'),
  },
];

const getMyProfile = () => {
  return api.get('/users/me');
};

const updateMyProfile = (profileData) => {
  return api.put('/users/profile', profileData);
};

const getAllUsers = (page = 0, size = 10) => {
  return api.get(`/users/list?page=${page}&size=${size}`);
};

const updateUserRole = (userId, role) => {
  return api.put(`/users/${userId}/role`, { role });
};

const getUserById = (userId) => {
  return api.get(`/users/${userId}`);
};

const userService = {
  getMyProfile,
  updateMyProfile,
  getAllUsers,
  updateUserRole,
  getUserById,
};

export default userService;
