import { useParams, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import therapistService from '../services/therapistService';
import api from '../services/api';

const BookingPage = () => {
  const { therapistId } = useParams();
  const [therapist, setTherapist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [availabilities, setAvailabilities] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (therapistId) {
      setLoading(true);
      Promise.all([
        therapistService.getTherapistById(therapistId),
        api.get(`/therapists/${therapistId}/availabilities`)
      ])
        .then(([therapistRes, availRes]) => {
          setTherapist(therapistRes.data);
          setAvailabilities(availRes.data.content);
        })
        .catch(err => {
          setError('Terapist veya müsaitlik bilgileri alınamadı.');
        })
        .finally(() => setLoading(false));
    }
  }, [therapistId]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    if (!selectedAvailability) {
      setError('Lütfen bir saat seçin.');
      return;
    }
    setBookingLoading(true);
    try {
      await api.post('/appointments', {
        therapistId,
        availabilityId: selectedAvailability
      });
      setSuccess('Randevunuz başarıyla oluşturuldu!');
    } catch (err) {
      setError('Randevu oluşturulamadı.');
    } finally {
      setBookingLoading(false);
    }
  };

  const formatDateTime = (iso) =>
    new Date(iso).toLocaleString('tr-TR', {
      dateStyle: 'short',
      timeStyle: 'short'
    });

  if (!therapistId) return <Navigate to="/" replace />;
  if (loading) return <div className="text-center mt-20 text-lg">Yükleniyor...</div>;
  if (!therapist) return <div className="text-center mt-20 text-red-500">Terapist bulunamadı.</div>;

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{therapist.fullName}</h2>
        <p className="text-blue-600 font-medium mb-1">{therapist.specialization}</p>
        <p className="text-gray-700 whitespace-pre-line">{therapist.about}</p>
      </div>

      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Randevu Al</h3>
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        {availabilities.filter(slot => !slot.booked).length === 0 ? (
          <div className="text-center text-gray-500">
            Şu anda uygun bir zaman bulunmamaktadır.
          </div>
        ) : (
          <form onSubmit={handleBooking} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Müsait Saat Seçin</label>
              <select
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                value={selectedAvailability}
                onChange={e => setSelectedAvailability(e.target.value)}
                required
              >
                <option value="">Saat seçin...</option>
                {availabilities
                  .filter(slot => slot.booked === false)
                   .map(slot => (
                   <option key={slot.id} value={slot.id}>
                  {formatDateTime(slot.startTime)} - {formatDateTime(slot.endTime)}
                 </option>
                ))}

              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-pink-300"
              disabled={bookingLoading}
            >
              {bookingLoading ? 'Randevu Oluşturuluyor...' : 'Randevuyu Onayla'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
