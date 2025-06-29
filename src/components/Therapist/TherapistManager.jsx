import React, { useState, useEffect } from 'react';
import therapistService from '../../services/therapistService';

const TherapistManager = () => {
  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        setLoading(true);
        const response = await therapistService.getAllTherapists();
        setTherapists(response.data.content);
        setError('');
      } catch (err) {
        setError('Terapistler yüklenemedi.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTherapists();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Bu terapisti silmek istediğinizden emin misiniz?')) {
      try {
        await therapistService.deleteTherapist(id);
        setTherapists(therapists.filter(t => t.id !== id));
      } catch (err) {
        alert('Terapist silinirken bir hata oluştu.');
      }
    }
  };

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Terapist Listesi</h3>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="py-3 px-6">Ad Soyad</th>
                        <th scope="col" className="py-3 px-6">Email</th>
                        <th scope="col" className="py-3 px-6">Uzmanlık Alanı</th>
                        <th scope="col" className="py-3 px-6">İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {therapists.map((therapist) => (
                        <tr key={therapist.id} className="bg-white border-b">
                            <td className="py-4 px-6">{therapist.user?.fullName || 'N/A'}</td>
                            <td className="py-4 px-6">{therapist.user?.email || 'N/A'}</td>
                            <td className="py-4 px-6">{therapist.specialization || 'N/A'}</td>
                            <td className="py-4 px-6">
                                <button className="font-medium text-blue-600 hover:underline mr-4">Düzenle</button>
                                <button onClick={() => handleDelete(therapist.id)} className="font-medium text-red-600 hover:underline">Sil</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default TherapistManager; 