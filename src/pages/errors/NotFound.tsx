import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Page not found.</p>
      <Link to="/" className="text-primary-600 hover:underline">Go back home</Link>
    </div>
  );
};

export default NotFound;
