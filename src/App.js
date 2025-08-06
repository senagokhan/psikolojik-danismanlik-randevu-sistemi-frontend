import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layout
import Header from './components/Layout/Header';
import PrivateRoute from './components/Layout/PrivateRoute';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardClient from './pages/DashboardClient';
import DashboardTherapist from './pages/DashboardTherapist';
import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/NotFound';
import ProfilePage from './pages/ProfilePage';
import BookingPage from './pages/BookingPage';
import TherapistAvailabilities from './pages/TherapistAvailabilities';
import TherapistAppointments from './pages/TherapistAppointments';
import ClientAppointments from './pages/ClientAppointments';
import TherapistSearchPage from './pages/TherapistSearchPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <main className="container mx-auto p-4">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/therapist/:id" element={<ProfilePage />} />
            <Route path="/search-therapists" element={<TherapistSearchPage />} />

            {/* Private Routes */}
            <Route element={<PrivateRoute allowedRoles={['ADMIN', 'CLIENT', 'THERAPIST']} />}>
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            <Route element={<PrivateRoute allowedRoles={['ADMIN']} />}>
              <Route path="/admin" element={<DashboardAdmin />} />
            </Route>
            <Route element={<PrivateRoute allowedRoles={['CLIENT']} />}>
              <Route path="/dashboard-client" element={<DashboardClient />} />
              <Route path="/dashboard-client/appointments" element={<ClientAppointments />} />
              <Route path="/book-appointment/:therapistId" element={<BookingPage />} />
            </Route>
            <Route element={<PrivateRoute allowedRoles={['THERAPIST']} />}>
              <Route path="/dashboard-therapist" element={<DashboardTherapist />} />
              <Route path="/dashboard-therapist/availabilities" element={<TherapistAvailabilities />} />
              <Route path="/panelim/randevularim" element={<TherapistAppointments />} />
            </Route>

            {/* Not Found Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App; 