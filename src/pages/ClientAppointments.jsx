import React, { useEffect, useState } from 'react';
import axios from 'axios';

const translateStatus = (status) => {
  switch (status) {
    case 'PENDING':
      return 'Pending';
    case 'COMPLETED':
      return 'Completed';
    case 'RESCHEDULE_REQUESTED_BY_CLIENT':
      return 'Reschedule Requested by Client';
    case 'CANCELLED':
      return 'Cancelled';
    case 'APPROVED':
      return 'Approved';
    default:
      return status;
  }
};

const FeedbackModal = ({ open, onClose, appointmentId, onSaved }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:8080/api/feedbacks/appointments/${appointmentId}`,
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess('Your review has been saved.');
      onSaved && onSaved();
    } catch (err) {
      setError('Failed to submit your review.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl">×</button>
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Leave a Review</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Rating</label>
            <div className="flex items-center gap-1" role="radiogroup" aria-label="Rating">
              {[1,2,3,4,5].map(val => {
                const active = val <= rating;
                return (
                  <button
                    type="button"
                    key={val}
                    onMouseEnter={() => setRating(val)}
                    onClick={() => setRating(val)}
                    aria-label={`${val} star${val>1 ? 's' : ''}`}
                    className="p-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill={active ? '#fbbf24' : 'none'} stroke={active ? '#f59e0b' : '#9ca3af'} className="h-7 w-7">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.176 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.88 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                );
              }).reverse()}
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Comment</label>
            <textarea value={comment} onChange={e => setComment(e.target.value)} className="w-full border rounded px-3 py-2" rows={3} />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const RescheduleModal = ({ open, onClose, appointmentId, onSaved }) => {
  const [dateTime, setDateTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted date:", dateTime);
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:8080/api/appointments/${appointmentId}/reschedule`,
        { newDateTime: dateTime },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess('Your reschedule request has been submitted.');
      onSaved && onSaved();
    } catch (err) {
      setError('Failed to submit reschedule request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl">×</button>
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Select New Date and Time</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Date and Time</label>
            <input
              type="datetime-local"
              step="3600"
              value={dateTime}
              onChange={e => {
                const val = e.target.value;
                if (val) {
                  const [date, time] = val.split('T');
                  if (time) {
                    const [hour] = time.split(':');
                    setDateTime(`${date}T${hour.padStart(2, '0')}:00`);
                  } else {
                    setDateTime(val);
                  }
                } else {
                  setDateTime(val);
                }
              }}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ClientAppointments = () => {
  const [futureAppointments, setFutureAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [selectedRescheduleId, setSelectedRescheduleId] = useState(null);

  useEffect(() => {
    const clientId = localStorage.getItem('clientId');
    if (!clientId) {
      setError('Client ID not found.');
      setLoading(false);
      return;
    }
    setLoading(true);
    Promise.all([
      axios.get(`http://localhost:8080/api/appointments/clients/${clientId}/future`),
      axios.get(`http://localhost:8080/api/appointments/clients/${clientId}/past`)
    ])
      .then(([futureRes, pastRes]) => {
        setFutureAppointments(Array.isArray(futureRes.data) ? futureRes.data : []);
        setPastAppointments(Array.isArray(pastRes.data) ? pastRes.data : []);
        setError('');
      })
      .catch(() => setError('Failed to fetch appointments.'))
      .finally(() => setLoading(false));
  }, []);

  const openFeedbackModal = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setSelectedAppointmentId(null);
  };
  const handleFeedbackSaved = () => {
    setTimeout(closeModal, 1000);
  };

  const openRescheduleModal = (appointmentId) => {
    setSelectedRescheduleId(appointmentId);
    setRescheduleModalOpen(true);
  };
  const closeRescheduleModal = () => {
    setRescheduleModalOpen(false);
    setSelectedRescheduleId(null);
  };
  const handleRescheduleSaved = () => {
    setTimeout(closeRescheduleModal, 1000);
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-12">{error}</div>;

  const formatDateTime = (iso) => new Date(iso).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0f7fa] via-[#f1f8e9] to-[#e3f2fd] py-12">
      <div className="w-full max-w-3xl bg-white/90 rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#234e52]">My Appointments</h2>
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2 text-[#234e52]">Upcoming Appointments</h3>
          {futureAppointments.length === 0 ? <div className="text-gray-500">You have no upcoming appointments.</div> : (
            <ul className="space-y-4">
              {futureAppointments.map(app => (
                <li key={app.id} className="border border-teal-100 bg-white/80 p-4 rounded-xl flex flex-col md:flex-row md:items-center md:justify-between gap-2 shadow-sm">
                  <div>
                    <div><b>Therapist:</b> {app.therapistName || app.therapist?.user?.fullName || 'Unknown'}</div>
                    <div><b>Start:</b> {formatDateTime(app.startTime || app.formattedStartTime)}</div>
                    <div><b>Status:</b> {translateStatus(app.status)}</div>
                  </div>
                  <div className="flex gap-2 mt-2 md:mt-0">
                    <button
                      className="font-medium text-teal-600 hover:underline px-2 py-1 rounded border border-teal-200 hover:bg-teal-50 transition"
                      onClick={() => openRescheduleModal(app.id)}
                    >Request Reschedule</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 text-[#234e52]">Past Appointments</h3>
          {pastAppointments.length === 0 ? <div className="text-gray-500">You have no past appointments.</div> : (
            <ul className="space-y-4">
              {pastAppointments.map(app => (
                <li key={app.id} className="border border-teal-100 bg-white/80 p-4 rounded-xl flex flex-col md:flex-row md:items-center md:justify-between gap-2 shadow-sm">
                  <div>
                    <div><b>Therapist:</b> {app.therapistName || app.therapist?.user?.fullName || 'Unknown'}</div>
                    <div><b>Start:</b> {formatDateTime(app.startTime || app.formattedStartTime)}</div>
                    <div><b>End:</b> {app.endTime ? formatDateTime(app.endTime) : '-'}</div>
                    <div><b>Status:</b> {translateStatus(app.status)}</div>
                  </div>
                  {!app.feedbackGiven && (
                    <button
                      className="mt-2 md:mt-0 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition"
                      onClick={() => openFeedbackModal(app.id)}
                    >Leave a Review</button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
        <FeedbackModal
          open={modalOpen}
          onClose={closeModal}
          appointmentId={selectedAppointmentId}
          onSaved={handleFeedbackSaved}
        />
        <RescheduleModal
          open={rescheduleModalOpen}
          onClose={closeRescheduleModal}
          appointmentId={selectedRescheduleId}
          onSaved={handleRescheduleSaved}
        />
      </div>
    </div>
  );
};

export default ClientAppointments;
