import api from './api';

const getAllTherapists = (page = 0, size = 10) => {
  return api.get(`/therapists?page=${page}&size=${size}`);
};

const createTherapist = (therapistData) => {
  return api.post('/therapists', therapistData);
};

const updateTherapist = (id, therapistData) => {
  return api.put(`/therapists/${id}`, therapistData);
};

const deleteTherapist = (id) => {
  return api.delete(`/therapists/${id}`);
};

const getMyClients = () => {
  return api.get('/therapists/clients');
};

const getTherapistById = (id) => {
  return api.get(`/therapists/${id}`);
};

const therapistService = {
  getAllTherapists,
  createTherapist,
  updateTherapist,
  deleteTherapist,
  getMyClients,
  getTherapistById,
};

export default therapistService;
