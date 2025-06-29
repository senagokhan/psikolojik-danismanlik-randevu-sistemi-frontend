import UserList from '../components/User/UserList';
import TherapistManager from '../components/Therapist/TherapistManager';

const DashboardAdmin = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Yönetici Paneli</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Kullanıcı Yönetimi</h2>
        <UserList />
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Terapist Yönetimi</h2>
        <TherapistManager />
      </div>
    </div>
  );
};

export default DashboardAdmin; 