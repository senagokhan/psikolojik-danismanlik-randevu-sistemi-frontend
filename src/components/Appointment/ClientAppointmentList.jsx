import React, { useState, useEffect } from 'react';
import appointmentService from '../../services/appointmentService';
import { Link } from 'react-router-dom';

const translateStatus = (status) => {
    switch (status) {
        case 'PENDING':
            return 'Pending';
        case 'COMPLETED':
            return 'Completed';
        case 'RESCHEDULE_REQUESTED_BY_CLIENT':
            return 'Reschedule Requested by Client';
        case 'CANCELLED':
            return 'Cancelled';
        case 'APPROVED':
            return 'Approved';
        default:
            return status || 'Unknown';
    }
};

const ClientAppointmentList = () => {
    const [futureAppointments, setFutureAppointments] = useState([]);
    const [pastAppointments, setPastAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const clientId = localStorage.getItem('clientId');
                if (!clientId) {
                    setError("Client information not found.");
                    setLoading(false);
                    return;
                }

                const futureRes = await appointmentService.getFutureAppointmentsByClientId(clientId);
                const pastRes = await appointmentService.getPastAppointmentsByClientId(clientId);

                setFutureAppointments(futureRes.data || []);
                setPastAppointments(pastRes.data || []);
                setError('');
            } catch (err) {
                setError('Failed to load appointments.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    if (futureAppointments.length === 0 && pastAppointments.length === 0) {
        return (
            <div>
                <p>You do not have any appointments yet.</p>
                <Link to="/" className="text-blue-500 hover:underline">Book an appointment now!</Link>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            {futureAppointments.length > 0 && (
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Appointments</h2>
                    <table className="w-full text-sm text-left text-gray-500 border shadow rounded">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="py-2 px-4">Therapist</th>
                                <th className="py-2 px-4">Date and Time</th>
                                <th className="py-2 px-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {futureAppointments.map((app) => (
                                <tr key={app.id} className="border-b hover:bg-gray-50">
                                    <td className="py-2 px-4">{app.therapistName || 'Unknown'}</td>
                                    <td className="py-2 px-4">{app.formattedStartTime || 'Unknown'}</td>
                                    <td className="py-2 px-4">{translateStatus(app.status)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Past Appointments */}
            {pastAppointments.length > 0 && (
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Past Appointments</h2>
                    <table className="w-full text-sm text-left text-gray-500 border shadow rounded">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="py-2 px-4">Therapist</th>
                                <th className="py-2 px-4">Date and Time</th>
                                <th className="py-2 px-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pastAppointments.map((app) => (
                                <tr key={app.id} className="border-b hover:bg-gray-50">
                                    <td className="py-2 px-4">{app.therapistName || 'Unknown'}</td>
                                    <td className="py-2 px-4">{app.formattedStartTime || 'Unknown'}</td>
                                    <td className="py-2 px-4">{translateStatus(app.status)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ClientAppointmentList;
