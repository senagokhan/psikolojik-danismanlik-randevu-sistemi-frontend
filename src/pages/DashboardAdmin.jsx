import UserList from '../components/User/UserList';
import TherapistManager from '../components/Therapist/TherapistManager';

const DashboardAdmin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0f7fa] via-[#f1f8e9] to-[#e3f2fd] py-12">
      <div className="w-full max-w-5xl bg-white/90 rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-[#234e52] text-center">Yönetici Paneli</h1>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-[#234e52]">Kullanıcı Yönetimi</h2>
          <UserList />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-[#234e52]">Terapist Yönetimi</h2>
          <TherapistManager />
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin; 