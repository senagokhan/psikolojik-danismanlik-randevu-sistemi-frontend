import TherapistAppointmentList from '../components/Appointment/TherapistAppointmentList';

const DashboardTherapist = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Terapist Panelim</h1>
      <h2 className="text-2xl font-semibold mb-4">Randevularım</h2>
      <TherapistAppointmentList />
    </div>
  );
};

export default DashboardTherapist; 