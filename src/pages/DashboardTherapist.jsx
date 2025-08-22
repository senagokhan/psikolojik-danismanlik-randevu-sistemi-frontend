import TherapistAppointmentList from '../components/Appointment/TherapistAppointmentList';

const DashboardTherapist = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0f7fa] via-[#f1f8e9] to-[#e3f2fd] py-12">
      <div className="w-full max-w-4xl bg-white/90 rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-[#234e52] text-center">Therapist Dashboard</h1>
        <h2 className="text-2xl font-semibold mb-4 text-[#234e52] text-center">My Appointments</h2>
        <TherapistAppointmentList />
      </div>
    </div>
  );
};

export default DashboardTherapist; 