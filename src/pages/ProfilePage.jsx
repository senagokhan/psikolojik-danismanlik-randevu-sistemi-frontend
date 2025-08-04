import React, { useEffect, useState } from 'react';
import userService from '../services/userService';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    specialization: '',
    experience: '',
    about: '',
  });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    userService.getMyProfile()
      .then(res => {
        setProfile(res.data);
        setForm({
          fullName: res.data.fullName || '',
          email: res.data.email || '',
          phoneNumber: res.data.phoneNumber || '',
          password: '',
          specialization: res.data.specialization || '',
          experience: res.data.experience || '',
          about: res.data.about || '',
        });
      })
      .catch(() => setError('Kullanıcı bilgileri alınamadı.'))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    const { password, ...rest } = form;
    const payload = password ? { ...form } : rest;
    try {
      await userService.updateMyProfile(payload);
      setSuccess('Profil başarıyla güncellendi!');
      setForm(f => ({ ...f, password: '' }));
    } catch (err) {
      setError('Profil güncellenemedi.');
    }
  };

  if (loading) return <div className="text-center py-12">Yükleniyor...</div>;
  if (error) return <div className="text-center text-red-500 py-12">{error}</div>;

  const isTherapist = profile?.role === 'THERAPIST';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0f7fa] via-[#f1f8e9] to-[#e3f2fd] py-12">
      <div className="w-full max-w-xl bg-white/90 rounded-2xl shadow-2xl p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-200 to-blue-200 flex items-center justify-center mb-2 shadow">
            <svg xmlns='http://www.w3.org/2000/svg' className='w-12 h-12 text-teal-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z' /></svg>
          </div>
          <h2 className="text-2xl font-bold text-center text-[#234e52]">Profil Bilgilerim</h2>
        </div>
        {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Ad Soyad</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-400 transition"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              disabled
              className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Telefon Numarası</label>
            <input
              type="text"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-400 transition"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Şifre (değiştirmek istediğiniz şifreyi giriniz)</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-400 transition"
              autoComplete="new-password"
            />
          </div>
          {isTherapist && (
            <>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Uzmanlık</label>
                <input
                  type="text"
                  name="specialization"
                  value={form.specialization}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-400 transition"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Deneyim</label>
                <input
                  type="text"
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-400 transition"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Hakkında</label>
                <textarea
                  name="about"
                  value={form.about}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-400 transition"
                  rows={3}
                />
              </div>
            </>
          )}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-teal-300 transition"
            >
              Güncelle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage; 