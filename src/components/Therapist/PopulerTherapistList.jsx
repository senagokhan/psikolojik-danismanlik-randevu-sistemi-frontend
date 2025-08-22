import React from 'react';
import PopulerTherapistCard from './PopulerTherapistCard';
import { getMockPopularTherapists } from '../../services/userService';

const PopulerTherapistList = () => {
  const therapists = getMockPopularTherapists();

  return (
    <section className="my-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">Popular Therapists</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {therapists.map((therapist) => (
          <PopulerTherapistCard key={therapist.id} {...therapist} />
        ))}
      </div>
    </section>
  );
};

export default PopulerTherapistList; 