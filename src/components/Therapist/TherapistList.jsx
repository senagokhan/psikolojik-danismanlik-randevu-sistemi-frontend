import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import therapistService from '../../services/therapistService';

const TherapistList = () => {
    const [therapists, setTherapists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchTherapists = async () => {
            try {
                setLoading(true);
                const response = await therapistService.getAllTherapists(page, 9); 
                setTherapists(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (err) {
                setTherapists([]);
            } finally {
                setLoading(false);
            }
        };
        fetchTherapists();
    }, [page]);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-center text-[#234e52]">Our Therapists</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {therapists.map(therapist => {
                  console.log('Therapist:', therapist);
                  const name = therapist.user?.fullName || therapist.fullName || '';
                  return (
                    <div key={therapist.id} className="bg-white/90 rounded-lg shadow-lg p-6 text-center flex flex-col h-full border border-teal-50">
                        <h3 className="text-xl font-bold mb-2 text-[#234e52]">
                          {name}
                          {therapist.specialization ? ` - ${therapist.specialization}` : ''}
                        </h3>
                        { (therapist.about || therapist.description) && (
                          <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                            {therapist.about || therapist.description}
                          </p>
                        )}
                        <Link 
                            to={`/book-appointment/${therapist.id}`} 
                            className="mt-auto bg-teal-500 text-white font-bold py-2 px-4 rounded hover:bg-teal-600 transition duration-300"
                        >
                            Book Appointment
                        </Link>
                    </div>
                  );
                })}
            </div>
            {/* Pagination Controls */}
            <div className="flex justify-center mt-8 gap-2">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 0}
                    className="px-4 py-2 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="px-4 py-2 font-semibold">{page + 1} / {totalPages}</span>
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={page + 1 >= totalPages}
                    className="px-4 py-2 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TherapistList; 