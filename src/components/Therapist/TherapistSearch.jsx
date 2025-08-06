import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import therapistService from '../../services/therapistService';

const TherapistSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const searchTherapists = async () => {
      if (searchTerm.trim().length === 0) {
        setTherapists([]);
        return;
      }

      if (searchTerm.trim().length < 2) {
        return; // En az 2 karakter yazılmasını bekle
      }

      try {
        setLoading(true);
        setError('');
        const response = await therapistService.searchTherapists(searchTerm);
        setTherapists(response.data);
      } catch (err) {
        console.error('Arama hatası:', err);
        setError('Arama sırasında bir hata oluştu. Lütfen tekrar deneyin.');
        setTherapists([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce: Kullanıcı yazmayı bitirdikten 500ms sonra arama yap
    const timeoutId = setTimeout(searchTherapists, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // URL'yi güncelle
  useEffect(() => {
    if (searchTerm.trim()) {
      setSearchParams({ q: searchTerm.trim() });
    } else {
      setSearchParams({});
    }
  }, [searchTerm, setSearchParams]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center text-[#234e52]">
          Terapist Ara
        </h2>
        <p className="text-gray-600 text-center mb-6">
          İstediğiniz terapistin adını yazarak arama yapabilirsiniz
        </p>
        
        {/* Arama Kutusu */}
        <div className="relative max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg 
              className="h-5 w-5 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Terapist adı yazın..."
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
      </div>

      {/* Yükleme Durumu */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
          <p className="mt-2 text-gray-600">Aranıyor...</p>
        </div>
      )}

      {/* Hata Mesajı */}
      {error && (
        <div className="text-center py-4">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {/* Sonuçlar */}
      {!loading && !error && searchTerm.trim().length > 0 && (
        <div className="mt-6">
          {therapists.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">
                "{searchTerm}" ile eşleşen terapist bulunamadı.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Farklı bir isim deneyebilirsiniz.
              </p>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#234e52]">
                {therapists.length} terapist bulundu
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {therapists.map(therapist => {
                  const name = therapist.fullName || therapist.user?.fullName || '';
                  return (
                    <div 
                      key={therapist.id} 
                      className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="text-center">
                        <h4 className="text-xl font-bold mb-2 text-[#234e52]">
                          {name}
                        </h4>
                        {therapist.specialization && (
                          <p className="text-teal-600 font-medium mb-2">
                            {therapist.specialization}
                          </p>
                        )}
                        {therapist.experience && (
                          <p className="text-gray-600 text-sm mb-4">
                            {therapist.experience} yıl deneyim
                          </p>
                        )}
                        <Link 
                          to={`/book-appointment/${therapist.id}`}
                          className="inline-block bg-teal-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-teal-600 transition-colors duration-300"
                        >
                          Randevu Al
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Arama yapılmadığında gösterilecek mesaj */}
      {!loading && !error && searchTerm.trim().length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-gray-500 text-lg">
            Terapist aramak için yukarıdaki kutuya isim yazın
          </p>
        </div>
      )}
    </div>
  );
};

export default TherapistSearch; 