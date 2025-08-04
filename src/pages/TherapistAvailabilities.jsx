import React, { useState } from 'react';
import api from '../services/api';

const HOURS = Array.from({ length: 10 }, (_, i) => {
  const hour = 9 + i;
  return `${hour.toString().padStart(2, "0")}:00`;
});

const TherapistAvailabilities = () => {
  const [startDate, setStartDate] = useState("");
  const [startHour, setStartHour] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endHour, setEndHour] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    if (!startDate || !startHour || !endDate || !endHour) {
      setError("Başlangıç ve bitiş zamanı zorunlu.");
      return;
    }
    const startTime = `${startDate}T${startHour}`;
    const endTime = `${endDate}T${endHour}`;
    if (new Date(startTime) >= new Date(endTime)) {
      setError("Başlangıç zamanı, bitiş zamanından önce olmalı.");
      return;
    }
    setLoading(true);
    try {
      const res = await api.get('/therapists/me');
      const therapistId = res.data.id;
      if (!therapistId) throw new Error('Terapist kimliği alınamadı.');
      await api.post(`/therapists/${therapistId}/availabilities`, { startTime, endTime });
      setSuccess('Müsaitlik başarıyla eklendi!');
      setStartDate("");
      setStartHour("");
      setEndDate("");
      setEndHour("");
    } catch (err) {
      setError('Müsaitlik eklenemedi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0f7fa] via-[#f1f8e9] to-[#e3f2fd] py-12">
      <div className="w-full max-w-lg bg-white/90 rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#234e52]">Müsaitlik Ekle</h2>
        {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Başlangıç Tarihi</label>
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-400 transition"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Başlangıç Saati</label>
          <select
            value={startHour}
            onChange={e => setStartHour(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-400 transition"
            required
          >
            <option value="">Saat seçin...</option>
            {HOURS.map(h => <option key={h} value={h}>{h}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Bitiş Tarihi</label>
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-400 transition"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Bitiş Saati</label>
          <select
            value={endHour}
            onChange={e => setEndHour(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-400 transition"
            required
          >
            <option value="">Saat seçin...</option>
            {HOURS.map(h => <option key={h} value={h}>{h}</option>)}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-teal-300 transition"
          disabled={loading}
        >
          {loading ? 'Ekleniyor...' : 'Müsaitlik Ekle'}
        </button>
        </form>
      </div>
    </div>
  );
};

export default TherapistAvailabilities; 