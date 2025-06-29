import ClientAppointmentList from '../components/Appointment/ClientAppointmentList';

const DashboardClient = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Danışan Panelim</h1>
      <h2 className="text-2xl font-semibold mb-4">Randevularım</h2>
      <ClientAppointmentList />
    </div>
  );
};

export default DashboardClient; 