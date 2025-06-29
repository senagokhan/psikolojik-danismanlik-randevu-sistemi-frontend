import LoginForm from '../components/Auth/LoginForm';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="w-full max-w-md">
        <LoginForm />
        <p className="text-center text-gray-500 text-xs mt-4">
          Hesabınız yok mu?{' '}
          <Link to="/register" className="text-blue-500 hover:text-blue-800">
            Kayıt Ol
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage; 