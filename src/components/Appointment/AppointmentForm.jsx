import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import appointmentService from '../../services/appointmentService';
import therapistService from '../../services/therapistService';

const AppointmentForm = ({ therapistId }) => {
    const navigate = useNavigate();
    const [appointmentTime, setAppointmentTime] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [therapistName, setTherapistName] = useState('');

    useEffect(() => {
        if (!therapistId) {
            navigate('/');
        } else {
            therapistService.getTherapistById(therapistId)
                .then((res) => {
                    const name = res.data.user?.fullName || 'Therapist';
                    setTherapistName(name);
                })
                .catch(() => {
                    setError('Failed to fetch therapist information.');
                    setTimeout(() => navigate('/'), 3000);
                });
        }
    }, [therapistId, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!appointmentTime) {
            setError('Please select a date and time.');
            return;
        }

        try {
            await appointmentService.createAppointment({
                therapistId,
                appointmentTime,
            });

            setSuccess('Your appointment has been created successfully! Redirecting to your dashboard...');
            setTimeout(() => {
                navigate('/dashboard-client');
            }, 3000);
        } catch (err) {
            setError('An error occurred while creating the appointment. Please try again later.');
            console.error(err);
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Create Appointment – {therapistName}
                </h2>

                {error && (
                    <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </p>
                )}
                {success && (
                    <p className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                        {success}
                    </p>
                )}

                <div className="mb-4">
                    <label
                        htmlFor="appointmentTime"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Appointment Date and Time
                    </label>
                    <input
                        id="appointmentTime"
                        type="datetime-local"
                        value={appointmentTime}
                        onChange={(e) => setAppointmentTime(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <p className="text-xs text-gray-600 mb-6">
                    Note: This form does not currently check all therapist availabilities.
                </p>

                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Confirm Appointment
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AppointmentForm;
