import api from './api';

const createAppointment = (appointmentData) => {
  return api.post('/appointments', appointmentData);
};

const updateAppointmentStatus = (id, status) => {
  return api.put(`/appointments/${id}/status`, { status });
};

const requestCancelAppointment = (id) => {
  return api.put(`/appointments/${id}/cancel-request`);
};

const rescheduleAppointment = (id, newDateTime) => {
  return api.put(`/appointments/${id}/reschedule`, { newDateTime });
};

const deleteAppointment = (id) => {
  return api.delete(`/appointments/${id}`);
};

export const getAppointmentsByClientId = (clientId, page = 0, size = 10) => {
  return api.get(`/appointments/${clientId}?page=${page}&size=${size}`);
};

const getTherapistAppointments = (page = 0, size = 10) => {
  return api.get(`/therapists/my-appointments?page=${page}&size=${size}`);
};

const getFutureAppointmentsByClientId = (clientId) => {
  return api.get(`/appointments/clients/${clientId}/future`);
};

const getPastAppointmentsByClientId = (clientId) => {
  return api.get(`/appointments/clients/${clientId}/past`);
};

const appointmentService = {
  createAppointment,
  updateAppointmentStatus,
  requestCancelAppointment,
  rescheduleAppointment,
  deleteAppointment,
  getAppointmentsByClientId,
  getTherapistAppointments,
  getFutureAppointmentsByClientId,   
  getPastAppointmentsByClientId    
};

export default appointmentService;
