import React from 'react';
import RegisterForm from '../components/Auth/RegisterForm';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="w-full max-w-md">
        <RegisterForm />
        <p className="text-center text-gray-500 text-xs mt-4">
          Zaten bir hesabınız var mı?{' '}
          <Link to="/login" className="text-blue-500 hover:text-blue-800">
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage; 