import React from 'react';
import { Link } from 'react-router-dom';

function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold text-red-600">Erişim Reddedildi</h1>
      <p className="text-lg text-gray-600 mt-4">Bu sayfayı görüntüleme yetkiniz bulunmamaktadır.</p>
      <Link to="/" className="mt-6 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
        Anasayfaya Dön
      </Link>
    </div>
  );
}

export default Unauthorized; 