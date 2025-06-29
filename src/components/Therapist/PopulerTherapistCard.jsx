import React from 'react';
import { Link } from 'react-router-dom';

const PopulerTherapistCard = ({ id, image, fullName, specialization, experience, description }) => {
  return (
    <Link to={`/therapist/${id}`} className="block hover:shadow-2xl transition-shadow duration-300">
      <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center h-full">
        <img
          src={image}
          alt={fullName}
          className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-blue-100 shadow"
        />
        <h3 className="text-lg font-bold text-gray-800 mb-1">{fullName}</h3>
        <p className="text-blue-600 font-medium mb-1">{specialization}</p>
        <p className="text-gray-500 text-sm mb-2">{experience} deneyim</p>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        <span className="mt-auto inline-block bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-semibold">Profili Gör</span>
      </div>
    </Link>
  );
};

export default PopulerTherapistCard; 