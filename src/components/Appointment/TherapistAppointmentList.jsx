import React, { useState, useEffect } from 'react';
import appointmentService from '../../services/appointmentService';
import api from '../../services/api'; 

const STATUS_TRANSLATIONS = {
  PENDING: 'Beklemede',
  APPROVED: 'Onaylandı',
  COMPLETED: 'Tamamlandı',
  CANCELLED: 'İptal Edildi',
  RESCHEDULE_REQUESTED_BY_CLIENT: 'Danışan Tarih Değişikliği Talep Etti',
};

const STATUS_OPTIONS = [
  { value: 'PENDING', label: 'Beklemede' },
  { value: 'APPROVED', label: 'Onaylandı' },
  { value: 'COMPLETED', label: 'Tamamlandı' },
  { value: 'CANCELLED', label: 'İptal Edildi' },
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
        setError('Randevular yüklenemedi.');
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
      setSuccess('Durum başarıyla güncellendi.');
    } catch (err) {
      setError('Durum güncellenirken bir hata oluştu.');
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  if (appointments.length === 0) {
    return <p>Henüz size atanmış bir randevu bulunmamaktadır.</p>;
  }

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      {success && <div className="text-green-600 mb-2">{success}</div>}
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="py-3 px-6">Danışan</th>
            <th className="py-3 px-6">Tarih ve Saat</th>
            <th className="py-3 px-6">Durum</th>
            <th className="py-3 px-6">Durumu Değiştir</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((app) => (
            <tr key={app.id} className="bg-white border-b hover:bg-gray-50">
              <td className="py-4 px-6">{app.clientName || 'Bilinmiyor'}</td>
              <td className="py-4 px-6">{app.formattedStartTime || 'Bilinmiyor'}</td>
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
