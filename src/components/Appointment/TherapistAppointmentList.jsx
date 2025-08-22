import React, { useState, useEffect } from 'react';
import appointmentService from '../../services/appointmentService';
import api from '../../services/api'; 

const STATUS_TRANSLATIONS = {
  PENDING: 'Pending',
  APPROVED: 'Approved',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
  RESCHEDULE_REQUESTED_BY_CLIENT: 'Reschedule Requested by Client',
};

const STATUS_OPTIONS = [
  { value: 'PENDING', label: 'Pending' },
  { value: 'APPROVED', label: 'Approved' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'CANCELLED', label: 'Cancelled' },
];

const TherapistAppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const response = await appointmentService.getTherapistAppointments();
        setAppointments(response.data.content);
        setError('');
      } catch (err) {
        setError('Failed to load appointments.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    setSuccess('');
    setError('');
    try {
      await api.put(`/appointments/${id}/status`, { status: newStatus });
      setAppointments(apps =>
        apps.map(app => app.id === id ? { ...app, status: newStatus } : app)
      );
      setSuccess('Status updated successfully.');
    } catch (err) {
      setError('An error occurred while updating the status.');
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  if (appointments.length === 0) {
    return <p>No appointments assigned yet.</p>;
  }

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      {success && <div className="text-green-600 mb-2">{success}</div>}
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="py-3 px-6">Client</th>
            <th className="py-3 px-6">Date and Time</th>
            <th className="py-3 px-6">Status</th>
            <th className="py-3 px-6">Change Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((app) => (
            <tr key={app.id} className="bg-white border-b hover:bg-gray-50">
              <td className="py-4 px-6">{app.clientName || 'Unknown'}</td>
              <td className="py-4 px-6">{app.formattedStartTime || 'Unknown'}</td>
              <td className="py-4 px-6">{STATUS_TRANSLATIONS[app.status] || app.status}</td>
              <td className="py-4 px-6">
                <select
                  value={app.status}
                  onChange={e => handleStatusChange(app.id, e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  disabled={updatingId === app.id}
                >
                  {STATUS_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TherapistAppointmentList;
