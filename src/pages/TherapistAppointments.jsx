import React, { useEffect, useState } from 'react';
import api from '../services/api';
import useAuth from '../hooks/useAuth';

const TherapistAppointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [availSuccess, setAvailSuccess] = useState('');
  const [availError, setAvailError] = useState('');
  const [availLoading, setAvailLoading] = useState(false);
  const [therapistId, setTherapistId] = useState(null);

  useEffect(() => {
    api.get('/therapists/me')
      .then(res => {
        setTherapistId(res.data.id);
      })
      .catch(() => setError('Failed to fetch therapist information.'));
  }, []);

  useEffect(() => {
    api.get('/therapists/my-appointments')
      .then(res => setAppointments(res.data))
      .catch(() => setError('Failed to fetch appointments.'))
      .finally(() => setLoading(false));
  }, []);

  const handleAvailSubmit = async (e) => {
    e.preventDefault();
    setAvailSuccess('');
    setAvailError('');

    if (!startTime || !endTime) {
      setAvailError('Start and end time are required.');
      return;
    }

    if (!therapistId) {
      setAvailError('Therapist ID could not be retrieved.');
      return;
    }

    setAvailLoading(true);
    try {
      await api.post(`/therapists/${therapistId}/availabilities`, { startTime, endTime });
      setAvailSuccess('Availability added successfully!');
      setStartTime('');
      setEndTime('');
    } catch (err) {
      setAvailError('Failed to add availability.');
    } finally {
      setAvailLoading(false);
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-12">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-10">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Therapist Dashboard</h2>

      <h3 className="text-xl font-semibold mb-4">Add New Availability</h3>
      {availSuccess && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{availSuccess}</div>}
      {availError && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{availError}</div>}

      <form onSubmit={handleAvailSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Start Time</label>
          <input
            type="datetime-local"
            step="3600"
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">End Time</label>
          <input
            type="datetime-local"
            step="3600"
            value={endTime}
            onChange={e => setEndTime(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-pink-300"
          disabled={availLoading}
        >
          {availLoading ? 'Adding...' : 'Add Availability'}
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-4">My Appointments</h3>
      {appointments.length === 0 ? (
        <div className="text-center text-gray-500">No appointments assigned yet.</div>
      ) : (
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4">Client</th>
              <th className="py-2 px-4">Date/Time</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(app => (
              <tr key={app.id} className="border-b">
                <td className="py-2 px-4">{app.clientName || app.client?.fullName || '-'}</td>
                <td className="py-2 px-4">{app.appointmentTime || app.time || '-'}</td>
                <td className="py-2 px-4">{app.status || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TherapistAppointments;
