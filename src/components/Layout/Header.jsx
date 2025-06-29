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
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} alt="Callmind Logo" className="h-16 w-auto" />
          <span className="text-xl md:text-2xl font-bold tracking-wide uppercase" style={{ color: '#c5838c', letterSpacing: '0.05em', fontFamily: 'Merriweather, serif' }}>
            CALLMIND
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-gray-600 hover:text-pink-700">Anasayfa</Link>
          {user ? (
            <>
              <Link to="/profile" className="text-gray-600 hover:text-pink-700">Profilim</Link>
              {user.role === 'ADMIN' && <Link to="/admin" className="text-gray-600 hover:text-pink-700">Admin Paneli</Link>}
              {user.role === 'CLIENT' && <Link to="/dashboard-client" className="text-gray-600 hover:text-pink-700">Panelim</Link>}
              {user.role === 'THERAPIST' && <Link to="/dashboard-therapist" className="text-gray-600 hover:text-pink-700">Panelim</Link>}
              {user.role === 'THERAPIST' && <Link to="/dashboard-therapist/availabilities" className="text-gray-600 hover:text-pink-700">Müsaitliklerim</Link>}
              {user.role === 'CLIENT' && <Link to="/dashboard-client/appointments" className="text-gray-600 hover:text-pink-700">Randevularım</Link>}
              <button onClick={handleLogout} className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600">
                Çıkış Yap
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-pink-700">Giriş Yap</Link>
              <Link to="/register" className="px-4 py-2 text-white rounded" style={{ backgroundColor: '#c5838c' }}>Kayıt Ol</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header; 