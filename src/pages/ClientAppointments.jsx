import React, { useEffect, useState } from 'react';
import axios from 'axios';

const translateStatus = (status) => {
  switch (status) {
    case 'PENDING':
      return 'Beklemede';
    case 'COMPLETED':
      return 'Tamamlandı';
    case 'RESCHEDULE_REQUESTED_BY_CLIENT':
      return 'Danışan Tarih Değişikliği Talep Etti';
    case 'CANCELLED':
      return 'İptal Edildi';
    case 'APPROVED':
      return 'Onaylandı';
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
      setSuccess('Değerlendirme kaydedildi.');
      onSaved && onSaved();
    } catch (err) {
      setError('Değerlendirme gönderilemedi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl">×</button>
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Değerlendirme Yap</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Puan</label>
            <select value={rating} onChange={e => setRating(Number(e.target.value))} className="w-full border rounded px-3 py-2">
              {[5, 4, 3, 2, 1].map(val => <option key={val} value={val}>{val}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Yorum</label>
            <textarea value={comment} onChange={e => setComment(e.target.value)} className="w-full border rounded px-3 py-2" rows={3} />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">İptal</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" disabled={loading}>{loading ? 'Gönderiliyor...' : 'Gönder'}</button>
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
    console.log("Gönderilen tarih:", dateTime);
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
      setSuccess('Değişiklik talebiniz iletildi.');
      onSaved && onSaved();
    } catch (err) {
      setError('Değişiklik talebi gönderilemedi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl">×</button>
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Yeni Tarih ve Saat Seç</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Tarih ve Saat</label>
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
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">İptal</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" disabled={loading}>{loading ? 'Gönderiliyor...' : 'Gönder'}</button>
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
      setError('Client ID bulunamadı.');
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
      .catch(() => setError('Randevular alınamadı.'))
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

  if (loading) return <div className="text-center py-12">Yükleniyor...</div>;
  if (error) return <div className="text-center text-red-500 py-12">{error}</div>;

  const formatDateTime = (iso) => new Date(iso).toLocaleString('tr-TR', { dateStyle: 'short', timeStyle: 'short' });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0f7fa] via-[#f1f8e9] to-[#e3f2fd] py-12">
      <div className="w-full max-w-3xl bg-white/90 rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#234e52]">Randevularım</h2>
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2 text-[#234e52]">Gelecek Randevularım</h3>
          {futureAppointments.length === 0 ? <div className="text-gray-500">Yaklaşan randevunuz yok.</div> : (
            <ul className="space-y-4">
              {futureAppointments.map(app => (
                <li key={app.id} className="border border-teal-100 bg-white/80 p-4 rounded-xl flex flex-col md:flex-row md:items-center md:justify-between gap-2 shadow-sm">
                  <div>
                    <div><b>Terapist:</b> {app.therapistName || app.therapist?.user?.fullName || 'Bilinmiyor'}</div>
                    <div><b>Başlangıç:</b> {formatDateTime(app.startTime || app.formattedStartTime)}</div>
                    <div><b>Durum:</b> {translateStatus(app.status)}</div>
                  </div>
                  <div className="flex gap-2 mt-2 md:mt-0">
                    <button
                      className="font-medium text-teal-600 hover:underline px-2 py-1 rounded border border-teal-200 hover:bg-teal-50 transition"
                      onClick={() => openRescheduleModal(app.id)}
                    >Değişiklik Talebi</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 text-[#234e52]">Geçmiş Randevularım</h3>
          {pastAppointments.length === 0 ? <div className="text-gray-500">Geçmiş randevunuz yok.</div> : (
            <ul className="space-y-4">
              {pastAppointments.map(app => (
                <li key={app.id} className="border border-teal-100 bg-white/80 p-4 rounded-xl flex flex-col md:flex-row md:items-center md:justify-between gap-2 shadow-sm">
                  <div>
                    <div><b>Terapist:</b> {app.therapistName || app.therapist?.user?.fullName || 'Bilinmiyor'}</div>
                    <div><b>Başlangıç:</b> {formatDateTime(app.startTime || app.formattedStartTime)}</div>
                    <div><b>Bitiş:</b> {app.endTime ? formatDateTime(app.endTime) : '-'}</div>
                    <div><b>Durum:</b> {translateStatus(app.status)}</div>
                  </div>
                  {!app.feedbackGiven && (
                    <button
                      className="mt-2 md:mt-0 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition"
                      onClick={() => openFeedbackModal(app.id)}
                    >Değerlendirme Yap</button>
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
