import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import logo from '../../assets/images/logo.png';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="backdrop-blur bg-white/70 shadow-md border-b border-teal-100 sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3 group">
          <img src={logo} alt="Callmind Logo" className="h-14 w-auto drop-shadow" />
          <span className="text-2xl md:text-3xl font-semibold tracking-wide uppercase text-teal-700 group-hover:scale-105 transition-transform" style={{ letterSpacing: '0.05em', fontFamily: 'Times New Roman, Times, serif' }}>
            CALLMIND
          </span>
        </Link>
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Search bar */}
          <form className="hidden md:block mr-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Arama..."
                className="pl-10 pr-4 py-2 rounded-lg border border-teal-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-400 transition text-sm text-[#234e52] placeholder-gray-400 shadow-sm"
                disabled
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-400">
                <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z' /></svg>
              </span>
            </div>
          </form>
          <Link to="/" className="px-3 py-2 rounded-lg text-[#234e52] font-medium hover:bg-teal-50 hover:text-teal-700 transition">Anasayfa</Link>
          {user ? (
            <>
              <Link to="/profile" className="px-3 py-2 rounded-lg text-[#234e52] font-medium hover:bg-teal-50 hover:text-teal-700 transition">Profilim</Link>
              {user.role === 'ADMIN' && <Link to="/admin" className="px-3 py-2 rounded-lg text-[#234e52] font-medium hover:bg-teal-50 hover:text-teal-700 transition">Admin Paneli</Link>}
              {user.role === 'CLIENT' && <Link to="/dashboard-client" className="px-3 py-2 rounded-lg text-[#234e52] font-medium hover:bg-teal-50 hover:text-teal-700 transition">Panelim</Link>}
              {user.role === 'THERAPIST' && <Link to="/dashboard-therapist" className="px-3 py-2 rounded-lg text-[#234e52] font-medium hover:bg-teal-50 hover:text-teal-700 transition">Panelim</Link>}
              {user.role === 'THERAPIST' && <Link to="/dashboard-therapist/availabilities" className="px-3 py-2 rounded-lg text-[#234e52] font-medium hover:bg-teal-50 hover:text-teal-700 transition">Müsaitliklerim</Link>}
              {user.role === 'CLIENT' && <Link to="/dashboard-client/appointments" className="px-3 py-2 rounded-lg text-[#234e52] font-medium hover:bg-teal-50 hover:text-teal-700 transition">Randevularım</Link>}
              <button onClick={handleLogout} className="px-4 py-2 text-white bg-gradient-to-r from-teal-500 to-blue-400 rounded-lg font-semibold shadow hover:from-teal-600 hover:to-blue-500 transition">
                Çıkış Yap
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-2 rounded-lg text-[#234e52] font-medium hover:bg-teal-50 hover:text-teal-700 transition">Giriş Yap</Link>
              <Link to="/register" className="px-4 py-2 text-white bg-gradient-to-r from-teal-500 to-blue-400 rounded-lg font-semibold shadow hover:from-teal-600 hover:to-blue-500 transition">Kayıt Ol</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header; 