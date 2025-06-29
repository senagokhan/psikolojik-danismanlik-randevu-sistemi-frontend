import api from './api';

const createClient = (clientData) => {
  return api.post('/clients', clientData);
};

const updateClient = (id, clientData) => {
  return api.put(`/clients/${id}`, clientData);
};

const deleteClient = (id) => {
  return api.delete(`/clients/${id}`);
};

const getClientByUserId = (userId) => {
  return api.get(`/clients/user/${userId}`);
};

const clientService = {
  createClient,
  updateClient,
  deleteClient,
  getClientByUserId, 
};

export default clientService;
