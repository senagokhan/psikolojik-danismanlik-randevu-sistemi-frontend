import React from 'react';
import TherapistSearch from '../components/Therapist/TherapistSearch';

const TherapistSearchPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      <div className="container mx-auto py-8">
        <TherapistSearch />
      </div>
    </div>
  );
};

export default TherapistSearchPage; 